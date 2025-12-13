import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaPalette, FaTimes } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, theme, themes, changeTheme } = useTheme()

  const themeIcons = {
    transformer: '🔷',
    cnn: '🔶',
    rnn: '🔸',
    gan: '🟢'
  }

  return (
    <>
      {/* Floating Theme Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white border-2 transition-all"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          borderColor: theme.colors.accent,
          boxShadow: `0 0 30px ${theme.colors.primary}40`
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            `0 0 20px ${theme.colors.primary}40`,
            `0 0 40px ${theme.colors.primary}60`,
            `0 0 20px ${theme.colors.primary}40`
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        <FaPalette size={24} />
      </motion.button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className="fixed left-6 bottom-24 z-[70] bg-dark-900/95 backdrop-blur-xl border-2 rounded-2xl shadow-2xl p-6 w-80"
              style={{ borderColor: theme.colors.primary }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">ML Themes</h3>
                  <p className="text-xs text-gray-400">{theme.description}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Theme Options */}
              <div className="space-y-3">
                {Object.keys(themes).map((themeName) => {
                  const t = themes[themeName]
                  const isActive = currentTheme === themeName
                  
                  return (
                    <motion.button
                      key={themeName}
                      onClick={() => changeTheme(themeName)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                        isActive ? 'border-white' : 'border-white/20 hover:border-white/40'
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${t.colors.primary}20, ${t.colors.secondary}20)`
                          : 'rgba(255, 255, 255, 0.05)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          animate={{
                            background: [
                              `radial-gradient(circle at 0% 0%, ${t.colors.primary} 0%, transparent 50%)`,
                              `radial-gradient(circle at 100% 100%, ${t.colors.secondary} 0%, transparent 50%)`,
                              `radial-gradient(circle at 0% 0%, ${t.colors.primary} 0%, transparent 50%)`,
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3">
                        {/* Icon */}
                        <motion.div
                          className="text-3xl"
                          animate={isActive ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {themeIcons[themeName]}
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="font-bold text-white mb-1">{t.name}</div>
                          <div className="text-xs text-gray-400">
                            {t.particles.count} particles • {t.particles.pattern}
                          </div>
                        </div>

                        {/* Color Preview */}
                        <div className="flex gap-1">
                          {[t.colors.primary, t.colors.secondary, t.colors.accent].map((color, i) => (
                            <motion.div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                              animate={isActive ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                              } : {}}
                              transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                            />
                          ))}
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute top-2 right-2 w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.colors.primary }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Footer Info */}
              <motion.div
                className="mt-4 pt-4 border-t border-white/10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
              >
                <p className="text-xs text-gray-500">
                  Theme affects colors & particle patterns across the site
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
