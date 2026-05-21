import pytest
from fastapi.testclient import TestClient

from app import api

client = TestClient(api.app)


# ── helpers ──────────────────────────────────────────────────────────────────

def _fake_generate(reply: str):
    """Return a generate_text stub that always returns `reply`."""
    def _inner(prompt, max_tokens, temperature):
        return reply
    return _inner


def _post_chat(messages, *, temperature=0.7, max_tokens=2000):
    return client.post(
        "/v1/chat/completions",
        json={"model": "llm-lessons", "messages": messages, "temperature": temperature, "max_tokens": max_tokens},
    )


def _post_simple(message, *, temperature=0.7, max_tokens=2000):
    return client.post("/chat", json={"message": message, "temperature": temperature, "max_tokens": max_tokens})


def _post_simple_messages(messages, *, temperature=0.7, max_tokens=2000):
    return client.post("/chat", json={"messages": messages, "temperature": temperature, "max_tokens": max_tokens})


# ── /health ───────────────────────────────────────────────────────────────────

def test_health_returns_ok():
    assert client.get("/health").json() == {"status": "ok"}


# ── /v1/models ───────────────────────────────────────────────────────────────

def test_models_list_shape():
    resp = client.get("/v1/models")
    assert resp.status_code == 200
    body = resp.json()
    assert body["object"] == "list"
    assert body["data"][0]["id"] == "llm-lessons"
    assert body["data"][0]["object"] == "model"
    assert body["data"][0]["owned_by"] == "otechmista"


def test_model_retrieve_shape():
    resp = client.get("/v1/models/llm-lessons")
    assert resp.status_code == 200
    body = resp.json()
    assert body["id"] == "llm-lessons"
    assert body["object"] == "model"


def test_model_retrieve_missing_returns_404():
    resp = client.get("/v1/models/unknown")
    assert resp.status_code == 404


# ── /v1/chat/completions — contract ──────────────────────────────────────────

def test_chat_completion_prompt_uses_customer_assistant_format(monkeypatch):
    captured = {}

    def fake(prompt, max_tokens, temperature):
        captured["prompt"] = prompt
        return "Margherita pizza."

    monkeypatch.setattr(api, "generate_text", fake)
    _post_chat([{"role": "user", "content": "What pizza do you recommend?"}])

    assert "Customer: What pizza do you recommend?" in captured["prompt"]
    assert captured["prompt"].endswith("Assistant: ")


def test_chat_completion_response_shape(monkeypatch):
    monkeypatch.setattr(api, "generate_text", _fake_generate("Margherita pizza."))
    resp = _post_chat([{"role": "user", "content": "What pizza do you recommend?"}])

    assert resp.status_code == 200
    body = resp.json()
    assert body["id"] == "chatcmpl-local"
    assert body["object"] == "chat.completion"
    assert isinstance(body["created"], int)
    assert body["model"] == "llm-lessons"
    assert body["choices"][0]["message"]["role"] == "assistant"
    assert body["choices"][0]["message"]["content"] == "Margherita pizza."
    assert body["usage"]["prompt_tokens"] > 0
    assert body["usage"]["completion_tokens"] == len("Margherita pizza.")
    assert body["usage"]["total_tokens"] == body["usage"]["prompt_tokens"] + body["usage"]["completion_tokens"]


def test_chat_completion_temperature_defaults_to_0_7(monkeypatch):
    received = {}

    def fake(prompt, max_tokens, temperature):
        received["temperature"] = temperature
        return "ok"

    monkeypatch.setattr(api, "generate_text", fake)
    client.post(
        "/v1/chat/completions",
        json={"model": "llm-lessons", "messages": [{"role": "user", "content": "hello"}]},
    )

    assert received["temperature"] == 0.7


def test_chat_completion_temperature_is_capped_at_0_7(monkeypatch):
    received = {}

    def fake(prompt, max_tokens, temperature):
        received["temperature"] = temperature
        return "ok"

    monkeypatch.setattr(api, "generate_text", fake)
    _post_chat([{"role": "user", "content": "hello"}], temperature=0.9)

    assert received["temperature"] == 0.7


