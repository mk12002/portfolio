import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaGithub, FaServer, FaShieldAlt, FaChevronDown, FaChevronUp, FaCogs, FaCheckCircle, FaSearch, FaProjectDiagram } from 'react-icons/fa'
import SEO from '../components/SEO'
import { heroData, architectureData, metricsData, orchestrationData, xaiData, agentsData } from '../data/emailSecurityData'

// Component to dynamically load and render Mermaid diagrams
function MermaidDiagram({ chart }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    // Dynamically inject Mermaid script
    if (!document.getElementById('mermaid-script')) {
      const script = document.createElement('script')
      script.id = 'mermaid-script'
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js'
      script.async = true
      script.onload = () => {
        if (window.mermaid) {
          window.mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, sans-serif'
          })
          renderChart()
        }
      }
      document.body.appendChild(script)
    } else if (window.mermaid) {
      renderChart()
    }

    function renderChart() {
      if (containerRef.current && window.mermaid) {
        // Generate a unique ID for this diagram
        const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
        window.mermaid.render(id, chart).then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        }).catch(e => console.error("Mermaid rendering failed", e))
      }
    }
  }, [chart])

  return (
    <div className="w-full overflow-x-auto bg-[#0d0d1a] border border-white/10 rounded-xl p-4 flex justify-center">
      <div ref={containerRef} className="mermaid-container max-w-full">
        {/* SVG will be injected here */}
        <div className="text-gray-500 text-sm animate-pulse">Rendering diagram...</div>
      </div>
    </div>
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

function AgentCard({ agent, isActive, onToggle }) {
  return (
    <motion.div id={`agent-${agent.id}`} className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
      <button onClick={onToggle} className="w-full text-left p-5 flex items-center gap-4 group">
        <span className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-2xl" style={{ backgroundColor: agent.color + '15', color: agent.color, border: `1px solid ${agent.color}30` }}>{agent.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors truncate">{agent.name}</h3>
          <p className="text-sm text-gray-400 truncate">{agent.purpose}</p>
        </div>
        <span className="text-gray-500 flex-shrink-0">{isActive ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-6 space-y-6 border-t border-white/10 pt-5">
              {/* Metrics & Arch */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h5 className="text-xs font-semibold uppercase text-blue-400 mb-1">Architecture</h5>
                  <p className="text-sm text-gray-300">{agent.metrics.arch}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h5 className="text-xs font-semibold uppercase text-green-400 mb-1">Performance</h5>
                  <p className="text-sm text-gray-300">
                    Accuracy/ROC: <span className="font-mono text-green-400">{agent.metrics.acc || agent.metrics.roc}</span> | Dataset: {agent.metrics.dataset}
                  </p>
                </div>
              </div>
              
              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-2">Key Features & Heuristics</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{agent.metrics.features}</p>
              </div>

              {/* Example I/O */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Input Payload</h4>
                  <TerminalBlock title="input.json">{agent.inputExample}</TerminalBlock>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-2">Output Payload</h4>
                  <TerminalBlock title="output.json">{agent.outputExample}</TerminalBlock>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function EmailSecurity() {
  const [activeAgents, setActiveAgents] = useState(new Set())
  const [activeTocSection, setActiveTocSection] = useState('')
  const [tocOpen, setTocOpen] = useState(false)

  const toggleAgent = (id) => {
    setActiveAgents(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

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
    { id: 'sec-overview', label: '📋 Executive Summary' },
    { id: 'sec-architecture', label: '🏗️ Core Architecture' },
    { id: 'sec-metrics', label: '📊 Model Metrics' },
    { id: 'sec-orchestration', label: '🧠 Orchestration Engine' },
    { id: 'sec-xai', label: '🔍 Explainable AI & Garuda' },
    { id: 'sec-agents', label: '🤖 Agent Deep Dives' }
  ]

  return (
    <>
      <SEO title="TARA: Agentic Email Security | Mohit Kumar" description={heroData.subtitle} pathname="/projects/tara-email-security" />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"><FaArrowLeft /> Back to Projects</Link>
          </motion.div>

          {/* ===== HERO ===== */}
          <motion.section id="sec-overview" data-toc-section className="mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative p-8 md:p-12 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">Cybersecurity AI</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-400">Multi-Agent System</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{heroData.title}</h1>
                <p className="text-lg text-gray-400 max-w-3xl mb-6">{heroData.subtitle}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {heroData.stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-xl bg-[#0d0d1a] border border-white/10 text-gray-300 leading-relaxed shadow-inner">
                  <span className="text-2xl mr-2">💡</span> {heroData.interviewSummary}
                </div>
                <div className="flex gap-3 mt-8">
                  <a href="https://github.com/mk12002/email_security" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"><FaGithub /> View Repository</a>
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
                    <button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTocSection === item.id ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{item.label}</button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ===== MOBILE TOC ===== */}
            <div className="lg:hidden mb-6">
              <button onClick={() => setTocOpen(!tocOpen)} className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-gray-300 font-medium">
                <span className="flex items-center gap-2"><FaSearch /> Jump to section</span>
                {tocOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {tocOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden rounded-xl border border-white/10 mt-2 bg-[#0d0d1a]">
                    <nav className="p-3 space-y-1 max-h-64 overflow-y-auto">
                      {tocItems.map(item => (
                        <button key={item.id} onClick={() => scrollTo(item.id)} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-all">{item.label}</button>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="flex-1 min-w-0 space-y-20">
              
              {/* CORE ARCHITECTURE */}
              <section id="sec-architecture" data-toc-section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl"><FaServer /></div>
                  <h2 className="text-3xl font-bold text-white">Core Architecture</h2>
                </div>
                <p className="text-gray-300 mb-8">{architectureData.description}</p>
                
                <div className="space-y-6 mb-8">
                  {architectureData.tiers.map((tier, i) => (
                    <div key={i} className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                      <h3 className="text-lg font-bold text-indigo-400 mb-3">{tier.title}</h3>
                      <ul className="space-y-2 pl-2">
                        {tier.details.map((d, j) => <li key={j} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-indigo-500 mt-1">▹</span> {d}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Diagram */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-4">System Flow Diagram</h3>
                  <MermaidDiagram chart={architectureData.diagramCode} />
                </div>
              </section>

              {/* METRICS */}
              <section id="sec-metrics" data-toc-section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-xl"><FaCheckCircle /></div>
                  <h2 className="text-3xl font-bold text-white">Model Performance & Evaluation</h2>
                </div>
                <p className="text-gray-300 mb-6">{metricsData.description}</p>

                <div className="overflow-x-auto rounded-xl border border-white/10 mb-8">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 font-medium">Domain</th>
                        <th className="px-4 py-3 font-medium">Architecture</th>
                        <th className="px-4 py-3 font-medium">Dataset</th>
                        <th className="px-4 py-3 font-medium">Acc</th>
                        <th className="px-4 py-3 font-medium">F1</th>
                        <th className="px-4 py-3 font-medium">ROC AUC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {metricsData.metrics.map((m, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-semibold text-white">{m.domain}</td>
                          <td className="px-4 py-3">{m.model}</td>
                          <td className="px-4 py-3 text-gray-400">{m.size}</td>
                          <td className="px-4 py-3 text-green-400">{m.acc}</td>
                          <td className="px-4 py-3">{m.f1}</td>
                          <td className="px-4 py-3 text-blue-400">{m.roc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                  <h3 className="text-green-400 font-semibold mb-3">Operational Readiness</h3>
                  <ul className="space-y-2">
                    {metricsData.operationalReadiness.map((op, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" /> {op}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ORCHESTRATION */}
              <section id="sec-orchestration" data-toc-section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl"><FaProjectDiagram /></div>
                  <h2 className="text-3xl font-bold text-white">LangGraph Orchestration</h2>
                </div>
                <p className="text-gray-300 mb-6">{orchestrationData.description}</p>
                
                <div className="mb-10">
                  <MermaidDiagram chart={orchestrationData.diagramCode} />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Weights */}
                  <div className="bg-[#0d0d1a] rounded-xl border border-white/10 p-5">
                    <h3 className="text-lg font-semibold text-white mb-4">Weighted Scoring Matrix</h3>
                    <div className="space-y-3">
                      {orchestrationData.weights.map((w, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 min-w-[200px]">
                            <span className="font-mono text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded text-sm">{w.weight}</span>
                            <span className="text-gray-200 font-medium text-sm">{w.agent}</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{w.logic}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Correlations */}
                  <div className="bg-[#0d0d1a] rounded-xl border border-white/10 p-5">
                    <h3 className="text-lg font-semibold text-white mb-4">Combinatorial Correlation</h3>
                    <div className="space-y-4">
                      {orchestrationData.correlations.map((c, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                          <div className="text-sm font-semibold text-purple-400 mb-1">{c.title}</div>
                          <p className="text-xs text-gray-300">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-4">Final Verdicts & Thresholds</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {orchestrationData.verdicts.map((v, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#0d0d1a] border border-white/10 text-center">
                      <div className="text-xs text-gray-500 font-mono mb-1">{v.range}</div>
                      <div className={`text-lg font-bold mb-2 ${v.color}`}>{v.label}</div>
                      <p className="text-xs text-gray-400">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* XAI & GARUDA */}
              <section id="sec-xai" data-toc-section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 text-xl"><FaCogs /></div>
                  <h2 className="text-3xl font-bold text-white">Explainability & Threat Hunting</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">🔄 Counterfactual Engine (XAI)</h3>
                    <p className="text-sm text-gray-300">{xaiData.counterfactual}</p>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">🦅 Garuda Threat Hunting</h3>
                    <p className="text-sm text-gray-300">{xaiData.garuda}</p>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">🛡️ MITRE ATT&CK Mapping</h3>
                    <p className="text-sm text-gray-300">{xaiData.mitre}</p>
                  </div>

                  {/* Response Engine */}
                  <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">⚡ Response Engine & Remediation</h3>
                    <p className="text-sm text-gray-300 mb-3">{xaiData.responseEngine.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {xaiData.responseEngine.actions.map((act, i) => (
                        <span key={i} className="px-2 py-1 bg-[#0d0d1a] border border-white/10 text-xs font-mono text-gray-400 rounded">{act}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 italic">{xaiData.responseEngine.modes}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">30GB RAM Constraints & Tech Stack</h3>
                  <ul className="space-y-2">
                    {xaiData.techStack.map((t, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-teal-500 font-bold">›</span> {t}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* AGENTS */}
              <section id="sec-agents" data-toc-section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-xl"><FaShieldAlt /></div>
                  <h2 className="text-3xl font-bold text-white">AI Agent Deep Dives</h2>
                </div>
                
                <div className="space-y-4">
                  {agentsData.map(agent => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent} 
                      isActive={activeAgents.has(agent.id)} 
                      onToggle={() => toggleAgent(agent.id)} 
                    />
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
