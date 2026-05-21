import pytest

from app.context import ContextMessage, build_chat_context, trim_context_to_length


# ── build_chat_context ────────────────────────────────────────────────────────

def test_single_user_message_with_assistant_marker():
    ctx = build_chat_context(
        [ContextMessage(role="user", content="What pizza do you recommend?")],
        include_assistant_marker=True,
    )
    assert "Customer: What pizza do you recommend?" in ctx
    assert ctx.endswith("Assistant: ")


def test_single_user_message_without_assistant_marker():
    ctx = build_chat_context(
        [ContextMessage(role="user", content="hi")],
        include_assistant_marker=False,
    )
    assert ctx.startswith("Customer: hi")
    assert "Assistant:" not in ctx


def test_multi_turn_serializes_all_messages():
    ctx = build_chat_context(
        [
            ContextMessage(role="user", content="What pizzas do you have?"),
            ContextMessage(role="assistant", content="We have Margherita and Pepperoni."),
            ContextMessage(role="user", content="Tell me about Pepperoni."),
        ],
        include_assistant_marker=True,
    )
    assert "Customer: What pizzas do you have?" in ctx
    assert "Assistant: We have Margherita and Pepperoni." in ctx
    assert "Customer: Tell me about Pepperoni." in ctx
    assert ctx.endswith("Assistant: ")


def test_system_message_is_silently_dropped():
    ctx = build_chat_context(
        [
            ContextMessage(role="system", content="Answer only about pizza."),
            ContextMessage(role="user", content="hello"),
        ],
        include_assistant_marker=True,
    )
    assert "system" not in ctx.lower()
    assert "Answer only about pizza." not in ctx
    assert "Customer: hello" in ctx


def test_assistant_message_without_marker():
    ctx = build_chat_context(
        [
            ContextMessage(role="user", content="price?"),
            ContextMessage(role="assistant", content="It costs $32."),
        ],
        include_assistant_marker=False,
    )
    assert "Customer: price?" in ctx
    assert "Assistant: It costs $32." in ctx
    # No trailing open marker
    assert not ctx.endswith("Assistant: ") or ctx.count("Assistant:") == 1


def test_rejects_unknown_role():
    with pytest.raises(ValueError, match="unsupported role"):
        build_chat_context(
            [ContextMessage(role="tool", content="pizza")],
            include_assistant_marker=True,
        )


def test_rejects_empty_messages_list():
    with pytest.raises(ValueError):
        build_chat_context([], include_assistant_marker=True)


def test_rejects_empty_content():
    with pytest.raises(ValueError, match="content cannot be empty"):
        build_chat_context(
            [ContextMessage(role="user", content="   ")],
            include_assistant_marker=True,
        )


# ── trim_context_to_length ────────────────────────────────────────────────────

def test_trim_keeps_latest_characters():
    assert trim_context_to_length("abcdefgh", max_characters=3) == "fgh"


def test_trim_returns_full_text_when_short_enough():
    assert trim_context_to_length("hello", max_characters=100) == "hello"


def test_trim_exact_length_unchanged():
    assert trim_context_to_length("abcde", max_characters=5) == "abcde"


def test_trim_rejects_non_positive_max():
    with pytest.raises(ValueError):
        trim_context_to_length("text", max_characters=0)
