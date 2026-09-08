import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaEnvelope, FaDownload, FaLinkedin, FaGithub, FaMapMarkerAlt, FaClock,
  FaCheckCircle, FaArrowRight, FaShieldAlt, FaRobot, FaBug, FaSearch,
} from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import SEO from '../components/SEO'

// ---------------------------------------------------------------------------
// EDIT ME — the only facts on this page that aren't derived from site content.
// Keep `availability` and `noticePeriod` current; a stale hiring page is worse
// than no hiring page. Flip `open` to false when you stop looking.
// ---------------------------------------------------------------------------
const STATUS = {
  open: true,
  headline: 'Open to Security Engineering roles',
  availability: 'Actively interviewing — targeting a Q2 2027 start',
  noticePeriod: '60 days',
  location: 'Bengaluru, India',
  workModel: 'On-site or hybrid in Bengaluru · open to remote-first teams',
  workAuth: 'Indian citizen — no sponsorship required to work in India',
  email: 'mohit.kr1103@gmail.com',
}

const ROLE_TRACKS = [
  {
    icon: FaRobot,
    color: 'vision',
    title: 'AI / ML Security',
    blurb: "Securing models, agents, and the ML supply chain — the work I already ship in the open.",
    titles: ['AI Security Engineer', 'ML Security Engineer', 'Security Research (AI)'],
    proof: { label: 'Bulwark — the security stack for agentic AI', to: '/projects/bulwark' },
  },
  {
    icon: FaShieldAlt,
    color: 'reasoning',
    title: 'Product & Platform Security',
    blurb: 'Supply-chain, cloud, and CI/CD hardening for a product team — shift-left, with tooling to back it.',
    titles: ['Product Security Engineer', 'Application Security Engineer', 'DevSecOps Engineer'],
    proof: { label: 'Portcullis — CI/CD pipeline scanner', to: '/projects/portcullis' },
  },
  {
    icon: FaSearch,
    color: 'audio',
    title: 'Detection Engineering',
    blurb: 'SIEM detection content that is explainable and testable, not a pile of brittle rules.',
    titles: ['Detection Engineer', 'Security Engineer (SOC)', 'Cloud Security Engineer'],
    proof: { label: 'Schema-grounded NL to KQL for Sentinel', to: '/projects/ir-siem-kql' },
  },
  {
    icon: FaBug,
    color: 'vision',
    title: 'Offensive Security',
    blurb: 'VAPT and adversarial testing — I build the analyzers, so I know where the paths hide.',
    titles: ['Security Engineer (Offensive)', 'Penetration Tester', 'Red Team Engineer'],
    proof: { label: 'Case study — argo-cd path to cluster-admin', to: '/case-study' },
  },
]

// Each claim points at something on this site that substantiates it. If a bullet
// can't cite proof, it doesn't belong here.
const EVIDENCE = [
  {
    claim: 'I ship production-grade open-source security tooling',
    detail: 'Five scanners covering Kubernetes RBAC, the AI/ML supply chain, dependencies, cryptography, and CI/CD — packaged, documented, CodeQL-gated, and citable.',
    to: '/projects',
    cta: 'See the suite',
  },
  {
    claim: 'My tools find real issues in real software',
    detail: "Bastion surfaced 19 escalation paths to cluster-admin in the public argo-cd Helm chart — including a controller bound to a wildcard ClusterRole — where a pod-hygiene linter reported 0 RBAC findings.",
    to: '/case-study',
    cta: 'Read the finding',
  },
  {
    claim: 'I do the security work, not just the tooling',
    detail: 'Security Engineer at ITC Infotech: VAPT engagements, Sentinel/Splunk detection engineering, and J-SOX/MICS control audits — converted from intern to full-time on the strength of a 7-agent email threat-neutralization system.',
    to: '/experiences',
    cta: 'See experience',
  },
  {
    claim: 'I can write for engineers and for executives',
    detail: 'Technical writing on AI security published to dev.to and Hashnode, peer-reviewed research in Scientific Reports (Nature Portfolio), and repeated security-architecture briefings to VP- and CHRO-level leadership.',
    to: '/posts',
    cta: 'Read the writing',
  },
]

function StatusRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-vision mt-1 shrink-0" size={14} />
      <div className="min-w-0">
        <div className="text-gray-500 text-xs uppercase tracking-wide">{label}</div>
        <div className="text-gray-300 text-sm">{value}</div>
      </div>
    </div>
  )
}

