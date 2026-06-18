import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Subtle drifting dot
function DriftDot({ delay, x, y, size, color, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -24, 0], opacity: [0, opacity, 0] }}
      transition={{ duration: 9 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Large, very soft ambient glow
function AmbientOrb({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0], scale: [1, 1.08, 0.94, 1] }}
      transition={{ duration: 26 + delay * 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function GridLines({ stroke, opacity }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke={stroke} strokeWidth="0.5" />
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fadeGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
      </svg>
    </div>
  )
}

export default function ParticleBackground() {
  const prefersReduced = useReducedMotion()
  const { isDark } = useTheme()

  // Cohesive accent palette; gentler in light mode for legibility of content.
  const accents = isDark
    ? ['rgba(16,185,129,0.55)', 'rgba(20,184,166,0.5)', 'rgba(6,182,212,0.5)']
    : ['rgba(5,150,105,0.4)', 'rgba(13,148,136,0.35)', 'rgba(8,145,178,0.35)']
  const gridStroke = isDark ? 'rgba(148,163,184,0.35)' : 'rgba(13,148,136,0.55)'
  const gridOpacity = isDark ? 0.12 : 0.3
  const orbAlpha = isDark ? '0.10' : '0.09'

  const dots = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 2,
        color: accents[i % accents.length],
        opacity: 0.25 + Math.random() * 0.2,
        delay: Math.random() * 6,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDark]
  )

  const orbs = useMemo(
    () => [
      { x: 8, y: 18, size: 420, color: `rgba(16,185,129,${orbAlpha})`, delay: 0 },
      { x: 72, y: 62, size: 460, color: `rgba(6,182,212,${orbAlpha})`, delay: 4 },
    ],
    [orbAlpha]
  )

  // Reduced motion: render a static, minimal backdrop only.
  if (prefersReduced) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <GridLines stroke={gridStroke} opacity={gridOpacity} />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <GridLines stroke={gridStroke} opacity={gridOpacity} />
      {orbs.map((orb, i) => (
        <AmbientOrb key={`orb-${i}`} {...orb} />
      ))}
      {dots.map((dot) => (
        <DriftDot key={`dot-${dot.id}`} {...dot} />
      ))}
    </div>
  )
}
