import { motion } from 'framer-motion'
import { FaShieldAlt, FaBrain, FaCode, FaCloud, FaLaptopCode, FaTerminal } from 'react-icons/fa'
import SEO from '../components/SEO'

// A "uses.tech"-style rundown of my stack. Edit freely — purely static.
const sections = [
  {
    title: 'Security',
    icon: FaShieldAlt,
    items: [
      ['Burp Suite', 'Web app testing & intercepting proxy'],
      ['Nmap', 'Network discovery & port scanning'],
      ['sqlmap', 'Automated SQL injection testing'],
      ['Nessus', 'Vulnerability scanning'],
      ['Wireshark', 'Packet analysis'],
      ['Splunk / Microsoft Sentinel', 'SIEM & detection engineering'],
      ['Defender XDR', 'Endpoint detection & response'],
      ['Kali Linux', 'Offensive tooling distro'],
    ],
  },
  {
    title: 'AI / Machine Learning',
    icon: FaBrain,
    items: [
      ['PyTorch', 'Primary deep-learning framework'],
      ['Hugging Face Transformers', 'Fine-tuning & inference'],
      ['LangGraph / LangChain', 'Multi-agent orchestration'],
      ['scikit-learn / XGBoost', 'Classical ML & gradient boosting'],
      ['TensorFlow', 'Occasional model work'],
      ['Weights & Biases', 'Experiment tracking'],
    ],
  },
  {
    title: 'Languages',
    icon: FaCode,
    items: [
      ['Python', 'ML, security tooling, automation'],
      ['Java', 'Backend services (Spring Boot)'],
      ['C / C++', 'Systems & performance work'],
      ['JavaScript', 'Frontend (React)'],
      ['SQL', 'Data & detections'],
      ['Prolog', 'Symbolic / rule-based reasoning'],
    ],
  },
  {
    title: 'Dev Environment',
    icon: FaLaptopCode,
    items: [
      ['VS Code', 'Primary editor'],
      ['Git + GitHub', 'Version control'],
      ['Docker', 'Containerised dev & deploys'],
      ['Postman', 'API testing'],
      ['Windows + WSL2 / Ubuntu', 'Daily driver + Linux toolchain'],
      ['JetBrains Mono + Inter', 'Editor & UI fonts'],
    ],
  },
  {
    title: 'Cloud & Infra',
    icon: FaCloud,
    items: [
      ['AWS / Azure', 'Cloud platforms'],
      ['FastAPI', 'Python service APIs'],
      ['Spring Boot', 'JVM backend'],
      ['Vercel', 'Frontend hosting (this site)'],
      ['Render', 'Backend hosting'],
    ],
  },
  {
    title: 'Workflow',
    icon: FaTerminal,
    items: [
      ['Linux terminal + tmux', 'Where most work happens'],
      ['Obsidian / Markdown', 'Notes & writeups'],
      ['Excalidraw', 'Architecture diagrams'],
      ['Notion', 'Planning & tracking'],
    ],
  },
]

export default function Uses() {
  return (
    <>
      <SEO
        title="Uses / Setup | Mohit Kumar"
        description="The security tools, ML frameworks, languages, and dev environment Mohit Kumar uses day to day."
        keywords="uses, setup, security tools, ML stack, dev environment, Mohit Kumar"
        pathname="/uses"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Uses &amp; <span className="gradient-text">Setup</span></h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              The tools, frameworks, and environment I reach for across security and ML work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08 }}
                className="bg-white/5 rounded-xl border border-white/10 p-6 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <s.icon className="text-accent" />
                  </div>
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {s.items.map(([name, note]) => (
                    <li key={name} className="flex gap-3 text-sm">
                      <span className="text-accent mt-1.5 shrink-0">▹</span>
                      <span><span className="text-text font-medium">{name}</span> <span className="text-gray-400">— {note}</span></span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
