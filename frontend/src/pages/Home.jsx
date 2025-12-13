import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight, FaUser } from 'react-icons/fa'
import NodeGraph from '../components/NodeGraph'
import GlowCard from '../components/GlowCard'
import TechStackGraph from '../components/TechStackGraph'
import SEO from '../components/SEO'
import { useProfile } from '../hooks/useApi'

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

function ProfilePicture() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-vision via-reasoning to-audio opacity-50 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-vision/30 via-reasoning/30 to-audio/30 flex items-center justify-center">
          <div className="text-center">
            <FaUser className="text-6xl md:text-8xl text-white/40 mx-auto mb-2" />
            <span className="text-white/50 text-sm">Your Photo Here</span>
          </div>
        </div>
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

function AnimatedText({ text, className }) {
  return (
    <motion.span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

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
        title="Mohit Kumar | ML Systems Engineer - AI & Machine Learning Portfolio"
        description="ML Systems Engineer specializing in Computer Vision, NLP, Multi-Agent Systems, and Legal AI. View projects in PyTorch, Transformers, GNN, and production ML systems."
        keywords="Machine Learning Engineer, ML Systems, Computer Vision, NLP, PyTorch, Transformers, Deep Learning, AI Portfolio, Neural Networks, Legal AI, Multi-Agent Systems, Mohit Kumar"
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
                className="px-4 py-2 rounded-full bg-reasoning/20 text-reasoning text-sm font-medium inline-block"
                animate={{ boxShadow: ['0 0 0 rgba(168, 85, 247, 0)', '0 0 20px rgba(168, 85, 247, 0.3)', '0 0 0 rgba(168, 85, 247, 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ML Systems Engineer
              </motion.span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="gradient-text">{profile?.name || 'Mohit Kumar'}</span>
            </h1>

            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {profile?.shortIntro || 'Building applied ML systems across vision, audio, reasoning, legal AI, digital twins, and multi-agent automation.'}
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
                { href: profile?.socialLinks?.github || '#', icon: FaGithub, color: 'hover:text-vision' },
                { href: profile?.socialLinks?.linkedin || '#', icon: FaLinkedin, color: 'hover:text-vision' },
                { href: profile?.socialLinks?.email || 'mailto:mohit.kr1103@gmail.com', icon: FaEnvelope, color: 'hover:text-audio' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
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
            <ProfilePicture />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Explore My <span className="gradient-text">Domains</span>
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
              <span className="gradient-text">Tech Stack</span> & Skills
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-2">
              Interactive neural graph of technologies and frameworks I work with.
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
          {profile?.interests?.slice(0, 8).map((interest, i) => (
            <GlowCard
              key={interest}
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
                <h3 className="font-semibold text-lg">{interest}</h3>
              </motion.div>
            </GlowCard>
          ))}
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
                  'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
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
                Open for internships, research collaborations, and exciting ML projects.
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