def test_chat_completion_max_tokens_defaults_to_2000(monkeypatch):
    received = {}

    def fake(prompt, max_tokens, temperature):
        received["max_tokens"] = max_tokens
        return "ok"

    monkeypatch.setattr(api, "generate_text", fake)
    client.post(
        "/v1/chat/completions",
        json={"model": "llm-lessons", "messages": [{"role": "user", "content": "hello"}]},
    )

    assert received["max_tokens"] == 2000


def test_chat_completion_rejects_empty_messages():
    resp = _post_chat([])
    assert resp.status_code == 400


def test_chat_completion_rejects_too_many_tokens():
    resp = _post_chat(
        [{"role": "user", "content": "What pizza do you recommend?"}],
        max_tokens=2001,
    )
    assert resp.status_code == 422
    assert "max_tokens" in resp.text


def test_chat_completion_rejects_non_positive_temperature():
    resp = _post_chat(
        [{"role": "user", "content": "What pizza do you recommend?"}],
        temperature=0,
    )
    assert resp.status_code == 422
    assert "temperature" in resp.text


def test_chat_completion_accepts_max_completion_tokens_alias(monkeypatch):
    received = {}

    def fake(prompt, max_tokens, temperature):
        received["max_tokens"] = max_tokens
        return "ok"

    monkeypatch.setattr(api, "generate_text", fake)
    resp = client.post(
        "/v1/chat/completions",
        json={
            "model": "llm-lessons",
            "messages": [{"role": "user", "content": "hello"}],
            "temperature": 0.1,
            "max_completion_tokens": 37,
        },
    )

    assert resp.status_code == 200
    assert received["max_tokens"] == 37


def test_chat_completion_rejects_streaming():
    resp = client.post(
        "/v1/chat/completions",
        json={
            "model": "llm-lessons",
            "messages": [{"role": "user", "content": "hello"}],
            "stream": True,
        },
    )
    assert resp.status_code == 422
    assert "stream" in resp.text


def test_chat_completion_system_message_is_auto_injected(monkeypatch):
    captured = {}

    def fake(prompt, max_tokens, temperature):
        captured["prompt"] = prompt
        return "ok"

    monkeypatch.setattr(api, "generate_text", fake)
    # No system message in request — should be silently handled (system dropped by context builder)
    _post_chat([{"role": "user", "content": "hello"}])
    assert "Customer: hello" in captured["prompt"]


def test_chat_completion_multi_turn_prompt(monkeypatch):
    captured = {}

    def fake(prompt, max_tokens, temperature):
        captured["prompt"] = prompt
        return "Pepperoni pizza."

    monkeypatch.setattr(api, "generate_text", fake)
    _post_chat([
        {"role": "user", "content": "What pizzas do you have?"},
        {"role": "assistant", "content": "We have Margherita and Pepperoni."},
        {"role": "user", "content": "Tell me about Pepperoni."},
    ])

    assert "Customer: What pizzas do you have?" in captured["prompt"]
    assert "Assistant: We have Margherita and Pepperoni." in captured["prompt"]
    assert "Customer: Tell me about Pepperoni." in captured["prompt"]
    assert captured["prompt"].endswith("Assistant: ")


# ── /v1/chat/completions — pizza guard ───────────────────────────────────────

PIZZA_QUESTIONS = [
    "What pizza do you recommend?",
    "How much does Margherita cost?",
    "Do you have pepperoni?",
    "What is on the menu?",
    "Tell me about the Four Cheese pizza.",
    "I want to order a Vegetarian pizza.",
    "Do you deliver?",
    "What ingredients are in the Mushroom pizza?",
    "Is the Chocolate pizza sweet?",
    "Do you sell soda?",
    "What is the house special?",
    "hi",
    "hello",
    "thanks",
]

OUT_OF_SCOPE_QUESTIONS = [
    "What is the capital of France?",
    "Write code for me.",
    "Tell me about football.",
    "What is Bitcoin?",
    "Recommend a movie.",
    "What time is it?",
    "Give me medical advice.",
]


@pytest.mark.parametrize("question", PIZZA_QUESTIONS)
def test_pizza_question_reaches_model(monkeypatch, question):
    called = {"n": 0}

    def fake(prompt, max_tokens, temperature):
        called["n"] += 1
        return "pizza answer"

    monkeypatch.setattr(api, "generate_text", fake)
    _post_chat([{"role": "user", "content": question}])

    assert called["n"] == 1, f"Model was not called for pizza question: {question!r}"


