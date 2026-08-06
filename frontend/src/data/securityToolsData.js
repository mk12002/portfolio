// Security Tools Portfolio Data
export const heroData = {
  title: "Security Engineering Toolkit",
  subtitle: "27 CLI-driven security tools built for real-world AppSec, IAM, Cloud, Cryptography, and Detection Engineering workflows.",
  stats: [
    { label: "Tools", value: "27" },
    { label: "Security Domains", value: "5" },
    { label: "CLI-First", value: "100%" },
    { label: "Zero-Dep Core", value: "Python" }
  ],
  interviewSummary: "I built a 27-tool security engineering portfolio covering AppSec, IAM, cloud & infrastructure, cryptography, and detection engineering. Each tool is CLI-driven, zero-dependency at its core, explainable, and designed for practical security assessment workflows. The project emphasizes detection quality, signal correlation, operational usefulness, and remediation clarity rather than exploit development."
};

export const principles = [
  { title: "Detection over Exploitation", desc: "Tools reveal security weaknesses without weaponizing them.", icon: "🔍" },
  { title: "Explainable Security Logic", desc: "Each check links to concrete security reasoning and attack models.", icon: "🗣️" },
  { title: "Modular & Scriptable", desc: "Clean CLI arguments, machine-friendly JSON outputs for CI pipelines.", icon: "⚙️" },
  { title: "Multi-Signal Analysis", desc: "Correlating status codes, response content, timing, and behavior patterns.", icon: "📊" },
  { title: "Practical Realism", desc: "Payloads and heuristics model what real attackers and defenders actually do.", icon: "🎯" },
  { title: "Responsible Guardrails", desc: "Safe defaults, constraints, and explicit limitation notes.", icon: "🛡️" }
];

export const domains = [
  {
    name: "Identity & Access Security",
    color: "#a78bfa",
    icon: "🔐",
    toolIds: ["jwt-analyzer", "rate-limiter", "auth-flow", "password-analyzer", "password-generator", "password-manager", "login-mfa"]
  },
  {
    name: "Web Application Security",
    color: "#34d399",
    icon: "🌐",
    toolIds: ["web-scanner", "input-fuzzer", "file-upload", "headers-checker", "cookie-analyzer", "http-flow", "ssl-checker", "phishing-detector"]
  },
  {
    name: "Cloud & Infrastructure",
    color: "#60a5fa",
    icon: "☁️",
    toolIds: ["cloud-bucket", "ssrf-tester", "port-scanner", "subdomain-scanner", "vuln-scanner"]
  },
  {
    name: "Blue Team & Detection",
    color: "#f472b6",
    icon: "🛡️",
    toolIds: ["log-analyzer", "simple-ids", "keylogger-detector", "dir-bruteforce"]
  },
  {
    name: "Cryptography & Encryption",
    color: "#fbbf24",
    icon: "🔒",
    toolIds: ["caesar-cipher", "file-encryption", "rsa-keygen"]
  }
];

