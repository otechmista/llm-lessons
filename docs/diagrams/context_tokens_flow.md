flowchart LR
    A["Chat messages"] --> B["context.py"]
    B --> C["Serialized context"]
    C --> D["tokenizer.py"]
    D --> E["Character token ids"]
    E --> F["Context window<br/>latest block_size tokens"]
    F --> G["MiniGPT"]
    G --> H["Next token"]

    C1["&lt;|user|&gt;<br/>hi<br/>&lt;|assistant|&gt;"] -. example .-> C
    E1["[12, 44, 51, ...]"] -. example .-> E

    classDef text fill:#e8f3ff,stroke:#2868a8,color:#10233f;
    classDef token fill:#fff4dd,stroke:#a86a00,color:#3a2500;
    classDef model fill:#f3edff,stroke:#7046aa,color:#24163d;

    class A,B,C,C1 text;
    class D,E,E1,F,H token;
    class G model;
