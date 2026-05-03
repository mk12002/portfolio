export const heroData = {
  title: "TARA: Agentic Email Security",
  subtitle: "A production-grade cybersecurity platform neutralizing advanced, polymorphic email threats via a highly distributed multi-agent AI architecture.",
  stats: [
    { label: "AI Agents", value: "7" },
    { label: "Memory Constraint", value: "30GB" },
    { label: "Explainability", value: "XAI / LLM" },
    { label: "Orchestration", value: "LangGraph" }
  ],
  interviewSummary: "I designed an Agentic Email Security System to neutralize zero-day phishing, credential harvesting, and malware without human intervention. Instead of a monolithic engine, it uses 7 specialized AI agents orchestrated by LangGraph, functioning flawlessly within strict 30GB enterprise RAM limits using asynchronous event-driven queues (RabbitMQ)."
};

export const architectureData = {
  description: "The platform operates across three tightly coupled layers: Analysis, Orchestration, and Action.",
  tiers: [
    {
      title: "1. Analysis Layer (Distributed AI Agents)",
      details: [
        "7 agents run as standalone Python worker processes.",
        "They consume NewEmailEvent messages from a RabbitMQ Fanout exchange.",
        "Built with PyTorch, XGBoost, LightGBM, and HuggingFace Transformers, models are pre-warmed and cached to eliminate cold-start penalties."
      ]
    },
    {
      title: "2. Orchestrator Layer (State Machine)",
      details: [
        "Implemented via LangGraph, this layer acts as the system's brain.",
        "Awaits all agent responses, computes normalized risk scores, applies heuristic correlation logic, and invokes an LLM to generate narrative explanations.",
        "Implements advanced Explainable AI (XAI) features, including a Counterfactual Engine."
      ]
    },
    {
      title: "3. Action Layer (Remediation & Response)",
      details: [
        "Depending on the verdict, triggers the ResponseEngine.",
        "Authenticates with Azure Active Directory (MSAL) to manipulate Microsoft 365 mailboxes directly via the Microsoft Graph API."
      ]
    }
  ],
  diagramCode: `graph TD
    %% Define Styles
    classDef external fill:#1e1e2f,stroke:#ef4444,stroke-width:2px,color:#f87171;
    classDef broker fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fbbf24;
    classDef agent fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#60a5fa;
    classDef orchestrator fill:#1e1e2f,stroke:#10b981,stroke-width:2px,color:#34d399;
    classDef action fill:#2e1065,stroke:#a855f7,stroke-width:2px,color:#c084fc;
    classDef storage fill:#1e1e2f,stroke:#6366f1,stroke-width:2px,color:#818cf8;

    Ingest[Microsoft Graph API / IMAP]:::external -->|Raw Email/JSON| Parser[FastAPI Ingestion Endpoint]:::broker
    Parser -->|Parse, Extract, Hash| Redis[Redis Deduplication]:::storage
    Redis -->|Cache Miss: Publish| Fanout((RabbitMQ Fanout Exchange)):::broker
    
    Fanout --> HA[Header Agent]:::agent
    Fanout --> CA[Content Agent]:::agent
    Fanout --> UA[URL Agent]:::agent
    Fanout --> AA[Attachment Agent]:::agent
    Fanout --> SA[Sandbox Agent]:::agent
    Fanout --> TIA[Threat Intel Agent]:::agent
    Fanout --> UBA[User Behavior Agent]:::agent

    HA & CA & UA & AA & SA & TIA & UBA -->|Publish Result| ResultsQ[(Results Queue)]:::broker
    ResultsQ --> Orch[LangGraph Orchestrator]:::orchestrator
    
    Orch -->|Save Audit Log| DB[(PostgreSQL SOC DB)]:::storage
    Orch -->|Real-time UI Update| WS((FastAPI WebSockets)):::action
    Orch -->|Verdict & Actions| ActionEng[Response Engine]:::action
    
    ActionEng -->|MSAL Token Auth| M365[M365 Tenant]:::external
    ActionEng -->|Garuda Trigger| HuntQ[(Garuda Hunt Queue)]:::broker`
};

