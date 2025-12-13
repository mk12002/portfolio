import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCode, FaChartLine, FaLightbulb, FaCogs, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useProjects } from '../hooks/useApi'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data, loading } = useProjects()

  const project = data?.projects?.find(p => p.slug === slug)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-vision hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft /> Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-reasoning/20 text-reasoning">
                {project.category}
              </span>
              {project.type && (
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-400">
                  {project.type}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-400 mb-4">{project.tagline}</p>
            
            {/* External Links */}
            <div className="flex gap-3">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub /> View on GitHub
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-vision to-reasoning rounded-lg hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt /> Live Demo
                </motion.a>
              )}
            </div>
          </div>

          {project.metric && (
            <GlowCard glowColor="vision" className="mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{project.metric}</div>
                {project.precision && (
                  <div className="text-lg text-gray-400">Precision: {project.precision}</div>
                )}
              </div>
            </GlowCard>
          )}

          <div className="space-y-8">
            <GlowCard glowColor="reasoning">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaLightbulb className="text-audio" /> Problem Statement
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {project.problem || project.description}
              </p>
            </GlowCard>

            {project.approach && (
              <GlowCard glowColor="audio">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaCogs className="text-vision" /> Approach
                </h2>
                <p className="text-gray-300 leading-relaxed">{project.approach}</p>
              </GlowCard>
            )}

            {project.architecture && (
              <GlowCard glowColor="vision">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaCode className="text-reasoning" /> Architecture
                </h2>
                <div className="p-4 bg-primary/50 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto">
                  {project.architecture}
                </div>
              </GlowCard>
            )}

            {project.results && (
              <GlowCard glowColor="mixed">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaChartLine className="text-audio" /> Results
                </h2>
                <p className="text-gray-300 leading-relaxed">{project.results}</p>
              </GlowCard>
            )}

            {project.techStack && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-secondary/50 rounded-lg text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-reasoning/20 rounded-full text-sm text-reasoning"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
