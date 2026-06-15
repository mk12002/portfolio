import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaDownload, FaArrowRight, FaUser, FaShieldAlt, FaLock, FaBrain, FaRobot, FaEye, FaNetworkWired, FaProjectDiagram, FaSearch, FaTerminal, FaBug, FaServer } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import TerminalHero from '../components/TerminalHero'
import StatsCounter from '../components/StatsCounter'
import SEO from '../components/SEO'
import { useProfile } from '../hooks/useApi'

// Lazy load heavy Three.js components
const NodeGraph = lazy(() => import('../components/NodeGraph'))
const TechStackGraph = lazy(() => import('../components/TechStackGraph'))

// Expertise area details for richer cards
const expertiseDetails = {
  'AI for Security': { description: 'Leveraging ML for threat detection, anomaly detection & automated defense', icon: FaShieldAlt },
  'Security for AI': { description: 'Protecting ML models from adversarial attacks & ensuring robust deployments', icon: FaLock },
  'Cybersecurity': { description: 'VAPT, SOC operations, network defense & incident response', icon: FaLock },
  'Machine Learning': { description: 'Building and deploying production ML pipelines with PyTorch & Transformers', icon: FaBrain },
  'Adversarial ML': { description: 'Robustness testing, adversarial examples & model hardening', icon: FaRobot },
  'Threat Detection': { description: 'Real-time anomaly detection and behavioral analysis in SOC environments', icon: FaSearch },
  'Multi-Agent Systems': { description: 'Orchestrating autonomous AI agents for security automation', icon: FaNetworkWired },
  'Computer Vision': { description: 'Object detection, segmentation & visual threat analysis', icon: FaEye },
  'Deep Learning': { description: 'Neural architectures for complex security & ML problems', icon: FaProjectDiagram },
  'NLP': { description: 'Text analysis, legal AI & natural language understanding', icon: FaBrain },
}

const featuredProjects = [
  {
    slug: 'tara-email-security',
    title: 'Agentic Email Security',
    description: 'Production-grade cybersecurity platform neutralizing advanced email threats via multi-agent AI architecture',
    metric: '7 Agents · 30GB RAM Optimized',
    tags: ['Agentic AI', 'LangGraph', 'Cybersecurity', 'XGBoost'],
    color: 'vision',
    icon: FaShieldAlt,
  },
  {
    slug: 'security-tools',
    title: 'Security Engineering Toolkit',
    description: '14 CLI-driven security assessment tools across AppSec, IAM, Cloud, and Detection Engineering',
    metric: '14 Tools · 4 Domains',
    tags: ['AppSec', 'Blue Team', 'Cloud Security', 'MITRE ATT&CK'],
    color: 'reasoning',
    icon: FaTerminal,
    isSpecialRoute: true,
  },
  {
    slug: 'hybex-law',
    title: 'HybEx-Law: Hybrid Legal AI',
    description: 'LegalBERT + GNN + Prolog hybrid reasoning system achieving 98.5% F1 score',
    metric: 'F1 Score: 0.985',
    tags: ['Neural-Symbolic', 'GNN', 'Prolog', 'Legal AI'],
    color: 'audio',
    icon: FaBrain,
  },
]

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
            alt="Mohit Kumar — Cybersecurity & AI Engineer"
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

