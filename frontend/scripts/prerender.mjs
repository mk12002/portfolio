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

function render({ route, title, description, ogImage = DEFAULT_OG, body = '', canonical, ogType = 'website', articleMeta = null, jsonLd = null }) {
  const url = SITE + (route === '/' ? '/' : route)
  const canon = canonical || url
  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'title', title)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:type', ogType)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', ogImage)
  html = setMeta(html, 'property', 'og:image:secure_url', ogImage)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:image', ogImage)
  // og:image dimensions are only guaranteed for the default 1200x630 card; strip
  // them for arbitrary per-page images so we never declare a size we can't back.
  if (ogImage !== DEFAULT_OG) {
    html = html.replace(/\s*<meta property="og:image:width"[^>]*>/i, '')
      .replace(/\s*<meta property="og:image:height"[^>]*>/i, '')
  }
  // Article metadata for blog posts (Open Graph article:* tags).
  if (articleMeta) {
    const tagMeta = (articleMeta.tags || []).map((t) => `<meta property="article:tag" content="${esc(t)}" />`)
    const block = [
      `<meta property="article:published_time" content="${esc(articleMeta.publishedTime || '')}" />`,
      `<meta property="article:modified_time" content="${esc(articleMeta.modifiedTime || articleMeta.publishedTime || '')}" />`,
      `<meta property="article:author" content="Mohit Kumar" />`,
      articleMeta.section ? `<meta property="article:section" content="${esc(articleMeta.section)}" />` : '',
      ...tagMeta,
    ].filter(Boolean).join('\n  ')
    html = html.replace('</head>', `  ${block}\n</head>`)
  }
  if (!/<link rel="canonical"[^>]*>/.test(html)) throw new Error(`[prerender] ${route}: no <link rel="canonical"> in built index.html to rewrite`)
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canon}" />`)
  if (!html.includes(`<link rel="canonical" href="${canon}" />`)) throw new Error(`[prerender] ${route}: canonical rewrite produced no change`)
  // Per-page structured data (e.g. BlogPosting) — site-wide Person + WebSite
  // already live in the index.html template and are inherited by every page.
  if (jsonLd) {
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`)
  }
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
  description: 'Security Engineer at the AI × Security intersection — creator of five open-source defensive scanners (Bulwark, Bastion, Lattice, Portcullis, Stowaway), plus VAPT, SOC detection engineering, and published ML research.',
  body: `<h1>${esc(NAME)}</h1><h2>${esc(ROLE)}</h2><p>5 open-source scanners · 1,350+ passing tests · 47 real escalation paths found · 13 blog posts · 5 research papers.</p>${P([profile.shortIntro, profile.longIntro])}
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
  const rigor = Array.isArray(p.engineeringRigor) ? p.engineeringRigor.map((r) => `${esc(r.value)} ${esc(r.label)}`) : []
  const roadmap = Array.isArray(p.roadmap) ? p.roadmap.map(esc) : []
  pages.push({
    route: `/projects/${p.slug}`,
    title: `${p.title} | Mohit Kumar`,
    description: (p.tagline || p.description || `${p.title} — a project by Mohit Kumar.`).slice(0, 200),
    ogImage: ogFor(p),
    body: `<h1>${esc(p.title)}</h1>${P([p.tagline, p.description, p.overview])}
      ${metrics.length ? `<h2>Key metrics</h2>${li(metrics)}` : ''}
      ${rigor.length ? `<h2>Engineering rigor</h2>${li(rigor)}` : ''}
      ${p.techStack ? `<h2>Tech stack</h2><p>${esc((p.techStack || []).join(', '))}</p>` : ''}
      ${roadmap.length ? `<h2>Roadmap</h2>${li(roadmap)}` : ''}
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
  const isExternal = !!post.url
  const cover = post.cover && (post.cover.startsWith('http') || post.cover.startsWith('/')) ? abs(post.cover) : DEFAULT_OG
  // Externally-hosted posts are thin stubs — point their canonical at the
  // original so ranking consolidates there, and keep them out of the sitemap.
  const jsonLd = isExternal ? null : {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: cover,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Mohit Kumar', url: SITE },
    publisher: { '@type': 'Person', name: 'Mohit Kumar', url: SITE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/posts/${post.slug}` },
    keywords: (post.tags || []).join(', '),
    articleSection: post.category || 'Blog',
  }
  pages.push({
    route: `/posts/${post.slug}`,
    title: `${post.title} | Mohit Kumar`,
    description: (post.excerpt || post.title).slice(0, 200),
    ogImage: cover,
    ogType: 'article',
    canonical: isExternal ? post.url : undefined,
    articleMeta: { publishedTime: post.date, modifiedTime: post.date, section: post.category, tags: post.tags || [] },
    jsonLd,
    lastmod: /^\d{4}-\d{2}-\d{2}/.test(post.date || '') ? post.date.slice(0, 10) : undefined,
    sitemap: !isExternal,
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

// Flagship case study — rich body for SEO / non-JS clients
pages.push({
  route: '/case-study',
  title: "Finding: argo-cd's Controller Can Reach cluster-admin | Mohit Kumar",
  description: 'A vuln-report walkthrough: how my open-source scanner Bastion found argo-cd’s application controller bound to a wildcard ClusterRole — a direct path to cluster-admin — on a real Helm chart a pod-hygiene linter said nothing about.',
  body: `<h1>How Bastion Found argo-cd's Controller Can Reach cluster-admin</h1>
    <p>CRITICAL · Privilege Escalation — a real finding on the public argo/argo-cd Helm chart.</p>
    <p><strong>TL;DR:</strong> Rendering argo/argo-cd and scanning it with Bastion surfaced 19 escalation paths to cluster-admin — the headline being the argocd-application-controller ServiceAccount, bound to a ClusterRole granting verbs:[*] on resources:[*]. It doesn't reach cluster-admin; it is cluster-admin. On the same manifests, kube-score produced 107 findings and 0 about RBAC or escalation.</p>
    <p>Escalation is a graph problem, not a per-resource checklist: Bastion builds the privilege graph and runs deterministic BFS to cluster-admin, the node, and secrets, citing file:line for every edge. It reports the path; it never walks it. The fix is to replace the wildcard rule with the specific resources the controller reconciles, and to gate pull requests with <code>bastion diff --fail-on-new-path</code>.</p>
    <p><a href="/demos">Try the analysis yourself</a> · <a href="/projects/bastion">About Bastion</a></p>`,
})

// Utility routes — correct head + a lightweight body
const utility = [
  ['/certificates', 'Certificates | Mohit Kumar', 'Professional certifications across cybersecurity, cloud, and machine learning.'],
  ['/events', 'Events & Activities | Mohit Kumar', 'Hackathons, workshops, and leadership activities.'],
  ['/uses', 'Uses | Mohit Kumar', 'The tools, hardware, and software I use day to day.'],
  ['/contact', 'Contact | Mohit Kumar', 'Get in touch for collaboration on security and AI.'],
  ['/playground', 'Security Playground | Mohit Kumar', '18 interactive, in-browser security tools — a pickle-RCE inspector, prompt-injection tester, AI-BOM inspector, JWT, hashing, CSP, IOC defang, entropy, and more.'],
  ['/demos', 'Try the Scanners | Mohit Kumar', 'Run my open-source scanners live in your browser: Bastion finds Kubernetes RBAC escalation paths to cluster-admin; Stowaway flags dependency typosquats and confusion. Client-side, nothing leaves your browser.'],
  ['/ctf', 'Mini CTF | Mohit Kumar', 'A tiny capture-the-flag with three security challenges.'],
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

// ---- sitemap ------------------------------------------------------------
// Generated from the same route list, so it can never drift from what exists.
// External-post stubs (canonical points off-domain) are excluded.
const today = new Date().toISOString().slice(0, 10)
const priorityFor = (r) => {
  if (r === '/') return '1.0'
  if (['/projects', '/posts', '/playground', '/demos', '/resume'].includes(r)) return '0.9'
  if (r === '/case-study' || r.startsWith('/projects/') || r.startsWith('/posts/')) return '0.8'
  if (['/publications', '/experiences', '/certificates'].includes(r)) return '0.8'
  return '0.6'
}
const changefreqFor = (r) => (['/', '/posts', '/projects'].includes(r) ? 'weekly' : 'monthly')
const sitemapPages = pages.filter((p) => p.sitemap !== false)
const urls = sitemapPages
  .map((p) => {
    const loc = SITE + (p.route === '/' ? '/' : p.route)
    const lastmod = p.lastmod || today
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreqFor(p.route)}</changefreq><priority>${priorityFor(p.route)}</priority></url>`
  })
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
// Also write a committed copy into public/ so the sitemap is visible in source
// control (and, being regenerated every build, can never drift from reality).
writeFileSync(resolve(here, '../public/sitemap.xml'), sitemap)
console.log(`[prerender] sitemap.xml — ${sitemapPages.length} indexable URLs (excluded ${pages.length - sitemapPages.length} external stubs)`)

// ---- RSS ----------------------------------------------------------------
// A real feed so readers (and aggregators like Feedly / lobste.rs) can follow
// the writing. External posts are included with their canonical off-site link —
// the point of a feed is the reader finding the article, wherever it lives.
const rssItems = [...posts]
  .filter((p) => p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((p) => {
    const link = p.url || `${SITE}/posts/${p.slug}`
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">${esc(p.url || `${SITE}/posts/${p.slug}`)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.category ? `<category>${esc(p.category)}</category>` : ''}
      <description>${esc(p.excerpt || '')}</description>
    </item>`
  })
  .join('\n')
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohit Kumar — Security Engineering</title>
    <link>${SITE}/posts</link>
    <description>Writing on AI security, the software supply chain, and detection engineering.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>
`
writeFileSync(join(dist, 'rss.xml'), rss)
console.log(`[prerender] rss.xml — ${posts.filter((p) => p.date).length} posts`)
