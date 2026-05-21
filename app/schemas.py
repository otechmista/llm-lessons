"""OpenAI-compatible API request and response contracts."""

from pydantic import BaseModel, Field, field_validator, model_validator


class ChatMessage(BaseModel):
    role: str
    content: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        allowed = {"system", "user", "assistant"}
        if v not in allowed:
            raise ValueError(f"role must be one of {allowed}, got {v!r}")
        return v


# Default chat settings requested for the public API and web chat.
_MAX_TEMPERATURE = 0.7
_DEFAULT_TEMPERATURE = 0.7
_MAX_TOKENS = 2000
_DEFAULT_MAX_TOKENS = 2000
_MODEL_ID = "llm-lessons"


class ChatCompletionRequest(BaseModel):
    model: str = _MODEL_ID
    messages: list[ChatMessage]
    temperature: float = Field(default=_DEFAULT_TEMPERATURE, gt=0)
    max_tokens: int = Field(default=_DEFAULT_MAX_TOKENS, gt=0, le=_MAX_TOKENS)
    max_completion_tokens: int | None = Field(default=None, gt=0, le=_MAX_TOKENS)
    n: int = Field(default=1, ge=1, le=1)
    stream: bool = False
    user: str | None = None

    @model_validator(mode="after")
    def cap_temperature(self) -> "ChatCompletionRequest":
        if self.max_completion_tokens is not None:
            self.max_tokens = self.max_completion_tokens
        if self.stream:
            raise ValueError("stream=true is not supported by this study API")
        self.temperature = min(self.temperature, _MAX_TEMPERATURE)
        return self


class ChatCompletionChoice(BaseModel):
    index: int
    message: ChatMessage
    finish_reason: str


class ChatCompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: list[ChatCompletionChoice]
    usage: "CompletionUsage"


class CompletionUsage(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


class ModelInfo(BaseModel):
    id: str
    object: str = "model"
    created: int
    owned_by: str


class ModelListResponse(BaseModel):
    object: str = "list"
    data: list[ModelInfo]


# ── Simple /chat endpoint ─────────────────────────────────

class SimpleChatRequest(BaseModel):
    message: str | None = None
    messages: list[ChatMessage] = Field(default_factory=list)
    temperature: float = Field(default=_DEFAULT_TEMPERATURE, gt=0)
    max_tokens: int = Field(default=_DEFAULT_MAX_TOKENS, gt=0, le=_MAX_TOKENS)
    max_completion_tokens: int | None = Field(default=None, gt=0, le=_MAX_TOKENS)

    @model_validator(mode="after")
    def cap_temperature(self) -> "SimpleChatRequest":
        if self.max_completion_tokens is not None:
            self.max_tokens = self.max_completion_tokens
        self.temperature = min(self.temperature, _MAX_TEMPERATURE)
        return self


class SimpleChatResponse(BaseModel):
    reply: str
