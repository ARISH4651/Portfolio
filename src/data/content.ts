/* ------------------------------------------------------------------
 * REAL CONTENT LAYER — Arish K.
 * Every entry is derived from (a) user-supplied resume/spec or
 * (b) repositories inspected on disk. Nothing here is invented.
 * Unverified items carry verified:false and render name-only.
 * ------------------------------------------------------------------ */

export type Tier1Project = {
  index: string;
  titleA: string;
  titleB: string;
  category: string;
  role: string;
  description: string;
  support: string;
  architecture: string[];
  stack: string[];
  facts: string[];
  liveUrl?: string;
  liveLabel?: string;
  accent: string;
  /** distinct pinned transition per project */
  transition: "clip" | "slide" | "scale";
  /** cinematic project visual — served from /projects/ */
  image?: string;
};

export const projects: Tier1Project[] = [
  {
    index: "01",
    titleA: "HEALTHCARE",
    titleB: "RAG CHATBOT",
    category: "Generative AI / RAG / Cloud",
    role: "Architecture · Vectors · Deploy",
    description:
      "Engineered an enterprise Retrieval-Augmented Generation system for KG Hospital to deliver clinically grounded, hallucination-free answers from internal medical literature.",
    support:
      "Preprocesses clinical PDFs into structured chunks, generates dense vector embeddings stored in FAISS/ChromaDB, retrieves top-k passages, and synthesizes answers via Groq & Ollama with conversation audit logs in Firebase.",
    architecture: [
      "Clinical Corpus",
      "Preprocessing",
      "Semantic Chunking",
      "Dense Embeddings",
      "Vector Retrieval",
      "LLM Synthesis",
      "Grounded Response",
    ],
    stack: ["Python", "LangChain", "RAG", "FAISS", "Groq API", "Ollama", "Firebase", "AWS"],
    facts: ["KG Hospital deployment", "Strict source grounding", "Firebase query telemetry"],
    accent: "#C8F31D",
    transition: "clip",
    image: "/projects/proj_01_healthcare.jpg",
  },
  {
    index: "02",
    titleA: "PYDANTIC AI",
    titleB: "SEARCH AGENT",
    category: "AI Agents / Generative AI",
    role: "Agent Orchestration · Tool Calling",
    description:
      "Autonomous real-time search agent using Pydantic AI and Groq Llama 3.1 that plans queries, invokes Tavily search tools, and synthesizes verified web evidence.",
    support:
      "Implements type-safe agent schemas with Pydantic validation, dynamic tool dispatch, query refinement loops, and low-latency token streaming in an interactive Streamlit console.",
    architecture: ["User Query", "Agent Controller", "Tavily Search", "Evidence Parsing", "Groq Llama 3.1", "Validated Output"],
    stack: ["Python", "Pydantic AI", "Groq", "Tavily AI", "Streamlit"],
    facts: ["Llama 3.1 via Groq", "Deterministic tool loops", "Live on Streamlit"],
    liveUrl: "https://pydanticai.streamlit.app/",
    liveLabel: "Open live app",
    accent: "#8FD8FF",
    transition: "slide",
    image: "/projects/proj_02_pydantic.jpg",
  },
  {
    index: "03",
    titleA: "LANGCHAIN + GROQ",
    titleB: "CHAT ASSISTANT",
    category: "Conversational AI / Systems",
    role: "Graph State · High-Speed Inference",
    description:
      "High-throughput multi-turn conversational system built on LangChain and LangGraph state machines, powered by Groq-accelerated GPT-OSS 120B.",
    support:
      "Engineered explicit checkpointed state persistence, multi-turn memory buffers, and resilient fallback mechanisms for model context windows and rapid inference token delivery.",
    architecture: ["User Prompt", "Session State Buffer", "LangGraph Router", "Groq 120B Engine", "Contextual Response"],
    stack: ["Python", "LangChain", "LangGraph", "Groq API", "Streamlit"],
    facts: ["GPT-OSS 120B via Groq", "Session state machine", "Live on Streamlit"],
    liveUrl: "https://groqgent.streamlit.app/",
    liveLabel: "Open live app",
    accent: "#FFB86B",
    transition: "scale",
    image: "/projects/proj_03_langchain.jpg",
  },
  {
    index: "06",
    titleA: "DESKTOP ASSISTANT",
    titleB: "“ASTRA”",
    category: "Local AI / Desktop Engineering",
    role: "Local-First Architecture · Voice & Automation",
    description:
      "Local-first desktop intelligence system built with PySide6, featuring offline-capable intent parsing, system automation, and rapid desktop file indexing.",
    support:
      "Clean separation across core engine, UI presentation, and configuration layers. Integrates voice triggers, localized SQLite metadata search, and headless process automation.",
    architecture: ["Voice / Keyboard Input", "Intent Parser", "Core Automation Engine", "SQLite Indexer", "OS Execution Layer"],
    stack: ["Python", "PySide6", "Qt", "SQLite", "Local Automation"],
    facts: ["Local-first privacy", "Modular 3-layer architecture", "Zero cloud dependence"],
    accent: "#F472B6",
    transition: "scale",
    image: "/projects/proj_04_astra.jpg",
  },
];

