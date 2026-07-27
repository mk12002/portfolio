// Client-side blog content. Add a new entry here to publish a post — no
// backend required. Two kinds of post:
//   • External: set `url` → "Read More" links out (e.g. ReadyTensor, Annam.ai).
//   • Internal: set `content` (Markdown, GitHub-flavoured) → renders at /posts/:slug.
// Keep the newest post first.

export const posts = [
  {
    slug: 'security-stack-for-ai-agents',
    title: "I Built a Security Stack for AI Agents — Here's the Architecture",
    excerpt:
      "Airlock scans the parts. Warden scans the assembly. Manifest inventories it. How Bulwark's three-tool security suite inspects the uninspected AI supply chain — models, packages, and agentic pipelines — before they ever reach production.",
    category: 'AI Security',
    date: '2026-07-27',
    readTime: '8 min read',
    tags: ['AI', 'Cybersecurity', 'Agents', 'Architecture'],
    cover: 'https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fvgn6jp5380j13y8bqdel.png',
    url: 'https://dev.to/mohit_kumar1/i-built-a-security-stack-for-ai-agents-heres-the-architecture-219c',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark' },
  },
  {
    slug: 'ai-assistant-downloads-code-from-strangers',
    title: "Your AI Assistant Downloads Code From Strangers. Here's Why That's a Problem.",
    excerpt:
      "Your AI coding assistant installs packages, spins up MCP servers, and runs code it pulled from people you've never met — and almost none of it is ever inspected. Why the agentic supply chain is a genuine security problem, and what it takes to put a gate in front of it.",
    category: 'AI Security',
    date: '2026-07-20',
    readTime: '7 min read',
    tags: ['AI', 'Cybersecurity', 'Agents', 'Supply Chain'],
    cover: 'https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fadjhair3l9sgwk06kpub.png',
    url: 'https://dev.to/mohit_kumar1/your-ai-assistant-downloads-code-from-strangers-heres-why-thats-a-problem-2cpf',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark' },
  },
  {
    slug: 'ai-control-of-a-stadium-on-a-leash',
    title: "I Gave an AI Control of an 80,000-Seat Stadium — Here's How I Kept It on a Leash",
    excerpt:
      "Built for the Hack2skill PromptWars Virtual Challenge: what happens when you hand an autonomous AI agent real authority over a critical system — an 80,000-seat stadium's operations — and how to bound that authority so one bad decision can't cascade. A practical take on agent guardrails, least privilege, and keeping excessive agency in check.",
    category: 'AI Security',
    date: '2026-07-14',
    readTime: '9 min read',
    tags: ['AI', 'Agents', 'Python', 'Cybersecurity'],
    cover: 'https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F7uer1ocleug0fmw9bn50.png',
    url: 'https://dev.to/mohit_kumar1/i-gave-an-ai-control-of-an-80000-seat-stadium-heres-how-i-kept-it-on-a-leash-384d',
    source: 'dev.to · originally on Hashnode',
    challenge: 'Hack2skill PromptWars Virtual Challenge',
  },
  {
    slug: 'inside-a-7-agent-email-security-system',
    title: 'Inside a 7-Agent Email Security System',
    excerpt:
      'How I decomposed email threat-neutralization into seven cooperating AI agents, the orchestration that keeps it fast, and the engineering trade-offs that made it run in 30GB of RAM.',
    category: 'Multi-Agent Systems',
    date: '2026-05-20',
    readTime: '11 min read',
    tags: ['Agentic AI', 'LangGraph', 'Email Security', 'XGBoost', 'TinyBERT'],
    cover: '🛡️',
    content: `Most "AI email security" is a single classifier bolted onto a mail server. That works until an attacker rephrases the lure, swaps the payload, or splits intent across the headers, the body, and a look-alike domain. A monolithic model has to be good at *everything at once* — and is therefore reliably mediocre at the cases that actually matter.

When I started this work at ITC Infotech, the brief was blunt: catch advanced phishing, credential harvesting, and business-email-compromise (BEC) that the existing gateway was missing — without ballooning latency or cost. The design I landed on treats detection as a **team of seven specialised agents**, each responsible for exactly one decision, coordinated by an orchestrator.

## Why multi-agent (and not one big model)

A single large model conflates unrelated signals. A spoofed display name, a freshly-registered domain, and urgent "reset your password now" language are *different kinds* of evidence, and forcing one network to weigh them jointly makes it brittle and unexplainable.

Splitting the problem lets each agent stay small, fast, independently testable, and — crucially — independently *improvable*. When a new BEC pattern slips through, I retrain one agent, not the whole system.

- **Triage** — a cheap first pass that drops obviously-benign mail before any expensive analysis runs. This is where most of the latency budget is saved.
- **Header & auth** — SPF/DKIM/DMARC alignment, routing anomalies, Reply-To/From mismatches, and display-name spoofing.
- **URL & domain** — look-alike (homoglyph/typosquat) detection, redirect-chain unrolling, and reputation lookups.
- **Content intent** — a fine-tuned **TinyBERT** reads the body specifically for credential-harvesting and BEC language, not generic "spam-ness."
- **Attachment** — engineered static features over file metadata fed to an **XGBoost** model (polyglots, macro-bearing Office files, suspicious archives).
- **Correlation** — fuses the per-agent verdicts into a single calibrated risk score.
- **Response** — quarantine, rewrite, or release — each with a human-readable justification.

## The orchestration

The agents run as a graph in **LangGraph**. The edges are *conditional*, which is the whole trick: triage can short-circuit straight to *release*, while a suspicious URL escalates only the agents that are relevant to that signal. You never pay for the heavy language and attachment agents on clean mail.

\`\`\`python
# Conditional escalation — heavy agents run only when signals warrant it
state = triage_agent.run(email)
if state.risk < LOW_THRESHOLD:
    return Verdict.RELEASE                  # ~70% of mail exits here, cheaply

graph.run([header_agent, url_agent])        # always-cheap structural checks
if any_signal_suspicious(state):
    graph.run([content_agent, attachment_agent])   # expensive, conditional

verdict = correlation_agent.fuse(state)
return response_agent.act(verdict)
\`\`\`

Because the graph is explicit, every decision has a *trace*: which agents fired, what each contributed, and why the correlation agent landed where it did.

## Fitting seven models in 30GB

Running seven models naively blows the memory budget instantly. Three decisions kept it lean:

1. **Distilled, quantised models.** TinyBERT over a full transformer for the content agent — a fraction of the footprint with negligible loss on this narrow task.
2. **Lazy residency.** An agent's weights are only resident while it's on the active path. On the ~70% of mail that exits at triage, the language and attachment models never load.
3. **Classical ML where it wins.** XGBoost over engineered attachment features beat a neural model at a fraction of the cost — a good reminder that "agentic" doesn't mean "an LLM for everything."

## Calibration beats raw accuracy

Early on, the system was "accurate" but untrustworthy: it would block a legitimate invoice with the same confidence it blocked a phishing kit. The fix was **score calibration** at the correlation stage — making the risk score mean what it says — plus per-tenant thresholds so a bank and a startup can tune their own tolerance for false positives.

## What I'd tell my past self

The biggest win wasn't a model — it was **making every verdict explainable**. When the correlation agent can say *"flagged: DMARC fail + look-alike domain + credential-harvest language,"* analysts trust it, and a false positive becomes a five-second conversation instead of a black-box argument.

> Security tooling lives or dies on whether a human can act on its output. Build the explanation in from day one — retrofitting it is painful.

If I were starting again I'd invest even earlier in a **replay harness**: a corpus of real (sanitised) threats and benign mail that I can re-run the whole graph against on every change. Agentic systems have a lot of moving parts, and the only way to refactor one confidently is to be able to prove you didn't regress.

*This is a writeup of my work on agentic email security at ITC Infotech. Want the deeper architecture or a walkthrough? [Get in touch](/contact).*`,
  },
  {
    slug: 'base64-is-not-encryption',
    title: 'Base64 Is Not Encryption — and Other CTF Lessons',
    excerpt:
      'A practical reminder about encoding vs. encryption, single-byte XOR, and why client-side "hiding" is never security — with full solutions to my own mini-CTF.',
    category: 'Security',
    date: '2026-04-02',
    readTime: '6 min read',
    tags: ['CTF', 'Cryptography', 'Web Security', 'AppSec'],
    cover: '🏴',
    content: `I put a [tiny CTF](/ctf) on this site. It looks like a toy, but each of the three challenges encodes a failure mode I see in *production* systems all the time. Here's the reasoning behind each — and the real-world bug it maps to.

## 1. Encoding is not encryption

Base64 turns arbitrary bytes into an ASCII-safe string. It provides **zero confidentiality** — there's no key, so anyone can reverse it:

\`\`\`js
atob('ZmxhZ3tiNHMzXzY0X2QzYzBkM2R9') // → the flag, instantly
\`\`\`

**Where this bites in production:** "tokens" that are just Base64-wrapped JSON treated as if they were secret. The classic case is an *unsigned* (or \`alg: none\`) JWT — base64url header and payload with no meaningful signature. If your authorization logic trusts the claims inside without verifying a signature, an attacker rewrites \`"role": "user"\` to \`"role": "admin"\`, re-encodes, and walks in. (My [JWT analyzer](/playground) flags exactly this.)

## 2. Client-side hiding is not security

The second flag lives in an HTML comment on the page. Finding it *is* the challenge — and the point is that **anything shipped to the browser is readable**: HTML comments, source maps, "private" config in JS bundles, commented-out endpoints.

\`\`\`html
<!-- flag{1nsp3ct_3lem3nt} -->
\`\`\`

**Where this bites in production:** API keys baked into frontend bundles, "hidden" admin routes that are just un-linked (not access-controlled), and feature flags that gate UI but not the underlying API. The browser is the attacker's machine — treat every byte you send it as public.

## 3. Small keyspaces fall instantly

The third flag is single-byte XOR-encrypted. XOR with a one-byte key has only **255 possible keys** — you don't attack the algorithm, you just try them all:

\`\`\`python
ct = bytes.fromhex('0c0e07010d3b10360f364e331b16330f3d')
for k in range(256):
    out = bytes(b ^ k for b in ct)
    if out.startswith(b'flag{'):
        print(k, out.decode())   # key 42 → flag{x0r_m4st3r}
\`\`\`

**Where this bites in production:** roll-your-own "encryption," predictable IVs, short or low-entropy keys, and ECB-mode block ciphers that leak structure. The strength is in key length and algorithm choice — never in obscurity.

## Why I bother with a CTF on a portfolio

Two reasons. For the **security community**, it's a quick signal that I think about failure modes, not just features. For **everyone else**, it's a more honest demonstration than a bullet point: if you can solve it, you already have the instincts these challenges test for.

And because the flags here are validated by **SHA-256** rather than a plaintext compare, you can't just grep the bundle for the answer — which is itself lesson #2, applied to my own site.

Go try it: [/ctf](/ctf). Writeups are built into the page once you're done (or stuck).`,
  },
  {
    slug: 'nexus-agentic-research-system',
    title: 'Nexus: A Three-Pronged Agentic AI System for Intelligent Research and Analysis',
    excerpt:
      'A multi-agent system for automated research discovery and synthesis using LangGraph. Published on ReadyTensor.',
    category: 'AI Research',
    date: '2025-08-11',
    readTime: '10 min read',
    tags: ['Multi-Agent', 'LangGraph', 'Research Automation'],
    cover: '🔬',
    url: 'https://app.readytensor.ai/publications/nexus-a-three-pronged-agentic-ai-system-for-intelligent-research-and-analysis-Y06tMJMVmNjI',
    source: 'ReadyTensor',
  },
  {
    slug: 'sanchalak-rural-welfare',
    title: 'Sanchalak: Revolutionizing Rural Welfare Access',
    excerpt:
      'A voice-first system to streamline access to government welfare schemes for farmers in rural India. Published on Annam.ai.',
    category: 'Social Impact',
    date: '2025-08-11',
    readTime: '8 min read',
    tags: ['Social Impact', 'Government Tech', 'Rural Development', 'AI for Good'],
    cover: '🌾',
    url: 'https://annam.ai/2025/08/11/sanchalak-revolutionizing-rural-welfare-access/',
    source: 'Annam.ai',
  },
]

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}

export const postCategories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
