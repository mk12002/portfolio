import { motion } from 'framer-motion'

export default function GlowCard({ children, className = '', glowColor = 'vision', delay = 0 }) {
  const glowColors = {
    vision: 'from-vision/20 to-vision/5',
    audio: 'from-audio/20 to-audio/5',
    reasoning: 'from-reasoning/20 to-reasoning/5',
    mixed: 'from-vision/10 via-reasoning/10 to-audio/10'
  }

  const borderColors = {
    vision: 'hover:border-vision/50',
    audio: 'hover:border-audio/50',
    reasoning: 'hover:border-reasoning/50',
    mixed: 'hover:border-reasoning/50'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        relative rounded-xl p-6 
        bg-gradient-to-br ${glowColors[glowColor]}
        border border-white/10 ${borderColors[glowColor]}
        backdrop-blur-sm
        transition-all duration-300
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
