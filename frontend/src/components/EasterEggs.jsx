import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTerminal } from 'react-icons/fa'

const SECURITY_PUNS = [
  "Why do hackers wear glasses? Because they can't C#.",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, sees two tables and asks... 'Can I JOIN you?'",
  "Why did the security engineer go broke? Because he lost his cache.",
  "I told my firewall a joke. It didn't let it through.",
  "What's a hacker's favorite season? Phishing season!",
  "My password is 'incorrect' — that way if I forget, the computer tells me.",
  "Why don't hackers like nature? Too many bugs.",
  "Port 443 walks into a bar. The bartender says 'I see you're secure today.'",
  "I'd tell you a UDP joke, but you might not get it.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
  "A pentester walks into a bar... and then into the bar next door, and the bar after that.",
  "What do you call a computer that sings? A-Dell.",
  "The best thing about TCP jokes? I keep telling them until you get them.",
  "Why do programmers prefer dark mode? Because light attracts bugs!"
]

const COMMANDS = {
  help: "Available commands: help, puns, scan, exploit, defend, nmap, whois, clear, exit",
  puns: "Generating security humor...",
  scan: "Scanning target network...",
  exploit: "Launching exploit payload...",
  defend: "Activating defense protocols...",
  nmap: "Starting Nmap 7.94 — https://nmap.org",
  whois: "Querying WHOIS database...",
  clear: "",
  exit: "Connection terminated.",
  whoami: "You are: A curious explorer of portfolio easter eggs 🎉",
  ls: "projects/ certificates/ tools/ exploits/ resume.pdf .secrets/",
  pwd: "/root/portfolio/easter-eggs",
  sudo: "[sudo] Nice try! Root access denied. 🔒",
  matrix: "There is no spoon... but there IS a buffer overflow."
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState([])
  const [showKonamiAnimation, setShowKonamiAnimation] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'root@kali:~# Portfolio Terminal v2.0 — Security Edition' },
    { type: 'system', text: 'Type "help" for available commands or "puns" for hacker humor!' }
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
        { type: 'system', text: 'root@kali:~# Portfolio Terminal v2.0 — Security Edition' },
        { type: 'system', text: 'Type "help" for available commands or "puns" for hacker humor!' }
      ])
      return
    }

    if (command === 'puns') {
      const randomPun = SECURITY_PUNS[Math.floor(Math.random() * SECURITY_PUNS.length)]
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS.puns },
      { type: 'pun', text: randomPun }
      ])
      return
    }

    if (command === 'scan') {
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS.scan },
      { type: 'loading', text: 'Scanning port 22 (ssh)... OPEN' },
      { type: 'loading', text: 'Scanning port 80 (http)... OPEN' },
      { type: 'loading', text: 'Scanning port 443 (https)... OPEN' },
      { type: 'success', text: '✓ Scan complete! 3 open ports found.' }
      ])
      return
    }

    if (command === 'exploit') {
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS.exploit },
      { type: 'loading', text: 'Preparing payload...' },
      { type: 'loading', text: 'Bypassing WAF...' },
      { type: 'error', text: '✗ Access denied! This is a CTF, not a real target. 😉' }
      ])
      return
    }

    if (command === 'defend') {
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS.defend },
      { type: 'loading', text: 'Enabling firewall rules...' },
      { type: 'loading', text: 'Updating IDS signatures...' },
      { type: 'loading', text: 'Deploying AI anomaly detector...' },
      { type: 'success', text: '✓ Defense protocols activated! Threat level: MINIMAL' }
      ])
      return
    }

    if (command === 'nmap') {
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS.nmap },
      { type: 'loading', text: 'PORT     STATE  SERVICE' },
      { type: 'loading', text: '22/tcp   open   ssh' },
      { type: 'loading', text: '80/tcp   open   http' },
      { type: 'loading', text: '443/tcp  open   https' },
      { type: 'success', text: 'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds' }
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
        color: ['#00ff41', '#ef4444', '#3b82f6'][Math.floor(Math.random() * 3)]
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
                  background: ['#00ff41', '#ef4444', '#3b82f6'][i % 3],
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
                  <span className="font-mono text-sm text-gray-300">root@kali:~#</span>
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
              <h2 className="text-3xl font-bold gradient-text mb-2">Threat Hunt!</h2>
              <p className="text-gray-400 mb-4">Click the threats before they disappear!</p>
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
