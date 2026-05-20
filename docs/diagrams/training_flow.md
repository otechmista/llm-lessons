flowchart TD
    A["app/dataset.txt<br/>chat examples"] --> B["dataset.py<br/>load_dataset"]
    B --> C["tokenizer.py<br/>build vocabulary"]
    C --> D["token ids"]
    D --> E["batch.py<br/>build x and y"]
    E --> F["model.py<br/>MiniGPT forward"]
    F --> G["logits<br/>[batch, time, vocab]"]
    G --> H["loss.py<br/>cross entropy"]
    H --> I["loss.backward"]
    I --> J["AdamW optimizer step"]
    J --> K{"more steps?"}
    K -- yes --> E
    K -- no --> L["checkpoint.py<br/>save .pt"]

    classDef data fill:#e8f3ff,stroke:#2868a8,color:#10233f;
    classDef model fill:#f3edff,stroke:#7046aa,color:#24163d;
    classDef train fill:#fff4dd,stroke:#a86a00,color:#3a2500;

    class A,B,C,D data;
    class F,G model;
    class E,H,I,J,K,L train;
