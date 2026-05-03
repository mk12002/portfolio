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

export const motivationData = {
  description: "Traditional monolithic Security Email Gateways (SEGs) evaluate email features sequentially using rigid, rule-based heuristics and static signatures. As threat actors pivot to sophisticated zero-day payloads, evasive URL patterns, and highly targeted social engineering, these legacy systems struggle. Modern phishing campaigns are composite attacks. A single suspicious signal is often insufficient, but when combined with other subtle vectors, the aggregate behavior is highly malicious. Legacy systems often produce 'black-box' decisions that lack context, driving up false positives and overwhelming SOC analysts.",
  objectives: [
    "Dramatically Reduce Triage Time: Cut manual analyst investigation time from ~30 minutes per email down to seconds by providing mathematically explainable verdicts.",
    "Defeat Blended Attacks: Catch sophisticated campaigns where no single indicator is overtly malicious, but the combination of vectors is deadly.",
    "Automate Remediation: Map continuous risk scoring directly to a 5-tier graduated response playbook."
  ],
  stakeholders: [
    { title: "Tier 1 & Tier 2 SOC Analysts", desc: "Benefit from LLM-generated threat storylines and Counterfactual Engine. Instead of guessing why an email was blocked, they receive a mathematically proven narrative." },
    { title: "Incident Response (IR) Teams", desc: "Benefit from the Garuda Threat Hunting System, which automatically initiates retrospective endpoint hunts when a new Zero-Day threat is identified." },
    { title: "IT Security Engineering", desc: "Benefit from the stateless, Dockerized microservice architecture. By offloading OCR processing and utilizing local SQLite WAL caching, the system stays within strict 30GB compute limits." },
    { title: "Enterprise End-Users", desc: "Suspicious emails are delivered with clear educational warnings instead of being silently dropped, maintaining business continuity." }
  ],
  superiority: [
    { feature: "Combinatorial Risk Correlation", desc: "Unlike rigid rule sets, our system mathematically boosts threat scores when disparate agents agree. For example, URL Agent (DGA domain) + Content Agent (credential bait) = Dual-Vector Phishing penalty." },
    { feature: "Explainable AI (XAI)", desc: "Traditional systems output 'Blocked due to policy'. Our LangGraph orchestrator computes the minimal boundary perturbation required to change a verdict, providing total mathematical transparency." },
    { feature: "Partial-Decision Resilience", desc: "If a legacy Threat Intel API goes down, gateways stall. Our system uses timeout-aware partial-finalization, gracefully degrading to offline XGBoost inference without breaking SLAs." }
  ]
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
    classDef ext fill:#1f2937,stroke:#9ca3af,color:#fff
    classDef core fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef bus fill:#0f766e,stroke:#2dd4bf,color:#fff
    classDef agent fill:#111827,stroke:#3b82f6,color:#fff
    classDef orch fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef data fill:#14532d,stroke:#34d399,color:#fff
    classDef action fill:#4c1d95,stroke:#c084fc,color:#fff

    subgraph Ingress[Ingress API and Parsing]
        API[FastAPI /analyze-email]:::core --> Auth[JWT or API Key Validation]:::core
        Auth --> Rate[Rate Limit and Tenant Quota]:::core
        Rate --> Parse[Email Parser MIME plus Header plus Body]:::core
        Parse --> Norm[Canonical Event Builder with Correlation ID]:::core
        Norm --> OCR[OCR Extractor for image attachments]:::core
        OCR --> IOC[IOC Extraction URLs IPs Domains Hashes]:::core
        IOC --> Envelope[Envelope Serializer JSON schema validated]:::core
    end

    subgraph Messaging[Asynchronous Messaging Fabric]
        Envelope --> EX[RabbitMQ Exchange email.analysis.v1]:::bus
        EX --> QH[Queue header.agent]:::bus
        EX --> QC[Queue content.agent]:::bus
        EX --> QU[Queue url.agent]:::bus
        EX --> QA[Queue attachment.agent]:::bus
        EX --> QS[Queue sandbox.agent]:::bus
        EX --> QT[Queue threatintel.agent]:::bus
        EX --> QB[Queue userbehavior.agent]:::bus
    end

    subgraph Agents[Parallel Agent Execution]
        QH --> HA[Header Agent Worker]:::agent
        QC --> CA[Content Agent Worker]:::agent
        QU --> UA[URL Agent Worker]:::agent
        QA --> AA[Attachment Agent Worker]:::agent
        QS --> SA[Sandbox Agent Worker]:::agent
        QT --> TA[Threat Intel Agent Worker]:::agent
        QB --> BA[User Behavior Agent Worker]:::agent

        HA --> AR[Agent Result Topic]:::bus
        CA --> AR
        UA --> AR
        AA --> AR
        SA --> AR
        TA --> AR
        BA --> AR
    end

    subgraph Orchestration[LangGraph Decision and Explainability]
        AR --> Intake[State Collector with timeout policy]:::orch
        Intake --> Score[Weighted Scoring Engine]:::orch
        Score --> Cor[Cross-Agent Correlation Matrix]:::orch
        Cor --> Gate{Risk Threshold Gate}:::orch
        Gate --> CF[Counterfactual Analyzer]:::orch
        CF --> Reason[LLM Security Reasoner]:::orch
        Reason --> Story[Threat Storyline Generator]:::orch
    end

    subgraph StorageAndAction[Persistence and Response]
        Story --> Persist[Persist Analysis Record]:::data
        Persist --> PG[(PostgreSQL)]:::data
        Persist --> Hist[(Feature and Decision History)]:::data

        Persist --> Policy[Response Policy Evaluator]:::action
        Policy --> Garuda{Trigger Garuda Hunt}:::action
        Garuda -->|yes| Hunt[Garuda Endpoint Hunt API]:::action
        Garuda -->|no| Dispatch[Action Dispatcher]:::action
        Hunt --> Dispatch
        Dispatch --> Quarantine[Mailbox Quarantine]:::action
        Dispatch --> Ticket[SOC Ticket and Alert Routing]:::action
        Dispatch --> Notify[Analyst Notification Webhook]:::action
    end

    subgraph Realtime[Realtime Analyst Experience]
        HA -. metrics and interim risk .-> Stream[Redis PubSub Stream]:::ext
        CA -. metrics and interim risk .-> Stream
        UA -. metrics and interim risk .-> Stream
        AA -. metrics and interim risk .-> Stream
        SA -. metrics and interim risk .-> Stream
        TA -. metrics and interim risk .-> Stream
        BA -. metrics and interim risk .-> Stream
        Persist -. final verdict .-> Stream
        Stream --> UI[SOC Dashboard WebSocket Client]:::ext
    end`
};

export const metricsData = {
  description: "The system was rigorously evaluated across all discrete agent modules, demonstrating exceptional predictive capabilities when analyzing real-world and synthetic enterprise datasets.",
  metrics: [
    { domain: "Headers", size: "10k rows", model: "LightGBM Classifier", acc: "95.90%", prec: "95.74%", f1: "89.15%", roc: "0.9770" },
    { domain: "Content / NLP", size: "31k rows", model: "TinyBERT (14M Params)", acc: "98.09%", prec: "98.11%", f1: "98.19%", roc: "-" },
    { domain: "URL Validation", size: "596k rows", model: "XGBoost Ensemble", acc: "95.55%", prec: "95.05%", f1: "95.58%", roc: "0.9924" },
    { domain: "Dynamic Sandbox", size: "83k rows", model: "Isolation Forest / Heuristics", acc: "98.37%", prec: "99.47%", f1: "99.17%", roc: "0.9847" },
    { domain: "User Behavior", size: "50k rows", model: "XGBoost", acc: "98.59%", prec: "93.21%", f1: "97.85%", roc: "0.9970" },
    { domain: "Threat Intel", size: "7k samples", model: "Offline SQLite WAL", acc: "-", prec: "-", f1: "-", roc: "0.9987" }
  ],
  operationalReadiness: [
    "Real-time Pipeline Tests: Passed all 13 end-to-end integration and smoke-test protocols via RabbitMQ fanout to LangGraph decisioning.",
    "URL Smoke Profile: Verified benign mean risk score of 0.0012 against malicious mean risk score of 0.9974, ensuring exceptional separability.",
    "Latency Guarantees: The entire analysis finishes securely under timeout boundaries, utilizing a partial-finalization policy to gracefully degrade rather than fail if an agent is unavailable."
  ],
  socKpis: [
    "Detection Quality: Alert precision and false-positive rates strictly segmented by verdict tier.",
    "Triage Efficiency: Mean Time to Triage (MTTT) and Mean Time to Containment (MTTC).",
    "Analyst Utility: Tracking the Analyst Override Rate—how often human analysts disagree with the AI's final verdict.",
    "Reliability: Tracking partial-finalization ratios and provider-outage impacts."
  ]
};

export const orchestrationData = {
  description: "The Orchestrator implements an 8-node state machine designed to build context incrementally. Combinatorial correlation amplifies risk when multiple vectors align, avoiding simple averaging in favor of SOC-analyst-mimicking heuristics.",
  diagramCode: `graph TD
    classDef io fill:#0f172a,stroke:#3b82f6,color:#fff
    classDef logic fill:#312e81,stroke:#a78bfa,color:#fff
    classDef llm fill:#7c2d12,stroke:#fdba74,color:#fff
    classDef data fill:#14532d,stroke:#34d399,color:#fff
    classDef risk fill:#7f1d1d,stroke:#fca5a5,color:#fff

    Start([Result Event Bundle]):::io --> Schema[Validate against result schema]:::logic
    Schema --> Merge[Merge into correlation scoped state object]:::logic
    Merge --> Check{All required agents present}:::logic

    Check -->|no| Cache[Store partial state in Redis hash]:::data
    Cache --> Timer{Timeout reached}:::logic
    Timer -->|no| Wait[Wait for remaining agents]:::io
    Wait --> Merge
    Timer -->|yes| Degrade[Mark missing agents and apply fallback priors]:::logic

    Check -->|yes| Normalize[Normalize each agent score and confidence]:::logic
    Degrade --> Normalize

    subgraph Scoring[Scoring and Correlation]
        Normalize --> W1[Apply per-agent base weights]:::logic
        W1 --> W2[Adjust by confidence calibration curves]:::logic
        W2 --> Corr1[Run cross-agent correlation rules]:::logic
        Corr1 --> Corr2[Run learned interaction matrix boost penalty]:::logic
        Corr2 --> Contr[Compute contradiction penalty]:::logic
        Contr --> FinalRisk[Compute final composite risk score]:::risk
    end

    FinalRisk --> Verdict{Map score to verdict band}:::logic
    Verdict -->|>=0.85| V1[Malicious]:::risk
    Verdict -->|0.65-0.84| V2[High Risk]:::risk
    Verdict -->|0.40-0.64| V3[Suspicious]:::risk
    Verdict -->|<0.40| V4[Safe]:::risk

    V1 --> ExplainSeed[Build explainability feature bundle]:::llm
    V2 --> ExplainSeed
    V3 --> ExplainSeed
    V4 --> ExplainSeed

    subgraph Explainability[Counterfactual and Narrative]
        ExplainSeed --> CF[Counterfactual engine minimal changes to flip class]:::llm
        CF --> Why[Reason extraction top positive and negative contributors]:::llm
        Why --> LLM[Azure OpenAI SOC reasoning pass]:::llm
        LLM --> Story[Chronological attack storyline synthesis]:::llm
        Story --> Rec[Action recommendation generation]:::llm
    end

    Rec --> Persist[Persist orchestrator output plus trace]:::data
    Persist --> Out([Final Analysis Payload]):::io`,
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
  counterfactual: "The Counterfactual Engine answers the critical SOC question: 'What caused this email to be blocked?'. It applies gradient-like perturbations across agent scores to identify the minimum shift required to alter the outcome (e.g. 'Lowering Sandbox Agent score by 0.31 changes CRITICAL to MALICIOUS. Sandbox execution is the primary driver').",
  mitre: "The MITRE ATT&CK Storyline Engine automatically constructs a kill-chain narrative mapping. It synthesizes fragmented signals into a chronological attack storyline, such as T1566.001 (Spearphishing Attachment) leading to T1204.002 (User Execution).",
  garuda: "Garuda is an asynchronous, retroactive threat-hunting module. When a CRITICAL IOC is found (e.g., a newly weaponized zero-day domain), Garuda searches the Postgres database and M365 tenant retroactively to find any previously 'safe' emails that arrived before the domain was known to be bad, executing retroactive quarantines.",
  techStack: [
    "Memory-Mapped Models: XGBoost/Scikit-Learn loaded via Joblib/Pickle bundles directly into global cache. Transformer pipelines strictly prune non-essential layers.",
    "SQLite WAL database: The ThreatIntelAgent uses a high-performance Write-Ahead Logging database, ingesting processed IOCs locally to avoid API rate limits, allowing O(1) sub-millisecond lookups.",
    "OCR Payload Offloading: Attachments are processed via a lightweight OCR service to detect hidden URLs in images and PDFs without spinning up full Tesseract binaries locally.",
    "Data Pipelines: Training processes utilize memory-mapped Arrow datasets and chunked CSV iterators, preventing OOM failures during multi-gigabyte dataset ingestions.",
    "FastAPI & WebSockets: Streams pipeline_ui_events directly from Redis PubSub, providing a real-time, live-updating visual representation of the LangGraph execution for analysts.",
    "Containerization: The entire deployment is defined via docker-compose.yml, deploying RabbitMQ, Redis, PostgreSQL, 7 Agent Workers, Orchestrator, and FastAPI Gateway."
  ],
  responseEngine: {
    description: "The ResponseEngine acts as the action layer, authenticating with Azure Active Directory via MSAL to manipulate Microsoft 365 mailboxes directly through the Microsoft Graph API.",
    actions: ["move_to_junk", "hard_quarantine", "insert_banner", "block_sender"],
    modes: "Controlled by environment variables, the system supports Simulated mode for safe testing (printing actions to the terminal and database) and Live mode for autonomous environment remediation (issuing PATCH/POST requests to M365)."
  }
};

export const agentsData = [
  {
    id: "header_agent",
    name: "Header Agent",
    icon: "📫",
    color: "#3b82f6",
    purpose: "Analyzes SMTP routing data, authentication protocols, and sender identities to detect spoofing.",
    fullDescription: "Analyzes SMTP routing data, authentication protocols (SPF/DKIM/DMARC), and sender identities to detect spoofing, look-alike domains, and unauthorized infrastructure usage.",
    metrics: { arch: "LightGBM Binary Classifier + Heuristics", dataset: "10,000 samples", acc: "95.90%", features: "hop_count, auth_fail_ratio, sender_reply_mismatch_flag, lookalike_distance_score using Levenshtein distance against trusted brands." },
    diagramCode: `graph TD
    classDef in fill:#334155,stroke:#94a3b8,color:#fff
    classDef proc fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef check fill:#0f766e,stroke:#2dd4bf,color:#fff
    classDef out fill:#14532d,stroke:#34d399,color:#fff

    In([Raw RFC822 Headers]):::in --> Parse[Structured header parser]:::proc
    Parse --> Canon[Canonicalize header keys and multiline fields]:::proc
    Canon --> Extract[Extract from reply-to return-path sender-id message-id]:::proc
    Canon --> Recv[Extract ordered Received chain]:::proc
    Canon --> Auth[Extract SPF DKIM DMARC ARC auth-results]:::proc

    subgraph AuthChecks[Authentication Validation]
        Auth --> SPFCheck[SPF alignment and include chain inspection]:::check
        Auth --> DKIMCheck[DKIM selector and domain alignment check]:::check
        Auth --> DMARCCheck[DMARC policy and alignment evaluation]:::check
        Auth --> ARCCheck[ARC seal chain integrity]:::check
        SPFCheck --> AuthScore[Auth trust subscore]:::proc
        DKIMCheck --> AuthScore
        DMARCCheck --> AuthScore
        ARCCheck --> AuthScore
    end

    subgraph RouteChecks[Transport Path Analysis]
        Recv --> HopNorm[Normalize hop IP host timestamp]:::check
        HopNorm --> Geo[GeoIP and ASN lookup per hop]:::check
        Geo --> RBL[Realtime blocklist checks for source hops]:::check
        RBL --> Drift[Detect impossible geo time travel and ASN drift]:::check
        Drift --> Relay[Open relay or suspicious relay fingerprint]:::check
        Relay --> RouteScore[Route anomaly subscore]:::proc
    end

    subgraph IdentityChecks[Identity Consistency]
        Extract --> DomGraph[Build sender identity graph]:::check
        DomGraph --> Misalign[From versus Reply-To versus Return-Path mismatch]:::check
        Misalign --> Lookalike[Lookalike domain and homoglyph test]:::check
        Lookalike --> MID[Message-ID domain consistency check]:::check
        MID --> IdentityScore[Identity mismatch subscore]:::proc
    end

    AuthScore --> Fuse[Weighted fusion with confidence]:::proc
    RouteScore --> Fuse
    IdentityScore --> Fuse
    Fuse --> Reason[Generate machine-readable reasons list]:::out
    Reason --> Out([Header Agent Score plus Confidence plus Evidence]):::out`,
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
    purpose: "Parses email body to identify linguistic patterns indicative of phishing, spear-phishing, or urgency manipulation.",
    fullDescription: "Parses the email body (plain text and HTML) to identify linguistic patterns indicative of phishing, spear-phishing, extortion, or urgency manipulation. It uses semantic dictionaries to identify coercion and maps transactional legitimacy.",
    metrics: { arch: "HuggingFace TinyBERT (14M) + TF-IDF", dataset: "31,142 samples", acc: "98.09%", features: "Semantic dictionaries for coercion, transactional legitimacy masking to reduce false positives (e.g. AWS bill without credential baiting lowers risk)." },
    diagramCode: `graph TD
    classDef ingest fill:#1f2937,stroke:#9ca3af,color:#fff
    classDef prep fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef ml fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef rule fill:#0f766e,stroke:#2dd4bf,color:#fff
    classDef out fill:#14532d,stroke:#34d399,color:#fff

    In([Plaintext HTML and OCR text]):::ingest --> Decode[Charset decode and control char cleanup]:::prep
    Decode --> Strip[HTML to text with DOM section retention]:::prep
    Strip --> Segment[Segment subject greeting body footer CTA blocks]:::prep
    Segment --> PII[PII and secret masking pass]:::prep
    PII --> Norm[Normalize unicode whitespace and punctuation]:::prep

    subgraph EmbeddingAndInference[SLM Inference Path]
        Norm --> Tok[Tokenizer with max length and truncation policy]:::ml
        Tok --> Model[TinyBERT phishing classifier]:::ml
        Model --> Logits[Raw logits]:::ml
        Logits --> Calib[Temperature calibration and probability smoothing]:::ml
        Calib --> MLScore[Semantic phishing probability]:::ml
    end

    subgraph LinguisticHeuristics[Deterministic Cue Extractors]
        Norm --> Intent[Urgency coercion and fear language detector]:::rule
        Norm --> Brand[Brand impersonation and credential request detector]:::rule
        Norm --> CTA[Call to action plus payment reset patterns]:::rule
        Norm --> Obfus[Obfuscation and unicode trick detector]:::rule
        Intent --> RuleScore[Heuristic score]:::rule
        Brand --> RuleScore
        CTA --> RuleScore
        Obfus --> RuleScore
    end

    subgraph ContextSignals[Contextual Adjustments]
        Segment --> Tone[Conversation continuity and thread break check]:::rule
        Segment --> Lang[Language mismatch to tenant profile]:::rule
        Tone --> CtxScore[Context anomaly score]:::rule
        Lang --> CtxScore
    end

    MLScore --> Fuse[Blend semantic heuristic and context scores]:::prep
    RuleScore --> Fuse
    CtxScore --> Fuse
    Fuse --> Explain[Top contributing spans and rationales]:::out
    Explain --> Out([Content Agent Score plus Confidence plus Evidence]):::out`,
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
    purpose: "Evaluates all hyperlinks found in the email body for malicious intent using lexical analysis and threat lookups.",
    fullDescription: "Evaluates all hyperlinks found in the email body for malicious intent, utilizing lexical analysis, entropy calculation, and multi-provider threat intelligence lookups. Features fallback logic that instantly reverts to the offline XGBoost lexical model if asynchronous API calls to external providers exceed budget timeouts.",
    metrics: { arch: "XGBoost Ensemble (500 estimators) + Platt Scaling", dataset: "596,576 samples", acc: "95.55%", features: "URL length, subdomain depth, protocol usage, credential bait tokens, Subdomain Shannon Entropy for DGA detection." },
    diagramCode: `graph TD
    classDef io fill:#334155,stroke:#94a3b8,color:#fff
    classDef feat fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef ml fill:#312e81,stroke:#a78bfa,color:#fff
    classDef out fill:#14532d,stroke:#34d399,color:#fff

    In([Extracted URL Set]):::io --> Dedup[Normalize and de-duplicate URLs]:::feat
    Dedup --> Resolve[Resolve redirects shorteners and punycode]:::feat
    Resolve --> Loop[Iterate URL candidates]:::feat

    subgraph FeaturePipeline[Per URL Feature Engineering]
        Loop --> Lex[Lexical features length depth tokens separators]:::feat
        Loop --> Host[Hostname features TLD age ASN entropy]:::feat
        Loop --> Path[Path query fragment suspicious token metrics]:::feat
        Loop --> Brand[Brand similarity and typo distance features]:::feat
        Loop --> Cred[Credential bait phrase and form endpoint cues]:::feat
        Lex --> Vec[Feature vector assembler]:::feat
        Host --> Vec
        Path --> Vec
        Brand --> Vec
        Cred --> Vec
    end

    subgraph ModelEnsemble[Model Inference]
        Vec --> XGB[XGBoost probability]:::ml
        Vec --> RF[Random Forest probability]:::ml
        Vec --> LR[Logistic calibration model]:::ml
        XGB --> Stack[Stacking combiner]:::ml
        RF --> Stack
        LR --> Stack
        Stack --> URLRisk[Per URL risk and confidence]:::ml
    end

    URLRisk --> Rank[Rank URLs by risk and exploitability]:::feat
    Rank --> Agg[Aggregate email-level URL risk max plus mean plus dispersion]:::feat
    Agg --> Reasons[Attach per URL evidence snippets]:::out
    Reasons --> Out([URL Agent Score plus Confidence plus Evidence]):::out`,
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
    purpose: "Performs lightweight, static analysis on file attachments to detect malicious executables and risky extensions.",
    fullDescription: "Performs lightweight, static analysis on file attachments to detect malicious executables, macros, and risky extensions before they reach the sandbox, applying explicit heuristic floors on top of Random Forest evaluation.",
    metrics: { arch: "Random Forest (200 trees) + Static Heuristics", dataset: "Custom EMBER-like features", acc: "N/A", features: "Double extension evasion (invoice.pdf.exe), Byte entropy frequency analysis (>=7.1 Shannon entropy indicates packed payload), Suspicious strings (VirtualAlloc, CreateRemoteThread)." },
    diagramCode: `graph TD
    classDef io fill:#14532d,stroke:#34d399,color:#fff
    classDef proc fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef det fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef out fill:#312e81,stroke:#a78bfa,color:#fff

    In([Attachment Bundle]):::io --> Manifest[Build attachment manifest name size mime hash]:::proc
    Manifest --> Type{File class}:::proc

    subgraph ExecutablePath[Executable Script Archive Path]
        Type -->|exe script archive| Static[Static parser and unpacker]:::det
        Static --> Magic[Magic-byte versus extension mismatch check]:::det
        Static --> Macro[Macro or script capability detector]:::det
        Static --> Entropy[Packed or obfuscated section detector]:::det
        Static --> Yara[YARA ruleset scan]:::det
        Magic --> SScore[Static threat subscore]:::proc
        Macro --> SScore
        Entropy --> SScore
        Yara --> SScore
    end

    subgraph DocumentImagePath[Document and Image Path]
        Type -->|pdf doc image| SafeRender[Safe rasterization in isolated worker]:::det
        SafeRender --> OCR[OCR text extraction]:::det
        OCR --> Hidden[Hidden text layer and tiny font detector]:::det
        Hidden --> URLExtract[Extract embedded and visual URLs]:::det
        URLExtract --> Reinjection[Send discovered URLs to URL analysis queue]:::proc
        OCR --> DScore[Document deception subscore]:::proc
        Hidden --> DScore
    end

    subgraph HashIntel[Hash Reputation]
        Manifest --> HashRep[Hash cache and TI reputation check]:::det
        HashRep --> HScore[Hash intelligence subscore]:::proc
    end

    SScore --> Fuse[Risk fusion with confidence weighting]:::proc
    DScore --> Fuse
    HScore --> Fuse
    Reinjection --> Fuse
    Fuse --> Evidence[Evidence bundle indicators matched rules discovered URLs]:::out
    Evidence --> Out([Attachment Agent Score plus Confidence plus Evidence]):::out`,
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
    purpose: "Executes unknown files in a tightly controlled, ephemeral environment to monitor for malicious runtime behaviors.",
    fullDescription: "Executes unknown or highly suspicious files in a tightly controlled, ephemeral environment to monitor for malicious runtime behaviors. The execution trace uses strace to intercept system calls like network beaconing or process injection.",
    metrics: { arch: "Isolation Forest + Deterministic strace rules", dataset: "83,821 execution traces", acc: "98.37%", features: "Docker Detonation (cap_drop: ALL, 64MB memory limit, no-new-privileges), strace parsing for execve, connect, openat system calls." },
    diagramCode: `graph TD
    classDef infra fill:#1f2937,stroke:#9ca3af,color:#fff
    classDef exec fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef detect fill:#0f766e,stroke:#2dd4bf,color:#fff
    classDef out fill:#14532d,stroke:#34d399,color:#fff

    In([Payload Candidate]):::infra --> Prep[Pre-execution safety checks and policy gate]:::infra
    Prep --> Stage[Stage payload into ephemeral tmpfs workspace]:::infra
    Stage --> Build[Create isolated container or microVM profile]:::infra

    subgraph Runtime[Detonation Runtime]
        Build --> Net[Apply egress control policy full deny or sinkhole]:::exec
        Net --> Exec[Controlled execution wrapper timeout and args policy]:::exec
        Exec --> Sys[Collect syscall and process tree telemetry]:::detect
        Exec --> FS[Collect file write rename and dropper telemetry]:::detect
        Exec --> Reg[Collect registry and autorun persistence telemetry]:::detect
        Exec --> Mem[Collect memory injection and hollowing telemetry]:::detect
        Exec --> DNS[Collect DNS and network callback telemetry]:::detect
    end

    Sys --> Behave[Behavioral rule engine mapped to MITRE ATTACK tactics]:::detect
    FS --> Behave
    Reg --> Behave
    Mem --> Behave
    DNS --> Behave

    Behave --> Family[Malware family fingerprint matcher]:::detect
    Family --> Risk[Behavioral risk scorer severity and confidence]:::out
    Risk --> Cleanup[Destroy runtime wipe tmpfs and revoke artifacts]:::infra
    Cleanup --> Out([Sandbox Agent Score plus Confidence plus Timeline]):::out`,
    inputExample: `{ "filename": "payload.docm", "file_blob": "<binary_data>" }`,
    outputExample: `{
  "agent_name": "sandbox_agent",
  "risk_score": 0.98,
  "confidence": 0.95,
  "analysis_mode": "docker",
  "indicators": [
    "shell_spawn_detected",
    "remote_connect_detected",
    "critical_chain_detected"
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
    purpose: "Rapidly matches extracted artifacts against a locally synchronized database of known Indicators of Compromise.",
    fullDescription: "Rapidly matches extracted artifacts (Domains, IPs, File Hashes) against a locally synchronized database of known Indicators of Compromise (IOCs). Avoids API rate limits by utilizing a high-performance SQLite WAL database synced asynchronously.",
    metrics: { arch: "SQLite WAL Database / In-Memory", dataset: "7,500 test samples", roc: "0.9987", features: "Background daemon syncs OpenPhish/URLHaus. O(1) sub-millisecond lookups via IN clause allowing simultaneous bulk evaluation." },
    diagramCode: `graph TD
    classDef in fill:#14532d,stroke:#34d399,color:#fff
    classDef proc fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef api fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef out fill:#312e81,stroke:#a78bfa,color:#fff

    In([IOCs domains IPs URLs hashes]):::in --> Norm[Normalize and type classify IOC set]:::proc
    Norm --> Cache[Lookup local SQLite cache with staleness policy]:::proc
    Cache --> Hit{Fresh cache entries}:::proc

    Hit -->|yes| CachedScore[Use cached verdict confidence and source set]:::proc
    Hit -->|partial or no| Queue[Prepare unresolved IOC query batch]:::proc

    subgraph ProviderFanout[External Intelligence Providers]
        Queue --> VT[VirusTotal adapter]:::api
        Queue --> OTX[AlienVault OTX adapter]:::api
        Queue --> Abuse[AbuseIPDB adapter]:::api
        Queue --> Phish[OpenPhish feed adapter]:::api
        Queue --> MZ[MalwareBazaar adapter]:::api
        Queue --> URLH[URLHaus adapter]:::api
    end

    VT --> Parse[Normalize provider responses into common schema]:::proc
    OTX --> Parse
    Abuse --> Parse
    Phish --> Parse
    MZ --> Parse
    URLH --> Parse

    Parse --> Reliability[Apply source reliability and recency weights]:::proc
    Reliability --> Consensus[Per IOC maliciousness consensus score]:::proc
    Consensus --> CacheWrite[Write back cache with TTL and provenance]:::proc
    CacheWrite --> Merge[Merge cached and fresh IOC results]:::proc
    CachedScore --> Merge

    Merge --> Rollup[Email-level TI rollup malicious ratio severity boost]:::out
    Rollup --> Evidence[Attach IOC level evidence and provider hits]:::out
    Evidence --> Out([Threat Intel Score plus Confidence plus Evidence]):::out`,
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
    purpose: "Provides contextual risk assessment based on the recipient's historical interactions and sender organizational context.",
    fullDescription: "Provides contextual risk assessment based on the recipient's historical interactions and the organizational context of the sender. Detects anomalies when unfamiliar external senders using risky infrastructure contact high-value internal targets.",
    metrics: { arch: "XGBoost", dataset: "50,000 records", acc: "98.59%", features: "historical_click_rate, department_context, sender_familiarity. Unfamiliar senders using High-Risk TLDs (.xyz, .top) significantly bump the overall threat multiplier." },
    diagramCode: `graph TD
    classDef in fill:#312e81,stroke:#a78bfa,color:#fff
    classDef feat fill:#1e3a8a,stroke:#60a5fa,color:#fff
    classDef ml fill:#0f766e,stroke:#2dd4bf,color:#fff
    classDef out fill:#14532d,stroke:#34d399,color:#fff

    In([Context from to cc timestamp domain role]):::in --> Hist[Fetch communication history from Postgres]:::feat
    Hist --> Clean[Filter by retention policy and tenant scope]:::feat

    subgraph BaselineModel[Behavior Baseline Construction]
        Clean --> Contact[Contact graph first seen and frequency features]:::feat
        Clean --> Time[Time-of-day and weekday behavior profile]:::feat
        Clean --> Thread[Thread continuity and reply chain consistency]:::feat
        Clean --> Role[Role sensitivity VIP finance admin multiplier]:::feat
        Clean --> Geo[Sender geo and ASN familiarity profile]:::feat
        Contact --> FVec[Feature vector builder]:::feat
        Time --> FVec
        Thread --> FVec
        Role --> FVec
        Geo --> FVec
    end

    subgraph AnomalyScoring[Anomaly and Risk Estimation]
        FVec --> Iso[Isolation Forest anomaly score]:::ml
        FVec --> XGB[XGBoost contextual risk score]:::ml
        FVec --> Rules[Deterministic penalties first contact odd hour VIP target]:::ml
        Iso --> Blend[Blend model and rule outputs with confidence]:::ml
        XGB --> Blend
        Rules --> Blend
    end

    Blend --> Explain[Generate anomaly reasons and baseline deltas]:::out
    Explain --> Out([User Behavior Score plus Confidence plus Evidence]):::out`,
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
