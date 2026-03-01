import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const terminalLines = [
    { type: 'command', text: 'root@kali:~# whoami' },
    { type: 'result', text: '→ Mohit Kumar — Cybersecurity × ML Engineer' },
    { type: 'command', text: 'root@kali:~# cat mission.txt' },
    { type: 'result', text: '→ AI for Security. Security for AI.' },
    { type: 'command', text: 'root@kali:~# nmap -sV portfolio' },
    { type: 'result', text: '→ 12+ projects | 4 publications | 15+ certifications' },
]

export default function TerminalHero() {
    const [displayedLines, setDisplayedLines] = useState([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [showCursor, setShowCursor] = useState(true)

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])

    // Typing effect
    useEffect(() => {
        if (currentLineIndex >= terminalLines.length) {
            setIsTyping(false)
            return
        }

        const currentLine = terminalLines[currentLineIndex]
        const fullText = currentLine.text

        if (currentCharIndex < fullText.length) {
            const speed = currentLine.type === 'command' ? 50 : 20
            const timeout = setTimeout(() => {
                setCurrentCharIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timeout)
        } else {
            // Line complete — add to displayed lines and move to next
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => [...prev, currentLine])
                setCurrentLineIndex(prev => prev + 1)
                setCurrentCharIndex(0)
            }, currentLine.type === 'command' ? 400 : 600)
            return () => clearTimeout(timeout)
        }
    }, [currentLineIndex, currentCharIndex])

    const currentLine = currentLineIndex < terminalLines.length
        ? terminalLines[currentLineIndex]
        : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
        >
            <div className="bg-[#0d1117] rounded-lg border border-[#00ff41]/30 overflow-hidden shadow-2xl shadow-[#00ff41]/10">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-[#00ff41]/20">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-xs font-mono text-gray-500">root@kali — bash</span>
                </div>

                {/* Terminal body */}
                <div className="p-5 font-mono text-sm leading-relaxed min-h-[200px]">
                    {/* Already typed lines */}
                    {displayedLines.map((line, idx) => (
                        <div
                            key={idx}
                            className={`mb-1.5 ${line.type === 'command'
                                    ? 'text-[#00ff41]'
                                    : 'text-gray-300 pl-2'
                                }`}
                        >
                            {line.text}
                        </div>
                    ))}

                    {/* Currently typing line */}
                    {currentLine && (
                        <div
                            className={`mb-1.5 ${currentLine.type === 'command'
                                    ? 'text-[#00ff41]'
                                    : 'text-gray-300 pl-2'
                                }`}
                        >
                            {currentLine.text.slice(0, currentCharIndex)}
                            <span
                                className={`inline-block w-2 h-4 ml-0.5 align-middle ${showCursor ? 'bg-[#00ff41]' : 'bg-transparent'
                                    }`}
                            />
                        </div>
                    )}

                    {/* Cursor after all lines are done */}
                    {!isTyping && (
                        <div className="text-[#00ff41] mt-1.5">
                            root@kali:~# <span
                                className={`inline-block w-2 h-4 ml-0.5 align-middle ${showCursor ? 'bg-[#00ff41]' : 'bg-transparent'
                                    }`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
