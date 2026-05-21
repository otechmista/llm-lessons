"""Thin FastAPI layer for OpenAI-compatible chat completions."""

import re
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

try:
    from .context import ContextMessage, SYSTEM_INSTRUCTION, build_chat_context
    from .infer import generate_text
    from .schemas import (
        ChatCompletionChoice,
        ChatCompletionRequest,
        ChatCompletionResponse,
        ChatMessage,
        CompletionUsage,
        ModelInfo,
        ModelListResponse,
        SimpleChatRequest,
        SimpleChatResponse,
    )
except ImportError:  # pragma: no cover - supports direct execution contexts
    from context import ContextMessage, SYSTEM_INSTRUCTION, build_chat_context
    from infer import generate_text
    from schemas import (
        ChatCompletionChoice,
        ChatCompletionRequest,
        ChatCompletionResponse,
        ChatMessage,
        CompletionUsage,
        ModelInfo,
        ModelListResponse,
        SimpleChatRequest,
        SimpleChatResponse,
    )

# Keywords that indicate a pizza/pizzeria-related question.
# If the user message matches none of these, skip the model entirely.
_PIZZA_RE = re.compile(
    r"\b(pizza|ingredient|menu|price|cost|order|slice|topping|cheese|"
    r"mozzarella|pepperoni|mushroom|basil|sauce|dough|crust|chicken|ham|"
    r"olive|onion|pepper|chocolate|catupiry|parmesan|provolone|gorgonzola|"
    r"margherita|vegetarian|portuguese|drink|soda|coke|sprite|guarana|"
    r"dessert|deliver|pizzeria|slice\s*pizza|house\s+special|"
    r"name|hello|hi|hey|thanks|thank|who\s+are|what\s+(can|do)\s+you|"
    r"good\s+(morning|afternoon|evening)|what\s+is\s+(on\s+the\s+)?menu)\b",
    re.IGNORECASE,
)

_OUT_OF_SCOPE_REPLY = "I only answer questions about Slice Pizza. I do not know how to answer that."
_MODEL_ID = "llm-lessons"
_MODEL_CREATED = 1716076800
_MODEL_OWNER = "otechmista"


def _pizza_related(text: str) -> bool:
    """Return True if the message appears to be about pizza or the pizzeria."""
    return bool(_PIZZA_RE.search(text))


app = FastAPI(title="LLM Lessons")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _clean(text: str) -> str:
    """Cut at the next Customer turn if the model continues the dialogue."""
    cut = re.search(r"\nCustomer:", text)
    if cut:
        text = text[: cut.start()]
    return text.strip()


def _build_prompt(request: ChatCompletionRequest) -> str:
    """Serialize messages, auto-injecting system instruction when absent."""
    messages = list(request.messages)
    if not messages or messages[0].role != "system":
        messages.insert(0, ChatMessage(role="system", content=SYSTEM_INSTRUCTION))
    return build_chat_context(
        [ContextMessage(role=m.role, content=m.content) for m in messages],
        include_assistant_marker=True,
    )


def _last_user_message(messages: list[ChatMessage]) -> str:
    """Return the latest user message content from a chat transcript."""
    return next((m.content for m in reversed(messages) if m.role == "user"), "")


def _simple_chat_messages(request: SimpleChatRequest) -> list[ChatMessage]:
    """Normalize /chat payloads from either a single message or full history."""
    if request.messages:
        return request.messages
    if request.message is None:
        return []
    return [ChatMessage(role="user", content=request.message)]


def _rough_token_count(text: str) -> int:
    """Approximate API usage with the project character-level tokenizer idea."""
    return len(text)


def _usage(prompt: str, completion: str) -> CompletionUsage:
    prompt_tokens = _rough_token_count(prompt)
    completion_tokens = _rough_token_count(completion)
    return CompletionUsage(
        prompt_tokens=prompt_tokens,
        completion_tokens=completion_tokens,
        total_tokens=prompt_tokens + completion_tokens,
    )


def _model_info(model_id: str = _MODEL_ID) -> ModelInfo:
    return ModelInfo(id=model_id, created=_MODEL_CREATED, owned_by=_MODEL_OWNER)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/v1/models", response_model=ModelListResponse)
def list_models() -> ModelListResponse:
    return ModelListResponse(data=[_model_info()])


@app.get("/v1/models/{model_id}", response_model=ModelInfo)
def retrieve_model(model_id: str) -> ModelInfo:
    if model_id != _MODEL_ID:
        raise HTTPException(status_code=404, detail=f"Model {model_id!r} was not found")
    return _model_info(model_id)


@app.post("/v1/chat/completions", response_model=ChatCompletionResponse)
def chat_completions(request: ChatCompletionRequest) -> ChatCompletionResponse:
    if not request.messages:
        raise HTTPException(status_code=400, detail="[ERROR] api: messages cannot be empty")

    prompt = _build_prompt(request)
    # Use the last user message for the pizza guard
    last_user = _last_user_message(request.messages)
    if last_user and not _pizza_related(last_user):
        reply = _OUT_OF_SCOPE_REPLY
    else:
        try:
            reply = _clean(generate_text(
                prompt=prompt,
                max_tokens=request.max_tokens,
                temperature=request.temperature,
            ))
        except (FileNotFoundError, ValueError) as error:
            raise HTTPException(status_code=400, detail=str(error)) from error

    return ChatCompletionResponse(
        id="chatcmpl-local",
        object="chat.completion",
        created=int(time.time()),
        model=request.model,
        choices=[
            ChatCompletionChoice(
                index=0,
                message=ChatMessage(role="assistant", content=reply),
                finish_reason="stop",
            )
        ],
        usage=_usage(prompt, reply),
    )


@app.post("/chat", response_model=SimpleChatResponse)
def simple_chat(request: SimpleChatRequest) -> SimpleChatResponse:
    """Simple endpoint used by the PizzaChat web component."""
    messages = _simple_chat_messages(request)
    if not messages:
        raise HTTPException(status_code=400, detail="[ERROR] api: message cannot be empty")

    last_user = _last_user_message(messages)
    if not last_user.strip():
        raise HTTPException(status_code=400, detail="[ERROR] api: message cannot be empty")

    if not _pizza_related(last_user):
        return SimpleChatResponse(reply=_OUT_OF_SCOPE_REPLY)

    completion_request = ChatCompletionRequest(
        messages=messages,
        max_tokens=request.max_tokens,
        temperature=request.temperature,
    )
    try:
        generated = _clean(generate_text(
            prompt=_build_prompt(completion_request),
            max_tokens=request.max_tokens,
            temperature=request.temperature,
        ))
    except (FileNotFoundError, ValueError) as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    return SimpleChatResponse(reply=generated)
