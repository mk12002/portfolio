import { useState, useEffect } from 'react'
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
  "A pentester walks into a bar... and then into the bar next door, and the bar after that.",
  "The best thing about TCP jokes? I keep telling them until you get them.",
  "Why do programmers prefer dark mode? Because light attracts bugs!"
]

const COMMANDS = {
  help: "Available commands: help, puns, scan, nmap, exploit, defend, whois, ctf, clear, exit",
  puns: "Generating security humor...",
  scan: "Scanning target network...",
  nmap: "Starting Nmap 7.94 — https://nmap.org",
  exploit: "Launching exploit payload...",
  defend: "Activating defense protocols...",
  whois: "Querying WHOIS database... mohitkumar.dev → Cybersecurity × ML Engineer",
  ctf: "🏴 CTF Challenge detected! Navigate to /ctf to test your skills. 3 levels await...",
  clear: "",
  exit: "Connection terminated.",
  whoami: "You are: A curious explorer of portfolio easter eggs 🎉",
  ls: "projects/ certificates/ tools/ exploits/ resume.pdf .secrets/",
  pwd: "/root/portfolio/terminal",
  sudo: "[sudo] Nice try! Root access denied. 🔒",
  matrix: "There is no spoon... but there IS a buffer overflow."
}

export default function Terminal() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'root@kali:~# Portfolio Terminal v2.0 — Security Edition' },
    { type: 'system', text: 'Type "help" for available commands or "puns" for hacker humor!' }
  ])

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Terminal toggle with '/'
      if (e.key === '/' && !showTerminal) {
        e.preventDefault()
        setShowTerminal(true)
        return
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showTerminal])

  const handleTerminalCommand = (cmd) => {
    const command = cmd.trim().toLowerCase()

    setTerminalHistory(prev => [...prev, { type: 'user', text: `$ ${cmd} ` }])

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

    if (command === 'scan' || command === 'nmap') {
      setTerminalHistory(prev => [...prev,
      { type: 'output', text: COMMANDS[command] },
      { type: 'loading', text: 'Scanning ports... 22/tcp open ssh' },
      { type: 'loading', text: '80/tcp open http' },
      { type: 'loading', text: '443/tcp open https' },
      { type: 'success', text: '✓ Scan complete! 3 open ports found. System secure.' }
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

  return (
    <>
      {/* Terminal */}
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

      {/* Hint overlay (bottom right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 right-4 z-50 text-xs text-gray-600 font-mono pointer-events-none"
      >
        <div>Press / for terminal</div>
      </motion.div>
    </>
  )
}
