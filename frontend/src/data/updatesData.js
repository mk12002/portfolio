// Latest-Updates feed. Blog posts are merged in automatically from postsData
// (they carry ISO dates), so new posts appear with zero extra work. Everything
// else — open-source releases, papers, certs, talks — is a hand-kept milestone
// with an ISO date. Keep milestones high-signal: shipped things, not commits.
import { posts } from './postsData'

export const milestones = [
  { type: 'release', date: '2026-08-25', title: 'Bulwark packaged for PyPI under the bulwark-* namespace', href: 'https://github.com/mk12002/Bulwark' },
  { type: 'release', date: '2026-08-22', title: 'Portcullis — 175 tests + SARIF 2.1.0 schema validation', href: 'https://github.com/mk12002/Portcullis' },
  { type: 'release', date: '2026-08-21', title: 'Bastion — least-privilege remediation synthesis (590+ tests)', href: 'https://github.com/mk12002/Bastion' },
  { type: 'paper', date: '2026-09-04', title: 'Paper published: HINT-Net — Scientific Reports (Nature Portfolio), DOI 10.1038/s41598-026-67051-6', href: 'https://www.nature.com/articles/s41598-026-67051-6' },
  { type: 'release', date: '2026-08-07', title: 'Stowaway v0.1.0 — first public release (npm · PyPI · Go · Cargo)', href: 'https://github.com/mk12002/Stowaway' },
  { type: 'release', date: '2026-08-01', title: 'Lattice v0.4.0 — 12 languages + citable Zenodo DOI', href: 'https://github.com/mk12002/Lattice' },
]

// Merge blogs + milestones into one dated feed, newest first.
export function getUpdates(limit = 6) {
  const blogItems = posts
    .filter((p) => p.date)
    .map((p) => ({ type: 'blog', date: p.date, title: p.title, href: p.url || `/posts/${p.slug}`, external: !!p.url }))
  const mileItems = milestones.map((m) => ({ ...m, external: (m.href || '').startsWith('http') }))
  return [...blogItems, ...mileItems]
    .filter((x) => !Number.isNaN(new Date(x.date).getTime()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}
