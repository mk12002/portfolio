import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// Tech stack data — cybersecurity + ML hybrid
const techData = {
  // Languages (Foundation)
  Python: { proficiency: 98, category: 'language', connections: ['PyTorch', 'TensorFlow', 'FastAPI', 'Flask', 'Nmap', 'Burp Suite'] },
  Java: { proficiency: 90, category: 'language', connections: ['SpringBoot'] },
  SQL: { proficiency: 88, category: 'language', connections: ['MongoDB', 'SQLMap'] },
  Bash: { proficiency: 85, category: 'language', connections: ['Python', 'Nmap', 'Linux'] },
  PowerShell: { proficiency: 80, category: 'language', connections: ['Bash', 'Windows'] },

  // Core ML Frameworks
  PyTorch: { proficiency: 95, category: 'ml', connections: ['Python', 'Transformers', 'GNN', 'OpenCV', 'Adversarial ML'] },
  TensorFlow: { proficiency: 85, category: 'ml', connections: ['Python', 'scikit-learn'] },
  'scikit-learn': { proficiency: 88, category: 'ml', connections: ['Python', 'TensorFlow', 'Anomaly Detection'] },

  // Transformers & NLP
  Transformers: { proficiency: 92, category: 'ml', connections: ['PyTorch', 'LegalBERT', 'LangChain'] },
  LegalBERT: { proficiency: 95, category: 'ml', connections: ['Transformers', 'PyTorch', 'Prolog'] },

  // Graph & Symbolic
  GNN: { proficiency: 92, category: 'ml', connections: ['PyTorch', 'Python', 'LegalBERT', 'Prolog'] },
  Prolog: { proficiency: 94, category: 'ml', connections: ['Python', 'LegalBERT', 'GNN', 'FastAPI'] },

  // Multi-Agent & LLM
  LangGraph: { proficiency: 90, category: 'framework', connections: ['Python', 'LangChain', 'Flask'] },
  LangChain: { proficiency: 88, category: 'framework', connections: ['Python', 'Transformers', 'LangGraph'] },

  // Security for AI
  'Adversarial ML': { proficiency: 82, category: 'ai_security', connections: ['PyTorch', 'Anomaly Detection', 'Python'] },
  'Anomaly Detection': { proficiency: 85, category: 'ai_security', connections: ['scikit-learn', 'Adversarial ML', 'Splunk'] },

  // Offensive Security Tools
  'Burp Suite': { proficiency: 80, category: 'offensive', connections: ['Python', 'SQLMap', 'Nmap'] },
  Nmap: { proficiency: 82, category: 'offensive', connections: ['Python', 'Bash', 'Burp Suite'] },
  SQLMap: { proficiency: 78, category: 'offensive', connections: ['SQL', 'Burp Suite', 'Nmap'] },
  Nessus: { proficiency: 75, category: 'offensive', connections: ['Nmap', 'Burp Suite'] },

  // Defensive / SOC Tools
  Splunk: { proficiency: 78, category: 'defensive', connections: ['Sentinel', 'Anomaly Detection', 'Bash'] },
  Sentinel: { proficiency: 76, category: 'defensive', connections: ['Splunk', 'Defender'] },
  Defender: { proficiency: 75, category: 'defensive', connections: ['Sentinel', 'Windows'] },
  Wireshark: { proficiency: 77, category: 'defensive', connections: ['Nmap', 'Bash'] },

  // Web Frameworks
  FastAPI: { proficiency: 92, category: 'framework', connections: ['Python', 'Prolog', 'Azure'] },
  Flask: { proficiency: 90, category: 'framework', connections: ['Python', 'LangGraph'] },

  // Computer Vision
  OpenCV: { proficiency: 92, category: 'vision', connections: ['Python', 'PyTorch'] },

  // Cloud & DevOps
  Azure: { proficiency: 92, category: 'cloud', connections: ['Python', 'FastAPI', 'Sentinel'] },
  AWS: { proficiency: 80, category: 'cloud', connections: ['Python', 'Docker'] },
  Docker: { proficiency: 85, category: 'tool', connections: ['Python', 'FastAPI', 'Flask', 'Linux'] },

  // Systems
  Linux: { proficiency: 85, category: 'tool', connections: ['Bash', 'Docker', 'Nmap'] },
  Windows: { proficiency: 80, category: 'tool', connections: ['PowerShell', 'Defender'] },
  Git: { proficiency: 95, category: 'tool', connections: ['Python', 'Docker'] },
  MongoDB: { proficiency: 80, category: 'tool', connections: ['Python', 'SQL'] },
}

const categoryColors = {
  ml: '#a855f7',         // purple - ML/AI
  ai_security: '#00ff41', // neon green - AI for Security
  offensive: '#ef4444',   // red - offensive security
  defensive: '#3b82f6',   // blue - defensive/SOC
  framework: '#06b6d4',   // cyan - frameworks
  language: '#f97316',     // orange - languages
  vision: '#22d3ee',       // cyan - vision
  tool: '#64748b',         // gray - tools
  cloud: '#3b82f6',        // blue - cloud
}

