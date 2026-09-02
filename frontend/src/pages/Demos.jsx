import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaProjectDiagram, FaBug, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaArrowRight, FaGithub, FaPlay } from 'react-icons/fa'
import SEO from '../components/SEO'

const SEV = {
  critical: { c: '#ef4444', I: FaExclamationTriangle },
  high: { c: '#f97316', I: FaExclamationTriangle },
  warn: { c: '#f59e0b', I: FaExclamationTriangle },
  ok: { c: '#10b981', I: FaCheckCircle },
  info: { c: '#0891b2', I: FaInfoCircle },
}
function Finding({ sev, children }) {
  const { c, I } = SEV[sev] || SEV.info
  return (
    <div className="flex items-start gap-2.5 text-sm py-1.5">
      <I style={{ color: c }} className="mt-0.5 shrink-0" />
      <span className="text-gray-300">{children}</span>
    </div>
  )
}
const inputCls = 'w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2.5 font-mono text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50'

/* ----------------------------- Bastion: RBAC → escalation path ----------- */
function analyzeRBAC(text) {
  if (!text.trim()) return null
  const t = text
  const has = (re) => re.test(t)
  const findings = []
  const edges = []
  if (/kind:\s*ClusterRoleBinding[\s\S]{0,400}?cluster-admin/i.test(t) || /name:\s*['"]?cluster-admin/i.test(t)) {
    findings.push(['critical', 'A subject is bound to cluster-admin — it already holds every permission in the cluster.']); edges.push('admin')
  }
  if (/verbs:[\s\S]{0,40}['"]?\*['"]?[\s\S]{0,120}resources:[\s\S]{0,40}['"]?\*/i.test(t) || /resources:[\s\S]{0,40}['"]?\*['"]?[\s\S]{0,120}verbs:[\s\S]{0,40}['"]?\*/i.test(t)) {
    findings.push(['critical', 'A role grants verbs ["*"] on resources ["*"] — a de-facto cluster-admin.']); edges.push('wildcard')
  }
  const RULES = [
    [/\bpods\b[\s\S]{0,120}\bcreate\b|\bcreate\b[\s\S]{0,120}\bpods\b(?!\/)/i, 'high', 'E1  create pods → schedule a pod that runs as any ServiceAccount in the namespace, and use that account’s token.', 'sa'],
    [/pods\/(exec|attach)|ephemeralcontainers/i, 'high', 'E3  pods/exec → inherit a running pod’s ServiceAccount identity.', 'sa'],
    [/\bsecrets\b[\s\S]{0,120}(get|list|watch)|(get|list|watch)[\s\S]{0,120}\bsecrets\b/i, 'high', 'E4  read Secrets → harvest tokens and credentials.', 'secrets'],
    [/\bimpersonate\b/i, 'critical', 'E5  impersonate → directly assume another user / group / SA.', 'admin'],
    [/\b(bind|escalate)\b|(role|cluster)?bindings?[\s\S]{0,120}\bcreate\b|\bcreate\b[\s\S]{0,120}(role|cluster)?bindings?/i, 'critical', 'E6  create bindings / bind / escalate → self-grant any role, up to cluster-admin.', 'grant'],
    [/(update|patch)[\s\S]{0,80}(roles|clusterroles)/i, 'critical', 'E7  patch roles → rewrite your own permissions.', 'grant'],
    [/nodes\/proxy/i, 'critical', 'E10  nodes/proxy → the kubelet API → every pod on the node.', 'node'],
    [/serviceaccounts\/token/i, 'high', 'E9  create serviceaccounts/token → mint another identity’s token.', 'sa'],
  ]
  for (const [re, sev, msg, tag] of RULES) if (has(re)) { findings.push([sev, msg]); edges.push(tag) }
  let path = null
  if (edges.includes('admin') || edges.includes('wildcard')) path = ['a subject', 'is bound to a cluster-admin-equivalent role', 'cluster-admin']
  else if (edges.includes('sa') && edges.includes('grant')) path = ['a subject', 'creates a pod as a privileged ServiceAccount', 'that SA can create bindings', 'cluster-admin']
  else if (edges.includes('sa') && edges.includes('secrets')) path = ['a subject', 'runs a pod as an SA that can read Secrets', 'every credential in the namespace']
  if (!findings.length) findings.push(['ok', 'No escalation edges detected in this manifest. A clean scan is evidence, not proof — Bastion also follows RBAC defined elsewhere.'])
  findings.push(['info', 'Simplified in-browser preview. The real Bastion builds a full privilege graph and runs deterministic BFS to cluster-admin, node, and secrets — with file:line evidence for every edge.'])
  return { findings, path }
}
const RBAC_SAMPLE = `# app/ci-runner can create pods
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata: { name: ci-runner-pods, namespace: app }
roleRef: { kind: Role, name: pod-creator }
subjects: [{ kind: ServiceAccount, name: ci-runner, namespace: app }]
---
kind: Role
metadata: { name: pod-creator, namespace: app }
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create"]
---
# core/controller-sa can create ClusterRoleBindings
kind: ClusterRole
metadata: { name: rbac-writer }
rules:
  - apiGroups: ["rbac.authorization.k8s.io"]
    resources: ["clusterrolebindings"]
    verbs: ["create", "bind"]`

function BastionDemo() {
  const [text, setText] = useState('')
  const r = useMemo(() => analyzeRBAC(text), [text])
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-10 h-10 rounded-lg bg-audio/10 flex items-center justify-center"><FaProjectDiagram className="text-audio" /></div>
        <div>
          <h2 className="text-lg font-semibold">Bastion — Kubernetes RBAC attack paths</h2>
          <Link to="/projects/bastion" className="text-xs text-gray-500 hover:text-vision">about the project →</Link>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">Paste Kubernetes RBAC YAML — it finds the escalation edges and, if one exists, the path to <span className="font-mono">cluster-admin</span>. <Link to="/case-study" className="text-audio hover:underline">See a real finding on argo-cd →</Link></p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="Paste RoleBindings / ClusterRoles / workloads…" className={inputCls} />
      <button onClick={() => setText(RBAC_SAMPLE)} className="mt-2 inline-flex items-center gap-2 text-xs text-audio hover:underline"><FaPlay className="text-[10px]" /> Load a vulnerable sample</button>
      {r && (
        <div className="mt-4 space-y-3">
          {r.path && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-semibold">Escalation path found</div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {r.path.map((step, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded ${i === r.path.length - 1 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{step}</span>
                    {i < r.path.length - 1 && <FaArrowRight className="text-red-400/60 text-[10px]" />}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-secondary/60 rounded-lg p-3 border border-white/10">{r.findings.map(([s, m], i) => <Finding key={i} sev={s}>{m}</Finding>)}</div>
        </div>
      )}
    </div>
  )
}

/* --------------------------- Stowaway: deps → typosquat / confusion ------- */
const POPULAR = ['react', 'react-dom', 'lodash', 'express', 'axios', 'chalk', 'commander', 'debug', 'moment', 'request', 'colors', 'async', 'webpack', 'underscore', 'jquery', 'vue', 'next', 'typescript', 'eslint', 'dotenv', 'uuid', 'node-fetch', 'mongoose', 'redux',
  'requests', 'numpy', 'pandas', 'flask', 'django', 'scipy', 'matplotlib', 'pillow', 'boto3', 'urllib3', 'click', 'pytest', 'tensorflow', 'torch', 'scikit-learn', 'beautifulsoup4', 'pyyaml', 'sqlalchemy', 'fastapi', 'cryptography', 'jinja2', 'certifi']
function levenshtein(a, b) {
  const m = a.length, n = b.length
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) d[i][0] = i
  for (let j = 0; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[m][n]
}
function parseDeps(text) {
  const t = text.trim()
  try {
    const j = JSON.parse(t)
    const deps = { ...(j.dependencies || {}), ...(j.devDependencies || {}) }
    return Object.entries(deps).map(([name, version]) => ({ name, version: String(version) }))
  } catch { /* not JSON — treat as requirements.txt / list */ }
  return t.split(/[\n,]+/).map((l) => l.trim()).filter(Boolean).filter((l) => !l.startsWith('#')).map((l) => {
    const m = l.match(/^([@a-zA-Z0-9._/-]+)\s*(?:[=<>~!]=?\s*(.+))?$/)
    return m ? { name: m[1], version: m[2] || '' } : { name: l, version: '' }
  })
}
function analyzeDeps(text) {
  if (!text.trim()) return null
  const deps = parseDeps(text)
  if (!deps.length) return { error: 'No dependencies found — paste a package.json or a requirements.txt.' }
  const findings = []
  for (const { name, version } of deps) {
    const bare = name.replace(/^@[^/]+\//, '')
    if (/[^\x00-\x7f]/.test(name)) { findings.push(['critical', `${name}: contains non-ASCII characters — homoglyph package spoof.`]); continue }
    if (POPULAR.includes(name) || POPULAR.includes(bare)) { continue }
    let best = null
    for (const p of POPULAR) { const d = levenshtein(bare, p); if (d > 0 && d <= 2 && Math.abs(bare.length - p.length) <= 2 && (best === null || d < best.d)) best = { p, d } }
    if (best) { findings.push(['critical', `${name}: one keystroke from "${best.p}" (edit distance ${best.d}) — classic typosquat. A mistyped install pulls the attacker's package.`]); continue }
    if (/^@[a-z0-9-]+\//i.test(name) || /^(mycorp|internal|acme|corp)[-_]/i.test(name)) { findings.push(['warn', `${name}: internal-looking namespace — if this name is also registerable on the public registry, it's a dependency-confusion target. Pin the source.`]); continue }
    if (/^(0\.0\.0|9+\.9+\.9+)$/.test(version)) findings.push(['warn', `${name}: implausible version "${version}" — the classic dependency-confusion shape.`])
  }
  if (!findings.length) findings.push(['ok', `Scanned ${deps.length} dependencies — no typosquats, confusion, or homoglyphs detected.`])
  findings.push(['info', 'Preview using a small bundled popularity corpus. The real Stowaway checks 782 names across npm/PyPI/Go/Cargo, plus install-hook malware and lockfile tampering — fully offline.'])
  return { findings, count: deps.length }
}
const DEP_SAMPLE = `{
  "dependencies": {
    "react": "^18.2.0",
    "loadash": "^4.17.21",
    "expres": "^4.18.0",
    "colours": "^1.4.0",
    "@mycorp/auth-utils": "^1.0.0"
  }
}`

function StowawayDemo() {
  const [text, setText] = useState('')
  const r = useMemo(() => analyzeDeps(text), [text])
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-10 h-10 rounded-lg bg-vision/10 flex items-center justify-center"><FaBug className="text-vision" /></div>
        <div>
          <h2 className="text-lg font-semibold">Stowaway — supply-chain integrity</h2>
          <Link to="/projects/stowaway" className="text-xs text-gray-500 hover:text-vision">about the project →</Link>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">Paste a <span className="font-mono">package.json</span> or <span className="font-mono">requirements.txt</span> — it flags typosquats, dependency confusion, and homoglyph names.</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder='{ "dependencies": { … } }  or  one package per line' className={inputCls} />
      <button onClick={() => setText(DEP_SAMPLE)} className="mt-2 inline-flex items-center gap-2 text-xs text-vision hover:underline"><FaPlay className="text-[10px]" /> Load a sample with typosquats</button>
      {r?.error && <p className="text-sm text-red-400 mt-3 font-mono">✗ {r.error}</p>}
      {r && !r.error && <div className="mt-4 bg-secondary/60 rounded-lg p-3 border border-white/10">{r.findings.map(([s, m], i) => <Finding key={i} sev={s}>{m}</Finding>)}</div>}
    </div>
  )
}

export default function Demos() {
  return (
    <>
      <SEO
        title="Try the Scanners | Mohit Kumar — Live Security Demos"
        description="Run my open-source security scanners in your browser: Bastion finds Kubernetes RBAC escalation paths to cluster-admin, and Stowaway flags dependency typosquats and confusion. Client-side, no data leaves your browser."
        keywords="Kubernetes RBAC demo, privilege escalation, typosquat detection, dependency confusion, Bastion, Stowaway, live security tool demo, Mohit Kumar"
        pathname="/demos"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium mb-4">
              <FaPlay className="text-xs" /> Try the scanners
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Run My Scanners <span className="gradient-text">Live</span></h1>
            <p className="text-gray-400 max-w-xl mx-auto">In-browser previews of two of my open-source scanners. Paste real input, get real findings — nothing you type ever leaves your browser.</p>
          </motion.div>

          <div className="space-y-8">
            <BastionDemo />
            <StowawayDemo />
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            These are simplified previews. The full scanners (SARIF output, CI gates, 590+/136 tests) live on{' '}
            <a href="https://github.com/mk12002" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1"><FaGithub /> GitHub</a>{' '}·{' '}
            <Link to="/projects" className="text-accent hover:underline">all projects →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
