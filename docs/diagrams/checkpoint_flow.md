flowchart TD
    A["Training finished"] --> B["MiniGPT state_dict"]
    A --> C["Tokenizer vocabulary"]
    A --> D["ModelConfig"]
    B --> E["checkpoint dict"]
    C --> E
    D --> E
    E --> F["torch.save"]
    F --> G["checkpoints/slice_gpt_lab.pt"]

    G --> H["load_checkpoint"]
    H --> I["restore tokenizer"]
    H --> J["restore config"]
    H --> K["create MiniGPT"]
    K --> L["load model_state"]
    L --> M["ready for inference"]

    classDef save fill:#fff4dd,stroke:#a86a00,color:#3a2500;
    classDef artifact fill:#e8f3ff,stroke:#2868a8,color:#10233f;
    classDef load fill:#e9f8eb,stroke:#2d7a3e,color:#132d18;

    class A,B,C,D,E,F save;
    class G artifact;
    class H,I,J,K,L,M load;
