# Slice GPT Lab

Slice GPT Lab is a didactic project for studying how a tiny GPT-like model works from dataset to API.

It trains a small character-level Transformer with PyTorch on an artificial pizzeria dataset called **The Slice Lab**. The goal is not to build a smart chatbot. The goal is to make the core mechanics visible: tokenization, batches, embeddings, attention, loss, backpropagation, checkpoints, inference, and an OpenAI-style HTTP endpoint.

Course site:

```txt
https://otechmista.github.io/mini-gpt-study/
```

The public model identifier is:

```txt
slice-gpt-lab
```

## What This Project Is For

Use this project to:

- study how text becomes token IDs
- see how next-token prediction training works
- inspect a tiny Transformer implementation
- save and reload a local `.pt` checkpoint
- generate text token by token
- expose local inference through `POST /v1/chat/completions`

This is an educational lab, not a production LLM. Output quality is intentionally limited by the tiny dataset, tiny model, character-level tokenizer, and local training setup.

## Install

Create and activate a Python environment if you want isolation, then install dependencies:

```bash
pip install -r requirements.txt
```

Or use Make:

```bash
make setup
```

## Play With It

Train the model:

```bash
python app/train.py
```

Or:

```bash
make train
```

Ask a pizzeria question:

```bash
python app/infer.py --prompt "What pizza do you recommend?"
```

Ask something outside the pizzeria domain:

```bash
python app/infer.py --prompt "What is the capital of France?"
```

Inspect raw generated conversation text:

```bash
python app/infer.py --raw-model --prompt "What pizza do you recommend?"
```

## Use the API

Before using the API, train the model at least once so the checkpoint exists:

```bash
python app/train.py
```

Start the local API:

```bash
uvicorn app.api:app --reload
```

Or:

```bash
make api
```

By default, FastAPI runs at:

```txt
http://127.0.0.1:8000
```

Check if the API is alive:

```bash
curl http://127.0.0.1:8000/health
```

Chat completion endpoint:

```txt
POST http://127.0.0.1:8000/v1/chat/completions
```

Example with `curl`:

```bash
curl -X POST http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "slice-gpt-lab",
    "messages": [
      {
        "role": "user",
        "content": "What pizza do you recommend?"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 80
  }'
```

Example with PowerShell:

```powershell
$body = @{
  model = "slice-gpt-lab"
  messages = @(
    @{
      role = "user"
      content = "What pizza do you recommend?"
    }
  )
  temperature = 0.7
  max_tokens = 80
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Uri "http://127.0.0.1:8000/v1/chat/completions" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

The response follows an OpenAI-style chat completion shape with `choices[0].message.content`.

For the API lesson, read [docs/12_openai_api_layer.md](docs/12_openai_api_layer.md).

## Study Path

Start here:

1. [docs/PROJECT_IDENTITY.md](docs/PROJECT_IDENTITY.md): project identity and learning promise.
2. [docs/00_course_guide.md](docs/00_course_guide.md): course route and commands.
3. [docs/01_introduction.md](docs/01_introduction.md): what the project teaches.
4. [docs/02_how_llms_work.md](docs/02_how_llms_work.md): full GPT-like flow.
5. [docs/15_simple_context_model.md](docs/15_simple_context_model.md): chat messages, context, tokens, and context window.
6. [docs/03_tokenization.md](docs/03_tokenization.md): text to token IDs.
7. Continue through the lessons in [docs/README.md](docs/README.md).

Each lesson links to the previous and next topic in a `Course Thread` section.

## Documentation Navigation

Main documentation:

| Document | Use it for |
|---|---|
| [docs/README.md](docs/README.md) | Full documentation index |
| [docs/PROJECT_IDENTITY.md](docs/PROJECT_IDENTITY.md) | Project name, purpose, and learning promise |
| [docs/00_course_guide.md](docs/00_course_guide.md) | Recommended study order and commands |
| [docs/14_file_by_file_lessons.md](docs/14_file_by_file_lessons.md) | Source-code walkthrough by file |
| [docs/diagrams/README.md](docs/diagrams/README.md) | Visual diagrams for training, inference, attention, context, and checkpoints |

Concept lessons:

| Lesson | Topic |
|---|---|
| [docs/01_introduction.md](docs/01_introduction.md) | Project overview and pizzeria domain |
| [docs/02_how_llms_work.md](docs/02_how_llms_work.md) | Full GPT-like flow |
| [docs/15_simple_context_model.md](docs/15_simple_context_model.md) | Chat messages, context, tokens, and context window |
| [docs/03_tokenization.md](docs/03_tokenization.md) | Text to token IDs |
| [docs/04_embeddings.md](docs/04_embeddings.md) | Token IDs to vectors |
| [docs/05_self_attention.md](docs/05_self_attention.md) | Causal self-attention |
| [docs/06_transformer_blocks.md](docs/06_transformer_blocks.md) | Transformer block structure |
| [docs/07_forward_pass.md](docs/07_forward_pass.md) | Model input to logits |
| [docs/08_loss_and_backpropagation.md](docs/08_loss_and_backpropagation.md) | Loss, gradients, and learning |
| [docs/09_training_loop.md](docs/09_training_loop.md) | Training orchestration |
| [docs/11_checkpoint_and_weights.md](docs/11_checkpoint_and_weights.md) | Saving and loading model state |
| [docs/10_inference.md](docs/10_inference.md) | Autoregressive generation |
| [docs/12_openai_api_layer.md](docs/12_openai_api_layer.md) | OpenAI-style local API |
| [docs/13_limitations_of_the_model.md](docs/13_limitations_of_the_model.md) | Limits of this mini model |

Architecture and contracts:

| View | Use it for |
|---|---|
| [docs/contexts/01_CONTEXT_VIEW.md](docs/contexts/01_CONTEXT_VIEW.md) | Problem, goals, boundaries, and business rules |
| [docs/contexts/02_CONTAINER_VIEW.md](docs/contexts/02_CONTAINER_VIEW.md) | Runtime containers and data flow |
| [docs/contexts/03_COMPONENT_VIEW.md](docs/contexts/03_COMPONENT_VIEW.md) | Internal components and responsibilities |
| [docs/contexts/04_CODE_VIEW.md](docs/contexts/04_CODE_VIEW.md) | Implementation contracts, commands, and code rules |

## Repository Structure

```txt
app/                 application code, scripts, and tests
app/dataset.txt      artificial English pizzeria dataset
docs/                course-style documentation
docs/contexts/       architecture and code contract views
docs/diagrams/       Mermaid diagrams for study
requirements.txt     Python dependencies
Makefile             shortcut commands
```

## Quality Checks

Run tests:

```bash
python -m pytest
```

Run lint and format checks:

```bash
python -m ruff check .
python -m black --check app
```

Or:

```bash
make test
make check
```

## Important Note

If you change `app/dataset.txt`, retrain the model. The checkpoint stores model weights and vocabulary metadata, so inference should use a checkpoint created from the dataset/tokenizer version you are studying.
