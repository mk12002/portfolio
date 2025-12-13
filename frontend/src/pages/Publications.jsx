import { motion } from 'framer-motion'
import { FaBook, FaUsers, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { usePublications } from '../hooks/useApi'

export default function Publications() {
  const { data, loading } = usePublications()
  const publications = data?.publications || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Publications</span>
          </h1>
          <p className="text-gray-400">Research papers and technical publications</p>
        </motion.div>

        {publications.length === 0 ? (
          <GlowCard glowColor="reasoning" className="text-center py-12">
            <FaBook className="text-4xl text-reasoning mx-auto mb-4" />
            <p className="text-gray-400">Publications coming soon...</p>
          </GlowCard>
        ) : (
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <GlowCard key={i} glowColor={['vision', 'reasoning', 'audio'][i % 3]} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-reasoning/20 flex items-center justify-center flex-shrink-0">
                    <FaBook className="text-reasoning text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{pub.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <FaUsers />
                      <span>{pub.authors?.join(', ')}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{pub.venue}</span>
                      <span className="flex items-center gap-1">
                        <FaCalendar /> {pub.year}
                      </span>
                    </div>

                    {pub.abstract && (
                      <p className="text-gray-400 text-sm mb-4">{pub.abstract}</p>
                    )}

                    {pub.tags && (
                      <div className="flex flex-wrap gap-2">
                        {pub.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-vision hover:text-white transition-colors"
                      >
                        View Paper <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
