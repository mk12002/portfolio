import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaGithub, FaShieldAlt, FaChevronDown, FaChevronUp, FaTerminal, FaExclamationTriangle, FaCheckCircle, FaRocket, FaLock, FaBug, FaCloud, FaSearch } from 'react-icons/fa'
import SEO from '../components/SEO'
import { heroData, principles, domains, tools, valueProposition, ethicsStatement } from '../data/securityToolsData'

const severityColor = { CRITICAL: '#ef4444', HIGH: '#f97316', MED: '#eab308', LOW: '#60a5fa', WARN: '#eab308', PASS: '#34d399', SAFE: '#34d399' }

function SeverityBadge({ text }) {
  const match = text.match(/^\[(CRITICAL|HIGH|MED|LOW|WARN|PASS|SAFE)\]/)
  if (!match) return <span className="text-gray-300 font-mono text-sm">{text}</span>
  const sev = match[1]
  return (
    <span className="font-mono text-sm">
      <span className="font-bold px-1.5 py-0.5 rounded text-xs mr-2" style={{ backgroundColor: severityColor[sev] + '20', color: severityColor[sev], border: `1px solid ${severityColor[sev]}40` }}>{sev}</span>
      <span className="text-gray-300">{text.slice(match[0].length)}</span>
    </span>
  )
}

function TerminalBlock({ title, children }) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10 my-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-500 font-mono">{title}</span>
      </div>
      <pre className="p-4 bg-[#0d0d1a] text-sm font-mono overflow-x-auto text-gray-300 leading-relaxed whitespace-pre-wrap">{children}</pre>
    </div>
  )
}