function TechNode({ tech, data, position, isActive, isConnected, onClick }) {
  const proficiency = data.proficiency
  const size = 8 + (proficiency / 100) * 12
  const glowIntensity = proficiency / 100

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isActive ? 1 : (isConnected ? 0.8 : 0.5),
        scale: isActive ? 1.3 : 1
      }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Glow */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size * (1 + glowIntensity)}
        fill={categoryColors[data.category]}
        opacity={glowIntensity * 0.2}
        animate={isActive ? {
          r: [size * 1.5, size * 2, size * 1.5],
          opacity: [glowIntensity * 0.2, glowIntensity * 0.4, glowIntensity * 0.2]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Node */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size}
        fill={categoryColors[data.category]}
        stroke="white"
        strokeWidth={isActive ? 2 : 1}
        whileHover={{ scale: 1.2 }}
      />

      {/* Highlight */}
      <circle
        cx={position.x}
        cy={position.y}
        r={size * 0.4}
        fill="white"
        opacity={0.6}
      />

      {/* Label */}
      <text
        x={position.x}
        y={position.y + size + 16}
        textAnchor="middle"
        fill="white"
        fontSize={isActive ? "13" : "11"}
        fontWeight={isActive ? "bold" : "normal"}
        opacity={isActive ? 1 : 0.8}
      >
        {tech}
      </text>

      {/* Proficiency badge */}
      {isActive && (
        <text
          x={position.x}
          y={position.y + size + 30}
          textAnchor="middle"
          fill={categoryColors[data.category]}
          fontSize="10"
          opacity={0.8}
        >
          {proficiency}%
        </text>
      )}
    </motion.g>
  )
}

function Connection({ x1, y1, x2, y2, isActive, color }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={isActive ? color : 'rgba(255, 255, 255, 0.1)'}
      strokeWidth={isActive ? 2 : 1}
      opacity={isActive ? 0.6 : 0.3}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  )
}

export default function TechStackGraph() {
  const [selectedTech, setSelectedTech] = useState(null)
  const [hoveredTech, setHoveredTech] = useState(null)
  const navigate = useNavigate()

  const activeTech = selectedTech || hoveredTech

  // Generate force-directed positions
  const positions = useMemo(() => {
    const width = 800
    const height = 600
    const centerX = width / 2
    const centerY = height / 2

    const techs = Object.keys(techData)
    const pos = {}

    const categories = {}
    techs.forEach(tech => {
      const cat = techData[tech].category
      if (!categories[cat]) categories[cat] = []
      categories[cat].push(tech)
    })

    const catKeys = Object.keys(categories)
    const angleStep = (2 * Math.PI) / catKeys.length

    catKeys.forEach((cat, catIdx) => {
      const angle = angleStep * catIdx
      const radius = 200
      const catCenterX = centerX + Math.cos(angle) * radius
      const catCenterY = centerY + Math.sin(angle) * radius

      categories[cat].forEach((tech, techIdx) => {
        const subAngle = (2 * Math.PI * techIdx) / categories[cat].length
        const subRadius = 60
        pos[tech] = {
          x: catCenterX + Math.cos(subAngle) * subRadius,
          y: catCenterY + Math.sin(subAngle) * subRadius
        }
      })
    })

    return pos
  }, [])

  const activeConnections = useMemo(() => {
    if (!activeTech || !techData[activeTech]) return new Set()
    return new Set(techData[activeTech].connections)
  }, [activeTech])

  const handleTechClick = (tech) => {
    setSelectedTech(tech === selectedTech ? null : tech)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-secondary/30 rounded-2xl p-8 backdrop-blur-sm border border-white/5"
      >
        <svg
          width="100%"
          height="600"
          viewBox="0 0 800 600"
          className="max-w-full"
        >
          {/* Connections */}
          {Object.entries(techData).map(([tech, data]) =>
            data.connections
              .filter(connTech => techData[connTech] && positions[connTech])
              .map((connTech) => (
                <Connection
                  key={`${tech}-${connTech}`}
                  x1={positions[tech].x}
                  y1={positions[tech].y}
                  x2={positions[connTech].x}
                  y2={positions[connTech].y}
                  isActive={
                    (activeTech === tech || activeTech === connTech) &&
                    (activeConnections.has(connTech) || activeConnections.has(tech))
                  }
                  color={categoryColors[data.category]}
                />
              ))
          )}

          {/* Nodes */}
          {Object.entries(techData).map(([tech, data]) => (
            <TechNode
              key={tech}
              tech={tech}
              data={data}
              position={positions[tech]}
              isActive={activeTech === tech}
              isConnected={activeConnections.has(tech)}
              onClick={() => handleTechClick(tech)}
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {Object.entries({
            'ML/AI': 'ml',
            'AI for Security': 'ai_security',
            'Offensive': 'offensive',
            'Defensive/SOC': 'defensive',
            'Framework': 'framework',
            'Language': 'language',
            'Cloud': 'cloud'
          }).map(([label, cat]) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[cat] }}
              />
              <span className="text-sm text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-400">
            {selectedTech
              ? `Click again to deselect • ${techData[selectedTech]?.proficiency}% proficiency`
              : 'Click any technology to see connections • Glow intensity = proficiency level'
            }
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
