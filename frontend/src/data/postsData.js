// Client-side blog content. Add a new entry here to publish a post — no
// backend required. Two kinds of post:
//   • External: set `url` → "Read More" links out (e.g. ReadyTensor, Annam.ai).
//   • Internal: set `content` (Markdown, GitHub-flavoured) → renders at /posts/:slug.
// Keep the newest post first.

export const posts = [
  {
    slug: 'agentic-browsers-same-origin-policy',
    title: "Agentic Browsers Deleted the Same-Origin Policy. The Industry Can't Agree That's a Bug.",
    excerpt:
      "Agentic browsers removed the same-origin policy — on purpose, as a feature. Why the PleaseFix vulnerability class demonstrated at Black Hat USA 2026 isn't an AI problem but a web security problem, and what it means when the load-bearing wall of the browser security model is deleted by design.",
    category: 'AI Security',
    date: '2026-08-31',
    readTime: '5 min read',
    tags: ['AI', 'Security', 'WebDev', 'Browser'],
    cover: '/posts/agentic-browsers-same-origin-policy.png',
    url: 'https://dev.to/mohit_kumar1/agentic-browsers-deleted-the-same-origin-policy-the-industry-cant-agree-thats-a-bug-20g2',
    source: 'dev.to · originally on Hashnode',
  },
  {
    slug: 'owasp-llm-top-10-2026-blast-radius',
    title: "The OWASP LLM Top 10 2026 Is Not a Vulnerability List. It's a Blast Radius Document",
    excerpt:
      "The 2026 OWASP Top 10 for LLM Applications didn't just reorder — it changed its own thesis. Stop trying to build a model that cannot be fooled; build the system so that when the model is fooled, nothing important breaks. Why this quietly invalidates half the AI security tooling being sold right now.",
    category: 'AI Security',
    date: '2026-08-24',
    readTime: '5 min read',
    tags: ['AI', 'Security', 'LLM', 'Architecture'],
    cover: '/posts/owasp-llm-top10-2026.png',
    url: 'https://dev.to/mohit_kumar1/the-owasp-llm-top-10-2026-is-not-a-vulnerability-list-its-a-blast-radius-document-1j6o',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark (Warden)' },
  },
  {
    slug: 'ai-bill-of-materials',
    title: "You Can't Govern What You Can't See: Building an AI Bill of Materials",
    excerpt:
      "You can't govern an AI system you can't inventory — the models, datasets, prompts, MCP servers, tools, and dependencies it's assembled from. How an AI Bill of Materials (AI-BOM) makes that whole supply chain visible in a standards-based CycloneDX/SPDX inventory, with risk folded in and mapped to NIST AI RMF and the EU AI Act.",
    category: 'AI Security',
    date: '2026-08-19',
    readTime: '8 min read',
    tags: ['AI', 'Security', 'AI-BOM', 'DevOps'],
    cover: '/posts/ai-bill-of-materials.png',
    url: 'https://dev.to/mohit_kumar1/you-cant-govern-what-you-cant-see-building-an-ai-bill-of-materials-1e3a',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark (Manifest)' },
  },
  {
    slug: 'ai-agent-excessive-agency',
    title: 'Your AI Agent Has Too Much Power: Auditing Excessive Agency',
    excerpt:
      "An AI agent assembled from individually reasonable permissions can still end up able to read every secret and reach the open internet in the same breath. Why excessive agency is a graph problem, not a checklist, and how to audit an agent — its tools, scopes, and toxic combinations — down to least privilege before it ships.",
    category: 'AI Security',
    date: '2026-08-10',
    readTime: '8 min read',
    tags: ['AI', 'Security', 'LLM', 'Agents'],
    cover: '/posts/ai-agent-excessive-agency.png',
    url: 'https://dev.to/mohit_kumar1/your-ai-agent-has-too-much-power-auditing-excessive-agency-24ih',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark (Warden)' },
  },
  {
    slug: 'ml-model-pickle-rce',
    title: 'How an ML Model Runs Code on Your Machine (Pickle RCE)',
    excerpt:
      "A pickled model file isn't data — it's a program that executes the moment you load it. How pickle-based remote code execution actually works, why the 2025 bypass wave slips past naive scanners, and how a static analyzer can disassemble the opcode stream to catch it without ever deserializing the file.",
    category: 'AI Security',
    date: '2026-08-03',
    readTime: '9 min read',
    tags: ['AI', 'ML Security', 'Pickle RCE', 'Supply Chain'],
    cover: '/posts/pickle-rce-scanner.png',
    url: 'https://mohitkumar1.hashnode.dev/ml-model-pickle-rce-scanner',
    source: 'Hashnode',
    relatedProject: { slug: 'bulwark', title: 'Bulwark (Airlock)' },
  },
  {
    slug: 'benchmark-inflating-its-own-score',
    title: 'The Benchmark That Kept Inflating Its Own Score',
    excerpt:
      'When an evaluation harness and the system under test quietly share assumptions, the benchmark can end up grading itself generously — and the numbers drift up for the wrong reasons. A debugging story about catching a benchmark inflating its own score, and what it taught me about honest measurement in ML systems.',
    category: 'AI Security',
    date: '2026-08-03',
    readTime: '8 min read',
    tags: ['ML Evaluation', 'Benchmarking', 'Testing', 'Security'],
    cover: '/posts/benchmark-inflating-score.png',
    url: 'https://dev.to/mohit_kumar1/the-benchmark-that-kept-inflating-its-own-score-200p',
    source: 'dev.to · originally on Hashnode',
    relatedProject: { slug: 'ir-siem-kql', title: 'Schema-Grounded NL→KQL' },
  },
  {
    slug: 'security-stack-for-ai-agents',
    title: "I Built a Security Stack for AI Agents — Here's the Architecture",
    excerpt:
      "Airlock scans the parts. Warden scans the assembly. Manifest inventories it. How Bulwark's three-tool security suite inspects the uninspected AI supply chain — models, packages, and agentic pipelines — before they ever reach production.",
    category: 'AI Security',
    date: '2026-07-27',
    readTime: '8 min read',
    tags: ['AI', 'Cybersecurity', 'Agents', 'Architecture'],
    cover: '/posts/security-stack-for-ai-agents.png',
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
    cover: '/posts/ai-assistant-downloads-code.png',
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
    cover: '/posts/ai-control-of-a-stadium.png',
    url: 'https://dev.to/mohit_kumar1/i-gave-an-ai-control-of-an-80000-seat-stadium-heres-how-i-kept-it-on-a-leash-384d',
    source: 'dev.to · originally on Hashnode',
    challenge: 'Hack2skill PromptWars Virtual Challenge',
  },
  {
    slug: 'inside-a-7-agent-email-security-system',
    title: 'We Gave Email Security a Team of Analysts That Never Sleep',
    excerpt:
      'How a multi-agent AI system investigates suspicious emails in seconds — and, unlike traditional tools, tells you exactly why.',
    category: 'Multi-Agent Systems',
    date: '2026-09-04',
    readTime: '8 min read',
    tags: ['Agentic AI', 'Email Security', 'Explainable AI', 'MITRE ATT&CK', 'Applied AI'],
    cover: '/posts/email-security/fig1_old_vs_agentic.png',
    content: `Almost every serious cyberattack still begins the same humble way: someone receives an email. A convincing message, a link that looks almost right, an attachment that seems routine. Email remains the number-one way attackers get their first foothold inside an organization — and defenders have spent years playing catch-up.

The frustrating part isn't that we lack tools. It's that the tools we have tend to work in isolation and then hand a security analyst a verdict with no explanation. "This email is risky." Okay — but why? Which part? What would change the answer? To find out, an analyst opens one console after another, copies findings between them, and pieces the story together by hand. It routinely takes 30 minutes or more per email, and there are thousands of them.

We took a different approach. Instead of one tool doing everything in sequence, we built a coordinated team of **seven specialized AI agents** that examine an email at the same time, combine what they find, and produce a clear, explained decision in seconds.

## The core idea: a team of specialists, not a single gatekeeper

Think about how a good security team actually works. You don't ask one person to be simultaneously the world expert on sender authentication, malicious links, dangerous file types, attacker infrastructure, and human behavior. You bring together specialists, let each look at the problem through their own lens, and then compare notes.

Our system works the same way. Seven independent agents each focus on one dimension of an email. Crucially, they run **in parallel** — all at once, not one after another — so adding more depth of analysis doesn't slow things down. Their findings are then fused into a single, coherent verdict by a decision layer that is deliberately predictable and auditable.

> The shift in one sentence: we moved from a system that asks "is this email malicious?" to one that answers "why is this malicious, what evidence supports it, and what should we do about it?"

## How it works: four clean stages

Every email travels through the same four-stage pipeline. Keeping these stages separate is what makes the system fast, resilient, and easy to reason about.

![Figure 1 — An email's journey from arrival to resolution.](/posts/email-security/fig2_four_stage_journey.png)

In plain terms: the **Ingestion** stage opens the email and extracts everything worth checking — including text hidden inside images and QR codes — while quietly skipping anything it has already analyzed. The **Analysis** stage is where the seven specialists do their work. The **Decision** stage weighs and cross-checks all the evidence and writes the verdict. Finally, the **Action** stage does something useful with that verdict instead of just raising yet another alert.

## Meet the seven specialists

Each agent is backed by its own machine-learning model and a set of expert rules. Here's what each one is really asking:

![Figure 2 — Seven agents, each an expert on one part of the email.](/posts/email-security/fig3_seven_agents.png)

No single one of these signals is conclusive on its own. A slightly odd sending pattern, a shortened link, a mildly urgent tone — individually, each is easy to dismiss. The power comes from **correlation**: when several weak signals line up, the system recognizes the composite attack that any single check would have missed. Just as importantly, when the agents disagree — say, alarming content but a perfectly legitimate sender — the decision layer applies a penalty rather than crying wolf.

## The real breakthrough: it explains itself

This is where the system departs most sharply from conventional email security. A typical product tells you an email was blocked and stops there. Ours produces an **analyst-ready explanation** for every decision, built from three ingredients.

![Figure 3 — A sample verdict, with evidence, a counterfactual, and a storyline.](/posts/email-security/fig4_explained_verdict.png)

- **The evidence.** A ranked list of exactly which agents contributed to the verdict and how strongly — so the reasoning is transparent, not a black box.
- **The counterfactual.** In plain English, the single most useful sentence in security: what would have had to be different for the verdict to change. *"If the sender had passed authentication and the link led to the real domain, this would have been rated likely-safe."* That turns a score into understanding.
- **The storyline.** The attack retold as a short narrative — delivery, lure, weaponization, containment — with each step mapped to the industry-standard **MITRE ATT&CK** framework, so seasoned analysts get the rigor they expect while everyone else gets a story they can follow.

> Why this matters to the business: explanations are what let a security team trust automation. When people can see the reasoning, they act faster, second-guess less, and stop drowning in alerts they can't interpret.

## Acting with care, not with a sledgehammer

A verdict is only useful if something happens next. But automation in security has to be handled responsibly — you do not want a system deleting a CEO's legitimate mail because it was slightly over-eager. So the response is **graduated**: the more confident and severe the verdict, the stronger the action.

![Figure 4 — The response escalates in step with the verdict.](/posts/email-security/fig5_graduated_response.png)

Low-risk mail is delivered, sometimes with a gentle warning banner. Genuinely dangerous mail can be quarantined, deleted, or have its sender blocked automatically — and high-risk cases can even trigger a deeper investigation on the affected device. Every one of these live actions can be gated behind human approval, and the system ships in a "simulated mode" that logs precisely what it would do before it is ever trusted to touch a real mailbox.

## Does it actually work?

Short answer: yes — and it holds up under both statistical and practical scrutiny. Across the individual agent models, detection quality is consistently high, and end-to-end testing against a spread of real-world email types (credential phishing, business-email-compromise fraud, malicious-invoice scams, and legitimate mail) produced accurate verdicts with all seven agents participating.

![Figure 5 — Key outcomes from model evaluation and end-to-end testing.](/posts/email-security/fig6_results.png)

Beyond the headline accuracy, two numbers tend to catch a leader's attention: the collapse of investigation time from tens of minutes to seconds, and the potential to cut repetitive alerts by up to 80%. That is not just a detection improvement — it is a direct reduction in the operational burden and burnout that quietly cripples security teams.

## Built for the real world

Impressive lab numbers mean little if a system can't be deployed and trusted. Three design choices make this one practical for real organizations:

- **It runs on ordinary hardware.** No expensive, scarce GPUs are required — which lowers cost and makes adoption far easier for most enterprises.
- **It fails gracefully.** If one or more agents are temporarily unavailable, the system still reaches a responsible decision from the agents it does have — and it labels that decision as partial, so no one is misled.
- **It respects the data.** Because it processes sensitive communications, it is built with data-minimization, encryption, role-based access, immutable audit trails, and deletion workflows for regulations like GDPR and CCPA in mind.

## What's next

The architecture is designed to keep learning. On the roadmap: a **visual agent** that screenshots and "looks at" suspicious login pages to catch brand impersonation that text analysis misses; finer-grained feature-level attributions for analysts; an automated **red-team** that invents novel phishing to find and fix blind spots; and privacy-preserving learning that lets multiple organizations improve the models together without ever sharing raw email.

## The bottom line

Email security has spent a long time as a **filter** — a wall that silently blocks things and hopes you trust it. This work reframes it as an **investigator**: a system that detects, explains, and responds, and that treats the human analyst as a partner to be informed rather than a bottleneck to be bypassed. Detection alone was never the hard part. Understanding, at scale, was — and that is the gap this closes.

*This is a writeup of my work on agentic email security at ITC Infotech. See the [project deep-dive](/projects/agentic-email-security) or [get in touch](/contact).*`,
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