export const metricsData = {
  description: "The system was rigorously evaluated across all discrete agent modules, demonstrating exceptional predictive capabilities when analyzing real-world and synthetic enterprise datasets.",
  metrics: [
    { domain: "Headers", size: "10,000 rows", model: "LightGBM Classifier", acc: "95.90%", prec: "95.74%", f1: "89.15%", roc: "0.9770" },
    { domain: "Content / NLP", size: "31,142 rows", model: "TinyBERT (14M Params)", acc: "98.09%", prec: "98.11%", f1: "98.19%", roc: "-" },
    { domain: "URL Validation", size: "596,576 rows", model: "XGBoost Ensemble", acc: "95.55%", prec: "95.05%", f1: "95.58%", roc: "0.9924" },
    { domain: "Dynamic Sandbox", size: "83,821 rows", model: "Isolation Forest / Heuristics", acc: "98.37%", prec: "99.47%", f1: "99.17%", roc: "0.9847" },
    { domain: "User Behavior", size: "50,000 rows", model: "XGBoost", acc: "98.59%", prec: "93.21%", f1: "97.85%", roc: "0.9970" },
    { domain: "Threat Intel", size: "7,500 samples", model: "Offline SQLite WAL", acc: "-", prec: "-", f1: "-", roc: "0.9987" }
  ],
  operationalReadiness: [
    "Passed all 13 end-to-end integration protocols via RabbitMQ fanout to LangGraph decisioning.",
    "Verified benign mean risk score of 0.0012 against malicious mean risk score of 0.9974 (exceptional separability).",
    "Partial-finalization policy handles graceful degradation if an agent is unavailable."
  ]
};

export const orchestrationData = {
  description: "The Orchestrator implements an 8-node state machine designed to build context incrementally. Combinatorial correlation amplifies risk when multiple vectors align, avoiding simple averaging in favor of SOC-analyst-mimicking heuristics.",
  diagramCode: `stateDiagram-v2
    [*] --> WAIT_FOR_AGENTS
    WAIT_FOR_AGENTS --> ASSEMBLE_STATE : All Agents Responded
    WAIT_FOR_AGENTS --> ASSEMBLE_STATE : Timeout (Partial State)
    
    ASSEMBLE_STATE --> SCORE_NORMALIZATION
    SCORE_NORMALIZATION --> CORRELATE_THREATS
    CORRELATE_THREATS --> DECISIONING
    
    DECISIONING --> EXPLAINABILITY
    EXPLAINABILITY --> GARUDA_INVESTIGATION
    GARUDA_INVESTIGATION --> EXECUTION
    EXECUTION --> [*]`,
  weights: [
    { agent: "Sandbox Execution", weight: "0.20", logic: "If shell_spawned or remote_connect, overrides baseline." },
    { agent: "Threat Intelligence", weight: "0.20", logic: "Exact offline IOC hits force score > 0.90." },
    { agent: "Static Attachment", weight: "0.18", logic: "VBA macros + high byte-entropy triggers critical alert." },
    { agent: "URL Analysis", weight: "0.15", logic: "Conflict resolution: DGA domains bypass external allowlists." },
    { agent: "Header Analysis", weight: "0.12", logic: "Levenshtein distance on domains <= 2 adds massive penalty." },
    { agent: "Content Analysis", weight: "0.10", logic: "Urgent semantic phrasing + Credential bait." },
    { agent: "User Behavior", weight: "0.05", logic: "Zero historical interaction + High-risk TLD." }
  ],
  correlations: [
    { title: "Dual-Vector Phishing (+0.15)", desc: "URL Agent flags high risk AND Content Agent flags urgency/credential terms." },
    { title: "Infrastructure Spoofing (+0.25)", desc: "Header Agent detects SPF/DKIM/DMARC failure AND Threat Intel matches the originating IP." },
    { title: "Weaponized Execution (+0.20)", desc: "Attachment Agent flags high entropy AND Sandbox detects unexpected network calls." },
    { title: "Targeted Extortion (+0.15)", desc: "Content flags urgency + extortion keywords AND User Behavior flags zero familiarity." },
    { title: "Evasive Lure Flag", desc: "Strong transactional legitimacy (e.g. Microsoft templates) with a single malicious URL heavily boosts suspicion." }
  ],
  verdicts: [
    { range: "0.00 - 0.25", label: "BENIGN", desc: "Deliver normally", color: "text-green-400" },
    { range: "0.26 - 0.65", label: "SUSPICIOUS", desc: "Insert Warning Banner, Log to SOC", color: "text-yellow-400" },
    { range: "0.66 - 0.89", label: "MALICIOUS", desc: "Soft Quarantine, High Priority SOC Alert", color: "text-orange-400" },
    { range: "0.90 - 1.00", label: "CRITICAL", desc: "Hard Quarantine, Block Senders, Invoke Garuda", color: "text-red-500" }
  ]
};