function AboutMe({ profile }) {
  const focusAreas = [
    { icon: FaShieldAlt, title: 'VAPT & Pen Testing', detail: 'Burp Suite, Nmap, sqlmap, Nessus' },
    { icon: FaServer, title: 'SOC Operations', detail: 'Splunk, Sentinel, Defender EDR/XDR' },
    { icon: FaRobot, title: 'AI-Powered Defense', detail: 'Multi-Agent threat neutralization' },
    { icon: FaBug, title: 'Adversarial ML', detail: 'Model hardening & robustness testing' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-vision to-reasoning mx-auto rounded-full" />
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Narrative — 3 cols */}
        <motion.div
          className="lg:col-span-3 space-y-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-base leading-relaxed">
            {profile?.longIntro || "I'm a Cybersecurity & AI Engineer at ITC Infotech, blending deep AI/ML expertise with security operations. I specialize in building intelligent defense systems — from multi-agentic email threat neutralization to SOC-grade anomaly detection — while researching adversarial robustness to secure AI from attack."}
          </p>

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-vision mb-3">Current Focus</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Engineering a multi-agentic AI system at ITC Infotech for autonomous email threat neutralization. Running VAPT engagements with Burp Suite & Nmap. Building SOC detection rules in Splunk & Microsoft Sentinel.
            </p>
          </div>

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-reasoning mb-3">My Approach</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              I believe the future of security is AI-native — and the future of AI must be secure. My ML background (PyTorch, Transformers, GNN) gives me a unique edge in building intelligent security systems that think like attackers and defend like experts.
            </p>
          </div>
        </motion.div>

        {/* Focus Areas — 2 cols */}
        <motion.div
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              className="group p-4 bg-secondary/50 rounded-xl border border-white/5 hover:border-vision/30 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-vision/10 flex items-center justify-center group-hover:bg-vision/20 transition-colors">
                  <area.icon className="text-vision text-lg" />
                </div>
                <h4 className="font-semibold text-sm text-white">{area.title}</h4>
              </div>
              <p className="text-gray-500 text-xs pl-13">{area.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProjects() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Highlight work in cybersecurity, AI/ML, and research
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Link
              to={project.isSpecialRoute ? '/projects/security-tools' : `/projects/${project.slug}`}
              className="block h-full"
            >
              <GlowCard glowColor={project.color} className="h-full flex flex-col group">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center group-hover:bg-${project.color}/20 transition-colors`}>
                    <project.icon className={`text-${project.color} text-xl`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">{project.title}</h3>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>

                {project.metric && (
                  <div className="mb-4 p-3 bg-white/5 rounded-lg">
                    <span className="text-sm font-bold gradient-text">{project.metric}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">{tag}</span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-vision text-sm group-hover:gap-3 transition-all">
                  View Project <FaArrowRight className="text-xs" />
                </div>
              </GlowCard>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-all text-gray-300 hover:text-white"
          >
            View All Projects <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
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
        title="Mohit Kumar | Cybersecurity & AI Engineer"
        description="Cybersecurity & AI Engineer specializing in AI for Security, Security for AI, VAPT, SOC Operations, and Multi-Agent Systems. Deep ML background in PyTorch, Transformers, and GNN."
        keywords="Cybersecurity Engineer, AI Engineer, AI for Security, Security for AI, Adversarial ML, VAPT, SOC, Threat Detection, PyTorch, ML Security, Mohit Kumar"
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

        {/* Hero Section */}
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
                  className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium inline-block"
                  animate={{ boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Cybersecurity & AI Engineer
                </motion.span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="gradient-text glitch-text" data-text={profile?.name || 'Mohit Kumar'}>{profile?.name || 'Mohit Kumar'}</span>
              </h1>

              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {profile?.shortIntro || 'Cybersecurity & AI Engineer building intelligent defense systems. Currently at ITC Infotech — engineering multi-agentic email threat neutralization, conducting VAPT, and running SOC operations.'}
              </motion.p>

              <motion.p
                className="text-base text-vision/80 font-medium mb-8 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                "Securing systems with AI. Securing AI from attack."
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
                  { href: profile?.socialLinks?.twitter || 'https://x.com/mohitkr111', icon: FaTwitter, color: 'hover:text-vision', label: 'X (Twitter)' },
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
              <ProfilePicture profilePicture={profile?.profilePicture} />
            </motion.div>
          </div>
        </section>

        {/* About Me */}
        <AboutMe profile={profile} />

        {/* Terminal Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
          <TerminalHero />
        </section>

        <StatsCounter />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Security Domains Graph */}
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
          <div className="h-[500px] w-full rounded-xl overflow-hidden border border-white/10 relative">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                <div className="w-10 h-10 border-4 border-vision border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <NodeGraph />
            </Suspense>
          </div>
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
            className="h-[600px] w-full rounded-xl overflow-hidden border border-white/10 relative"
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                <div className="w-10 h-10 border-4 border-reasoning border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <TechStackGraph />
            </Suspense>
          </motion.div>
        </section>

        {/* CTA */}
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
                  Open for cybersecurity roles, security research, and red/blue team projects.
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
