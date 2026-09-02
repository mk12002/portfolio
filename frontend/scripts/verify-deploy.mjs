// Post-DEPLOY verification — runs against the live URL, i.e. the serving layer
// where the /projects bug actually lived (the build-time prerender check can't
// see routing/serving by construction). Fetches each route and asserts the
// served HTML has the right per-route canonical, og:url, twitter:url, and real
// body content. Exits non-zero on any failure so it can gate a deploy.
//
//   node scripts/verify-deploy.mjs                       # checks production
//   node scripts/verify-deploy.mjs https://<preview>.vercel.app
const SITE = (process.argv[2] || process.env.SITE || 'https://mohitkumar-mu.vercel.app').replace(/\/$/, '')

// [path, expected body substring that only the real page contains]
const routes = [
  ['/', 'Security Tooling Suite'],
  ['/projects', 'Bulwark'],
  ['/demos', 'typosquat'],
  ['/case-study', 'cluster-admin'],
  ['/projects/bastion', 'cluster-admin'],
  ['/projects/lattice', 'post-quantum'],
  ['/posts', 'Excessive Agency'],
  ['/posts/ai-agent-excessive-agency', 'excessive agency'],
  ['/experiences', 'Security Engineer'],
  ['/publications', 'Scientific Reports'],
  ['/resume', 'Security Engineer'],
]

const grab = (html, re) => (html.match(re) || [])[1] || ''

let failed = 0
for (const [path, needle] of routes) {
  const url = SITE + path
  const want = SITE + path
  let html = ''
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'prerender-verify/1.0 (no-js)' } })
    html = await res.text()
  } catch (e) {
    console.log(`✗ ${path}  — fetch failed: ${e.message}`)
    failed++
    continue
  }
  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/)
  const ogUrl = grab(html, /<meta property="og:url" content="([^"]*)"/)
  const twUrl = grab(html, /<meta name="twitter:url" content="([^"]*)"/)
  const hasBody = html.includes(needle)
  const canonOk = canonical === want
  const ogOk = ogUrl === want
  const twOk = twUrl === want
  const ok = canonOk && ogOk && twOk && hasBody
  if (!ok) failed++
  const bad = []
  if (!canonOk) bad.push(`canonical=${canonical || '∅'}`)
  if (!ogOk) bad.push(`og:url=${ogUrl || '∅'}`)
  if (!twOk) bad.push(`twitter:url=${twUrl || '∅'}`)
  if (!hasBody) bad.push(`missing body text "${needle}"`)
  console.log(`${ok ? '✓' : '✗'} ${path}${ok ? '' : '  — ' + bad.join(', ')}`)
}

// Security headers — assert the hardening actually reaches the browser.
// (A security engineer's site failing a headers scan is the worst look; this gates it.)
const requiredHeaders = {
  'content-security-policy': /default-src 'self'/,
  'strict-transport-security': /max-age=\d{6,}/,
  'x-content-type-options': /nosniff/,
  'x-frame-options': /DENY/i,
  'referrer-policy': /strict-origin/,
  'permissions-policy': /camera=\(\)/,
}
console.log('\nSecurity headers (on /):')
try {
  const res = await fetch(SITE + '/', { headers: { 'user-agent': 'prerender-verify/1.0' } })
  for (const [name, re] of Object.entries(requiredHeaders)) {
    const val = res.headers.get(name)
    const ok = val && re.test(val)
    if (!ok) failed++
    console.log(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  — ${val ? `got "${val}"` : 'missing'}`}`)
  }
} catch (e) {
  failed++
  console.log(`  ✗ header fetch failed: ${e.message}`)
}

console.log('')
if (failed) {
  console.error(`FAILED: ${failed} check(s) failed on ${SITE} (routes and/or security headers).`)
  console.error('If canonical/og:url point at the homepage or body text is missing, the route is falling back to the SPA shell.')
  console.error('If a security header is missing, confirm vercel.json headers deployed and no proxy stripped them.')
  process.exit(1)
}
console.log(`OK: all ${routes.length} routes serve per-route canonical + og:url + twitter:url + real body, and security headers are present on ${SITE}.`)