export const xaiData = {
  counterfactual: "The Counterfactual Engine answers 'What caused this email to be blocked?'. It applies gradient-like perturbations across agent scores to identify the minimum shift required to alter the outcome (e.g. 'Lowering Sandbox Agent score by 0.31 changes CRITICAL to MALICIOUS').",
  mitre: "The MITRE ATT&CK Storyline Engine automatically constructs a kill-chain narrative mapping (e.g. T1566.001 Spearphishing Attachment).",
  garuda: "Garuda is an asynchronous, retroactive threat-hunting module. When a CRITICAL IOC is found, Garuda searches the Postgres database and M365 tenant retroactively to find related emails that arrived before the domain was known to be bad.",
  techStack: [
    "Memory-Mapped Models (XGBoost/Scikit-Learn loaded via Joblib/Pickle bundles directly into global cache)",
    "SQLite WAL database for ThreatIntelAgent allowing O(1) sub-millisecond lookups",
    "OCR Payload Offloading for analyzing hidden URLs in images/PDFs",
    "FastAPI & WebSockets for Real-Time SOC UI live-updating the LangGraph execution"
  ],
  responseEngine: {
    description: "The ResponseEngine acts as the action layer, authenticating with Azure Active Directory via MSAL to manipulate Microsoft 365 mailboxes directly through the Microsoft Graph API.",
    actions: ["move_to_junk", "hard_quarantine", "insert_banner", "block_sender"],
    modes: "Supports Simulated mode for safe testing (printing actions to the terminal and database) and Live mode for autonomous environment remediation."
  }
};