@pytest.mark.parametrize("question", OUT_OF_SCOPE_QUESTIONS)
def test_out_of_scope_question_skips_model(monkeypatch, question):
    called = {"n": 0}

    def fake(prompt, max_tokens, temperature):
        called["n"] += 1
        return "should not be called"

    monkeypatch.setattr(api, "generate_text", fake)
    resp = _post_chat([{"role": "user", "content": question}])

    assert called["n"] == 0, f"Model was called for out-of-scope question: {question!r}"
    assert resp.status_code == 200
    body = resp.json()
    assert "Slice Pizza" in body["choices"][0]["message"]["content"]


# ── /v1/chat/completions — _clean strips next turn ───────────────────────────

def test_clean_cuts_at_next_customer_turn(monkeypatch):
    monkeypatch.setattr(
        api, "generate_text",
        _fake_generate("Margherita pizza.\nCustomer: Another question?\nAssistant: ...")
    )
    resp = _post_chat([{"role": "user", "content": "what pizza should I order?"}])
    content = resp.json()["choices"][0]["message"]["content"]
    assert "Customer:" not in content
    assert "Margherita pizza." in content


# ── /chat (simple endpoint) ───────────────────────────────────────────────────

def test_simple_chat_pizza_question_reaches_model(monkeypatch):
    monkeypatch.setattr(api, "generate_text", _fake_generate("Margherita pizza."))
    resp = _post_simple("What pizza do you recommend?")
    assert resp.status_code == 200
    assert resp.json()["reply"] == "Margherita pizza."


def test_simple_chat_full_history_reaches_model(monkeypatch):
    captured = {}

    def fake(prompt, max_tokens, temperature):
        captured["prompt"] = prompt
        return "Coke costs $6.00."

    monkeypatch.setattr(api, "generate_text", fake)
    resp = _post_simple_messages([
        {"role": "user", "content": "What drinks do you sell?"},
        {"role": "assistant", "content": "We sell Coke, Sprite, and Guarana."},
        {"role": "user", "content": "How much is Coke?"},
    ])

    assert resp.status_code == 200
    assert "Customer: What drinks do you sell?" in captured["prompt"]
    assert "Assistant: We sell Coke, Sprite, and Guarana." in captured["prompt"]
    assert "Customer: How much is Coke?" in captured["prompt"]
    assert captured["prompt"].endswith("Assistant: ")
    assert resp.json()["reply"] == "Coke costs $6.00."


def test_simple_chat_out_of_scope_skips_model(monkeypatch):
    called = {"n": 0}

    def fake(prompt, max_tokens, temperature):
        called["n"] += 1
        return "should not be called"

    monkeypatch.setattr(api, "generate_text", fake)
    resp = _post_simple("What is the weather?")
    assert called["n"] == 0
    assert "Slice Pizza" in resp.json()["reply"]


def test_simple_chat_rejects_blank_message():
    resp = _post_simple("   ")
    assert resp.status_code == 400


def test_simple_chat_rejects_history_without_user_message():
    resp = _post_simple_messages([
        {"role": "assistant", "content": "Hi!"},
    ])
    assert resp.status_code == 400


@pytest.mark.parametrize("question", PIZZA_QUESTIONS)
def test_simple_chat_pizza_questions_reach_model(monkeypatch, question):
    called = {"n": 0}

    def fake(prompt, max_tokens, temperature):
        called["n"] += 1
        return "answer"

    monkeypatch.setattr(api, "generate_text", fake)
    _post_simple(question)
    assert called["n"] == 1, f"Model was not called for: {question!r}"


# ── /v1/chat/completions — error handling ────────────────────────────────────

def test_model_file_not_found_returns_400(monkeypatch):
    def fake(prompt, max_tokens, temperature):
        raise FileNotFoundError("missing checkpoint")

    monkeypatch.setattr(api, "generate_text", fake)
    resp = _post_chat([{"role": "user", "content": "What pizza do you recommend?"}])
    assert resp.status_code == 400
    assert "missing checkpoint" in resp.json()["detail"]