/* ---------------- Tier 2 — verified on disk, one derived line each ----- */

export type Tier2Project = {
  index: string;
  name: string;
  category: string;
  line: string;
  stack: string[];
};

export const tier2: Tier2Project[] = [
  {
    index: "07",
    name: "AutoML Model Training Pipeline",
    category: "Machine Learning / Automation",
    line: "End-to-end automated ML pipeline with data cleaning, feature preprocessing, hyperparameter tuning, model comparison, and serialization.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Joblib"],
  },
  {
    index: "08",
    name: "Calories-Burnt Prediction",
    category: "Machine Learning / Regression",
    line: "Appin Technology internship build: regression models trained on physiological and physical activity telemetry with XGBoost and Scikit-learn.",
    stack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Seaborn"],
  },
  {
    index: "09",
    name: "FastAPI Full-Stack Blog",
    category: "Backend / Full-Stack",
    line: "Production-structured blog platform on FastAPI + SQLAlchemy with Jinja2 templates, user authentication, static/media serving, and SQLite storage.",
    stack: ["FastAPI", "SQLAlchemy", "Jinja2", "SQLite"],
  },
  {
    index: "10",
    name: "Modular RAG Application",
    category: "Generative AI / Vector Search",
    line: "Modular RAG pipeline — ingestion, embeddings, Chroma vector store, retrieval, Groq LLM, Redis — with CLI, notebooks, and unit tests.",
    stack: ["LangChain", "FAISS", "ChromaDB", "Groq", "Redis"],
  },
  {
    index: "11",
    name: "GenAR Report Generator",
    category: "Generative AI / Data Analysis",
    line: "Evidence-grounded report prototype: deterministic Python analysis over safety datasets, Gemini narrative from selected evidence, human review gate.",
    stack: ["Python", "Gemini", "Pandas"],
  },
  {
    index: "12",
    name: "Diabetes & Heart Disease Prediction",
    category: "Machine Learning / Clinical Classification",
    line: "Supervised classification pipelines evaluating cross-validation accuracy, confusion matrices, and ROC-AUC curves on clinical diagnostic data.",
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
  },
  {
    index: "13",
    name: "Car Price Prediction",
    category: "Machine Learning / Regression",
    line: "Multivariate regression model predicting resale valuation based on vehicular mileage, age, brand equity, and mechanical condition.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
  },
];

/* ---------------- Tier 3 — BI dashboards (files verified on disk) ------ */

