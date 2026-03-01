import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDownload, FaArrowRight, FaUser, FaShieldAlt, FaLock, FaBrain, FaRobot, FaEye, FaNetworkWired, FaProjectDiagram, FaSearch } from 'react-icons/fa'
import NodeGraph from '../components/NodeGraph'
import GlowCard from '../components/GlowCard'
import TechStackGraph from '../components/TechStackGraph'
import TerminalHero from '../components/TerminalHero'
import StatsCounter from '../components/StatsCounter'
import SEO from '../components/SEO'
import { useProfile } from '../hooks/useApi'

// Expertise area details for richer cards
const expertiseDetails = {
  'AI for Security': { description: 'Leveraging ML for threat detection, anomaly detection & automated defense', icon: FaShieldAlt, category: 'Reasoning' },
  'Security for AI': { description: 'Protecting ML models from adversarial attacks & ensuring robust deployments', icon: FaLock, category: 'Reasoning' },
  'Cybersecurity': { description: 'VAPT, SOC operations, network defense & incident response', icon: FaLock, category: 'Reasoning' },
  'Machine Learning': { description: 'Building and deploying production ML pipelines with PyTorch & Transformers', icon: FaBrain, category: 'All' },
  'Adversarial ML': { description: 'Robustness testing, adversarial examples & model hardening', icon: FaRobot, category: 'Reasoning' },
  'Threat Detection': { description: 'Real-time anomaly detection and behavioral analysis in SOC environments', icon: FaSearch, category: 'Reasoning' },
  'Multi-Agent Systems': { description: 'Orchestrating autonomous AI agents for security automation', icon: FaNetworkWired, category: 'Reasoning' },
  'Computer Vision': { description: 'Object detection, segmentation & visual threat analysis', icon: FaEye, category: 'Vision' },
  'Deep Learning': { description: 'Neural architectures for complex security & ML problems', icon: FaProjectDiagram, category: 'All' },
  'NLP': { description: 'Text analysis, legal AI & natural language understanding', icon: FaBrain, category: 'Reasoning' },
  'Legal AI': { description: 'AI-powered legal reasoning and document analysis', icon: FaShieldAlt, category: 'Legal AI' },
  'Healthcare AI': { description: 'ML systems for medical diagnostics and digital twins', icon: FaProjectDiagram, category: 'Vision' },
  'Neural-Symbolic Reasoning': { description: 'Combining neural networks with symbolic logic for hybrid AI', icon: FaBrain, category: 'Reasoning' },
}

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

function ProfilePicture({ profilePicture }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute -inset-4 rounded-full bg-vision opacity-30 blur-2xl"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
        whileHover={{ scale: 1.05 }}
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Mohit Kumar — ML Systems Engineer"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-vision/20 to-vision/10 flex items-center justify-center">
            <div className="text-center">
              <FaUser className="text-6xl md:text-8xl text-white/40 mx-auto mb-2" />
              <span className="text-white/50 text-sm">Your Photo Here</span>
            </div>
          </div>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// AnimatedText removed — was unused dead code

export default function Home() {
  const { data: profile, loading } = useProfile()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Mohit Kumar | Cybersecurity Engineer × ML — AI for Security & Security for AI"
        description="Cybersecurity Engineer specializing in AI for Security, Security for AI, VAPT, SOC Operations, and Multi-Agent Systems. Deep ML background in PyTorch, Transformers, and GNN."
        keywords="Cybersecurity Engineer, AI for Security, Security for AI, Adversarial ML, VAPT, SOC, Threat Detection, PyTorch, ML Security, Mohit Kumar"
        pathname="/"
      />
      <div className="min-h-screen pt-20 relative overflow-hidden">
        <FloatingShape
          className="top-32 right-10 w-20 h-20 rounded-full bg-vision/10 blur-2xl"
          delay={0}
        />
        <FloatingShape
          className="top-1/2 left-10 w-32 h-32 rounded-full bg-reasoning/10 blur-2xl"
          delay={2}
        />
        <FloatingShape
          className="bottom-32 right-1/4 w-24 h-24 rounded-full bg-audio/10 blur-2xl"
          delay={4}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <motion.span
                  className="px-4 py-2 rounded-full bg-threat/20 text-threat text-sm font-medium inline-block"
                  animate={{ boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Cybersecurity × ML Engineer
                </motion.span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="gradient-text glitch-text" data-text={profile?.name || 'Mohit Kumar'}>{profile?.name || 'Mohit Kumar'}</span>
              </h1>

              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {profile?.shortIntro || 'Cybersecurity intern at ITC Infotech working at the intersection of AI and security. Building ML-powered defense systems while securing AI from adversarial threats.'}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vision to-reasoning rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-vision/25"
                  >
                    View Projects <FaArrowRight />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all"
                  >
                    <FaDownload /> Resume
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { href: profile?.socialLinks?.github || '#', icon: FaGithub, color: 'hover:text-vision', label: 'GitHub' },
                  { href: profile?.socialLinks?.linkedin || '#', icon: FaLinkedin, color: 'hover:text-vision', label: 'LinkedIn' },
                  { href: profile?.socialLinks?.instagram || '#', icon: FaInstagram, color: 'hover:text-reasoning', label: 'Instagram' },
                  { href: profile?.socialLinks?.email || 'mailto:mohit.kr1103@gmail.com', icon: FaEnvelope, color: 'hover:text-audio', label: 'Email' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 ${social.color} hover:bg-white/10 transition-all`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <TerminalHero />
            </motion.div>
          </div>
        </section>

        <StatsCounter />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Explore My <span className="gradient-text">Security Domains</span>
            </h2>
            <p className="text-gray-400">Click on a node to explore projects in that domain</p>
          </motion.div>
          <NodeGraph />
        </section>

        {/* Tech Stack Neural Graph */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Security Arsenal</span> & Skills
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-2">
              Interactive graph of security tools, ML frameworks, and technologies I work with.
              Node size and glow intensity represent proficiency level.
            </p>
            <p className="text-gray-500 text-sm">
              Click any technology to see connections • Glow intensity = proficiency level
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TechStackGraph />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Areas of <span className="gradient-text">Expertise</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Building intelligent systems at the intersection of neural learning, symbolic reasoning, and agentic automation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile?.interests?.slice(0, 8).map((interest, i) => {
              const details = expertiseDetails[interest] || { description: 'Exploring cutting-edge research', icon: FaBrain, category: 'All' }
              const IconComponent = details.icon
              return (
                <Link key={interest} to={`/projects?category=${encodeURIComponent(details.category)}`}>
                  <GlowCard
                    glowColor={['vision', 'audio', 'reasoning', 'mixed'][i % 4]}
                    delay={i * 0.1}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-vision/20 to-reasoning/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      />
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="text-xl text-vision/80" />
                        <h3 className="font-semibold text-lg">{interest}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{details.description}</p>
                    </motion.div>
                  </GlowCard>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowCard glowColor="mixed" className="text-center py-12 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Let's Build Something Amazing Together
                </motion.h2>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                  Open for security roles, research collaborations, and red/blue team projects.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-reasoning to-audio rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-reasoning/25"
                  >
                    Get in Touch <FaArrowRight />
                  </Link>
                </motion.div>
              </div>
            </GlowCard>
          </motion.div>
        </section>
      </div>
    </>
  )
}
