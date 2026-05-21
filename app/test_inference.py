import pytest
from pathlib import Path

from app.config import ModelConfig, TrainingConfig
from app.infer import (
    extract_assistant_answer,
    format_chat_prompt,
    generate_model_text,
    generate_text,
    sanitize_for_tokenizer,
)
from app.train import train_model

TEST_OUTPUT_DIR = Path(__file__).resolve().parent.parent / ".test-output"

_TINY = ModelConfig(block_size=8, embedding_dim=8, num_heads=2, num_layers=1)
_ONE_STEP = TrainingConfig(batch_size=1, max_steps=1)


def artifact_path(name: str) -> Path:
    TEST_OUTPUT_DIR.mkdir(exist_ok=True)
    return TEST_OUTPUT_DIR / name


def _train_tiny(name: str, text: str) -> Path:
    ds = artifact_path(f"{name}_ds.txt")
    cp = artifact_path(f"{name}.pt")
    ds.write_text(text, encoding="utf-8")
    train_model(dataset_path=ds, checkpoint_path=cp, model_config=_TINY, training_config=_ONE_STEP)
    return cp


# ── validation guards ─────────────────────────────────────────────────────────

def test_empty_prompt_rejected():
    with pytest.raises(ValueError, match="prompt cannot be empty"):
        generate_text("", checkpoint_path=artifact_path("missing_empty.pt"))


def test_whitespace_only_prompt_rejected():
    with pytest.raises(ValueError, match="prompt cannot be empty"):
        generate_text("   ", checkpoint_path=artifact_path("missing_ws.pt"))


def test_missing_checkpoint_raises_file_not_found():
    with pytest.raises(FileNotFoundError, match="missing checkpoint"):
        generate_model_text("pizza", checkpoint_path=artifact_path("missing.pt"), max_tokens=1)


def test_zero_max_tokens_rejected():
    cp = _train_tiny("zero_tokens", "Customer: pizza\nAssistant: pizza\n")
    with pytest.raises(ValueError, match="max_tokens must be positive"):
        generate_model_text("pizza", checkpoint_path=cp, max_tokens=0)


# ── format_chat_prompt ────────────────────────────────────────────────────────

def test_format_chat_prompt_plain_text():
    result = format_chat_prompt("What pizza do you recommend?")
    assert "Customer: What pizza do you recommend?" in result
    assert result.endswith("Assistant: ")


def test_format_chat_prompt_already_has_assistant_marker():
    # When a prompt already contains "Assistant:", the primer is prepended
    raw = "Customer: hi\nAssistant: "
    result = format_chat_prompt(raw)
    assert "Customer: hi" in result
    assert "Assistant:" in result


def test_format_chat_prompt_already_has_customer_marker():
    raw = "Customer: hello"
    result = format_chat_prompt(raw)
    assert "Customer: hello" in result
    assert result.endswith("Assistant: ")


def test_format_chat_prompt_strips_leading_whitespace():
    result = format_chat_prompt("  What pizza?  ")
    assert "Customer: What pizza?" in result


# ── extract_assistant_answer ──────────────────────────────────────────────────

def test_extract_simple_answer():
    generated = "Customer: What pizza?\nAssistant: Margherita pizza."
    assert extract_assistant_answer(generated) == "Margherita pizza."


def test_extract_returns_last_assistant_answer_in_multi_turn():
    # rfind picks the LAST Assistant: — that is the answer to return to the user
    generated = "Customer: What pizza?\nAssistant: Margherita pizza.\nCustomer: Thanks.\nAssistant: Welcome."
    assert extract_assistant_answer(generated) == "Welcome."


def test_extract_uses_last_assistant_marker_in_multi_turn():
    generated = (
        "Customer: first?\nAssistant: first answer.\n"
        "Customer: second?\nAssistant: second answer."
    )
    assert extract_assistant_answer(generated) == "second answer."


def test_extract_returns_full_text_when_no_marker():
    generated = "Some text with no marker."
    assert extract_assistant_answer(generated) == "Some text with no marker."


def test_extract_strips_whitespace():
    generated = "Customer: Q?\nAssistant:    spaces around   "
    assert extract_assistant_answer(generated) == "spaces around"


# ── sanitize_for_tokenizer ────────────────────────────────────────────────────

def test_sanitize_replaces_unknown_chars():
    result = sanitize_for_tokenizer("hi🙂", {"h", "i", " "})
    assert result == "hi "


def test_sanitize_keeps_known_chars():
    result = sanitize_for_tokenizer("abc", {"a", "b", "c"})
    assert result == "abc"


def test_sanitize_empty_string():
    assert sanitize_for_tokenizer("", {"a", "b"}) == ""


def test_sanitize_all_unknown_falls_back_to_space():
    result = sanitize_for_tokenizer("🎉🎊", {"a", " "})
    assert result == "  "


# ── generate_model_text (integration) ────────────────────────────────────────

def test_generate_model_text_returns_string_starting_with_prompt():
    cp = _train_tiny("gen_raw", "Customer: pizza\nAssistant: pizza\n")
    result = generate_model_text("Customer: pizza\nAssistant:\n", checkpoint_path=cp, max_tokens=3, temperature=0.05)
    assert isinstance(result, str)
    assert result.startswith("Customer: pizza")


def test_generate_text_returns_only_assistant_part():
    cp = _train_tiny("gen_clean", "Customer: pizza\nAssistant: pizza\n")
    result = generate_text("pizza", checkpoint_path=cp, max_tokens=3, temperature=0.05)
    assert isinstance(result, str)
    # Should not include the Customer: prefix in the returned reply
    assert not result.startswith("Customer:")


def test_generate_text_stops_before_next_customer_turn():
    """Model output containing \nCustomer: must be cut off."""
    cp = _train_tiny("gen_stop", "Customer: pizza\nAssistant: pizza\nCustomer: more\nAssistant: more\n")
    result = generate_text("pizza", checkpoint_path=cp, max_tokens=30, temperature=0.05)
    assert "Customer:" not in result
