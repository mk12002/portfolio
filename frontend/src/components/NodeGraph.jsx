import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBug, FaRobot, FaLock, FaNetworkWired, FaProjectDiagram } from 'react-icons/fa'

// The software supply chain, source → runtime, and the scanner that guards each layer.
const layers = [
  { slug: 'stowaway', name: 'Stowaway', layer: 'Dependencies', sub: 'npm · PyPI · Go · Cargo', icon: FaBug, color: '#34d399' },
  { slug: 'bulwark', name: 'Bulwark', layer: 'AI Components', sub: 'models · MCP · agents', icon: FaRobot, color: '#a855f7' },
  { slug: 'lattice', name: 'Lattice', layer: 'Cryptography', sub: 'post-quantum CBOM', icon: FaLock, color: '#60a5fa' },
  { slug: 'portcullis', name: 'Portcullis', layer: 'CI/CD Pipelines', sub: 'GitHub · GitLab · Jenkins', icon: FaNetworkWired, color: '#fbbf24' },
  { slug: 'bastion', name: 'Bastion', layer: 'Kubernetes RBAC', sub: 'paths → cluster-admin', icon: FaProjectDiagram, color: '#f472b6' },
]

export default function NodeGraph() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-6">
      <div className="flex items-center justify-between w-full max-w-4xl mb-8 text-[10px] font-mono uppercase tracking-widest text-gray-600">
        <span>◀ source</span>
        <span className="text-gray-500">software supply chain</span>
        <span>runtime ▶</span>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* animated pipeline line behind the nodes (desktop) */}
        <div className="hidden md:block absolute top-[52px] left-[9%] right-[9%] h-[2px] bg-gradient-to-r from-vision/25 via-white/20 to-reasoning/25 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 h-full w-28 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{ left: ['-15%', '115%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8 relative">
          {layers.map((l, i) => (
            <motion.div
              key={l.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-center"
            >
              <Link to={`/projects/${l.slug}`} className="group flex flex-col items-center text-center focus:outline-none" aria-label={`${l.name}: ${l.layer} scanner`}>
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ background: l.color, opacity: 0.3 }}
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  />
                  <div
                    className="relative w-[92px] h-[92px] rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-focus:scale-110"
                    style={{ borderColor: l.color, background: `${l.color}1a`, boxShadow: `0 0 0 0 ${l.color}00` }}
                  >
                    <l.icon style={{ color: l.color, fontSize: 32 }} />
                  </div>
                </div>
                <div className="mt-3.5 font-semibold text-white group-hover:text-vision group-focus:text-vision transition-colors">{l.name}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: l.color }}>{l.layer}</div>
                <div className="text-[10px] text-gray-500 mt-1 max-w-[130px] leading-snug">{l.sub}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-9 text-center">
        Five offline, defensive scanners — <span className="text-gray-300">one per layer</span>. Click a layer to open its scanner.
      </p>
    </div>
  )
}
