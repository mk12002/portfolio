import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaShieldAlt, FaCrosshairs, FaBolt } from 'react-icons/fa'

// Cyber Kill Chain Stages
const killChainStages = [
  { id: 'recon', neurons: 3, x: 10, label: 'Reconnaissance', domains: ['Offensive', 'Defensive', 'AI-Sec'] },
  { id: 'weaponize', neurons: 4, x: 28, label: 'Weaponize' },
  { id: 'deliver', neurons: 3, x: 46, label: 'Deliver & Exploit' },
  { id: 'install', neurons: 4, x: 64, label: 'Install & C2' },
  { id: 'action', neurons: 3, x: 85, label: 'Actions', domains: ['Offensive', 'Defensive', 'AI-Sec'] }
]

const domainColors = {
  'Offensive': { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)', icon: FaCrosshairs },
  'Defensive': { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)', icon: FaShieldAlt },
  'AI-Sec': { color: '#00ff41', glow: 'rgba(0, 255, 65, 0.4)', icon: FaBolt }
}

// Node in the kill chain
function KillChainNode({ x, y, domain, stageId, nodeIndex, isHovered, onHover, onClick }) {
  const config = domain ? domainColors[domain] : { color: '#4b5563', glow: 'rgba(75, 85, 99, 0.3)' }
  const Icon = config.icon
  const isEndpoint = stageId === 'recon' || stageId === 'action'

  return (
    <motion.g
      style={{ cursor: isEndpoint ? 'pointer' : 'default' }}
      onMouseEnter={() => isEndpoint && onHover({ stageId, nodeIndex, domain })}
      onMouseLeave={() => isEndpoint && onHover(null)}
      onClick={() => isEndpoint && onClick(domain)}
      whileHover={isEndpoint ? { scale: 1.15 } : {}}
    >
      {/* Pulse ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={isEndpoint ? 26 : 16}
        fill="none"
        stroke={config.color}
        strokeWidth="2"
        opacity="0"
        animate={{
          r: isEndpoint ? [26, 40] : [16, 28],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: nodeIndex * 0.2,
          ease: "easeOut"
        }}
      />

      {/* Glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={isEndpoint ? 26 : 16}
        fill={config.glow}
        filter="blur(10px)"
        animate={{
          opacity: isHovered ? 1 : 0.6,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main body */}
      <motion.circle
        cx={x}
        cy={y}
        r={isEndpoint ? 24 : 14}
        fill={`url(#gradient-${domain || 'default'})`}
        stroke={config.color}
        strokeWidth={isHovered ? 3 : 2}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: nodeIndex * 0.3,
        }}
      />

      {/* Icon */}
      {isEndpoint && Icon && (
        <foreignObject x={x - 14} y={y - 14} width={28} height={28}>
          <div className="flex items-center justify-center w-full h-full">
            <Icon style={{ color: '#ffffff', fontSize: '16px' }} />
          </div>
        </foreignObject>
      )}
    </motion.g>
  )
}

// Connection with data flow
function Connection({ from, to, color, delay, isActive }) {
  return (
    <g>
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="1"
        opacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          opacity: isActive ? 0.4 : 0.15
        }}
        transition={{ duration: 1, delay: delay * 0.1 }}
      />

      {/* Flow particle */}
      <motion.circle
        r="3.5"
        fill={color}
        filter="blur(1.5px)"
        animate={{
          cx: [from.x, to.x],
          cy: [from.y, to.y],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay * 0.15,
          ease: "easeInOut",
        }}
      />
    </g>
  )
}

function StageLabel({ x, y, label }) {
  return (
    <text
      x={x}
      y={y}
      fill="#9ca3af"
      fontSize="10"
      textAnchor="middle"
      className="font-mono"
    >
      {label}
    </text>
  )
}

export default function NodeGraph() {
  const navigate = useNavigate()
  const [hoveredNode, setHoveredNode] = useState(null)

  const handleNodeClick = (domain) => {
    if (domain) {
      const categoryMap = {
        'Offensive': 'Reasoning',
        'Defensive': 'Reasoning',
        'AI-Sec': 'All'
      }
      navigate(`/projects?category=${categoryMap[domain] || 'All'}`)
    }
  }

  // Calculate node positions
  const getNodePositions = () => {
    const positions = []
    const svgHeight = 300
    const svgWidth = 700

    killChainStages.forEach((stage) => {
      const stagePositions = []
      const spacing = svgHeight / (stage.neurons + 1)
      const xPos = (stage.x / 100) * svgWidth

      for (let i = 0; i < stage.neurons; i++) {
        const yPos = spacing * (i + 1)
        const domain = stage.domains ? stage.domains[i] : null
        stagePositions.push({
          x: xPos,
          y: yPos,
          domain,
          stageId: stage.id,
          nodeIndex: i
        })
      }
      positions.push({ ...stage, positions: stagePositions })
    })
    return positions
  }

  const stages = getNodePositions()

  // Generate connections
  const getConnections = () => {
    const connections = []
    for (let i = 0; i < stages.length - 1; i++) {
      const currentStage = stages[i]
      const nextStage = stages[i + 1]

      currentStage.positions.forEach((fromNode, fromIdx) => {
        nextStage.positions.forEach((toNode, toIdx) => {
          const color = fromNode.domain
            ? domainColors[fromNode.domain].color
            : '#4b5563'

          const isActive = hoveredNode &&
            (hoveredNode.stageId === currentStage.id && hoveredNode.nodeIndex === fromIdx)

          connections.push({
            from: fromNode,
            to: toNode,
            color,
            delay: fromIdx + toIdx,
            isActive
          })
        })
      })
    }
    return connections
  }

  const connections = getConnections()

  return (
    <div className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center">
      <svg
        viewBox="0 0 700 300"
        className="w-full h-full"
        style={{ maxWidth: '700px' }}
      >
        {/* Gradients */}
        <defs>
          <radialGradient id="gradient-Offensive" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-Defensive" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-AI-Sec" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff41" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-default" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4b5563" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Connections */}
        {connections.map((conn, idx) => (
          <Connection
            key={idx}
            from={conn.from}
            to={conn.to}
            color={conn.color}
            delay={conn.delay}
            isActive={conn.isActive}
          />
        ))}

        {/* Stage labels */}
        {stages.map((stage) => (
          <StageLabel
            key={stage.id}
            x={(stage.x / 100) * 700}
            y={285}
            label={stage.label}
          />
        ))}

        {/* Nodes */}
        {stages.map((stage) =>
          stage.positions.map((pos, idx) => (
            <KillChainNode
              key={`${stage.id}-${idx}`}
              x={pos.x}
              y={pos.y}
              domain={pos.domain}
              stageId={stage.id}
              nodeIndex={idx}
              isHovered={
                hoveredNode &&
                hoveredNode.stageId === stage.id &&
                hoveredNode.nodeIndex === idx
              }
              onHover={setHoveredNode}
              onClick={handleNodeClick}
            />
          ))
        )}
      </svg>

      {/* Tooltip */}
      {hoveredNode && hoveredNode.domain && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
            px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-lg border border-white/20
            text-sm font-medium pointer-events-none z-10"
          style={{ color: domainColors[hoveredNode.domain].color }}
        >
          Explore {hoveredNode.domain} projects
        </motion.div>
      )}
    </div>
  )
}
