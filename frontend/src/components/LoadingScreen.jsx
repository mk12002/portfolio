import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ isLoading }) {
  const [epoch, setEpoch] = useState(1)

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setEpoch(prev => {
        const next = prev + 1
        return next <= 10 ? next : prev
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Neural network animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            {[...Array(3)].map((_, layerIndex) => (
              <div key={layerIndex} className="flex flex-col gap-8 mx-12">
                {[...Array(4)].map((_, nodeIndex) => (
                  <motion.div
                    key={nodeIndex}
                    className="w-4 h-4 rounded-full bg-vision"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: layerIndex * 0.2 + nodeIndex * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-md w-full mx-4">
            {/* Main content */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-8 border border-vision/20">
              <div className="text-center">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <span className="text-sm text-gray-400">Epoch</span>
                  <motion.span 
                    className="text-5xl font-mono font-bold text-vision"
                    key={epoch}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {epoch}
                  </motion.span>
                  <span className="text-2xl text-gray-600">/</span>
                  <span className="text-2xl font-mono text-gray-500">10</span>
                </div>
                <div className="relative h-3 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-vision to-reasoning rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(epoch / 10) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-vision/50 blur-sm"
                    animate={{
                      width: [`${(epoch / 10) * 100}%`, `${((epoch + 1) / 10) * 100}%`],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-vision/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
