"""Simple chat context builder.

This module shows how chat messages become one text context before tokenization.
GPT-like models do not receive a Python list of messages. They receive a token
sequence created from a serialized context.
"""

from dataclasses import dataclass

SYSTEM_INSTRUCTION = (
    "You are Slice Pizza pizzeria assistant. Answer only in English. "
    "Answer only about the pizzeria, pizza, pizza ingredients, pizza prices, "
    "pizza recommendations, and the fictional pizzeria story."
)

# A verbatim excerpt from the end of the training corpus used as a warm-up
# prefix at inference time. A char-level pretraining model cold-starts in the
# wrong statistical mode without preceding context; this snippet must match the
# training text exactly so the model's predictions are anchored to known state.
INFERENCE_PRIMER = (
    "Customer: thx\n"
    "Assistant: You are welcome! Ask me anytime about Slice Pizza.\n\n"
)


@dataclass(frozen=True)
class ContextMessage:
    role: str
    content: str


def build_chat_context(
    messages: list[ContextMessage], include_assistant_marker: bool
) -> str:
    """Serialize chat messages with the same markers used by the dataset."""

    if not messages:
        raise ValueError("[ERROR] context: messages cannot be empty")

    blocks: list[str] = []
    for message in messages:
        role = message.role.strip().lower()
        content = message.content.strip()
        if role not in {"system", "user", "assistant"}:
            raise ValueError(f"[ERROR] context: unsupported role {message.role!r}")
        if not content:
            raise ValueError("[ERROR] context: message content cannot be empty")
        if role == "system":
            continue  # system instruction is baked into the training corpus
        elif role == "user":
            blocks.append(f"Customer: {content}")
        else:
            blocks.append(f"Assistant: {content}")

    if not include_assistant_marker:
        return "\n".join(blocks) + "\n"

    # Trailing space matches the training format "Assistant: <answer>" — no newline
    return "\n".join(blocks) + "\nAssistant: "


def trim_context_to_length(context: str, max_characters: int) -> str:
    """Keep the latest characters when a context becomes too large."""

    if max_characters <= 0:
        raise ValueError("[ERROR] context: max_characters must be positive")
    if len(context) <= max_characters:
        return context
    return context[-max_characters:]
