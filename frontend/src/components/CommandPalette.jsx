import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSearch, FaHome, FaProjectDiagram, FaShieldAlt, FaPenFancy, FaBriefcase, FaFileAlt,
  FaCertificate, FaBookOpen, FaEnvelope, FaFlag, FaToolbox, FaExternalLinkAlt, FaArrowRight,
} from 'react-icons/fa'
import projectsContent from '../data/projectsContent.json'
import { posts } from '../data/postsData'

const PAGE_ITEMS = [
  { label: 'Home', to: '/', icon: FaHome, group: 'Pages' },
  { label: 'Projects', to: '/projects', icon: FaProjectDiagram, group: 'Pages' },
  { label: 'Security Playground', to: '/playground', icon: FaShieldAlt, group: 'Pages' },
  { label: 'Blog', to: '/posts', icon: FaPenFancy, group: 'Pages' },
  { label: 'Experience', to: '/experiences', icon: FaBriefcase, group: 'Pages' },
  { label: 'Resume', to: '/resume', icon: FaFileAlt, group: 'Pages' },
  { label: 'Certificates', to: '/certificates', icon: FaCertificate, group: 'Pages' },
  { label: 'Publications', to: '/publications', icon: FaFileAlt, group: 'Pages' },
  { label: 'Reading List', to: '/reads', icon: FaBookOpen, group: 'Pages' },
  { label: 'Uses / Setup', to: '/uses', icon: FaToolbox, group: 'Pages' },
  { label: 'Contact', to: '/contact', icon: FaEnvelope, group: 'Pages' },
  { label: 'CTF Challenge', to: '/ctf', icon: FaFlag, group: 'Pages' },
]

const PROJECT_ITEMS = (projectsContent.projects || []).map((p) => ({
  label: p.title, to: `/projects/${p.slug}`, icon: FaProjectDiagram, group: 'Projects',
}))

const POST_ITEMS = posts.map((p) => ({
  label: p.title,
  to: p.url || `/posts/${p.slug}`,
  external: !!p.url,
  icon: FaPenFancy,
  group: 'Posts',
}))

const ALL_ITEMS = [...PAGE_ITEMS, ...PROJECT_ITEMS, ...POST_ITEMS]

export default function CommandPalette() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) { setQuery(''); setActive(0) }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ITEMS
    return ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q))
  }, [query])

  useEffect(() => { setActive(0) }, [query])

  const go = (item) => {
    setOpen(false)
    if (!item) return
    if (item.external) window.open(item.to, '_blank', 'noopener')
    else navigate(item.to)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]) }
  }

  // Keep the active row scrolled into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-secondary border border-white/15 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <FaSearch className="text-gray-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a page, project, or post…"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-600"
              />
              <kbd className="text-[10px] text-gray-500 border border-white/15 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">No matches for “{query}”.</div>
              )}
              {results.map((item, idx) => {
                const showGroup = idx === 0 || results[idx - 1].group !== item.group
                return (
                  <div key={`${item.group}-${item.label}`}>
                    {showGroup && (
                      <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider text-gray-500">{item.group}</div>
                    )}
                    <button
                      data-idx={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => go(item)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        active === idx ? 'bg-accent/15 text-accent' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className={`shrink-0 ${active === idx ? 'text-accent' : 'text-gray-500'}`} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.external ? <FaExternalLinkAlt className="text-xs text-gray-600" /> : active === idx && <FaArrowRight className="text-xs" />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-4 px-4 py-2 border-t border-white/10 text-[11px] text-gray-500">
              <span><kbd className="border border-white/15 rounded px-1">↑↓</kbd> navigate</span>
              <span><kbd className="border border-white/15 rounded px-1">↵</kbd> open</span>
              <span className="ml-auto"><kbd className="border border-white/15 rounded px-1">⌘/Ctrl K</kbd> toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
