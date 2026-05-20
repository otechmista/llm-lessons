flowchart TD
    A["hidden states<br/>[batch, time, embedding]"] --> B["query projection"]
    A --> C["key projection"]
    A --> D["value projection"]
    B --> E["attention scores<br/>Q x K^T"]
    C --> E
    E --> F["scale by sqrt(head_dim)"]
    F --> G["causal mask<br/>block future tokens"]
    G --> H["softmax"]
    H --> I["attention weights"]
    I --> J["weighted sum<br/>weights x V"]
    D --> J
    J --> K["mixed context"]
    K --> L["output projection"]

    subgraph Mask["Causal visibility"]
        M0["pos 0 sees: 0"]
        M1["pos 1 sees: 0,1"]
        M2["pos 2 sees: 0,1,2"]
        M3["pos 3 sees: 0,1,2,3"]
    end

    G -. explains .-> Mask

    classDef tensor fill:#e8f3ff,stroke:#2868a8,color:#10233f;
    classDef attention fill:#fff4dd,stroke:#a86a00,color:#3a2500;
    classDef mask fill:#ffecec,stroke:#b33a3a,color:#401111;

    class A,K,L tensor;
    class B,C,D,E,F,H,I,J attention;
    class G,M0,M1,M2,M3 mask;
