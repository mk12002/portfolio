import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaFilter, FaGithub, FaNewspaper, FaSearch } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import SEO from '../components/SEO'
import { useProjects } from '../hooks/useApi'

const categories = ['All', 'Cybersecurity', 'AI/ML', 'Research', 'Full-Stack']

const categoryColors = {
  'Cybersecurity': 'vision',
  'AI/ML': 'reasoning',
  'Research': 'audio',
  'Full-Stack': 'vision'
}

export default function Projects() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const { data, loading } = useProjects()

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveFilter(cat)
  }, [searchParams])

  const projects = data?.projects || []
  const filteredProjects = projects
    .filter(p => {
      if (activeFilter === 'All') return true
      if (p.categories && Array.isArray(p.categories)) {
        return p.categories.includes(activeFilter)
      }
      return p.category === activeFilter
    })
    .filter(p => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        p.title?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.tags?.some(tag => tag.toLowerCase().includes(q))
      )
    })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Projects | Mohit Kumar - Cybersecurity & AI/ML Projects Portfolio"
        description="Explore security tooling and AI/ML projects: Bulwark (agentic-AI supply-chain scanner), Lattice (post-quantum readiness), Portcullis (CI/CD security), Stowaway (supply-chain integrity), Schema-Grounded NL→KQL for SIEM, Agentic Email Security, and HybEx-Law (98.5% F1). Python, PyTorch, SARIF, CycloneDX."
        keywords="Cybersecurity Projects, AI Security Projects, AI Supply Chain, Post-Quantum Cryptography, CI/CD Security, Supply-Chain Security, SIEM, KQL, VAPT Tools, Multi-Agent Systems, Bulwark, Lattice, Portcullis, Stowaway"
        pathname="/projects"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cybersecurity tools, AI/ML systems, and research across security, intelligence, and automation
            </p>
          </motion.div>

          {/* Security Tooling Suite band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-10 rounded-2xl border border-white/10 bg-gradient-to-br from-vision/5 via-transparent to-reasoning/5 p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">🛡️ The <span className="gradient-text">Security Tooling Suite</span></h2>
                <p className="text-sm text-gray-400">
                  Four open-source scanners — <span className="text-gray-200">Bulwark</span>, <span className="text-gray-200">Lattice</span>, <span className="text-gray-200">Portcullis</span>, and <span className="text-gray-200">Stowaway</span> — that share one design DNA: offline, deterministic, SARIF output, <span className="font-mono text-xs">--fail-on</span> CI gates, and defensive-only. 580+ tests, 0–1 runtime deps.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {[['bulwark', 'Bulwark'], ['lattice', 'Lattice'], ['portcullis', 'Portcullis'], ['stowaway', 'Stowaway']].map(([slug, name]) => (
                  <Link
                    key={slug}
                    to={`/projects/${slug}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 hover:border-vision/40 hover:text-white transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects by name, topic, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-vision/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
            <FaFilter className="text-gray-500 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === cat
                    ? 'bg-gradient-to-r from-vision to-reasoning text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <GlowCard
                  key={project.slug}
                  glowColor={categoryColors[project.category] || 'mixed'}
                  delay={i * 0.1}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryColors[project.category] || 'reasoning'}/20 text-${categoryColors[project.category] || 'reasoning'}`}>
                      {project.category}
                    </span>
                    {project.type && (
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-gray-400">
                        {project.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.tagline}</p>

                  {project.metric && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg">
                      <span className="text-lg font-bold gradient-text">{project.metric}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-vision hover:text-white transition-colors"
                    >
                      View Details <FaArrowRight />
                    </Link>
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        title="View on GitHub"
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    {project.articleUrl && (
                      <motion.a
                        href={project.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        title="Read Article"
                      >
                        <FaNewspaper size={19} />
                      </motion.a>
                    )}
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
