import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaFilter, FaGithub } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import SEO from '../components/SEO'
import { useProjects } from '../hooks/useApi'

const categories = ['All', 'Vision', 'Audio', 'Reasoning', 'Legal AI', 'Healthcare', 'AgriTech']

const categoryColors = {
  'Vision': 'vision',
  'Audio': 'audio',
  'Reasoning': 'reasoning',
  'Legal AI': 'reasoning',
  'Healthcare': 'vision',
  'AgriTech': 'audio'
}

export default function Projects() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const { data, loading } = useProjects()

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveFilter(cat)
  }, [searchParams])

  const projects = data?.projects || []
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => {
        // Check both category and categories array
        if (p.categories && Array.isArray(p.categories)) {
          return p.categories.includes(activeFilter)
        }
        return p.category === activeFilter
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
        title="Projects | Mohit Kumar - ML & AI Projects Portfolio"
        description="Explore ML/AI projects: HybEx-Law (95% F1 Legal AI), Nexus (75% reduction Multi-Agent), Parking Detection (98.99% mAP Computer Vision). PyTorch, Transformers, GNN implementations."
        keywords="ML Projects, AI Projects, Computer Vision Projects, NLP Projects, Legal AI, Multi-Agent Systems, PyTorch Projects, Deep Learning Portfolio, HybEx-Law, Nexus, Parking Detection"
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
            Explore my work across vision, audio, reasoning, and hybrid AI systems
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <FaFilter className="text-gray-500 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === cat
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
                    >
                      <FaGithub size={20} />
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
