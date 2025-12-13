import { motion } from 'framer-motion'
import { FaDownload, FaGraduationCap, FaCode, FaCloud, FaTools, FaBrain, FaTrophy } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import SEO from '../components/SEO'
import { useResume } from '../hooks/useApi'

const skillIcons = {
  machineLearning: FaBrain,
  frameworks: FaCode,
  tools: FaTools,
  cloud: FaCloud,
  languages: FaCode
}

const skillColors = {
  machineLearning: 'vision',
  frameworks: 'reasoning',
  tools: 'audio',
  cloud: 'vision',
  languages: 'reasoning'
}

export default function Resume() {
  const { data: resume, loading } = useResume()

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
        title="Resume | Mohit Kumar - ML Systems Engineer CV & Skills"
        description="Mohit Kumar's professional resume: ML Systems Engineer with expertise in PyTorch (95%), Python (98%), Transformers, GNN, Computer Vision. Download CV PDF."
        keywords="ML Engineer Resume, Machine Learning CV, PyTorch Developer, Python Developer, AI Engineer CV, Deep Learning Resume, Computer Vision Engineer, NLP Engineer"
        pathname="/resume"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{resume?.name}</span>
          </h1>
          <p className="text-xl text-gray-400 mb-6">{resume?.title}</p>
          <a
            href="/resume/Mohit_Kumar.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vision to-reasoning rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <FaDownload /> Download Resume
          </a>
        </motion.div>

        <GlowCard glowColor="mixed" className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-reasoning">Summary</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{resume?.summary}</p>
        </GlowCard>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaGraduationCap className="text-vision" />
            Education
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vision via-reasoning to-audio" />
            <div className="space-y-6">
              {resume?.education?.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ml-10 relative"
                >
                  <div className="absolute -left-[26px] w-4 h-4 rounded-full bg-gradient-to-r from-vision to-reasoning border-2 border-primary" />
                  <GlowCard glowColor={['vision', 'reasoning', 'audio'][i % 3]}>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-vision">{edu.cgpa || edu.percentage}</span>
                      <span className="text-gray-500">{edu.duration}</span>
                      {edu.location && <span className="text-gray-500">{edu.location}</span>}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaBrain className="text-reasoning" />
            Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resume?.skills && Object.entries(resume.skills).map(([category, skills], i) => {
              const Icon = skillIcons[category] || FaCode
              const color = skillColors[category] || 'vision'
              return (
                <GlowCard key={category} glowColor={color} delay={i * 0.1}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 capitalize">
                    <Icon className={`text-${color}`} />
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </section>

        {resume?.coursework && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Coursework</h2>
            <div className="flex flex-wrap gap-3">
              {resume.coursework.map((course) => (
                <span
                  key={course}
                  className="px-4 py-2 bg-secondary/50 rounded-lg text-gray-300 border border-white/10"
                >
                  {course}
                </span>
              ))}
            </div>
          </section>
        )}

        {resume?.achievements && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaTrophy className="text-audio" />
              Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {resume.achievements.map((achievement, i) => (
                <GlowCard key={i} glowColor="audio" delay={i * 0.05}>
                  <p className="text-gray-300">{achievement}</p>
                </GlowCard>
              ))}
            </div>
          </section>
        )}
      </div>
      </div>
    </>
  )
}