export default function Hire() {
  const mailto = `mailto:${STATUS.email}?subject=${encodeURIComponent('Role opportunity — Security Engineering')}`

  return (
    <>
      <SEO
        title="Hire Me | Mohit Kumar — Security Engineer"
        description="Security Engineer in Bengaluru open to AI/ML security, product security, detection engineering, and offensive security roles. Open-source security tooling, published research, and hands-on VAPT and SOC experience."
        keywords="hire security engineer, AI security engineer, product security engineer, detection engineer, Bengaluru, Mohit Kumar, open to work"
        pathname="/hire"
      />

      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {STATUS.open && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vision/10 border border-vision/30 text-vision text-xs font-medium mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vision opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-vision" />
                </span>
                {STATUS.headline}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire <span className="bg-gradient-to-r from-vision to-reasoning bg-clip-text text-transparent">Mohit Kumar</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              I'm a Security Engineer who builds the tools I'd want on my own team — five open-source
              scanners across the software and AI supply chain — and does the hands-on work behind
              them: VAPT, SIEM detection engineering, and control audits. If that's the shape of the
              problem you're hiring for, everything you need to evaluate me is one click from here.
            </p>
          </motion.div>

          {/* Status + primary CTAs */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            <GlowCard glowColor="mixed" className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-5">Current status</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <StatusRow icon={FaCheckCircle} label="Availability" value={STATUS.availability} />
                <StatusRow icon={FaClock} label="Notice period" value={STATUS.noticePeriod} />
                <StatusRow icon={FaMapMarkerAlt} label="Based in" value={STATUS.location} />
                <StatusRow icon={FaShieldAlt} label="Work model" value={STATUS.workModel} />
                <StatusRow icon={FaCheckCircle} label="Work authorization" value={STATUS.workAuth} />
                <StatusRow icon={FaEnvelope} label="Best way to reach me" value={STATUS.email} />
              </div>
            </GlowCard>

            <GlowCard glowColor="vision">
              <h2 className="text-lg font-semibold mb-4">Start here</h2>
              <div className="space-y-3">
                <a
                  href={mailto}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-vision to-reasoning text-primary font-semibold hover:opacity-90 transition-opacity"
                >
                  <FaEnvelope size={15} /> Email me
                </a>
                <a
                  href="/resume/Mohit_Kumar.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-vision/40 transition-colors text-sm"
                >
                  <FaDownload size={14} /> Download CV (PDF)
                </a>
                <a
                  href="https://www.linkedin.com/in/mohitkumar111/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-vision/40 transition-colors text-sm"
                >
                  <FaLinkedin size={14} /> LinkedIn
                </a>
                <a
                  href="https://github.com/mk12002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-vision/40 transition-colors text-sm"
                >
                  <FaGithub size={14} /> GitHub
                </a>
              </div>
            </GlowCard>
          </div>

          {/* Role tracks */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2">Roles I'm looking for</h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Four adjacent tracks. They share the same core — understanding how a system is
              actually reachable by an attacker — and each one links to work you can inspect.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {ROLE_TRACKS.map((track, i) => (
                <GlowCard key={track.title} glowColor={track.color} delay={i * 0.06}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white/5 shrink-0">
                      <track.icon className="text-vision" size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold mb-2">{track.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{track.blurb}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {track.titles.map((t) => (
                          <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link to={track.proof.to} className="inline-flex items-center gap-2 text-vision text-sm hover:gap-3 transition-all">
                        {track.proof.label} <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2">What I bring — and where to verify it</h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Every claim below links to the thing that proves it. Nothing here asks you to take my word.
            </p>
            <div className="space-y-4">
              {EVIDENCE.map((item, i) => (
                <GlowCard key={item.claim} glowColor="mixed" delay={i * 0.05}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 flex items-start gap-2">
                        <FaCheckCircle className="text-vision mt-1 shrink-0" size={14} />
                        {item.claim}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed md:pl-6">{item.detail}</p>
                    </div>
                    <Link
                      to={item.to}
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-vision/40 text-sm transition-colors"
                    >
                      {item.cta} <FaArrowRight size={11} />
                    </Link>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <GlowCard glowColor="vision" className="text-center">
            <h2 className="text-2xl font-bold mb-3">Have a role in mind?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Send the job description and I'll reply with a straight answer on fit — including if I
              think I'm the wrong person for it.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={mailto}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-vision to-reasoning text-primary font-semibold hover:opacity-90 transition-opacity"
              >
                <FaEnvelope size={15} /> {STATUS.email}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-vision/40 transition-colors"
              >
                Use the contact form <FaArrowRight size={12} />
              </Link>
            </div>
          </GlowCard>
        </div>
      </div>
    </>
  )
}
