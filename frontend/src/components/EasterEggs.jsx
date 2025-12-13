import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTerminal } from 'react-icons/fa'

const ML_PUNS = [
  "Why did the neural network break up? Too many hidden layers in the relationship.",
  "I told my model a joke, but it didn't get it. Must need more training data.",
  "What's a data scientist's favorite exercise? Cross-validation!",
  "Why don't ML engineers like jokes? They can't handle the bias.",
  "My model's accuracy is 99.9%. The 0.1% is when I forget to normalize.",
  "Overfitting is like studying only past exam papers. Works great until the actual test!",
  "Why did the gradient descent algorithm go to therapy? Too many local minima.",
  "I trained a model to predict the weather. It just outputs 'cloudy' – classic dropout!",
  "What do you call a neural network that sings? A vocal cord!",
  "Why was the activation function always happy? It was ReLU positive!",
  "My model has an identity crisis. It can't decide if it's classification or regression.",
  "Backpropagation is just a fancy way of saying 'I messed up, let me fix it'.",
  "Why did the ML engineer bring a ladder? To reach the higher dimensions!",
  "What's a GPU's favorite movie? The Matrix (multiplication).",
  "I asked my model for dating advice. It said 'optimize your features first'."
]

const COMMANDS = {
  help: "Available commands: help, puns, train, matrix, clear, exit",
  puns: "Generating ML humor...",
  train: "Training neural network on dad jokes dataset...",
  matrix: "There is no spoon.",
  clear: "",
  exit: "Goodbye, human!",
  whoami: "You are: A curious explorer of portfolio easter eggs 🎉",
  ls: "projects/ certificates/ skills/ resume.pdf secrets/",
  pwd: "/home/portfolio/easter-eggs",
  sudo: "Nice try! Access denied. 🔒"
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState([])
  const [showKonamiAnimation, setShowKonamiAnimation] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Welcome to Portfolio Terminal v1.0' },
    { type: 'system', text: 'Type "help" for available commands or "puns" for ML humor!' }
  ])
  const [logoClicks, setLogoClicks] = useState(0)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [particles, setParticles] = useState([])

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Terminal toggle with '/'
      if (e.key === '/' && !showTerminal && !showMiniGame) {
        e.preventDefault()
        setShowTerminal(true)
        return
      }

      // Konami code detection
      const newProgress = [...konamiProgress, e.key.toLowerCase()]
      if (newProgress.length > konamiCode.length) {
        newProgress.shift()
      }
      setKonamiProgress(newProgress)

      // Check if konami code is complete
      if (newProgress.join(',') === konamiCode.join(',')) {
        setShowKonamiAnimation(true)
        setKonamiProgress([])
        setTimeout(() => setShowKonamiAnimation(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [konamiProgress, showTerminal, showMiniGame])

  const handleTerminalCommand = (cmd) => {
    const command = cmd.trim().toLowerCase()
    
    setTerminalHistory(prev => [...prev, { type: 'user', text: `$ ${cmd}` }])

    if (command === 'clear') {
      setTerminalHistory([])
      return
    }

    if (command === 'exit') {
      setShowTerminal(false)
      setTerminalHistory([
        { type: 'system', text: 'Welcome to Portfolio Terminal v1.0' },
        { type: 'system', text: 'Type "help" for available commands or "puns" for ML humor!' }
      ])
      return
    }

    if (command === 'puns') {
      const randomPun = ML_PUNS[Math.floor(Math.random() * ML_PUNS.length)]
      setTerminalHistory(prev => [...prev, 
        { type: 'output', text: COMMANDS.puns },
        { type: 'pun', text: randomPun }
      ])
      return
    }

    if (command === 'train') {
      setTerminalHistory(prev => [...prev, 
        { type: 'output', text: COMMANDS.train },
        { type: 'loading', text: 'Epoch 1/3... Loss: 0.95' },
        { type: 'loading', text: 'Epoch 2/3... Loss: 0.42' },
        { type: 'loading', text: 'Epoch 3/3... Loss: 0.01' },
        { type: 'success', text: '✓ Training complete! Humor level: Maximum' }
      ])
      return
    }

    if (COMMANDS[command]) {
      setTerminalHistory(prev => [...prev, { type: 'output', text: COMMANDS[command] }])
    } else {
      setTerminalHistory(prev => [...prev, { 
        type: 'error', 
        text: `Command not found: ${command}. Type "help" for available commands.` 
      }])
    }
  }

  const handleLogoClick = useCallback(() => {
    const newCount = logoClicks + 1
    setLogoClicks(newCount)

    if (newCount === 5) {
      setShowMiniGame(true)
      setLogoClicks(0)
      setGameScore(0)
    }

    // Reset after 2 seconds
    setTimeout(() => setLogoClicks(0), 2000)
  }, [logoClicks])

  const handleParticleClick = (id) => {
    setParticles(prev => prev.filter(p => p.id !== id))
    setGameScore(prev => prev + 10)
  }

  useEffect(() => {
    if (!showMiniGame) return

    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: ['#22d3ee', '#f97316', '#a855f7'][Math.floor(Math.random() * 3)]
      }
      setParticles(prev => [...prev, newParticle])

      // Auto remove after 2 seconds
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, 2000)
    }, 500)

    return () => clearInterval(interval)
  }, [showMiniGame])

  // Expose logo click handler globally
  useEffect(() => {
    window.__easterEggLogoClick = handleLogoClick
    return () => delete window.__easterEggLogoClick
  }, [handleLogoClick])

  return (
    <>
      {/* Konami Code Animation */}
      <AnimatePresence>
        {showKonamiAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            {/* Rainbow gradient overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
                ]
              }}
              transition={{ duration: 2, repeat: 2 }}
            />

            {/* Center text */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold gradient-text mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5, repeat: 8 }}
              >
                🎉 KONAMI! 🎉
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: 4 }}
              >
                You found the secret code!
              </motion.p>
            </motion.div>

            {/* Particles explosion */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: ['#22d3ee', '#f97316', '#a855f7'][i % 3],
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 1000],
                  y: [0, (Math.random() - 0.5) * 1000],
                  scale: [1, 0],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-900 border-2 border-vision rounded-lg shadow-2xl shadow-vision/20 w-full max-w-2xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-vision/30 bg-dark-800">
                <div className="flex items-center gap-2">
                  <FaTerminal className="text-vision" />
                  <span className="font-mono text-sm text-gray-300">portfolio@terminal:~$</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Terminal Output */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
                {terminalHistory.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                      ${entry.type === 'user' ? 'text-vision' : ''}
                      ${entry.type === 'error' ? 'text-red-400' : ''}
                      ${entry.type === 'success' ? 'text-green-400' : ''}
                      ${entry.type === 'pun' ? 'text-audio italic' : ''}
                      ${entry.type === 'system' ? 'text-reasoning' : ''}
                      ${entry.type === 'output' ? 'text-gray-300' : ''}
                      ${entry.type === 'loading' ? 'text-gray-400' : ''}
                    `}
                  >
                    {entry.text}
                  </motion.div>
                ))}
              </div>

              {/* Terminal Input */}
              <div className="px-4 py-3 border-t border-vision/30 bg-dark-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (terminalInput.trim()) {
                      handleTerminalCommand(terminalInput)
                      setTerminalInput('')
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-vision font-mono">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Game - Click the particles */}
      <AnimatePresence>
        {showMiniGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-900/95 backdrop-blur-md"
          >
            {/* Game UI */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">Neural Particle Hunt!</h2>
              <p className="text-gray-400 mb-4">Click the particles before they disappear!</p>
              <div className="text-5xl font-bold text-vision">{gameScore}</div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowMiniGame(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={24} />
            </button>

            {/* Particles */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute w-12 h-12 rounded-full cursor-pointer"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  background: particle.color,
                  boxShadow: `0 0 20px ${particle.color}`,
                }}
                onClick={() => handleParticleClick(particle.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}

            {/* Timer */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <p className="text-gray-500 text-sm">Game will continue until you close it!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint overlay (bottom right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 right-4 z-50 text-xs text-gray-600 font-mono pointer-events-none"
      >
        <div>Press / for terminal</div>
        <div>↑↑↓↓←→←→BA for surprise</div>
      </motion.div>
    </>
  )
}
