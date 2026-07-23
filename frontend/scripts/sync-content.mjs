// Sync the backend content JSON into the frontend fallback snapshots.
// The frontend falls back to these when the Java backend is unavailable
// (e.g. the static Vercel deploy), so they must stay identical to the source.
//
// Run:  npm run sync-content   (also runs automatically before `npm run build`)
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const backend = resolve(here, '../../backend/src/main/resources/content')
const frontend = resolve(here, '../src/data')

// backend filename -> frontend fallback filename
const files = [
  ['projects.json', 'projectsContent.json'],
  ['reads.json', 'readsContent.json'],
  ['profile.json', 'profileContent.json'],
  ['resume.json', 'resumeContent.json'],
  ['experiences.json', 'experiencesContent.json'],
  ['certificates.json', 'certificatesContent.json'],
  ['events.json', 'eventsContent.json'],
  ['publications.json', 'publicationsContent.json'],
  ['contact.json', 'contactContent.json'],
  ['buymeacoffee.json', 'buymeacoffeeContent.json'],
]

let synced = 0
for (const [src, dst] of files) {
  const from = resolve(backend, src)
  const to = resolve(frontend, dst)
  if (!existsSync(from)) {
    console.warn(`[sync-content] skip: ${src} not found (backend not present?)`)
    continue
  }
  const raw = readFileSync(from, 'utf8')
  JSON.parse(raw) // fail loudly on malformed JSON instead of shipping it
  writeFileSync(to, raw)
  console.log(`[sync-content] ${src} -> ${dst}`)
  synced++
}
console.log(`[sync-content] done (${synced} file(s))`)
