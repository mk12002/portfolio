import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaKey, FaLock, FaFingerprint, FaShieldAlt, FaExclamationTriangle, FaCheckCircle,
  FaInfoCircle, FaExchangeAlt, FaHashtag, FaCookieBite, FaListUl, FaDice, FaNetworkWired,
} from 'react-icons/fa'
import SEO from '../components/SEO'

/* ------------------------------------------------------------------ helpers */
function b64urlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return decodeURIComponent(atob(s).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
}

const SEV = {
  critical: { color: '#ef4444', Icon: FaExclamationTriangle },
  warn: { color: '#f59e0b', Icon: FaExclamationTriangle },
  ok: { color: '#10b981', Icon: FaCheckCircle },
  info: { color: '#0891b2', Icon: FaInfoCircle },
}

function Finding({ sev, children }) {
  const { color, Icon } = SEV[sev]
  return (
    <div className="flex items-start gap-2.5 text-sm py-1.5">
      <Icon style={{ color }} className="mt-0.5 shrink-0" />
      <span className="text-gray-300">{children}</span>
    </div>
  )
}

function Pre({ label, obj }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</div>
      <pre className="bg-[#0d1117] text-emerald-300 rounded-lg p-3 text-xs overflow-x-auto border border-white/10 font-mono">
        {typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2)}
      </pre>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-secondary/60 rounded-lg p-3 border border-white/10">
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</div>
      <div className="font-mono text-accent break-all">{value}</div>
    </div>
  )
}

const inputCls = 'w-full bg-secondary/60 border border-white/10 rounded-lg px-3 py-2.5 font-mono text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50'
const Findings = ({ items }) => (
  <div className="bg-secondary/60 rounded-lg p-3 border border-white/10">
    {items.map(([sev, msg], i) => <Finding key={i} sev={sev}>{msg}</Finding>)}
  </div>
)

/* ----------------------------------------------------------------- 1. JWT */
function JWTAnalyzer() {
  const [token, setToken] = useState('')
  const result = useMemo(() => {
    if (!token.trim()) return null
    const parts = token.trim().split('.')
    if (parts.length !== 3) return { error: 'A JWT must have 3 dot-separated parts (header.payload.signature).' }
    try {
      const header = JSON.parse(b64urlDecode(parts[0]))
      const payload = JSON.parse(b64urlDecode(parts[1]))
      const f = []
      const alg = (header.alg || '').toString()
      if (alg.toLowerCase() === 'none') f.push(['critical', 'alg is "none" — signature verification disabled. Trivially forgeable.'])
      else if (alg.startsWith('HS')) f.push(['warn', `Symmetric alg (${alg}). Safe only with a strong secret; watch for RS/HS key-confusion.`])
      else if (alg.startsWith('RS') || alg.startsWith('ES')) f.push(['ok', `Asymmetric alg (${alg}). Verified with a public key.`])
      else f.push(['info', `Algorithm: ${alg || 'unspecified'}.`])
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp == null) f.push(['warn', 'No "exp" claim — token never expires.'])
      else if (payload.exp < now) f.push(['critical', `Expired ${Math.round((now - payload.exp) / 60)} min ago.`])
      else f.push(['ok', `Valid until ${new Date(payload.exp * 1000).toISOString()}.`])
      if (!payload.iss) f.push(['info', 'No "iss" (issuer) claim.'])
      if (!payload.aud) f.push(['info', 'No "aud" (audience) claim.'])
      return { header, payload, findings: f }
    } catch { return { error: 'Could not decode — header/payload are not valid base64url JSON.' } }
  }, [token])
  const sample = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.'
  return (
    <ToolShell icon={FaKey} title="JWT Analyzer" blurb="Decode and inspect a JSON Web Token for algorithm, claims, and common misconfigurations.">
      <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={3} placeholder="Paste a JWT…" className={inputCls + ' text-xs break-all'} />
      <button onClick={() => setToken(sample)} className="text-xs text-accent hover:underline mt-2">Load a sample (alg:none)</button>
      {result?.error && <p className="text-sm text-red-400 mt-4 font-mono">✗ {result.error}</p>}
      {result && !result.error && (
        <div className="mt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3"><Pre label="Header" obj={result.header} /><Pre label="Payload" obj={result.payload} /></div>
          <Findings items={result.findings} />
        </div>
      )}
    </ToolShell>
  )
}

