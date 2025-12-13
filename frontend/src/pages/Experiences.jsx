import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaCertificate, FaTimes } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useExperiences } from '../hooks/useApi'

export default function Experiences() {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const { data, loading } = useExperiences()

  const experiences = data?.experiences || []
  const allTags = [...new Set(experiences.flatMap(e => e.tags || []))]

  const filteredExperiences = activeTag
    ? experiences.filter(e => e.tags?.includes(activeTag))
    : experiences

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
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-gray-400">Research internships and professional experience in ML/AI</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              !activeTag ? 'bg-reasoning text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                activeTag === tag ? 'bg-reasoning text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vision via-reasoning to-audio transform md:-translate-x-0.5" />

          <div className="space-y-8">
            {filteredExperiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-8' : 'md:ml-auto md:pl-8'}`}
              >
                <div className={`absolute w-4 h-4 rounded-full bg-gradient-to-r from-vision to-reasoning border-2 border-primary ${
                  i % 2 === 0 ? 'left-[-26px] md:left-auto md:right-[-8px]' : 'left-[-26px] md:left-[-8px]'
                } top-6`} />

                <GlowCard glowColor={['vision', 'audio', 'reasoning'][i % 3]}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <p className="text-gray-400 flex items-center gap-2">
                        <FaBriefcase className="text-vision" size={12} />
                        {exp.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaCalendar /> {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-reasoning mb-1">Project: {exp.project}</h4>
                    <p className="text-gray-400 text-sm">{exp.problem}</p>
                  </div>

                  {exp.impact && (
                    <div className="p-3 bg-white/5 rounded-lg mb-4">
                      <span className="text-sm text-vision font-medium">Impact: </span>
                      <span className="text-sm text-gray-300">{exp.impact}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.tags?.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-2 py-1 rounded text-xs cursor-pointer transition-all ${
                          activeTag === tag
                            ? 'bg-reasoning text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.certificateImage && (
                    <motion.button
                      onClick={() => setSelectedCertificate(exp.certificateImage)}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-vision/10 hover:bg-vision/20 text-vision rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaCertificate />
                      <span className="text-sm font-medium">View Certificate</span>
                    </motion.button>
                  )}
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full bg-secondary rounded-xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                >
                  <FaTimes size={20} />
                </button>
                {selectedCertificate.endsWith('.pdf') ? (
                  <iframe
                    src={selectedCertificate}
                    title="Certificate"
                    className="w-full h-[80vh]"
                  />
                ) : (
                  <img
                    src={selectedCertificate}
                    alt="Certificate"
                    className="w-full h-auto"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
