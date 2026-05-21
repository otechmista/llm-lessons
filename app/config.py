"""Runtime settings and hyperparameters for the study model."""

from dataclasses import asdict, dataclass
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
APP_DIR = Path(__file__).resolve().parent
DEFAULT_DATASET_PATH = APP_DIR / "dataset.txt"
DEFAULT_CHECKPOINT_PATH = ROOT_DIR / "checkpoints" / "llm_lessons.pt"


@dataclass(frozen=True)
class ModelConfig:
    """Small CPU-friendly configuration.

    The values are intentionally tiny so a developer can inspect tensors and run
    training locally without needing production-scale hardware.
    """

    block_size: int = 256
    embedding_dim: int = 128
    num_heads: int = 8
    num_layers: int = 6
    dropout: float = 0.1

    def to_dict(self) -> dict[str, int | float]:
        return asdict(self)


@dataclass(frozen=True)
class TrainingConfig:
    batch_size: int = 32
    max_steps: int = 10000
    learning_rate: float = 3e-3
    log_every: int = 500
    seed: int = 1337

    def to_dict(self) -> dict[str, int | float]:
        return asdict(self)