function ToolCard({ tool, isActive, onToggle }) {
  const domainIcons = { web: <FaBug className="text-green-400" />, iam: <FaLock className="text-purple-400" />, cloud: <FaCloud className="text-blue-400" />, 'blue-team': <FaShieldAlt className="text-pink-400" /> }
  const domainLabels = { web: 'Web AppSec', iam: 'Identity & Access', cloud: 'Cloud Security', 'blue-team': 'Blue Team' }
  const domainColors = { web: '#34d399', iam: '#a78bfa', cloud: '#60a5fa', 'blue-team': '#f472b6' }
  const color = domainColors[tool.domain]

  return (
    <motion.div id={`tool-${tool.id}`} className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
      <button onClick={onToggle} className="w-full text-left p-5 flex items-center gap-4 group">
        <span className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold font-mono text-lg" style={{ backgroundColor: color + '15', color, border: `1px solid ${color}30` }}>{tool.num}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors truncate">{tool.title}</h3>
          <p className="text-sm text-gray-400 truncate">{tool.purpose}</p>
        </div>
        <span className="flex items-center gap-2 text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: color + '15', color }}>{domainIcons[tool.domain]} {domainLabels[tool.domain]}</span>
        <span className="text-gray-500 flex-shrink-0">{isActive ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-6 space-y-6 border-t border-white/10 pt-5">
              {/* Problem */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2"><FaExclamationTriangle /> Security Problem</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{tool.problem}</p>
              </div>
              {/* Capabilities */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color }}>Detection Capabilities</h4>
                <ul className="grid sm:grid-cols-2 gap-1.5">{tool.capabilities.map((c, i) => <li key={i} className="text-sm text-gray-400 flex items-start gap-2"><span style={{ color }} className="mt-1">›</span>{c}</li>)}</ul>
              </div>
              {/* Workflow */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">Workflow</h4>
                <div className="flex flex-wrap gap-2">{tool.workflow.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i + 1}</span>{s}
                  </span>
                ))}</div>
              </div>
              {/* Example I/O */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-2 flex items-center gap-2"><FaTerminal /> Example</h4>
                <TerminalBlock title="input">{tool.exampleInput}</TerminalBlock>
                <TerminalBlock title="output">
                  {tool.exampleOutput.split('\n').map((line, i) => <div key={i}>{/^\[(CRITICAL|HIGH|MED|LOW|WARN|PASS|SAFE)\]/.test(line.trim()) ? <SeverityBadge text={line.trim()} /> : <span>{line}</span>}</div>)}
                </TerminalBlock>
              </div>
              {/* Strengths / Limitations / Roadmap */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <h5 className="text-xs font-semibold uppercase text-green-400 mb-2">Strengths</h5>
                  <ul className="space-y-1">{tool.strengths.map((s, i) => <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5"><FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />{s}</li>)}</ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <h5 className="text-xs font-semibold uppercase text-amber-400 mb-2">Limitations</h5>
                  <ul className="space-y-1">{tool.limitations.map((l, i) => <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5"><FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />{l}</li>)}</ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <h5 className="text-xs font-semibold uppercase text-blue-400 mb-2">Roadmap</h5>
                  <ul className="space-y-1">{tool.roadmap.map((r, i) => <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5"><FaRocket className="text-blue-500 mt-0.5 flex-shrink-0" />{r}</li>)}</ul>
                </div>
              </div>
              {/* GitHub folder link */}
              <a href={`https://github.com/mk12002/Security-tools/tree/main/${tool.folder}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors">
                <FaGithub /> View source: {tool.folder}/
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SecurityTools() {
  const [activeTools, setActiveTools] = useState(new Set())
  const [activeTocSection, setActiveTocSection] = useState('')
  const [tocOpen, setTocOpen] = useState(false)
  const sectionRefs = useRef({})

  const toggleTool = (id) => {
    setActiveTools(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const expandAll = () => setActiveTools(new Set(tools.map(t => t.id)))
  const collapseAll = () => setActiveTools(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveTocSection(e.target.id) })
    }, { rootMargin: '-20% 0px -70% 0px' })
    document.querySelectorAll('[data-toc-section]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTocOpen(false)
  }

  const tocItems = [
    { id: 'sec-overview', label: '📋 Overview' },
    { id: 'sec-principles', label: '⚙️ Principles' },
    { id: 'sec-domains', label: '🗺️ Domain Map' },
    ...tools.map(t => ({ id: `tool-${t.id}`, label: `${t.num}. ${t.title}` })),
    { id: 'sec-value', label: '💎 Value Proposition' },
    { id: 'sec-ethics', label: '🛡️ Responsible Use' },
  ]

  return (
    <>
      <SEO title="Security Tools | Mohit Kumar — Security Engineering Portfolio" description="14 CLI-driven security assessment tools across AppSec, IAM, Cloud, and Detection Engineering" pathname="/projects/security-tools" />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"><FaArrowLeft /> Back to Projects</Link>
          </motion.div>

          {/* ===== HERO ===== */}
          <motion.section id="sec-overview" data-toc-section className="mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative p-8 md:p-12 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,255,65,0.05),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 uppercase tracking-wider">Security Engineering</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-400">14 Tools · Python · CLI</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{heroData.title}</h1>
                <p className="text-lg text-gray-400 max-w-3xl mb-6">{heroData.subtitle}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {heroData.stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-[#0d0d1a] border border-white/10 font-mono text-sm text-gray-400">
                  <span className="text-green-400">$</span> <span className="text-gray-300">{heroData.interviewSummary}</span>
                </div>
                <div className="flex gap-3 mt-6">
                  <a href="https://github.com/mk12002/Security-tools" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all"><FaGithub /> View on GitHub</a>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="lg:flex gap-8">
            {/* ===== STICKY TOC (Desktop) ===== */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-4 scrollbar-thin">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Table of Contents</h3>
                <nav className="space-y-0.5">
                  {tocItems.map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${activeTocSection === item.id ? 'bg-green-500/10 text-green-400 font-medium' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>{item.label}</button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ===== MOBILE TOC ===== */}
            <div className="lg:hidden mb-6">
              <button onClick={() => setTocOpen(!tocOpen)} className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-gray-300">
                <span className="flex items-center gap-2"><FaSearch /> Jump to section</span>
                {tocOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {tocOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden rounded-xl border border-white/10 mt-2 bg-[#0d0d1a]">
                    <nav className="p-3 space-y-0.5 max-h-64 overflow-y-auto">
                      {tocItems.map(item => (
                        <button key={item.id} onClick={() => scrollTo(item.id)} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-green-400 hover:bg-white/5 transition-all">{item.label}</button>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="flex-1 min-w-0 space-y-16">
              {/* PRINCIPLES */}
              <section id="sec-principles" data-toc-section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">⚙️</span> Core Engineering Principles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {principles.map((p, i) => (
                    <motion.div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-colors" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                      <div className="text-2xl mb-3">{p.icon}</div>
                      <h3 className="font-semibold text-white text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-gray-400">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* DOMAIN MAP */}
              <section id="sec-domains" data-toc-section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">🗺️</span> Security Domain Coverage</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {domains.map((d, i) => (
                    <motion.div key={i} className="p-5 rounded-xl border bg-white/[0.02] hover:bg-white/[0.04] transition-colors" style={{ borderColor: d.color + '25' }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{d.icon}</span>
                        <h3 className="font-semibold" style={{ color: d.color }}>{d.name}</h3>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{d.toolIds.length} tools</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {d.toolIds.map(tid => {
                          const t = tools.find(x => x.id === tid)
                          return t ? (
                            <button key={tid} onClick={() => { scrollTo(`tool-${tid}`); setActiveTools(prev => new Set([...prev, tid])) }} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 cursor-pointer">
                              {t.num}. {t.title.split(' ').slice(0, 3).join(' ')}
                            </button>
                          ) : null
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* TOOLS */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400"><FaTerminal /></span> Tool Deep Dives</h2>
                  <div className="flex gap-2">
                    <button onClick={expandAll} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all">Expand All</button>
                    <button onClick={collapseAll} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all">Collapse All</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {tools.map(tool => <ToolCard key={tool.id} tool={tool} isActive={activeTools.has(tool.id)} onToggle={() => toggleTool(tool.id)} />)}
                </div>
              </section>

              {/* VALUE PROPOSITION */}
              <section id="sec-value" data-toc-section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">💎</span> Portfolio Value Proposition</h2>
                <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <p className="text-gray-300 text-sm mb-4">This project portfolio demonstrates that I can:</p>
                  <ul className="space-y-3">{valueProposition.map((v, i) => <li key={i} className="flex items-start gap-3 text-sm text-gray-300"><FaCheckCircle className="text-amber-400 mt-0.5 flex-shrink-0" />{v}</li>)}</ul>
                </div>
              </section>

              {/* ETHICS */}
              <section id="sec-ethics" data-toc-section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">🛡️</span> Responsible Use & Ethics</h2>
                <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-gray-300 text-sm mb-4">These tools are intended for authorized security assessment, defensive testing, and educational use only.</p>
                  <ul className="space-y-2">{ethicsStatement.map((e, i) => <li key={i} className="flex items-start gap-3 text-sm text-gray-400"><FaShieldAlt className="text-red-400 mt-0.5 flex-shrink-0" />{e}</li>)}</ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
