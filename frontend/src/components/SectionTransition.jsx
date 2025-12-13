import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Section transition wrapper with visible effects
export default function SectionTransition({ children, index = 0 }) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Scale effect - more noticeable
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.85, 0.95, 1, 0.95, 0.85]
  )

  // Opacity for fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  // Y-axis movement
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
      }}
      className="relative"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(34, 211, 238, 0.2) 25%,
              rgba(168, 85, 247, 0.2) 50%,
              rgba(249, 115, 22, 0.2) 75%,
              transparent 100%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Network connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {[...Array(3)].map((_, i) => (
          <motion.line
            key={i}
            x1="0%"
            y1={`${30 * i + 10}%`}
            x2="100%"
            y2={`${30 * i + 20}%`}
            stroke={`url(#gradient-${index})`}
            strokeWidth="2"
            strokeDasharray="10,10"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      {/* Content */}
      {children}
    </motion.div>
  )
}