/* ------------------------------------------------------------ 2. Password */
const STRENGTH = [
  { max: 28, label: 'Very weak', color: '#ef4444' }, { max: 36, label: 'Weak', color: '#f59e0b' },
  { max: 60, label: 'Reasonable', color: '#eab308' }, { max: 128, label: 'Strong', color: '#10b981' },
  { max: Infinity, label: 'Very strong', color: '#059669' },
]
function humanTime(seconds) {
  if (seconds < 1) return 'instant'
  const u = [['century', 3.154e9], ['year', 3.154e7], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]]
  for (const [n, s] of u) if (seconds >= s) { const v = seconds / s; return v > 1e6 ? `${v.toExponential(1)} ${n}s` : `${Math.round(v).toLocaleString()} ${n}${Math.round(v) === 1 ? '' : 's'}` }
  return 'instant'
}
function poolOf(pw) {
  let pool = 0
  if (/[a-z]/.test(pw)) pool += 26
  if (/[A-Z]/.test(pw)) pool += 26
  if (/[0-9]/.test(pw)) pool += 10
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33
  return pool
}
function PasswordAnalyzer() {
  const [pw, setPw] = useState(''); const [show, setShow] = useState(false)
  const r = useMemo(() => {
    if (!pw) return null
    const pool = poolOf(pw)
    const entropy = pw.length * Math.log2(pool || 1)
    const strength = STRENGTH.find((s) => entropy <= s.max)
    const seconds = Math.pow(2, entropy) / 1e11 / 2
    const notes = []
    if (pw.length < 12) notes.push(['warn', 'Under 12 characters — length beats complexity.'])
    if (pool <= 26) notes.push(['warn', 'Single character class — mix cases, digits & symbols.'])
    if (/(.)\1{2,}/.test(pw)) notes.push(['warn', 'Repeated characters reduce real entropy.'])
    if (/^(123|abc|qwerty|password|admin)/i.test(pw)) notes.push(['critical', 'Starts with a common pattern — in every wordlist.'])
    if (entropy >= 60 && notes.length === 0) notes.push(['ok', 'No obvious weaknesses detected.'])
    return { pool, entropy, strength, seconds, notes }
  }, [pw])
  return (
    <ToolShell icon={FaLock} title="Password Strength" blurb="Estimate entropy and offline crack-time. Nothing leaves your browser — no network requests, ever.">
      <div className="flex gap-2">
        <input type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Type a password to analyze…" className={inputCls + ' flex-1'} />
        <button onClick={() => setShow((s) => !s)} className="px-3 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm">{show ? 'Hide' : 'Show'}</button>
      </div>
      {r && (
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5"><span className="font-medium" style={{ color: r.strength.color }}>{r.strength.label}</span><span className="text-gray-500 font-mono">{r.entropy.toFixed(0)} bits</span></div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, r.entropy)}%`, background: r.strength.color }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3"><Stat label="Charset size" value={r.pool} /><Stat label="Est. crack time" value={humanTime(r.seconds)} /></div>
          {r.notes.length > 0 && <Findings items={r.notes} />}
        </div>
      )}
    </ToolShell>
  )
}