export const dashboards = [
  {
    index: "14",
    name: "Big Mart Sales Analytics",
    category: "Data visualization / BI",
    line: "Sales performance, product-category and outlet analysis, customer purchasing trends — KPI cards, charts, slicers, DAX measures.",
    stack: ["Power BI", "Excel", "Power Query", "DAX"],
  },
  {
    index: "15",
    name: "College Admissions & Fees",
    category: "Data visualization / BI",
    line: "Admissions and department-wise enrollment plus fee-collection analysis — Power Query shaping, DAX calculations, interactive reporting.",
    stack: ["Power BI", "Excel", "Power Query", "DAX"],
  },
];

/* ---------------- Tier 4 — ML (Appin internship scope) ------------------ */

export const mlProject = {
  index: "16",
  name: "Calories-Burnt Prediction",
  category: "Machine learning",
  line: "Regression over physiological and activity data — preprocessing, feature engineering, EDA, training — models compared on R² and error metrics, insights via feature-importance plots.",
  stack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  pipeline: ["Data", "Preprocessing", "Feature engineering", "Regression", "Model evaluation", "Insights"],
};

export const experience = {
  company: "Appin Technology",
  role: "Data Science Intern",
  period: "June 2025 – July 2025 · Remote",
  bullets: [
    "Engineered a calories-burnt prediction system with regression models on physiological and activity data.",
    "Built the end-to-end pipeline: preprocessing, feature engineering, EDA, and training with XGBoost and Scikit-learn.",
    "Evaluated models on R² and error metrics; visualized feature importance with Matplotlib and Seaborn.",
  ],
};

export const education = {
  school: "KGiSL Institute of Technology",
  degree: "B.Tech, Artificial Intelligence and Data Science",
  period: "2023 – 2027",
  detail: "CGPA 8.3",
};

/* ---------------- Lab archive ------------------------------------------ */

export type LabFilter =
  | "ALL"
  | "PYTHON"
  | "MACHINE LEARNING"
  | "DATA"
  | "AI"
  | "BACKEND"
  | "COMPUTER VISION"
  | "GENAI";

export const labFilters: LabFilter[] = [
  "ALL",
  "PYTHON",
  "MACHINE LEARNING",
  "DATA",
  "AI",
  "BACKEND",
  "COMPUTER VISION",
  "GENAI",
];

export type LabItem = {
  n: string;
  name: string;
  cats: Exclude<LabFilter, "ALL">[];
  /** verified facts only; null => name-only row, no claims */
  preview: string[] | null;
  anchor?: string;
};

export const labItems: LabItem[] = [
  {
    n: "01",
    name: "DEEPSEEK-CHATBOT",
    cats: ["AI", "PYTHON"],
    preview: ["Python chatbot project", "DeepSeek"],
    anchor: "#learning-archive",
  },

  {
    n: "02",
    name: "JARVIS-2.0",
    cats: ["AI", "PYTHON"],
    preview: ["Python AI assistant", "JARVIS project"],
    anchor: "#learning-archive",
  },

  {
    n: "03",
    name: "Heart_data-prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Logistic Regression", "Heart disease prediction"],
    anchor: "#learning-archive",
  },

  {
    n: "04",
    name: "Gold-price-prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Machine learning prediction", "Jupyter Notebook"],
    anchor: "#learning-archive",
  },

  {
    n: "05",
    name: "CarSellingPrice_Prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Regression model", "Car resale price prediction"],
    anchor: "#learning-archive",
  },

  {
    n: "06",
    name: "College-Admissions-Fees-Dashboard",
    cats: ["DATA"],
    preview: ["Power BI · DAX", "Admissions & fees analytics"],
    anchor: "#learning-archive",
  },

  {
    n: "07",
    name: "Wine_prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Machine learning prediction", "Jupyter Notebook"],
    anchor: "#learning-archive",
  },

  {
    n: "08",
    name: "House Price Prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Regression model", "Property price prediction"],
    anchor: "#learning-archive",
  },

  {
    n: "09",
    name: "Mine-Vs-Rock-Prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Logistic Regression", "Sonar signal classification"],
    anchor: "#learning-archive",
  },

  {
    n: "10",
    name: "Diabetes-Prediction",
    cats: ["MACHINE LEARNING", "PYTHON"],
    preview: ["Classification model", "Pima Indians Diabetes dataset"],
    anchor: "#learning-archive",
  },

  {
    n: "11",
    name: "Netflix-Data-Analysis",
    cats: ["DATA", "PYTHON"],
    preview: ["Pandas · NumPy · Matplotlib · Seaborn", "Exploratory data analysis"],
    anchor: "#learning-archive",
  },

  {
    n: "12",
    name: "titanic-data-analysis",
    cats: ["DATA", "PYTHON"],
    preview: ["Exploratory data analysis", "Jupyter Notebook"],
    anchor: "#learning-archive",
  },

  {
    n: "13",
    name: "FullStack-Web-App-using-FastAPI",
    cats: ["BACKEND", "PYTHON"],
    preview: ["FastAPI web application", "Full-stack development"],
    anchor: "#learning-archive",
  },

  {
    n: "14",
    name: "SwiftDesk",
    cats: ["PYTHON"],
    preview: ["Python application", "Desktop / utility project"],
    anchor: "#learning-archive",
  },
];