export const tools = [
  {
    id: "log-analyzer",
    num: "01",
    title: "Log Analyzer & Anomaly Detection",
    purpose: "Parses authentication logs and identifies brute force, password spray, credential stuffing, behavioral anomalies, and optional ML anomalies.",
    problem: "Security teams receive enormous login telemetry. Attack patterns are often subtle and mixed with normal activity. Manual review does not scale.",
    capabilities: [
      "Brute force by IP within configurable windows",
      "User-targeting from many IPs",
      "Password spray patterns (many users, low attempts per user)",
      "Credential stuffing signals (failures followed by distinct account successes)",
      "Unusual successful login hours",
      "First-time login IP observations",
      "Correlated findings that raise severity when multiple suspicious signals align",
      "Optional Isolation Forest anomaly layer when data volume supports it"
    ],
    workflow: [
      "Parse heterogeneous log formats into normalized events",
      "Enrich events with timestamp and IP context",
      "Run threshold-based detectors",
      "Run optional behavioral and ML detectors",
      "Deduplicate findings",
      "Print analyst-readable summary",
      "Export JSON if requested"
    ],
    exampleInput: `python log_analyzer.py --logfile auth.log --fail-threshold 5 --time-window 5 --enable-ml --output-json report.json

# Sample log lines:
Apr 28 01:12:01 server sshd[1234]: Failed password for alice from 203.0.113.8 port 53321 ssh2
Apr 28 01:12:10 server sshd[1234]: Accepted password for alice from 203.0.113.8 port 53321 ssh2
2026-04-28T14:05:10Z webauth user=bob ip=198.51.100.42 result=success`,
    exampleOutput: `=== Log Analysis Summary ===
Time span: 2026-04-28 01:12:01 to 2026-04-28 14:05:10
Total events: 1245 (1084 failures, 161 successes)

[HIGH] Brute-force (IP): 203.0.113.8 — 9 failures in 5m; success after failures
[MED]  Password spray: 198.51.100.42 targeted 12 users with <=2 attempts each
[LOW]  ML anomaly: carol from 198.51.100.42 at 2026-04-28T02:05:10`,
    strengths: ["Supports multiple log formats", "Uses both deterministic rules and anomaly modeling", "Includes parse-rate context for detection quality"],
    limitations: ["File-based analysis, not continuous streaming", "ML quality depends on data volume", "Indicates suspicious activity, not guaranteed compromise"],
    roadmap: ["Add streaming mode for near-real-time detections", "Add geo-velocity and ASN enrichment", "Add suppression rules and analyst feedback loop"],
    folder: "log-analysis",
    domain: "blue-team"
  },
  {
    id: "web-scanner",
    num: "02",
    title: "Web Security Scanner",
    purpose: "Performs a focused, non-exploitative misconfiguration assessment of web targets.",
    problem: "Many exploitable weaknesses begin as simple web misconfigurations: missing headers, weak CSP, permissive CORS, reflected input, and metadata leakage.",
    capabilities: ["HTTPS posture and HTTP handling", "Missing or weak security headers", "CSP weakness checks (unsafe-inline, unsafe-eval, permissive directives)", "CORS wildcard and credential risk analysis", "Server fingerprint and technology disclosure", "Reflected input checks with context hints", "Cookie flag weaknesses in Set-Cookie responses"],
    workflow: ["Request target and collect status, headers, and response body", "Evaluate controls across six security categories", "Rank findings by severity", "Provide remediation notes and optional JSON output"],
    exampleInput: `python web_scanner.py --url https://example.com/search?q=test --output-json scan.json`,
    exampleOutput: `=== Web Security Scan ===
Target: https://example.com/search?q=test
Status: 200

[HIGH] Insecure cookie flags — sessionid missing Secure, HttpOnly
[MED]  Missing Content-Security-Policy
[LOW]  Reflected input detected for parameter q`,
    strengths: ["Goes beyond header presence to value quality", "Context-aware reflection checks", "Explainable for developer remediation"],
    limitations: ["Single-page request model, no crawler", "No JavaScript execution for DOM XSS", "Reflection is a risk indicator, not exploit proof"],
    roadmap: ["Add authenticated scan profiles", "Add crawl mode with endpoint discovery", "Integrate CSP policy simulation scoring"],
    folder: "web-scanner",
    domain: "web"
  },
  {
    id: "jwt-analyzer",
    num: "03",
    title: "JWT Token Analyzer",
    purpose: "Decodes and analyzes JWTs for structural and security risks without requiring signing keys.",
    problem: "JWT misuse is common and can lead to forgery, privilege escalation, replay, and sensitive data exposure.",
    capabilities: ["Header and payload decode", "Algorithm risk checks (unsigned token, HS/RS confusion)", "Dangerous header fields (key URL, embedded key)", "Signature segment consistency", "Expiration and not-before timing logic", "Excessive token lifetime observations", "Missing critical claims (iss, aud, iat, jti)", "Sensitive payload key detection", "Sample token generation"],
    workflow: ["Parse token structure", "Decode Base64URL segments", "Analyze header attack surfaces", "Analyze payload and temporal claims", "Produce severity-tagged findings and optional JSON"],
    exampleInput: `python jwt_analyzer.py --token eyJhbGciOiJub25lIn0.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTkwMDAwMDAwMH0. --output-json jwt_report.json`,
    exampleOutput: `=== JWT Analyzer ===
Header alg: none

[CRITICAL] alg=none or empty algorithm — unsigned token risk
[WARN] Missing claim: jti (replay protection gap)
[WARN] Sensitive key in payload: email`,
    strengths: ["Teaches implementation-level JWT security", "Attack-centric checks relevant in real backend reviews", "Highlights payload readability risk"],
    limitations: ["Cannot cryptographically verify signatures without keys", "Some risk flags are contextual"],
    roadmap: ["Add optional signature verification modes", "Add JWK fetch validation simulation", "Add policy profiles per auth architecture"],
    folder: "jwt-analysis",
    domain: "iam"
  },
  {
    id: "cloud-bucket",
    num: "04",
    title: "Cloud Bucket Exposure Checker",
    purpose: "Assesses public exposure of cloud storage buckets across AWS, GCS, and Azure via safe HTTP checks.",
    problem: "Public bucket misconfigurations are a persistent root cause of large-scale data exposure.",
    capabilities: ["Bucket existence and reachability signals", "Public listing exposure", "Public object read indicators", "Public write probing (harmless test objects)", "ACL readability checks", "Static website endpoint exposure (AWS)", "Region auto-discovery support"],
    workflow: ["Build provider-specific endpoint", "Validate existence behavior", "Test list, read, write, and ACL exposure", "Add provider-tailored remediation guidance", "Support batch checks from input list files"],
    exampleInput: `python s3_checker.py --bucket-name my-company-backups --provider aws --output-json cloud_report.json`,
    exampleOutput: `=== Cloud Bucket Exposure Check ===
Provider: aws
Bucket: my-company-backups

[HIGH] Public LIST: YES
[HIGH] Public READ: YES
[LOW]  Public WRITE: NO
[MED]  Public ACL: YES`,
    strengths: ["Multi-cloud support in one tool", "Splits exposure into actionable dimensions", "Emphasizes safe probing and practical interpretation"],
    limitations: ["HTTP cannot reveal full IAM policy logic", "Public read confirmation strongest with known object keys", "Write probes only on authorized assets"],
    roadmap: ["Add provider API mode with authenticated checks", "Add policy linting for IaC configurations", "Add object-level sensitivity classifiers"],
    folder: "cloud-misconfig",
    domain: "cloud"
  },
  {
    id: "input-fuzzer",
    num: "05",
    title: "Input Fuzzer",
    purpose: "Fuzzes input parameters with categorized payloads and analyzes anomalies for injection risk.",
    problem: "Input-handling weaknesses still drive SQLi, XSS, SSTI, traversal, and command injection classes.",
    capabilities: ["Payload categories: XSS, SQLi, SSTI, path traversal, command injection", "Reflection detection and context hints", "Database error signature detection", "SSTI evaluation marker detection", "Path traversal signature checks", "Command output marker checks", "Timing anomaly checks for blind vectors", "WAF and blocking behavior signals", "Custom payload file support"],
    workflow: ["Capture baseline behavior", "Send payloads per category and parameter", "Compare status, body, and timing against baseline", "Classify findings by severity and category"],
    exampleInput: `python input_fuzzer.py --url https://target/search --method GET --param q --payload-type all --output-json fuzz_report.json`,
    exampleOutput: `=== Input Fuzzer ===
Target: https://target/search
Baseline: 200 (1523 bytes, 45ms)

[HIGH] SSTI expression evaluated: {{7*7}} response contains 49
[MED]  SQL error signature detected on payload ' OR '1'='1
[LOW]  Timing anomaly: payload response 2140ms vs baseline 45ms`,
    strengths: ["Category-driven logic instead of one payload list", "Baseline comparison reduces blind interpretation", "Supports both GET and POST parameter testing"],
    limitations: ["No JavaScript runtime for DOM detection", "Timing-based hints can be noisy", "Multi-parameter interaction bugs not deeply modeled"],
    roadmap: ["Add parameter combination fuzzing", "Add adaptive payload mutation", "Add concurrency model for endpoint stress profiling"],
    folder: "input-fuzzing",
    domain: "web"
  },
  {
    id: "rate-limiter",
    num: "06",
    title: "Rate Limit & Brute Force Simulator",
    purpose: "Simulates repeated authentication attempts and measures the quality of throttling and abuse controls.",
    problem: "Weak login throttling enables automated credential attacks and account abuse at scale.",
    capabilities: ["Sequential failed-attempt simulation", "Form and JSON request body support", "429 and 503 handling behavior", "Retry-After parsing", "Lockout and challenge keyword detection", "Progressive delay and tarpit pattern observation", "Success detection signals", "Stop-on-trigger safety mode", "Sample password list generator"],
    workflow: ["Send baseline attempt to model normal failure response", "Execute controlled attempt sequence", "Detect behavior changes", "Summarize trigger point and strongest defensive signal"],
    exampleInput: `python brute_force_simulator.py --url https://target/login --username testuser --password-list passwords.txt --delay 0.5 --stop-on-trigger --output-json ratelimit_report.json`,
    exampleOutput: `=== Rate Limit Simulator ===
001  200  142ms  normal
002  200  148ms  normal
003  200  312ms  progressive delay detected
004  429  33ms   HTTP 429 Retry-After: 30

Summary: first trigger at attempt #3`,
    strengths: ["Models realistic abuse-defense interaction", "Safe guardrails for authorized testing", "Produces useful operational findings"],
    limitations: ["Single-source simulation", "CAPTCHA/anti-bot systems implementation-specific", "Silent backend controls harder to detect externally"],
    roadmap: ["Add distributed-source simulation", "Add lockout recovery timing profiler", "Add account policy quality scoring"],
    folder: "rate-limiting",
    domain: "iam"
  },
  {
    id: "http-flow",
    num: "07",
    title: "HTTP Flow Visualizer",
    purpose: "Traces request chains and redirect hops while showing cookie lifecycle and security-relevant transitions.",
    problem: "Authentication and session issues frequently hide in multi-step HTTP flows, not single responses.",
    capabilities: ["Manual redirect hop tracing", "Request/response visibility at each hop", "Cookie set/change/removal tracking", "Auth-header visibility for key lifecycle moments", "Protocol downgrade/upgrade detection", "Cross-domain redirect observations", "Missing HSTS signal on final HTTPS responses", "Colorized terminal output and JSON export"],
    workflow: ["Start from target URL", "Capture each redirect step manually", "Maintain and diff cookie state across hops", "Analyze flow-level security observations", "Generate readable flow report"],
    exampleInput: `python http_flow_visualizer.py --url http://example.com --follow --color --output-json flow_report.json`,
    exampleOutput: `=== HTTP Flow Visualizer ===
Hop 1: GET http://example.com → 301 → https://example.com/
Hop 2: GET https://example.com/ → 302 → https://example.com/home
  Cookie change: +session=abc123

[MED] HTTP to HTTPS upgrade seen (initial hop exposed to MITM window)`,
    strengths: ["Makes opaque auth chains transparent", "Highlights session-state transitions scanners miss", "Useful for OAuth, SSO, and login troubleshooting"],
    limitations: ["No JavaScript-based navigation", "Complex cookie edge cases may need deeper parsers", "TLS handshake internals not analyzed"],
    roadmap: ["Add request method and body replay", "Add graph visualization export", "Add token parameter leak detection in redirect URLs"],
    folder: "http-visibility",
    domain: "web"
  },
  {
    id: "cookie-analyzer",
    num: "08",
    title: "Cookie Security Analyzer",
    purpose: "Parses and evaluates cookie-level security posture for confidentiality, integrity, and scope.",
    problem: "Session theft and CSRF risk often begin with weak cookie attribute hygiene.",
    capabilities: ["Per-cookie parsing from raw Set-Cookie headers", "Secure, HttpOnly, and SameSite checks", "SameSite None risk interpretation", "Domain scope breadth analysis", "Prefix requirement checks (__Host, __Secure)", "Session-like cookie sensitivity weighting", "Lifetime and replay window observations"],
    workflow: ["Request target response", "Extract all Set-Cookie values", "Parse attributes and normalize", "Score risks per cookie", "Provide per-cookie remediation"],
    exampleInput: `python cookie_analyzer.py --url https://example.com/login --output-json cookie_report.json`,
    exampleOutput: `=== Cookie Security Analyzer ===
Cookie: sessionid
  Missing: Secure, SameSite
  Severity: HIGH
  Risk: MITM session hijack and CSRF exposure

Cookie: prefs
  Missing: HttpOnly
  Severity: MED`,
    strengths: ["Analyzes cookies individually, not as flat list", "Distinguishes session-critical and lower-impact cookies", "Includes practical policy recommendations"],
    limitations: ["Single-response scope may miss flow-specific cookies", "Some apps intentionally omit HttpOnly for UI logic", "Cannot infer server-side session invalidation"],
    roadmap: ["Add multi-step flow mode", "Add browser-specific behavior profiles", "Add enterprise baseline templates"],
    folder: "cookie-security",
    domain: "web"
  },
  {
    id: "password-analyzer",
    num: "09",
    title: "Password Strength & Hash Analyzer",
    purpose: "Evaluates password strength and demonstrates hash security economics in an interview-ready way.",
    problem: "Organizations still underestimate offline cracking speed and overestimate theoretical password entropy.",
    capabilities: ["Character-class entropy estimation", "Common pattern detection (dictionary, seasonal-year, keyboard walks, sequences, dates, repeats)", "Crack-time estimation (fast vs slow hash)", "MD5 and SHA-256 demonstration", "Salted SHA-256 demonstration", "Optional bcrypt demonstration and slowdown factor", "Composite scoring and severity assignment"],
    workflow: ["Analyze password structure and patterns", "Estimate entropy and attack cost", "Hash using multiple algorithms", "Compare timing and security implications", "Print educational security guidance"],
    exampleInput: `python password_analyzer.py --password Summer2024! --bcrypt-cost 12 --output-json pass_report.json`,
    exampleOutput: `=== Password Strength + Hash Analyzer ===
Length: 11
Entropy: 55.3 bits
Crack time fast hash: ~hours
Crack time bcrypt: ~years
Finding: seasonal word + year pattern
Slowdown factor: bcrypt ~95000x slower than SHA-256`,
    strengths: ["Connects abstract entropy to practical attacker capability", "Explains why hash speed is a liability", "Clear migration messaging toward modern hashing"],
    limitations: ["Entropy estimates can overstate real-world strength", "Hardware assumptions vary by attacker", "No breached-password corpus check by default"],
    roadmap: ["Integrate breach list checks", "Add Argon2id benchmarking", "Add policy recommendation output by risk tier"],
    folder: "password-security",
    domain: "iam"
  },
  {
    id: "simple-ids",
    num: "10",
    title: "Simple IDS (Intrusion Detection System)",
    purpose: "Provides a compact intrusion detection pipeline combining signature logic and anomaly heuristics.",
    problem: "Operational teams need quick triage of scanning, brute force, payload abuse, and unusual traffic concentration.",
    capabilities: ["Signature checks for brute-force statuses", "Enumeration and scan behavior through unique path volume", "Sensitive endpoint probing patterns", "Payload signatures (SQLi, XSS, traversal, command injection)", "Scanner user-agent detection", "Optional anomaly detector (statistical + ML)", "MITRE ATT&CK tactic mapping", "Alert deduplication and priority ordering"],
    workflow: ["Parse logs from common formats", "Aggregate traffic behavior by source", "Apply signature rules and anomaly checks", "Merge and deduplicate alerts", "Output triage-ready report and optional JSON"],
    exampleInput: `python simple_ids.py --logfile access.log --ruleset rules.json --output-json ids_report.json`,
    exampleOutput: `=== Simple IDS ===
Events parsed: 5000
Alerts generated: 17

[HIGH] Attack payload detected from 203.0.113.42
  Evidence: SQLi and XSS payloads in request paths
[MED]  Scanning behavior from 198.51.100.99
[LOW]  Known scanner user-agent detected`,
    strengths: ["Clear SOC-style architecture from parsing to alerts", "Supports known-pattern and unknown-pattern detection", "Prioritizes analyst usability with severity and evidence"],
    limitations: ["Passive detection only, no blocking", "Parsing is heuristic for broad format support", "Anomaly quality depends on baseline event volume"],
    roadmap: ["Add suppression and allowlist engine", "Add event stream ingestion", "Add ATT&CK technique-level mapping"],
    folder: "intrusion-detection",
    domain: "blue-team"
  },
  {
    id: "file-upload",
    num: "11",
    title: "File Upload Vulnerability Tester",
    purpose: "Tests upload endpoints against common bypass vectors used to circumvent file validation controls.",
    problem: "Upload filters frequently check only extension or MIME, enabling dangerous file acceptance and potential server compromise.",
    capabilities: ["Baseline safe upload control check", "Dual extension attempts", "Alternative executable extension attempts", "Null-byte-style filename tricks", "Extension case-variation bypass", "MIME and extension mismatch tests", "Polyglot file probes", "Server reconfiguration file probes", "SVG scriptable upload checks", "Long filename behavior checks", "Response acceptance and rejection analysis", "Structured severity mapping"],
    workflow: ["Build multipart payloads per test case", "Upload crafted files", "Analyze HTTP status and body cues", "Mark accepted dangerous cases with severity", "Produce summary and defensive recommendations"],
    exampleInput: `python upload_tester.py --url https://target/upload --file sample.jpg --cookie session=abc123 --output-json upload_report.json`,
    exampleOutput: `=== File Upload Vulnerability Tester ===
Tests run: 12

[HIGH] dual_ext_php accepted (photo.jpg.php)
[MED]  svg_xss accepted
[SAFE] baseline accepted

Summary: 3 high-risk acceptance events detected`,
    strengths: ["Multiple bypass families, not one dimension", "Content-based interpretation beyond status codes", "Practical layered defense guidance"],
    limitations: ["Acceptance doesn't always prove executable path", "Execution confirmation requires follow-up validation", "Requires authorization in production contexts"],
    roadmap: ["Add storage-path discovery helper", "Add image re-encode integrity checks", "Add archive and parser exploit test modules"],
    folder: "file-upload-testing",
    domain: "web"
  },
  {
    id: "ssrf-tester",
    num: "12",
    title: "SSRF Detection Tester",
    purpose: "Injects URL payload variants into server-side fetch parameters and evaluates SSRF indicators through baseline-aware analysis.",
    problem: "SSRF enables access to internal services and cloud metadata endpoints unreachable from the public internet.",
    capabilities: ["Localhost and internal target variants", "Bypass encodings (decimal, hex, octal, shorthand, IPv6)", "Cloud metadata endpoint probes for major providers", "Private RFC1918 target probing", "Protocol edge cases including local file references", "DNS rebinding-style host representations", "Baseline behavior comparison (status, size, timing, content)", "Metadata keyword detection in responses", "Severity elevation for high-confidence cloud metadata"],
    workflow: ["Capture baseline with safe external target", "Inject payload set into chosen parameter", "Observe response differentials", "Score findings using multi-signal heuristic", "Summarize high-risk SSRF indicators"],
    exampleInput: `python ssrf_tester.py --url https://target/api/fetch --param url --method GET --output-json ssrf_report.json`,
    exampleOutput: `=== Basic SSRF Tester ===
Baseline: 200, 140ms, 3200 bytes

[HIGH] 169.254.169.254 metadata payload returned high-confidence metadata keywords
[MED]  localhost decimal encoding produced timing and status anomalies

Summary: 2 high, 4 medium indicators`,
    strengths: ["Payload diversity models practical filter bypass", "Baseline comparison reduces over-alerting", "Focuses on cloud-metadata impact"],
    limitations: ["Blind SSRF needs out-of-band channels", "Timing indicators can be noisy", "Detection-only, no exploitation"],
    roadmap: ["Add DNS callback integration for blind SSRF", "Add protocol and redirect-chain policy checks", "Add environment-specific payload libraries"],
    folder: "ssrf-testing",
    domain: "cloud"
  },
  {
    id: "auth-flow",
    num: "13",
    title: "Auth Flow Tester",
    purpose: "Simulates complete authentication lifecycle behavior and identifies session and token management flaws.",
    problem: "High-impact auth weaknesses often appear in lifecycle transitions: before login, after login, re-login, logout, and post-logout access.",
    capabilities: ["Pre-login and post-login session comparison", "Session fixation detection", "Repeat-login token reuse checks", "Bad-password behavior sanity check", "Optional logout and post-logout test", "Session cookie entropy estimation", "Cookie security attribute checks", "Session persistence after logout checks"],
    workflow: ["Initial unauthenticated request capture", "Valid login request and state capture", "Invalid-credential control check", "Repeat-login token comparison", "Optional logout and post-logout verification", "Risk scoring and remediation output"],
    exampleInput: `python auth_flow_tester.py --login-url https://target/login --username alice --password Secret123! --logout-url https://target/logout --protected-url https://target/dashboard --output-json auth_report.json`,
    exampleOutput: `=== Auth Flow Tester ===
Step 1: pre-login cookie captured
Step 2: post-login cookie unchanged

[HIGH] Session fixation risk detected

Step 6: post-logout protected resource returned 200

[HIGH] Post-logout access still allowed`,
    strengths: ["Tests auth behavior as a state machine", "Includes practical checks for fixation, reuse, invalidation", "Aligned with real-world account takeover root causes"],
    limitations: ["Custom CSRF flows may need manual header support", "Cannot inspect server-side session store", "Cross-domain redirects may affect cookie continuity"],
    roadmap: ["Add CSRF extraction strategy modules", "Add refresh-token and rotation checks", "Add MFA flow awareness and step-up auth checks"],
    folder: "auth-flow-testing",
    domain: "iam"
  },
  {
    id: "headers-checker",
    num: "14",
    title: "Security Headers Hardening Checker",
    purpose: "Audits modern and legacy browser security headers, validates value quality, and assigns an overall hardening grade.",
    problem: "Header presence alone is insufficient. Weak values can leave applications vulnerable despite 'having the header.'",
    capabilities: ["Presence checks for major defensive headers", "Value-strength checks for CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy", "Legacy X-XSS-Protection handling", "Modern cross-origin isolation header checks", "Information leakage header detection", "Weighted scoring and letter-grade generation", "OWASP-linked remediation framing"],
    workflow: ["Fetch response headers", "Evaluate each configured control", "Apply weak-value validators", "Compute weighted score", "Print graded report with secure defaults"],
    exampleInput: `python headers_checker.py --url https://example.com --output-json headers_report.json`,
    exampleOutput: `=== Security Headers Hardening Checker ===
Grade: C (55/100)

[HIGH] Content-Security-Policy missing
[MED]  HSTS weak (max-age too short)
[PASS] X-Content-Type-Options nosniff
[LOW]  Server version disclosure header present`,
    strengths: ["Balances technical depth with management-friendly grade", "Evaluates quality, not just existence", "Includes modern browser isolation controls many checkers skip"],
    limitations: ["Single-URL scope can miss path-specific differences", "CSP quality analysis intentionally lightweight", "Does not test dynamic header injection"],
    roadmap: ["Add multi-endpoint grade aggregation", "Add report-only CSP migration planner", "Add CI gate thresholds for release readiness"],
    folder: "headers-hardening",
    domain: "web"
  },
  {
    id: "caesar-cipher",
    num: "15",
    title: "Caesar Cipher",
    purpose: "Classical substitution cipher with encrypt, decrypt, and full brute-force cryptanalysis to teach why obscurity is not security.",
    problem: "Rolled-your-own 'encryption' and tiny keyspaces still show up in real systems. A cipher with 25 possible keys falls in milliseconds — the lesson maps directly to weak, low-entropy modern schemes.",
    capabilities: ["Encrypt / decrypt with a chosen shift", "Brute-force all 25 keys automatically", "Frequency-analysis scoring to auto-rank likely plaintext", "Preserves case and non-alphabetic characters"],
    workflow: ["Take text and mode (encrypt/decrypt/break)", "Apply modular shift per character", "For break mode, enumerate every key", "Score candidates by English letter frequency"],
    exampleInput: "python caesar_cipher.py --mode break --text \"Khoor Zruog\"",
    exampleOutput: `=== Brute-force ===
shift 03  -> \"Hello World\"  (best frequency score)
shift 07  -> \"Dahhk Sknhz\"`,
    strengths: ["Demonstrates keyspace exhaustion clearly", "No dependencies", "Frequency analysis mirrors real cryptanalysis"],
    limitations: ["Educational cipher, not for protection", "English-frequency scoring only", "No polyalphabetic support"],
    roadmap: ["Add Vigenère + Kasiski examination", "Add multi-language frequency tables", "Add index-of-coincidence scoring"],
    folder: "caesar-cipher",
    domain: "crypto"
  },
  {
    id: "file-encryption",
    num: "16",
    title: "File Encryption (AES-256)",
    purpose: "Encrypts and decrypts files with AES-256-CBC and Fernet authenticated encryption, implemented to understand the primitives end-to-end.",
    problem: "Data at rest is exposed without proper encryption — and naive encryption without authentication is silently malleable. Understanding the difference between confidentiality and integrity is the point.",
    capabilities: ["AES-256-CBC with random IV per file", "Fernet authenticated (AEAD) mode", "Password-derived keys via KDF", "Round-trip integrity verification"],
    workflow: ["Derive a key from the password", "Generate a fresh random IV/nonce", "Encrypt and write ciphertext + IV", "Verify by decrypting back on demand"],
    exampleInput: "python file_encryptor.py --mode encrypt --in secret.pdf --out secret.enc",
    exampleOutput: `[PASS] Encrypted secret.pdf -> secret.enc (AES-256-CBC)
[PASS] Integrity self-check: decryption round-trip OK`,
    strengths: ["Contrasts unauthenticated CBC with AEAD Fernet", "Per-file random IV", "Clear key-derivation step"],
    limitations: ["Not a file-format-aware vault", "CBC mode included for teaching, prefer AEAD", "No key-escrow or recovery"],
    roadmap: ["Add AES-GCM streaming for large files", "Add key rotation", "Add per-chunk authentication tags"],
    folder: "file-encryption",
    domain: "crypto"
  },
  {
    id: "rsa-keygen",
    num: "17",
    title: "RSA Key Pair Generator",
    purpose: "Generates RSA key pairs in pure Python — primality testing, key construction, and PEM export — to demystify asymmetric key material.",
    problem: "RSA is used everywhere but treated as a black box. Building it from primes up makes key size, primality, and the public/private relationship concrete.",
    capabilities: ["Configurable key size", "Miller-Rabin probabilistic primality testing", "Public/private exponent derivation", "PEM export of both keys"],
    workflow: ["Generate two large probable primes", "Compute the modulus and totient", "Derive public and private exponents", "Export keys in PEM format"],
    exampleInput: "python rsa_keygen.py --bits 2048 --out mykey",
    exampleOutput: `[PASS] Generated 2048-bit RSA key pair
       wrote mykey_public.pem, mykey_private.pem`,
    strengths: ["Pure-stdlib, transparent implementation", "Miller-Rabin explained inline", "Standard PEM output"],
    limitations: ["Educational — use vetted libraries in production", "No constant-time guarantees", "No key-usage policy enforcement"],
    roadmap: ["Add OAEP padding demo", "Add signature/verify example", "Add key-strength advisory vs NIST guidance"],
    folder: "rsa-keygen",
    domain: "crypto"
  },
  {
    id: "password-generator",
    num: "18",
    title: "Secure Password Generator",
    purpose: "Generates cryptographically secure passwords and passphrases with real entropy scoring and crack-time estimates.",
    problem: "Weak, predictable passwords remain a top breach cause. A generator must use a CSPRNG and be honest about the entropy it actually produces.",
    capabilities: ["Random, passphrase, and pronounceable modes", "CSPRNG-backed generation (secrets module)", "Shannon entropy scoring in bits", "Offline crack-time estimates"],
    workflow: ["Select mode and length/word count", "Draw from a CSPRNG", "Compute entropy for the chosen alphabet", "Report strength and estimated crack time"],
    exampleInput: "python password_generator.py --mode passphrase --words 5",
    exampleOutput: `Generated: correct-harbor-violet-mango-7Q
[PASS] Entropy: ~74 bits — offline crack time: centuries`,
    strengths: ["Uses secrets, not random", "Honest entropy math", "Human-friendly passphrase mode"],
    limitations: ["Entropy assumes attacker knows the scheme", "Wordlist quality affects passphrase strength", "No breach-corpus check"],
    roadmap: ["Add HaveIBeenPwned k-anonymity check", "Add policy templates per site", "Add QR export for password managers"],
    folder: "password-generator",
    domain: "iam"
  },
  {
    id: "password-manager",
    num: "19",
    title: "Encrypted Password Vault",
    purpose: "A local password vault encrypted at rest with AES-256 and a PBKDF2-derived master key — the KeePass/Bitwarden architecture, built small.",
    problem: "Reused passwords cascade one breach into many. A vault must encrypt at rest under a master password and never store it in plaintext.",
    capabilities: ["AES-256 encrypted vault file", "PBKDF2 key derivation from a master password", "CRUD + search over entries", "Password health check (weak/reused)"],
    workflow: ["Derive the vault key from the master password via PBKDF2", "Decrypt the vault into memory only", "Perform CRUD/search operations", "Re-encrypt and persist on save"],
    exampleInput: "python password_manager.py --vault vault.db --health",
    exampleOutput: `[HIGH] 2 reused passwords across 3 entries
[MED]  1 weak password (github.com)`,
    strengths: ["Master password never stored", "PBKDF2 stretches the key", "Health check surfaces reuse"],
    limitations: ["No cloud sync or sharing", "Single-device, single-vault", "No hardware-key unlock"],
    roadmap: ["Add Argon2id KDF option", "Add TOTP secret storage", "Add encrypted export/import"],
    folder: "password-manager",
    domain: "iam"
  },
  {
    id: "login-mfa",
    num: "20",
    title: "Login System with MFA",
    purpose: "A reference login flow with PBKDF2 password hashing, TOTP second factor (RFC 6238), account lockout, and session tokens — auth done right.",
    problem: "Auth is easy to get subtly wrong: plaintext or fast-hashed passwords, no second factor, no lockout. This models the whole flow the way it should be built.",
    capabilities: ["PBKDF2 salted password hashing", "TOTP MFA implemented from RFC 6238", "Account lockout after failed attempts", "Session-token issuance + optional Flask web mode"],
    workflow: ["Register with a salted PBKDF2 hash", "Verify password, then TOTP code", "Enforce lockout on repeated failures", "Issue a signed session token"],
    exampleInput: "python login_mfa_demo.py --mode demo",
    exampleOutput: `[PASS] Password verified (PBKDF2)
[PASS] TOTP accepted — session issued
[WARN] 3 failed attempts -> account locked 15m`,
    strengths: ["End-to-end auth model", "TOTP built from the spec", "Lockout + session handling included"],
    limitations: ["Demo store, not a production DB", "No WebAuthn/passkey support yet", "Single-node session model"],
    roadmap: ["Add WebAuthn/passkeys", "Add refresh-token rotation", "Add risk-based step-up auth"],
    folder: "login-mfa-demo",
    domain: "iam"
  },
  {
    id: "keylogger-detector",
    num: "21",
    title: "Keylogger Detector",
    purpose: "Scans a host for keylogging behavior — suspicious processes, startup persistence, keyboard hooks, and log files — a defender's tool.",
    problem: "Keyloggers hide in plain sight via startup entries and low-level hooks. Detection means correlating process, registry, hook, and file signals.",
    capabilities: ["Process scan against 50+ signatures", "Registry / startup persistence checks", "Keyboard-hook detection", "Suspicious log-file heuristics"],
    workflow: ["Enumerate running processes", "Check startup and registry autoruns", "Inspect for installed keyboard hooks", "Correlate signals into a risk verdict"],
    exampleInput: "python keylogger_detector.py --scan",
    exampleOutput: `[HIGH] Process 'svhost_log.exe' matches keylogger signature
[MED]  Startup entry writing to %APPDATA%\\keys.txt`,
    strengths: ["Multi-signal correlation", "Signature + behavioral checks", "Purely defensive"],
    limitations: ["Windows-focused checks", "Signature list is not exhaustive", "Cannot see kernel-mode rootkits"],
    roadmap: ["Add Linux/macOS hook detection", "Add YARA rule support", "Add EDR-style event timeline"],
    folder: "keylogger-detector",
    domain: "blue-team"
  },
  {
    id: "port-scanner",
    num: "22",
    title: "TCP Port Scanner",
    purpose: "Multi-threaded TCP connect scanner with banner grabbing, service hints, and presets over 80+ well-known ports.",
    problem: "You can't defend an attack surface you haven't mapped. Knowing which ports and services are exposed is step zero of any assessment.",
    capabilities: ["Multi-threaded TCP connect scanning", "Banner grabbing + service identification", "Well-known-port presets", "Basic OS/service hinting"],
    workflow: ["Resolve the target and select ports", "Open TCP connections concurrently", "Grab banners on open ports", "Summarize services and hints"],
    exampleInput: "python port_scanner.py --target example.com --preset common",
    exampleOutput: `[OPEN] 22/tcp   ssh    OpenSSH 9.6
[OPEN] 443/tcp  https  nginx
[SAFE] 3306/tcp closed`,
    strengths: ["Fast concurrent scanning", "Banner + service hints", "Preset port groups"],
    limitations: ["TCP connect only (noisy, no SYN stealth)", "Authorized targets only", "No UDP scanning"],
    roadmap: ["Add async SYN scanning", "Add UDP + service probes", "Add nmap-style output export"],
    folder: "port-scanner",
    domain: "cloud"
  },
  {
    id: "ssl-checker",
    num: "23",
    title: "SSL/TLS Certificate Checker",
    purpose: "Inspects a TLS endpoint's certificate — expiry, chain, weak ciphers, SANs — and assigns a letter grade.",
    problem: "Expired or weakly-configured certificates cause outages and downgrade attacks. A quick, gradeable check catches them before users do.",
    capabilities: ["Expiry and validity-window check", "Certificate chain validation", "Weak cipher / protocol detection", "SAN extraction + A–F grade"],
    workflow: ["Open a TLS connection to the host", "Read the presented certificate + chain", "Evaluate expiry, ciphers, and SANs", "Assign a letter grade with reasons"],
    exampleInput: "python ssl_checker.py --host example.com",
    exampleOutput: `Grade: A-
[PASS] Valid 61 days remaining, chain OK
[LOW]  TLS 1.1 still enabled`,
    strengths: ["Actionable letter grade", "Explains weak-cipher findings", "SAN coverage listing"],
    limitations: ["Point-in-time snapshot", "No OCSP/CT-log cross-check", "One host per run"],
    roadmap: ["Add OCSP + CRL checks", "Add CT-log monitoring", "Add bulk endpoint scanning"],
    folder: "ssl-checker",
    domain: "web"
  },
  {
    id: "phishing-detector",
    num: "24",
    title: "Phishing URL Detector",
    purpose: "Scores URLs for phishing risk using 17+ heuristic signals — brand impersonation, homoglyphs, suspicious TLDs — into a 0–100 risk score.",
    problem: "Phishing is the top initial-access vector. Many lures are catchable from the URL alone: look-alike domains, homoglyphs, and credential-bait paths.",
    capabilities: ["17+ heuristic signals", "Brand-impersonation detection", "Homoglyph / IDN look-alike detection", "0–100 risk scoring with reasons"],
    workflow: ["Parse the URL structure and host", "Run each heuristic signal", "Check brand and homoglyph patterns", "Aggregate into a risk score + verdict"],
    exampleInput: "python phishing_detector.py --url \"http://paypal-login.tk/verify\"",
    exampleOutput: `Risk: 88/100 (HIGH)
[HIGH] Brand 'paypal' in non-official domain
[MED]  Suspicious TLD .tk + 'verify' path`,
    strengths: ["Explainable per-signal scoring", "Homoglyph/IDN aware", "No blocklist dependency"],
    limitations: ["Heuristic — not a live reputation feed", "Can flag legitimate look-alikes", "URL-only, no page content analysis"],
    roadmap: ["Add optional reputation-feed enrichment", "Add page-content + form analysis", "Add ML classifier over the signals"],
    folder: "phishing-detector",
    domain: "web"
  },
  {
    id: "dir-bruteforce",
    num: "25",
    title: "Directory Brute-Force Detector",
    purpose: "Parses web-server logs to detect directory brute-forcing — 404/403 floods and scanner user-agents — a defensive counterpart to gobuster.",
    problem: "Content-discovery tools (gobuster, dirbuster) generate a distinctive 404/403 flood. Detecting it early flags reconnaissance in progress.",
    capabilities: ["Apache / Nginx log parsing", "404 / 403 flood detection per IP", "Scanner user-agent fingerprinting", "Sample-log generator for testing"],
    workflow: ["Parse access logs into events", "Aggregate error responses per IP/window", "Match known scanner user-agents", "Flag IPs exceeding thresholds"],
    exampleInput: "python dir_bruteforce_detector.py --logfile access.log",
    exampleOutput: `[HIGH] 203.0.113.9 — 214 x 404 in 60s (dirbuster UA)
[MED]  198.51.100.7 — 47 x 403 sequential paths`,
    strengths: ["Turns raw logs into recon alerts", "UA + rate correlation", "Includes a sample generator"],
    limitations: ["Log-file based, not live", "Thresholds need tuning per site", "Rotating IPs can evade"],
    roadmap: ["Add streaming log tailing", "Add fail2ban action hooks", "Add distributed-scan correlation"],
    folder: "directory-bruteforce-detector",
    domain: "blue-team"
  },
  {
    id: "subdomain-scanner",
    num: "26",
    title: "DNS Subdomain Scanner",
    purpose: "Brute-forces subdomains from a built-in wordlist with wildcard detection and multi-threaded resolution to map an org's DNS footprint.",
    problem: "Forgotten subdomains (staging, dev, admin) widen the attack surface and enable subdomain takeover. Enumerating them is core reconnaissance.",
    capabilities: ["150+ built-in subdomain prefixes", "Multi-threaded DNS resolution", "Wildcard-DNS detection to cut false positives", "Custom wordlist support"],
    workflow: ["Load prefixes and the target domain", "Detect wildcard DNS first", "Resolve candidates concurrently", "Report live subdomains + IPs"],
    exampleInput: "python subdomain_scanner.py --domain example.com",
    exampleOutput: `[FOUND] api.example.com     -> 203.0.113.10
[FOUND] staging.example.com -> 203.0.113.11
[SAFE]  wildcard DNS not detected`,
    strengths: ["Wildcard detection reduces noise", "Concurrent + fast", "Bring-your-own wordlist"],
    limitations: ["Dictionary-based, misses random names", "Authorized targets only", "No passive/cert-log sources"],
    roadmap: ["Add CT-log + passive DNS sources", "Add takeover-fingerprint checks", "Add recursive permutation scanning"],
    folder: "subdomain-scanner",
    domain: "cloud"
  },
  {
    id: "vuln-scanner",
    num: "27",
    title: "Vulnerability Scanner",
    purpose: "Combines port scanning, service detection, and a CVE lookup into a prioritized, remediation-oriented vulnerability report.",
    problem: "Open ports plus outdated services equal exploitable risk. Tying detected services to known CVEs turns a scan into an action list.",
    capabilities: ["Port scan + service/version detection", "Lookup against a bundled CVE set", "Risk rating per finding", "Concrete remediation guidance"],
    workflow: ["Scan ports and identify services", "Match service versions to CVE entries", "Rate risk and severity", "Emit prioritized remediation report"],
    exampleInput: "python vuln_scanner.py --target example.com",
    exampleOutput: `[HIGH] OpenSSH 7.4 -> CVE-2018-15473 (user enumeration)
[MED]  nginx 1.14 -> upgrade advised`,
    strengths: ["Ties services to CVEs", "Prioritized + remediation-first", "Single-command assessment"],
    limitations: ["Bundled CVE set, not a live feed", "Version-based, may false-positive", "Authorized targets only"],
    roadmap: ["Integrate the live NVD API", "Add authenticated checks", "Add SBOM-based matching"],
    folder: "vuln-scanner",
    domain: "cloud"
  }
];

export const valueProposition = [
  "Build practical security tools from scratch with clean, reproducible interfaces",
  "Translate attack theory into detection logic and remediation outcomes",
  "Balance red-team awareness with blue-team operational thinking",
  "Create outputs useful to both engineers and security analysts",
  "Communicate limitations transparently — essential in real security programs",
  "Work across identity, application, cloud, and detection disciplines in one coherent engineering system"
];

export const ethicsStatement = [
  "Use only on systems you own or have explicit permission to test",
  "Avoid production disruption and excessive traffic",
  "Prefer safe test accounts and lower-volume simulations",
  "Treat findings responsibly and coordinate remediation with stakeholders",
  "Follow legal and organizational policies for security testing at all times"
];
