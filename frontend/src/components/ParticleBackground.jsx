import { motion } from 'framer-motion'
import { useMemo, useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Data stream particle with directional flow
function DataStreamParticle({ delay, x, y, color, speed, angle }) {
  const radians = (angle * Math.PI) / 180
  const distance = 150
  const endX = Math.cos(radians) * distance
  const endY = Math.sin(radians) * distance

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 3,
        height: 3,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
      animate={{
        x: [0, endX, endX * 2],
        y: [0, endY, endY * 2],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Binary rain character
function MatrixChar({ delay, x, char }) {
  return (
    <motion.div
      className="absolute font-mono text-sm font-bold"
      style={{
        left: `${x}%`,
        color: '#22d3ee',
        textShadow: '0 0 5px #22d3ee',
      }}
      initial={{ top: '-5%', opacity: 0 }}
      animate={{
        top: '105%',
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {char}
    </motion.div>
  )
}

function FloatingOrb({ delay, x, y, color, size }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
      }}
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 20 + delay * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0"/>
            <stop offset="30%" stopColor="white" stopOpacity="1"/>
            <stop offset="70%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fadeGradient)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)"/>
      </svg>
    </div>
  )
}

export default function ParticleBackground() {
  const [scrollY, setScrollY] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use theme colors
  const colors = {
    vision: theme.colors.vision,
    audio: theme.colors.audio,
    reasoning: theme.colors.reasoning,
  }

  // Generate data stream particles based on theme pattern
  const dataStreams = useMemo(() => {
    const streams = []
    const domains = ['vision', 'audio', 'reasoning']
    const count = theme.particles.count
    const speed = theme.particles.speed
    
    for (let i = 0; i < count; i++) {
      const domain = domains[i % 3]
      let angle = Math.random() * 360
      
      // Apply theme-specific patterns
      if (theme.particles.pattern === 'layered') {
        // CNN: horizontal layers
        angle = Math.random() > 0.5 ? 0 : 180
      } else if (theme.particles.pattern === 'temporal') {
        // RNN: right-to-left flow
        angle = 180 + (Math.random() - 0.5) * 30
      } else if (theme.particles.pattern === 'bidirectional') {
        // Transformer: both directions
        angle = Math.random() > 0.5 ? 0 : 180
      } else if (theme.particles.pattern === 'opposing') {
        // GAN: opposing flows
        angle = i % 2 === 0 ? 45 : 225
      }
      
      streams.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[domain],
        speed: (Math.random() * 2 + 2) * speed,
        angle,
        delay: Math.random() * 5,
      })
    }
    return streams
  }, [theme.particles, colors])

  // Generate matrix rain characters
  const matrixChars = useMemo(() => {
    const chars = '01'
    const columns = 25
    return Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: (i * 100) / columns + Math.random() * 3,
      char: chars[Math.floor(Math.random() * chars.length)],
      delay: Math.random() * 8,
    }))
  }, [])

  // Floating orbs with theme colors
  const orbs = useMemo(() => [
    { x: 10, y: 20, color: `${colors.vision}1a`, size: 400, delay: 0 },
    { x: 70, y: 60, color: `${colors.vision}1a`, size: 450, delay: 3 },
  ], [colors])

  // Calculate clustering effect based on scroll position
  const sectionOffset = (scrollY / 800) % 3
  const clusterY = 20 + sectionOffset * 25

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid background */}
      <GridLines />
      
      {/* Matrix rain effect */}
      {matrixChars.map((char) => (
        <MatrixChar key={`matrix-${char.id}`} {...char} />
      ))}

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <FloatingOrb key={`orb-${i}`} {...orb} />
      ))}
      
      {/* Data stream particles */}
      {dataStreams.map((stream) => (
        <DataStreamParticle key={`stream-${stream.id}`} {...stream} />
      ))}

      {/* Section-aware cluster effect */}
      <motion.div
        className="absolute w-full h-32"
        style={{
          top: `${clusterY}%`,
          background: `radial-gradient(ellipse at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleY: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient glow spots */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