/* ----------------------------------------------------------- 3. Hash ID */
const HASH_RULES = [
  { re: /^[a-f0-9]{32}$/i, names: ['MD5', 'NTLM', 'MD4'] }, { re: /^[a-f0-9]{40}$/i, names: ['SHA-1', 'RIPEMD-160'] },
  { re: /^[a-f0-9]{56}$/i, names: ['SHA-224'] }, { re: /^[a-f0-9]{64}$/i, names: ['SHA-256', 'SHA3-256', 'BLAKE2s'] },
  { re: /^[a-f0-9]{96}$/i, names: ['SHA-384'] }, { re: /^[a-f0-9]{128}$/i, names: ['SHA-512', 'SHA3-512', 'BLAKE2b'] },
  { re: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, names: ['bcrypt'] }, { re: /^\$argon2(id|i|d)\$/, names: ['Argon2'] },
  { re: /^\$6\$/, names: ['sha512crypt (Unix)'] }, { re: /^\$5\$/, names: ['sha256crypt (Unix)'] }, { re: /^\$1\$/, names: ['md5crypt (Unix)'] },
  { re: /^[a-f0-9]{16}$/i, names: ['MySQL < 4.1', 'CRC / half-MD5'] },
]
function HashIdentifier() {
  const [hash, setHash] = useState('')
  const matches = useMemo(() => {
    const h = hash.trim(); if (!h) return null
    return HASH_RULES.filter((r) => r.re.test(h)).flatMap((r) => r.names)
  }, [hash])
  return (
    <ToolShell icon={FaFingerprint} title="Hash Identifier" blurb="Guess a hash's algorithm from its length and format — the first step in any credential-cracking workflow.">
      <input value={hash} onChange={(e) => setHash(e.target.value)} placeholder="Paste a hash digest…" className={inputCls + ' text-xs break-all'} />
      <div className="flex flex-wrap gap-2 mt-2">
        {['5f4dcc3b5aa765d61d8327deb882cf99', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', '$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW'].map((s, i) => (
          <button key={i} onClick={() => setHash(s)} className="text-xs text-accent hover:underline">Sample {i + 1}</button>
        ))}
      </div>
      {matches !== null && (
        <div className="mt-4 bg-secondary/60 rounded-lg p-3 border border-white/10">
          {matches.length ? (
            <><div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Likely candidates</div>
              <div className="flex flex-wrap gap-2">{matches.map((m) => <span key={m} className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-sm border border-accent/20 font-mono">{m}</span>)}</div></>
          ) : <p className="text-sm text-gray-400">No match by length/format — could be salted, truncated, or encoded.</p>}
        </div>
      )}
    </ToolShell>
  )
}

/* ------------------------------------------------------- 4. Base64 / URL */
function Codec() {
  const [text, setText] = useState(''); const [out, setOut] = useState(''); const [err, setErr] = useState('')
  const run = (fn) => { try { setErr(''); setOut(fn(text)) } catch { setErr('Operation failed — check the input format.') } }
  const ops = [
    ['Base64 encode', (t) => btoa(unescape(encodeURIComponent(t)))],
    ['Base64 decode', (t) => decodeURIComponent(escape(atob(t.trim())))],
    ['URL encode', (t) => encodeURIComponent(t)],
    ['URL decode', (t) => decodeURIComponent(t)],
  ]
  return (
    <ToolShell icon={FaExchangeAlt} title="Base64 / URL Codec" blurb="Encode and decode text — handy for inspecting tokens, payloads, and query strings. (Encoding is not encryption!)">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Enter text…" className={inputCls + ' text-xs'} />
      <div className="flex flex-wrap gap-2 mt-2">
        {ops.map(([label, fn]) => <button key={label} onClick={() => run(fn)} className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20 text-xs hover:bg-accent/20 transition-colors">{label}</button>)}
      </div>
      {err && <p className="text-sm text-red-400 mt-3 font-mono">✗ {err}</p>}
      {out && !err && <div className="mt-4"><Pre label="Output" obj={out} /></div>}
    </ToolShell>
  )
}

/* --------------------------------------------------------- 5. Hash gen */
function HashGenerator() {
  const [text, setText] = useState('hello world'); const [hashes, setHashes] = useState({})
  useEffect(() => {
    let active = true
    const enc = new TextEncoder().encode(text)
    Promise.all(['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map(async (algo) => {
      const buf = await crypto.subtle.digest(algo, enc)
      return [algo, Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')]
    })).then((entries) => { if (active) setHashes(Object.fromEntries(entries)) })
    return () => { active = false }
  }, [text])
  return (
    <ToolShell icon={FaHashtag} title="Hash Generator" blurb="Compute SHA-1 / 256 / 384 / 512 of any input using the browser's Web Crypto API. (MD5 is intentionally omitted — it's broken.)">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to hash…" className={inputCls} />
      <div className="mt-4 space-y-2">
        {Object.entries(hashes).map(([algo, hex]) => (
          <div key={algo}>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{algo}</div>
            <div className="bg-[#0d1117] text-emerald-300 rounded-lg p-2.5 text-xs font-mono break-all border border-white/10">{hex}</div>
          </div>
        ))}
      </div>
    </ToolShell>
  )
}

/* --------------------------------------------------------- 6. Cookie */
function CookieAnalyzer() {
  const [raw, setRaw] = useState('')
  const r = useMemo(() => {
    const s = raw.trim().replace(/^set-cookie:\s*/i, ''); if (!s) return null
    const parts = s.split(';').map((p) => p.trim())
    const attrs = parts.slice(1).map((p) => p.toLowerCase().split('=')[0])
    const has = (a) => attrs.includes(a)
    const sameSite = (parts.find((p) => /^samesite=/i.test(p)) || '').split('=')[1] || null
    const f = []
    f.push(has('secure') ? ['ok', 'Secure flag set — cookie only sent over HTTPS.'] : ['critical', 'Missing Secure — cookie can leak over plain HTTP.'])
    f.push(has('httponly') ? ['ok', 'HttpOnly set — not readable from JavaScript (XSS-resistant).'] : ['warn', 'Missing HttpOnly — readable by JS; exposed to XSS token theft.'])
    if (!sameSite) f.push(['warn', 'No SameSite — defaults vary by browser; set Lax or Strict to reduce CSRF.'])
    else if (sameSite.toLowerCase() === 'none') f.push(['warn', 'SameSite=None — sent cross-site; ensure this is intended (must be Secure).'])
    else f.push(['ok', `SameSite=${sameSite} — good CSRF protection.`])
    if (parts.some((p) => /^domain=/i.test(p))) f.push(['info', 'Domain set — scoped to subdomains; verify it is not over-broad.'])
    return { name: parts[0].split('=')[0], findings: f }
  }, [raw])
  return (
    <ToolShell icon={FaCookieBite} title="Cookie Security Analyzer" blurb="Paste a Set-Cookie header to audit its Secure, HttpOnly, SameSite, and scope attributes.">
      <input value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="session=abc123; Path=/; HttpOnly; Secure; SameSite=Lax" className={inputCls + ' text-xs'} />
      <button onClick={() => setRaw('session=abc123; Path=/; Domain=.example.com; Max-Age=3600')} className="text-xs text-accent hover:underline mt-2">Load a weak sample</button>
      {r && <div className="mt-4"><div className="text-sm text-gray-500 mb-2 font-mono">Cookie: {r.name}</div><Findings items={r.findings} /></div>}
    </ToolShell>
  )
}

/* --------------------------------------------------- 7. Security headers */
const HEADER_CHECKS = [
  { key: 'content-security-policy', label: 'Content-Security-Policy', miss: ['critical', 'No CSP — primary defense against XSS/data injection is absent.'] },
  { key: 'strict-transport-security', label: 'Strict-Transport-Security', miss: ['warn', 'No HSTS — browsers may allow downgrade to HTTP.'] },
  { key: 'x-content-type-options', label: 'X-Content-Type-Options', miss: ['warn', 'Missing — set "nosniff" to stop MIME-type sniffing.'] },
  { key: 'x-frame-options', label: 'X-Frame-Options', miss: ['warn', 'Missing — clickjacking risk (or use CSP frame-ancestors).'] },
  { key: 'referrer-policy', label: 'Referrer-Policy', miss: ['info', 'Missing — consider "strict-origin-when-cross-origin".'] },
  { key: 'permissions-policy', label: 'Permissions-Policy', miss: ['info', 'Missing — lock down camera/mic/geolocation if unused.'] },
]
function HeadersAnalyzer() {
  const [raw, setRaw] = useState('')
  const r = useMemo(() => {
    if (!raw.trim()) return null
    const present = new Set(raw.split('\n').map((l) => l.split(':')[0].trim().toLowerCase()).filter(Boolean))
    return HEADER_CHECKS.map((c) => present.has(c.key) ? ['ok', `${c.label} present.`] : c.miss)
  }, [raw])
  const sample = 'HTTP/2 200\ncontent-type: text/html\nstrict-transport-security: max-age=63072000\nx-content-type-options: nosniff'
  return (
    <ToolShell icon={FaListUl} title="Security Headers Analyzer" blurb="Paste a set of HTTP response headers to grade the key security headers a hardened site should send.">
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={4} placeholder={'Paste response headers, one per line…'} className={inputCls + ' text-xs'} />
      <button onClick={() => setRaw(sample)} className="text-xs text-accent hover:underline mt-2">Load a sample</button>
      {r && <div className="mt-4"><Findings items={r} /></div>}
    </ToolShell>
  )
}

/* --------------------------------------------------------- 8. CSP eval */
function CSPEvaluator() {
  const [csp, setCsp] = useState('')
  const r = useMemo(() => {
    const s = csp.trim().replace(/^content-security-policy:\s*/i, ''); if (!s) return null
    const dirs = Object.fromEntries(s.split(';').map((d) => d.trim().split(/\s+/)).filter((a) => a[0]).map((a) => [a[0].toLowerCase(), a.slice(1)]))
    const f = []
    const script = dirs['script-src'] || dirs['default-src'] || []
    if (script.includes("'unsafe-inline'")) f.push(['critical', "script-src allows 'unsafe-inline' — defeats most XSS protection."])
    if (script.includes("'unsafe-eval'")) f.push(['warn', "script-src allows 'unsafe-eval' — enables eval-based injection."])
    if (script.includes('*')) f.push(['critical', 'script-src includes a wildcard (*) — any origin can load scripts.'])
    if (!dirs['default-src'] && !dirs['script-src']) f.push(['warn', 'No default-src or script-src — script loading is unrestricted.'])
    if (!dirs['object-src']) f.push(['warn', "No object-src — set to 'none' to block plugin-based injection."])
    if (!dirs['base-uri']) f.push(['info', "No base-uri — set to 'self' to prevent <base> hijacking."])
    if (!dirs['frame-ancestors']) f.push(['info', 'No frame-ancestors — add to control framing (clickjacking).'])
    if (f.length === 0) f.push(['ok', 'No obvious weaknesses in the supplied directives.'])
    return { count: Object.keys(dirs).length, findings: f }
  }, [csp])
  return (
    <ToolShell icon={FaShieldAlt} title="CSP Evaluator" blurb="Paste a Content-Security-Policy value to flag unsafe directives and missing protections.">
      <textarea value={csp} onChange={(e) => setCsp(e.target.value)} rows={3} placeholder="default-src 'self'; script-src 'self' 'unsafe-inline'; ..." className={inputCls + ' text-xs'} />
      <button onClick={() => setCsp("default-src 'self'; script-src 'self' 'unsafe-inline' *; style-src 'self'")} className="text-xs text-accent hover:underline mt-2">Load a weak sample</button>
      {r && <div className="mt-4 space-y-3"><div className="text-sm text-gray-500 font-mono">{r.count} directives parsed</div><Findings items={r.findings} /></div>}
    </ToolShell>
  )
}

/* ------------------------------------------------------ 9. PW generator */
function PasswordGenerator() {
  const [len, setLen] = useState(20)
  const [opts, setOpts] = useState({ lower: true, upper: true, digit: true, symbol: true })
  const [pw, setPw] = useState(''); const [copied, setCopied] = useState(false)
  const gen = () => {
    const sets = { lower: 'abcdefghijklmnopqrstuvwxyz', upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', digit: '0123456789', symbol: '!@#$%^&*()-_=+[]{};:,.?/' }
    const pool = Object.entries(opts).filter(([k, v]) => v).map(([k]) => sets[k]).join('')
    if (!pool) { setPw(''); return }
    const rnd = crypto.getRandomValues(new Uint32Array(len))
    setPw(Array.from(rnd, (n) => pool[n % pool.length]).join('')); setCopied(false)
  }
  useEffect(() => { gen() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const entropy = pw ? (pw.length * Math.log2(poolOf(pw) || 1)).toFixed(0) : 0
  return (
    <ToolShell icon={FaDice} title="Password Generator" blurb="Generate a cryptographically-random password with crypto.getRandomValues(). Generated locally — never transmitted.">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-gray-400">Length</span>
        <input type="range" min="8" max="48" value={len} onChange={(e) => setLen(+e.target.value)} className="flex-1 accent-accent" />
        <span className="font-mono text-accent w-8 text-right">{len}</span>
      </div>
      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        {Object.keys(opts).map((k) => (
          <label key={k} className="flex items-center gap-1.5 text-gray-300 capitalize cursor-pointer">
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="accent-accent" />{k}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm text-emerald-300 break-all border border-white/10">{pw || '—'}</div>
        <button onClick={gen} className="px-3 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm hover:bg-accent/20">Regenerate</button>
        <button onClick={() => { navigator.clipboard?.writeText(pw); setCopied(true) }} className="px-3 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      {pw && <p className="text-xs text-gray-500 mt-2 font-mono">~{entropy} bits of entropy</p>}
    </ToolShell>
  )
}

/* ----------------------------------------------------- 10. CIDR calc */
function cidrInfo(input) {
  const m = input.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/)
  if (!m) return { error: 'Enter an IPv4 CIDR like 192.168.1.0/24' }
  const o = [m[1], m[2], m[3], m[4]].map(Number); const prefix = Number(m[5])
  if (o.some((x) => x > 255) || prefix > 32) return { error: 'Invalid IP octet or prefix length.' }
  const ip = o[0] * 16777216 + o[1] * 65536 + o[2] * 256 + o[3]
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const net = (ip & mask) >>> 0; const bcast = (net | (~mask >>> 0)) >>> 0
  const toIp = (n) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.')
  const total = Math.pow(2, 32 - prefix)
  return {
    prefix, network: toIp(net), broadcast: toIp(bcast), netmask: toIp(mask), wildcard: toIp(~mask >>> 0),
    firstHost: prefix >= 31 ? toIp(net) : toIp((net + 1) >>> 0), lastHost: prefix >= 31 ? toIp(bcast) : toIp((bcast - 1) >>> 0),
    total, usable: prefix >= 31 ? total : Math.max(0, total - 2),
  }
}
function CIDRCalculator() {
  const [cidr, setCidr] = useState('192.168.1.0/24')
  const r = useMemo(() => cidrInfo(cidr), [cidr])
  return (
    <ToolShell icon={FaNetworkWired} title="CIDR / Subnet Calculator" blurb="Compute network range, mask, and host counts for an IPv4 CIDR block — useful for scoping and firewall rules.">
      <input value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="192.168.1.0/24" className={inputCls} />
      {r?.error && <p className="text-sm text-red-400 mt-3 font-mono">✗ {r.error}</p>}
      {r && !r.error && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Stat label="Network" value={`${r.network}/${r.prefix}`} /><Stat label="Broadcast" value={r.broadcast} />
          <Stat label="Netmask" value={r.netmask} /><Stat label="Wildcard" value={r.wildcard} />
          <Stat label="Host range" value={`${r.firstHost} – ${r.lastHost}`} /><Stat label="Usable hosts" value={r.usable.toLocaleString()} />
        </div>
      )}
    </ToolShell>
  )
}

/* ------------------------------------------------------------ tool shell */
function ToolShell({ icon: Icon, title, blurb, children }) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><Icon className="text-accent" /></div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-gray-400 text-sm mb-4">{blurb}</p>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ page */
const TOOLS = [
  { id: 'jwt', name: 'JWT', icon: FaKey, C: JWTAnalyzer },
  { id: 'pw', name: 'Password', icon: FaLock, C: PasswordAnalyzer },
  { id: 'hashid', name: 'Hash ID', icon: FaFingerprint, C: HashIdentifier },
  { id: 'codec', name: 'Base64/URL', icon: FaExchangeAlt, C: Codec },
  { id: 'hashgen', name: 'Hash Gen', icon: FaHashtag, C: HashGenerator },
  { id: 'cookie', name: 'Cookie', icon: FaCookieBite, C: CookieAnalyzer },
  { id: 'headers', name: 'Headers', icon: FaListUl, C: HeadersAnalyzer },
  { id: 'csp', name: 'CSP', icon: FaShieldAlt, C: CSPEvaluator },
  { id: 'pwgen', name: 'PW Gen', icon: FaDice, C: PasswordGenerator },
  { id: 'cidr', name: 'CIDR', icon: FaNetworkWired, C: CIDRCalculator },
]

export default function Playground() {
  const [active, setActive] = useState('jwt')
  const Active = TOOLS.find((t) => t.id === active).C
  return (
    <>
      <SEO
        title="Security Playground | Mohit Kumar"
        description="10 interactive, in-browser security tools — JWT analyzer, password entropy, hash identifier & generator, cookie & CSP & security-header analyzers, Base64/URL codec, password generator, and CIDR calculator. By Mohit Kumar."
        keywords="JWT analyzer, password strength, hash identifier, CSP evaluator, security headers, CIDR calculator, interactive security tools, Mohit Kumar"
        pathname="/playground"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium mb-4">
              <FaShieldAlt /> 10 tools · live &amp; client-side
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Security <span className="gradient-text">Playground</span></h1>
            <p className="text-gray-400 max-w-xl mx-auto">A working subset of my security toolkit, running entirely in your browser — nothing you type is ever sent to a server.</p>
          </motion.div>

          {/* Tool selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TOOLS.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                  active === t.id ? 'bg-accent/15 text-accent border-accent/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}>
                <t.icon className="text-xs" /> {t.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <Active />
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-gray-500 text-xs mt-10">
            Lightweight demos of concepts from my 14-tool{' '}
            <a href="/projects/security-tools" className="text-accent hover:underline">Security Engineering Toolkit</a>.
          </p>
        </div>
      </div>
    </>
  )
}
