flowchart TD
    A["User prompt"] --> B["context.py<br/>build_chat_context"]
    B --> C["formatted context<br/>&lt;|user|&gt; ... &lt;|assistant|&gt;"]
    C --> D["tokenizer.py<br/>encode"]
    D --> E["checkpoint.py<br/>load model + tokenizer"]
    E --> F["model.py<br/>MiniGPT"]
    F --> G["logits for last position"]
    G --> H["sampling.py<br/>choose_next_token"]
    H --> I["append token"]
    I --> J{"generated &lt;|end|&gt;<br/>or max tokens?"}
    J -- no --> F
    J -- yes --> K["tokenizer.py<br/>decode"]
    K --> L["infer.py<br/>extract_assistant_answer"]
    L --> M["Assistant answer"]

    classDef input fill:#e8f3ff,stroke:#2868a8,color:#10233f;
    classDef model fill:#f3edff,stroke:#7046aa,color:#24163d;
    classDef output fill:#e9f8eb,stroke:#2d7a3e,color:#132d18;

    class A,B,C,D input;
    class E,F,G,H,I,J model;
    class K,L,M output;
