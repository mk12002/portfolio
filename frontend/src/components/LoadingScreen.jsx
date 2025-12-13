import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ isLoading }) {
  const [epoch, setEpoch] = useState(0)
  const [loss, setLoss] = useState(2.5)
  const [accuracy, setAccuracy] = useState(0)
  const [status, setStatus] = useState('Initializing neural network...')

  const statuses = [
    'Initializing neural network...',
    'Loading training data...',
    'Optimizing hyperparameters...',
    'Forward propagation...',
    'Computing gradients...',
    'Backpropagation in progress...',
    'Updating weights...',
    'Validating model...',
    'Almost there...',
    'Finalizing...'
  ]

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setEpoch(prev => {
        const next = prev + 1
        if (next <= 10) {
          // Update loss (decreasing)
          setLoss(prevLoss => Math.max(0.05, prevLoss - 0.15 - Math.random() * 0.1))
          
          // Update accuracy (increasing)
          setAccuracy(prevAcc => Math.min(99.9, prevAcc + 7 + Math.random() * 5))
          
          // Update status
          const statusIndex = Math.floor((next / 10) * statuses.length)
          setStatus(statuses[Math.min(statusIndex, statuses.length - 1)])
        }
        return next
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
            {/* Logo/Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <motion.h1 
                className="text-3xl font-bold gradient-text mb-2"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Training Model...
              </motion.h1>
              <motion.p
                className="text-sm text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {status}
              </motion.p>
            </motion.div>

            {/* Metrics Container */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-6 border border-vision/20">
              {/* Epoch Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Epoch</span>
                  <span className="text-lg font-mono font-bold text-vision">
                    {epoch}/10
                  </span>
                </div>
                <div className="relative h-2 bg-dark-700 rounded-full overflow-hidden">
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

              {/* Loss Metric */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Loss</span>
                  <motion.span
                    className="font-mono text-orange-400"
                    key={loss}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {loss.toFixed(4)}
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                      animate={{ width: `${Math.max(0, 100 - (loss / 2.5) * 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.span
                    className="text-xs text-green-400"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </div>
              </div>

              {/* Accuracy Metric */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Accuracy</span>
                  <motion.span
                    className="font-mono text-green-400"
                    key={accuracy}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {accuracy.toFixed(2)}%
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                      animate={{ width: `${accuracy}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.span
                    className="text-xs text-green-400"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  >
                    ↑
                  </motion.span>
                </div>
              </div>

              {/* Console-like output */}
              <motion.div
                className="mt-4 p-3 bg-dark-900/80 rounded border border-vision/10 font-mono text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                  <span>optimizer=Adam(lr=0.001)</span>
                </div>
                <div className="text-vision/60">batch_size=32</div>
                <div className="text-reasoning/60">learning_rate=adaptive</div>
              </motion.div>
            </div>

            {/* Loading spinner */}
            <motion.div
              className="flex justify-center mt-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 border-2 border-vision/30 border-t-vision rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
