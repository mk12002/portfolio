import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaHeadphones, FaBrain } from 'react-icons/fa'

// Neural Network Layer Configuration
const networkLayers = [
  { id: 'input', neurons: 3, x: 15, label: 'Input', domains: ['Vision', 'Audio', 'Reasoning'] },
  { id: 'hidden1', neurons: 5, x: 35, label: 'Feature Extraction' },
  { id: 'hidden2', neurons: 4, x: 55, label: 'Processing' },
  { id: 'hidden3', neurons: 3, x: 75, label: 'Integration' },
  { id: 'output', neurons: 3, x: 95, label: 'Output', domains: ['Vision', 'Audio', 'Reasoning'] }
]

const domainColors = {
  'Vision': { color: '#22d3ee', glow: 'rgba(34, 211, 238, 0.4)', icon: FaEye },
  'Audio': { color: '#f97316', glow: 'rgba(249, 115, 22, 0.4)', icon: FaHeadphones },
  'Reasoning': { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', icon: FaBrain }
}

// Neuron component with activation pulse effect
function Neuron({ x, y, domain, layerId, neuronIndex, isHovered, onHover, onClick }) {
  const config = domain ? domainColors[domain] : { color: '#6b7280', glow: 'rgba(107, 114, 128, 0.3)' }
  const Icon = config.icon
  const isInputOrOutput = layerId === 'input' || layerId === 'output'

  return (
    <motion.g
      style={{ cursor: isInputOrOutput ? 'pointer' : 'default' }}
      onMouseEnter={() => isInputOrOutput && onHover({ layerId, neuronIndex, domain })}
      onMouseLeave={() => isInputOrOutput && onHover(null)}
      onClick={() => isInputOrOutput && onClick(domain)}
      whileHover={isInputOrOutput ? { scale: 1.15 } : {}}
    >
      {/* Activation Pulse Ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={isInputOrOutput ? 26 : 16}
        fill="none"
        stroke={config.color}
        strokeWidth="2"
        opacity="0"
        animate={{
          r: isInputOrOutput ? [26, 40] : [16, 28],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: neuronIndex * 0.2,
          ease: "easeOut"
        }}
      />

      {/* Glow Effect */}
      <motion.circle
        cx={x}
        cy={y}
        r={isInputOrOutput ? 26 : 16}
        fill={config.glow}
        filter="blur(10px)"
        animate={{
          opacity: isHovered ? 1 : 0.6,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Neuron Body */}
      <motion.circle
        cx={x}
        cy={y}
        r={isInputOrOutput ? 24 : 14}
        fill={`url(#gradient-${domain || 'default'})`}
        stroke={config.color}
        strokeWidth={isHovered ? 3 : 2}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: neuronIndex * 0.3,
        }}
      />

      {/* Icon for input/output neurons */}
      {isInputOrOutput && Icon && (
        <foreignObject x={x - 14} y={y - 14} width={28} height={28}>
          <div className="flex items-center justify-center w-full h-full">
            <Icon style={{ color: '#ffffff', fontSize: '16px' }} />
          </div>
        </foreignObject>
      )}
    </motion.g>
  )
}

// Connection between neurons with data flow animation
function Connection({ from, to, color, delay, isActive }) {
  return (
    <g>
      {/* Connection line */}
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

      {/* Flowing data particle */}
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

// Layer label
function LayerLabel({ x, y, label }) {
  return (
    <text
      x={x}
      y={y}
      fill="#9ca3af"
      fontSize="11"
      textAnchor="middle"
      className="font-mono"
    >
      {label}
    </text>
  )
}

export default function NodeGraph() {
  const navigate = useNavigate()
  const [hoveredNeuron, setHoveredNeuron] = useState(null)

  const handleNeuronClick = (domain) => {
    if (domain) {
      navigate(`/projects?category=${domain}`)
    }
  }

  // Calculate neuron positions for each layer
  const getNeuronPositions = () => {
    const positions = []
    const svgHeight = 300
    const svgWidth = 700

    networkLayers.forEach((layer) => {
      const layerPositions = []
      const spacing = svgHeight / (layer.neurons + 1)
      const xPos = (layer.x / 100) * svgWidth

      for (let i = 0; i < layer.neurons; i++) {
        const yPos = spacing * (i + 1)
        const domain = layer.domains ? layer.domains[i] : null
        layerPositions.push({
          x: xPos,
          y: yPos,
          domain,
          layerId: layer.id,
          neuronIndex: i
        })
      }
      positions.push({ ...layer, positions: layerPositions })
    })
    return positions
  }

  const layers = getNeuronPositions()

  // Generate connections between layers
  const getConnections = () => {
    const connections = []
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i]
      const nextLayer = layers[i + 1]
      
      currentLayer.positions.forEach((fromNeuron, fromIdx) => {
        nextLayer.positions.forEach((toNeuron, toIdx) => {
          const color = fromNeuron.domain 
            ? domainColors[fromNeuron.domain].color 
            : '#6b7280'
          
          const isActive = hoveredNeuron && 
            (hoveredNeuron.layerId === currentLayer.id && hoveredNeuron.neuronIndex === fromIdx)

          connections.push({
            from: fromNeuron,
            to: toNeuron,
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
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="gradient-Vision" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-Audio" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-Reasoning" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="gradient-default" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4b5563" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Draw all connections first (behind neurons) */}
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

        {/* Draw layer labels */}
        {layers.map((layer) => (
          <LayerLabel
            key={layer.id}
            x={(layer.x / 100) * 700}
            y={280}
            label={layer.label}
          />
        ))}

        {/* Draw all neurons */}
        {layers.map((layer) =>
          layer.positions.map((pos, idx) => (
            <Neuron
              key={`${layer.id}-${idx}`}
              x={pos.x}
              y={pos.y}
              domain={pos.domain}
              layerId={layer.id}
              neuronIndex={idx}
              isHovered={
                hoveredNeuron &&
                hoveredNeuron.layerId === layer.id &&
                hoveredNeuron.neuronIndex === idx
              }
              onHover={setHoveredNeuron}
              onClick={handleNeuronClick}
            />
          ))
        )}
      </svg>

      {/* Hover tooltip */}
      {hoveredNeuron && hoveredNeuron.domain && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
            px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-lg border border-white/20
            text-sm font-medium pointer-events-none z-10"
          style={{ color: domainColors[hoveredNeuron.domain].color }}
        >
          Click to explore {hoveredNeuron.domain} projects
        </motion.div>
      )}
    </div>
  )
}