export const agentsData = [
  {
    id: "header_agent",
    name: "Header Agent",
    icon: "📫",
    color: "#3b82f6",
    purpose: "Analyzes SMTP routing data, authentication protocols (SPF/DKIM/DMARC), and sender identities to detect spoofing, look-alike domains, and unauthorized infrastructure usage.",
    metrics: { arch: "LightGBM Binary Classifier", dataset: "10,000 samples", acc: "95.90%", features: "hop_count, auth_fail_ratio, sender_reply_mismatch_flag, lookalike_distance_score (Levenshtein)" },
    inputExample: `{
  "headers": {
    "sender": "admin@rnicrosoft.com",
    "reply_to": "hacker@evil.example",
    "subject": "Urgent: verify your account",
    "received": [ "from mx.github.com by smtp.gmail.com" ],
    "authentication_results": "spf=fail; dkim=fail; dmarc=fail"
  }
}`,
    outputExample: `{
  "agent_name": "header_agent",
  "risk_score": 0.85,
  "confidence": 0.92,
  "header_verdict": "malicious",
  "indicators": [
    "spf_failed",
    "dkim_failed",
    "dmarc_failed",
    "lookalike_domain:rnicrosoft.com->microsoft.com",
    "reply_to_domain_mismatch"
  ]
}`
  },
  {
    id: "content_agent",
    name: "Content Agent",
    icon: "📝",
    color: "#10b981",
    purpose: "Parses email body (plain text and HTML) to identify linguistic patterns indicative of phishing, spear-phishing, extortion, or urgency manipulation.",
    metrics: { arch: "HuggingFace TinyBERT (14M) + TF-IDF", dataset: "31,142 samples", acc: "98.09%", features: "Semantic dictionaries for coercion, transactional legitimacy masking to reduce false positives." },
    inputExample: `{
  "headers": { "subject": "URGENT: Final Notice - Invoice Overdue" },
  "body": {
    "plain": "Dear Customer, your account is past due. If you do not click the link below to process your payment within 24 hours, your services will be terminated..."
  }
}`,
    outputExample: `{
  "agent_name": "content_agent",
  "risk_score": 0.72,
  "confidence": 0.88,
  "indicators": [
    "urgency_signals:urgent,immediately",
    "financial_signals:invoice,payment",
    "click_through_language"
  ]
}`
  },
  {
    id: "url_agent",
    name: "URL Agent",
    icon: "🔗",
    color: "#8b5cf6",
    purpose: "Evaluates all hyperlinks found in the email body for malicious intent, utilizing lexical analysis, entropy calculation, and multi-provider threat intelligence lookups.",
    metrics: { arch: "XGBoost Ensemble (500 estimators) + Platt Scaling", dataset: "596,576 samples", acc: "95.55%", features: "URL length, subdomain depth, protocol usage, credential bait tokens, Subdomain Shannon Entropy for DGA detection." },
    inputExample: `{ "url": "http://secure-login.paypa1.update-account-now.com/login" }`,
    outputExample: `{
  "agent_name": "url_agent",
  "risk_score": 0.96,
  "indicators": [
    "dga_subdomain_detected",
    "credential_bait_uri",
    "brand_spoof_target:paypal"
  ]
}`
  },
  {
    id: "attachment_agent",
    name: "Attachment Agent",
    icon: "📎",
    color: "#f59e0b",
    purpose: "Performs lightweight, static analysis on file attachments to detect malicious executables, macros, and risky extensions before they reach the sandbox.",
    metrics: { arch: "Random Forest (200 trees) + Static Heuristics", dataset: "Custom EMBER-like features", acc: "-", features: "Double extension evasion (invoice.pdf.exe), Byte entropy frequency analysis (>=7.1 Shannon entropy), Suspicious strings (VirtualAlloc, CreateRemoteThread)." },
    inputExample: `{ "filename": "invoice.pdf.exe", "size": 45020, "mime": "application/x-msdownload" }`,
    outputExample: `{
  "agent_name": "attachment_agent",
  "risk_score": 0.94,
  "indicators": [
    "double_extension_evasion",
    "high_byte_entropy_packed",
    "suspicious_pe_imports:VirtualAlloc"
  ]
}`
  },
  {
    id: "sandbox_agent",
    name: "Sandbox Agent",
    icon: "📦",
    color: "#ef4444",
    purpose: "Executes unknown or highly suspicious files in a tightly controlled, ephemeral environment to monitor for malicious runtime behaviors.",
    metrics: { arch: "Isolation Forest + Deterministic strace rules", dataset: "83,821 execution traces", acc: "98.37%", features: "Docker Detonation (cap_drop: ALL, 64MB limit), strace parsing for execve, connect, openat system calls." },
    inputExample: `{ "filename": "payload.docm", "file_blob": "<binary_data>" }`,
    outputExample: `{
  "agent_name": "sandbox_agent",
  "risk_score": 0.98,
  "confidence": 0.95,
  "analysis_mode": "docker",
  "indicators": [
    "shell_spawn_detected",
    "remote_connect_detected"
  ],
  "behavior_summary": {
    "payload.docm": {
      "exec_chain": ["powershell", "cmd.exe"],
      "remote_ips": ["185.100.87.202"],
      "shell_spawned": true
    }
  }
}`
  },
  {
    id: "threat_intel_agent",
    name: "Threat Intel Agent",
    icon: "📡",
    color: "#14b8a6",
    purpose: "Rapidly matches extracted artifacts (Domains, IPs, File Hashes) against a locally synchronized database of known Indicators of Compromise (IOCs).",
    metrics: { arch: "SQLite WAL Database / In-Memory", dataset: "7,500 test samples", roc: "0.9987", features: "Background daemon syncs OpenPhish/URLHaus. O(1) sub-millisecond lookups via IN clause to avoid API rate limits." },
    inputExample: `{ "domains": ["evil-phish.com"], "ips": ["185.100.87.202"] }`,
    outputExample: `{
  "agent_name": "threat_intel_agent",
  "risk_score": 1.0,
  "indicators": [
    "known_malicious_ip:URLHaus",
    "known_phishing_domain:OpenPhish"
  ]
}`
  },
  {
    id: "user_behavior_agent",
    name: "User Behavior Agent",
    icon: "👤",
    color: "#ec4899",
    purpose: "Provides contextual risk assessment based on the recipient's historical interactions and the organizational context of the sender.",
    metrics: { arch: "XGBoost", dataset: "50,000 records", acc: "98.59%", features: "historical_click_rate, department_context, sender_familiarity. Unfamiliar senders using High-Risk TLDs (.xyz) bump risk multipliers." },
    inputExample: `{
  "recipient": "hr@company.com",
  "sender": "github-admin@security-update.xyz",
  "subject": "GitHub PR Notification"
}`,
    outputExample: `{
  "agent_name": "user_behavior_agent",
  "risk_score": 0.65,
  "indicators": [
    "zero_historical_interaction",
    "high_risk_tld:.xyz",
    "department_context_mismatch:HR"
  ]
}`
  }
];
