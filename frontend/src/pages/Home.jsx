import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaDownload, FaArrowRight, FaUser, FaShieldAlt, FaLock, FaBrain, FaRobot, FaEye, FaNetworkWired, FaProjectDiagram, FaSearch, FaTerminal, FaBug, FaServer } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import TerminalHero from '../components/TerminalHero'
import StatsCounter from '../components/StatsCounter'
import SEO from '../components/SEO'
import { useProfile } from '../hooks/useApi'

// Lazy load the single heavy Three.js component
const NodeGraph = lazy(() => import('../components/NodeGraph'))

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
    slug: 'bulwark',
    title: 'Bulwark: Security Stack for Agentic AI',
    description: 'Three composable scanners that audit the whole AI-agent supply chain — pickle RCE, MCP risks, and agent excessive-agency — into one CycloneDX AI-BOM',
    metric: '3 Tools · 14/14 Adversarial · 200+ Tests',
    tags: ['AI Supply Chain', 'Pickle RCE', 'MCP Security', 'AI-BOM'],
    color: 'vision',
    icon: FaRobot,
  },
  {
    slug: 'lattice',
    title: 'Lattice: Post-Quantum Readiness Scanner',
    description: 'Builds a Cryptographic Bill of Materials, grades every asset for quantum + classical weakness, and emits a NIST post-quantum migration roadmap',
    metric: '9 Languages · 153 Tests · 0 Deps',
    tags: ['Post-Quantum', 'CBOM', 'HNDL', 'NIST FIPS 203'],
    color: 'reasoning',
    icon: FaLock,
  },
  {
    slug: 'portcullis',
    title: 'Portcullis: CI/CD Pipeline Scanner',
    description: 'Static analyzer for GitHub Actions, GitLab CI, and Jenkins that ranks findings by whether attacker-controlled input can actually reach them',
    metric: '3 Platforms · 66 Pipelines · 100/100 Self-Scan',
    tags: ['GitHub Actions', 'pwn-request', 'Taint Analysis', 'SARIF'],
    color: 'audio',
    icon: FaNetworkWired,
  },
  {
    slug: 'stowaway',
    title: 'Stowaway: Supply-Chain Integrity Scanner',
    description: 'Catches the no-CVE attacks — typosquatting, dependency confusion, install-hook malware — across npm, PyPI, Go, and Cargo, fully offline',
    metric: '4 Ecosystems · 118 Tests · 0 False Positives',
    tags: ['Typosquatting', 'Dependency Confusion', 'Install Malware', 'Offline'],
    color: 'vision',
    icon: FaBug,
  },
  {
    slug: 'ir-siem-kql',
    title: 'Schema-Grounded NL→KQL for SIEM',
    description: 'An intermediate representation between natural language and KQL that cuts field hallucination in Sentinel detection rules from 93% to 13%',
    metric: 'FVR 6.7% → 86.7% · 13× Fewer Hallucinations',
    tags: ['LLM', 'KQL / Sentinel', 'ASIM', 'Detection Engineering'],
    color: 'reasoning',
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
          <img loading="lazy" decoding="async"
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

const suiteTools = [
  { slug: 'bulwark', name: 'Bulwark', icon: FaRobot, blurb: 'Agentic-AI supply chain — models, MCP servers, agent assemblies', metric: '3 tools · AI-BOM' },
  { slug: 'lattice', name: 'Lattice', icon: FaLock, blurb: 'Post-quantum crypto readiness — a Cryptographic Bill of Materials', metric: '9 languages · 0 deps' },
  { slug: 'portcullis', name: 'Portcullis', icon: FaNetworkWired, blurb: 'CI/CD pipeline security — GitHub Actions, GitLab CI, Jenkins', metric: '3 platforms' },
  { slug: 'stowaway', name: 'Stowaway', icon: FaBug, blurb: 'Supply-chain integrity — typosquat, confusion, install-malware', metric: '4 ecosystems' },
]

const suitePrinciples = ['Offline', 'Deterministic', 'SARIF 2.1.0', '--fail-on CI gate', 'Defensive-only', 'Standards-based']

function SecuritySuite() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-vision/5 via-transparent to-reasoning/5 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-vision/10 flex items-center justify-center">
              <FaShieldAlt className="text-vision text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              The <span className="gradient-text">Security Tooling Suite</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-3xl mb-6 leading-relaxed">
            Four open-source scanners built on one design philosophy: they run <span className="text-gray-200">fully offline</span>, produce <span className="text-gray-200">byte-deterministic</span> output, emit <span className="text-gray-200">SARIF</span> for code-scanning UIs, gate merges with <span className="text-gray-200">--fail-on</span>, and are strictly <span className="text-gray-200">defensive</span> — they detect and report, and are hardened against the hostile inputs they read. Together they cover the modern software supply chain: the AI components, the cryptography, the pipelines, and the dependencies.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {suitePrinciples.map((p) => (
              <span key={p} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                {p}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {suiteTools.map((tool) => (
              <Link
                key={tool.slug}
                to={`/projects/${tool.slug}`}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-vision/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-vision/10 flex items-center justify-center flex-shrink-0 group-hover:bg-vision/20 transition-colors">
                  <tool.icon className="text-vision" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <span className="text-xs text-gray-500">{tool.metric}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-snug">{tool.blurb}</p>
                </div>
                <FaArrowRight className="text-gray-600 group-hover:text-vision transition-colors ml-auto mt-1 flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-white/10 pt-5">
            <span><span className="text-gray-200 font-semibold">4</span> open-source scanners</span>
            <span><span className="text-gray-200 font-semibold">580+</span> passing tests</span>
            <span><span className="text-gray-200 font-semibold">0–1</span> runtime dependencies</span>
            <span><span className="text-gray-200 font-semibold">Apache-2.0 / MIT</span></span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const skillGroups = [
  {
    title: 'Cybersecurity',
    icon: FaShieldAlt,
    skills: ['VAPT', 'Burp Suite', 'Nmap', 'sqlmap', 'Nessus', 'Splunk', 'Microsoft Sentinel', 'Defender EDR/XDR', 'OWASP Top 10', 'Incident Response'],
  },
  {
    title: 'AI / Machine Learning',
    icon: FaBrain,
    skills: ['PyTorch', 'TensorFlow', 'Transformers', 'LangGraph', 'LangChain', 'GNN', 'Computer Vision', 'NLP', 'Adversarial ML', 'Multi-Agent Systems'],
  },
  {
    title: 'Cloud, Tools & Languages',
    icon: FaServer,
    skills: ['AWS', 'Azure', 'Docker', 'Git', 'FastAPI', 'Streamlit', 'Python', 'Java', 'C/C++', 'SQL'],
  },
]

function SkillsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Skills & <span className="gradient-text">Toolset</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          The security, ML, and engineering stack I build and defend with.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <group.icon className="text-accent text-lg" />
              </div>
              <h3 className="font-semibold text-lg">{group.title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="px-2.5 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
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
                <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  Cybersecurity &amp; AI Engineer
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="gradient-text">{profile?.name || 'Mohit Kumar'}</span>
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
                className="text-base text-gray-300 font-medium mb-8 pl-3 border-l-2 border-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Securing systems with AI. Securing AI from attack.
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

        {/* Security Tooling Suite */}
        <SecuritySuite />

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

        {/* Skills */}
        <SkillsSection />

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowCard glowColor="mixed" className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Let's build secure, intelligent systems
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Open to cybersecurity & AI engineering roles, security research, and red/blue team collaborations.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-vision to-reasoning text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
                >
                  Get in Touch <FaArrowRight />
                </Link>
              </motion.div>
            </GlowCard>
          </motion.div>
        </section>
      </div>
    </>
  )
}
