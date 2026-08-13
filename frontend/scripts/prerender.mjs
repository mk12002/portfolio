// Post-build prerender: turn the CSR SPA into per-route static HTML.
//
// For every known route it writes dist/<route>/index.html with:
//   • a route-correct <title>, meta description, Open Graph / Twitter tags, and
//     — critically — a per-route <link rel="canonical"> (the SPA shipped one
//     homepage canonical for every route, self-deindexing /projects, /posts…);
//   • real, human-readable fallback content injected INSIDE <div id="root">.
//     React's createRoot().render() clears #root on mount, so browsers get the
//     full app while non-JS clients (ATS parsers, scrapers, link-preview bots,
//     AI agents, archive tools) finally see actual content instead of a blank body.
//
// Runs as `postbuild`. Requires Vercel `cleanUrls: true` so /projects serves
// dist/projects/index.html at the filesystem step, before the SPA rewrite.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, '../dist')
const dataDir = resolve(here, '../src/data')
const SITE = 'https://mohitkumar-mu.vercel.app'
const DEFAULT_OG = `${SITE}/og-image.png`

const readJSON = (f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8'))
const projects = readJSON('projectsContent.json').projects
const experiences = readJSON('experiencesContent.json').experiences
const publications = readJSON('publicationsContent.json').publications
const profile = readJSON('profileContent.json')
const resume = readJSON('resumeContent.json')
const { posts } = await import('../src/data/postsData.js')

const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (u) => (!u ? DEFAULT_OG : u.startsWith('http') ? u : `${SITE}${u}`)

// og image = first raster (non-SVG) image in a project, else the default card
function ogFor(project) {
  const exts = ['.png', '.jpg', '.jpeg', '.webp']
  let found = null
  const walk = (o) => {
    if (found || !o || typeof o !== 'object') return
    if (Array.isArray(o)) return o.forEach(walk)
    if (typeof o.src === 'string' && exts.some((e) => o.src.toLowerCase().endsWith(e))) found = o.src
    else Object.values(o).forEach(walk)
  }
  walk(project)
  return abs(found)
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

function render({ route, title, description, ogImage = DEFAULT_OG, body = '' }) {
  const url = SITE + (route === '/' ? '/' : route)
  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'title', title)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', ogImage)
  html = setMeta(html, 'property', 'og:image:secure_url', ogImage)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:image', ogImage)
  if (!/<link rel="canonical"[^>]*>/.test(html)) throw new Error(`[prerender] ${route}: no <link rel="canonical"> in built index.html to rewrite`)
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  if (!html.includes(`<link rel="canonical" href="${url}" />`)) throw new Error(`[prerender] ${route}: canonical rewrite produced no change`)
  // Fallback content lives inside #root; React's createRoot().render() clears it
  // on mount. display:none keeps it out of the visual first paint (no flash) while
  // remaining in the HTML source for non-JS text extractors and archives.
  const injected = html.replace('<div id="root"></div>', `<div id="root"><div id="ssr-fallback" style="display:none">${body}</div></div>`)
  if (injected === html) throw new Error(`[prerender] ${route}: content injection FAILED — '<div id="root"></div>' not found in built index.html. Refusing to emit a bodyless shell.`)
  return injected
}

function write(route, html) {
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}

const li = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>`
const P = (parts) => parts.filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('')

// ---- build the page list ------------------------------------------------
const pages = []
const NAME = 'Mohit Kumar'
const ROLE = 'Security Engineer · AI for Security & Security for AI'

// Home
pages.push({
  route: '/',
  title: 'Mohit Kumar | Security Engineer — AI for Security & Security for AI',
  description: profile.shortIntro,
  body: `<h1>${esc(NAME)}</h1><h2>${esc(ROLE)}</h2>${P([profile.shortIntro, profile.longIntro])}
    <h2>Featured Projects</h2>${li(projects.slice(0, 6).map((p) => `<a href="/projects/${p.slug}"><strong>${esc(p.title)}</strong></a> — ${esc(p.tagline || p.description || '')}`))}
    <p><a href="/projects">All projects</a> · <a href="/experiences">Experience</a> · <a href="/posts">Blog</a> · <a href="/resume">Resume</a></p>`,
})

// Projects listing
pages.push({
  route: '/projects',
  title: 'Projects | Mohit Kumar — Cybersecurity & AI/ML Portfolio',
  description: 'Security tooling and AI/ML projects: Bulwark, Bastion, Lattice, Portcullis, Stowaway, Schema-Grounded NL→KQL, Agentic Email Security, HybEx-Law, and more.',
  body: `<h1>Projects</h1>${projects.map((p) => `<section><h2><a href="/projects/${p.slug}">${esc(p.title)}</a></h2>${P([p.tagline, p.metric])}<p>${esc(p.category || '')}${p.tags ? ' · ' + esc(p.tags.slice(0, 6).join(', ')) : ''}</p></section>`).join('')}`,
})

// Project detail pages
for (const p of projects) {
  const metrics = Array.isArray(p.keyMetrics) ? p.keyMetrics.map((m) => `${esc(m.name)}: ${esc(m.value)}`) : []
  pages.push({
    route: `/projects/${p.slug}`,
    title: `${p.title} | Mohit Kumar`,
    description: (p.tagline || p.description || `${p.title} — a project by Mohit Kumar.`).slice(0, 200),
    ogImage: ogFor(p),
    body: `<h1>${esc(p.title)}</h1>${P([p.tagline, p.description, p.overview])}
      ${metrics.length ? `<h2>Key metrics</h2>${li(metrics)}` : ''}
      ${p.techStack ? `<h2>Tech stack</h2><p>${esc((p.techStack || []).join(', '))}</p>` : ''}
      ${p.githubUrl ? `<p><a href="${esc(p.githubUrl)}">View on GitHub</a></p>` : ''}
      <p><a href="/projects">← All projects</a></p>`,
  })
}

// Experience
pages.push({
  route: '/experiences',
  title: 'Experience | Mohit Kumar',
  description: 'Professional experience — Security Engineer, plus research internships across AI/ML, medical imaging, and multi-agent systems.',
  body: `<h1>Experience</h1>${experiences.map((e) => `<section><h2>${esc(e.role)} — ${esc(e.organization)}</h2><p>${esc(e.duration)} · ${esc(e.location || '')}</p>${P([e.project && `Project: ${e.project}`, e.approach, e.impact])}</section>`).join('')}`,
})

// Blog listing
pages.push({
  route: '/posts',
  title: 'Blog & Posts | Mohit Kumar — Security & AI Writing',
  description: 'Technical writing on AI security, ML supply chains, agent guardrails, detection engineering, and honest benchmarking.',
  body: `<h1>Blog & Insights</h1>${posts.map((post) => `<article><h2>${post.url ? `<a href="${esc(post.url)}">${esc(post.title)}</a>` : `<a href="/posts/${post.slug}">${esc(post.title)}</a>`}</h2><p>${esc(post.date)} · ${esc(post.category || '')}</p><p>${esc(post.excerpt || '')}</p></article>`).join('')}`,
})

// Post detail pages
for (const post of posts) {
  pages.push({
    route: `/posts/${post.slug}`,
    title: `${post.title} | Mohit Kumar`,
    description: (post.excerpt || post.title).slice(0, 200),
    ogImage: post.cover && (post.cover.startsWith('http') || post.cover.startsWith('/')) ? abs(post.cover) : DEFAULT_OG,
    body: `<h1>${esc(post.title)}</h1><p>${esc(post.date)} · ${esc(post.category || '')}</p><p>${esc(post.excerpt || '')}</p>${post.tags ? `<p>${esc(post.tags.join(', '))}</p>` : ''}${post.url ? `<p><a href="${esc(post.url)}">Read the full article on ${esc(post.source || 'the original site')}</a></p>` : ''}<p><a href="/posts">← All posts</a></p>`,
  })
}

// Resume
pages.push({
  route: '/resume',
  title: 'Resume | Mohit Kumar — Security Engineer CV',
  description: resume.summary || 'Resume of Mohit Kumar — Security Engineer.',
  body: `<h1>${esc(resume.name || NAME)}</h1><h2>${esc(resume.title || ROLE)}</h2>${P([resume.summary])}
    ${resume.education ? `<h2>Education</h2>${li(resume.education.map((e) => `${esc(e.degree)} — ${esc(e.institution)} (${esc(e.cgpa || e.percentage || '')})`))}` : ''}
    ${resume.skills ? `<h2>Skills</h2><p>${esc(Object.values(resume.skills).flat().join(', '))}</p>` : ''}`,
})

// Publications
pages.push({
  route: '/publications',
  title: 'Publications | Mohit Kumar',
  description: 'Peer-reviewed research and technical publications across medical imaging, legal AI, computer vision, and human activity recognition.',
  body: `<h1>Publications</h1>${publications.map((pub) => `<section><h2>${esc(pub.title)}</h2><p>${esc((pub.authors || []).join(', '))}</p><p>${esc(pub.venue)}${pub.date ? ' · ' + esc(pub.date) : ''}</p>${P([pub.abstract])}</section>`).join('')}`,
})

// Utility routes — correct head + a lightweight body
const utility = [
  ['/certificates', 'Certificates | Mohit Kumar', 'Professional certifications across cybersecurity, cloud, and machine learning.'],
  ['/events', 'Events & Activities | Mohit Kumar', 'Hackathons, workshops, and leadership activities.'],
  ['/reads', 'Reading List | Mohit Kumar', 'Books, papers, and resources I recommend.'],
  ['/uses', 'Uses | Mohit Kumar', 'The tools, hardware, and software I use day to day.'],
  ['/contact', 'Contact | Mohit Kumar', 'Get in touch for collaboration on security and AI.'],
  ['/playground', 'Security Playground | Mohit Kumar', '15 interactive, in-browser security tools — JWT, hashing, CSP, IOC defang, entropy, and more.'],
  ['/ctf', 'Mini CTF | Mohit Kumar', 'A tiny capture-the-flag with three security challenges.'],
  ['/support', 'Support | Mohit Kumar', 'Support my open-source security work.'],
]
// Note: /projects/security-tools and /projects/agentic-email-security are
// generated by the project-detail loop above (they exist in the projects data).
for (const [route, title, description] of utility) {
  pages.push({ route, title, description, body: `<h1>${esc(title.split(' | ')[0])}</h1><p>${esc(description)}</p><p><a href="/">Home</a> · <a href="/projects">Projects</a></p>` })
}

// ---- emit ---------------------------------------------------------------
// Every route MUST carry real, human-readable body text. If a route produces
// an empty/near-empty body, fail the build loudly rather than silently shipping
// a bodyless shell (which is how /projects could regress unnoticed).
const MIN_TEXT = 60
let n = 0
const seen = new Set()
for (const page of pages) {
  if (seen.has(page.route)) throw new Error(`[prerender] duplicate route in list: ${page.route}`)
  seen.add(page.route)
  const text = (page.body || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length < MIN_TEXT) throw new Error(`[prerender] ${page.route}: body has only ${text.length} chars of text (min ${MIN_TEXT}). Refusing to emit a bodyless page.`)
  const html = render(page)
  write(page.route, html)
  // read back and confirm the content actually landed on disk
  const out = page.route === '/' ? join(dist, 'index.html') : join(dist, page.route.replace(/^\//, ''), 'index.html')
  if (!readFileSync(out, 'utf8').includes('id="ssr-fallback"')) throw new Error(`[prerender] ${page.route}: written file is missing injected content`)
  n++
}
console.log(`[prerender] OK — ${n} routes prerendered with per-route canonical, meta, and validated body content`)