/* ---------------- Proof: coding + certs -------------------------------- */

export const codingStats = [
  { value: 320, suffix: "+", label: "LEETCODE PROBLEMS", sub: "Contest rating 1440" },
  { value: 1000, suffix: "+", label: "CODECHEF PROBLEMS", sub: "Contest rating 1160" },
];

export const certifications = [
  { name: "Azure Fundamentals (AZ-900)", org: "Microsoft Certified" },
  { name: "Python for Everybody", org: "Specialization" },
];

/* ---------------- Stack (working toolkit, grouped) ---------------------- */

export const stackGroups = [
  {
    label: "AI / GENAI",
    items: [
      "RAG",
      "LLMs",
      "AI AGENTS",
      "LANGCHAIN",
      "LANGGRAPH",
      "PYDANTIC AI",
      "FAISS",
      "OLLAMA",
      "GROQ API",
      "TAVILY AI",
    ],
  },
  {
    label: "BACKEND",
    items: ["Python", "FastAPI", "REST APIs", "SQL", "SQLAlchemy", "Redis", "WebSockets"],
  },
  {
    label: "ML / DATA",
    items: ["Scikit-learn", "XGBoost", "Pandas", "NumPy", "Power BI", "Excel", "Power Query", "DAX"],
  },
  {
    label: "TOOLS & CLOUD",
    items: ["Git", "GitHub", "Docker", "Microsoft Azure", "Firebase", "AWS", "Streamlit", "Linux"],
  },
];

/* ------------- Architecture: the systems actually built ----------------- */

export const systemChain = [
  { id: "user", label: "User", desc: "query in plain language", side: "chat input · Streamlit UI" },
  { id: "api", label: "API", desc: "FastAPI backend, session state", side: "REST · WebSocket" },
  { id: "agent", label: "AI Agent", desc: "Pydantic AI / LangGraph orchestration", side: "bounded tool loops" },
  { id: "tool", label: "Tool", desc: "Tavily web search on live queries", side: "external API call" },
  { id: "rag", label: "RAG", desc: "hospital docs → chunks → grounded context", side: "KG Hospital corpus" },
  { id: "vector", label: "Vector search", desc: "FAISS over Hugging Face embeddings", side: "top-k retrieval" },
  { id: "llm", label: "LLM", desc: "Groq-hosted models, Ollama locally", side: "generate + cite" },
  { id: "response", label: "Response", desc: "context-aware answer, stored in Firebase", side: "conversation log" },
];

export const links = {
  github: "https://github.com/ARISH4651",
  linkedin: "https://linkedin.com/in/arish-k",
  email: "arishkumar1719@gmail.com",
};
