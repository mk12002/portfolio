import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFlag, FaLock, FaUnlock, FaTrophy, FaArrowRight } from 'react-icons/fa'
import SEO from '../components/SEO'

// Level 1: Base64 decode
// "flag{b4s3_64_d3c0d3d}" encoded in Base64
const LEVEL_1_ENCODED = 'ZmxhZ3tiNHMzXzY0X2QzYzBkM2R9'
const LEVEL_1_ANSWER = 'flag{b4s3_64_d3c0d3d}'

// Level 2: Hidden in HTML comment (hint points to page source)
const LEVEL_2_ANSWER = 'flag{1nsp3ct_3lem3nt}'

// Level 3: XOR cipher
// "flag{x0r_m4st3r}" XORed with key 42
const LEVEL_3_HINT = '0c0e07010d3b10360f364e331b16330f3d'
const LEVEL_3_ANSWER = 'flag{x0r_m4st3r}'

const levels = [
    {
        id: 1,
        title: 'Level 1: Decode the Signal',
        description: 'An intercepted transmission contains a Base64-encoded flag. Decode it to proceed.',
        hint: `Encoded message: ${LEVEL_1_ENCODED}`,
        extraHint: 'Use atob() in your browser console, or any Base64 decoder.',
        answer: LEVEL_1_ANSWER,
        color: '#00ff41',
    },
    {
        id: 2,
        title: 'Level 2: Hidden in Plain Sight',
        description: 'The flag is hidden somewhere in this page. A real security researcher knows where to look.',
        hint: 'Inspect the page source carefully. Not everything visible is all there is.',
        extraHint: 'Right-click → View Page Source, or use DevTools (Ctrl+Shift+I).',
        answer: LEVEL_2_ANSWER,
        color: '#3b82f6',
    },
    {
        id: 3,
        title: 'Level 3: Break the Cipher',
        description: 'This flag has been XOR-encrypted with a single-byte key. Can you crack it?',
        hint: `Ciphertext (hex): ${LEVEL_3_HINT}`,
        extraHint: 'The key is a number between 1 and 255. Try brute-forcing it. Key: 42 (0x2A).',
        answer: LEVEL_3_ANSWER,
        color: '#ef4444',
    },
]

export default function CTF() {
    const [currentLevel, setCurrentLevel] = useState(0)
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [completed, setCompleted] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [solvedLevels, setSolvedLevels] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const level = levels[currentLevel]

        if (input.trim().toLowerCase() === level.answer.toLowerCase()) {
            setSolvedLevels(prev => [...prev, currentLevel])
            setInput('')
            setError('')
            setShowHint(false)

            if (currentLevel >= levels.length - 1) {
                setCompleted(true)
            } else {
                setCurrentLevel(prev => prev + 1)
            }
        } else {
            setError('Incorrect flag. Keep trying!')
        }
    }

    return (
        <>
            <SEO
                title="CTF Challenge | Mohit Kumar"
                description="Think you have what it takes? Solve 3 cybersecurity challenges to prove your skills."
                pathname="/ctf"
            />
            {/* Hidden flag for Level 2 */}
            {/* flag{1nsp3ct_3lem3nt} */}
            <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-threat/20 text-threat text-sm font-medium mb-4"
                        animate={{ boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <FaFlag /> Capture The Flag
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">
                        <span className="gradient-text glitch-text" data-text="Can You Hack It?">Can You Hack It?</span>
                    </h1>
                    <p className="text-gray-400">
                        3 levels. 3 flags. Prove your cybersecurity skills.
                    </p>
                </motion.div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {levels.map((level, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-mono font-bold text-sm ${solvedLevels.includes(idx)
                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                        : idx === currentLevel && !completed
                                            ? 'border-white/50 text-white'
                                            : 'border-white/10 text-gray-600'
                                    }`}
                                animate={idx === currentLevel && !completed ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {solvedLevels.includes(idx) ? <FaUnlock /> : <FaLock />}
                            </motion.div>
                            {idx < levels.length - 1 && (
                                <div className={`w-12 h-0.5 ${solvedLevels.includes(idx) ? 'bg-green-500' : 'bg-white/10'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {!completed ? (
                        <motion.div
                            key={currentLevel}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="bg-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                        >
                            {/* Level info */}
                            <h2 className="text-xl font-bold mb-2" style={{ color: levels[currentLevel].color }}>
                                {levels[currentLevel].title}
                            </h2>
                            <p className="text-gray-300 mb-6">{levels[currentLevel].description}</p>

                            {/* Challenge content */}
                            <div className="bg-[#0d1117] rounded-lg p-4 mb-6 font-mono text-sm border border-white/5">
                                <div className="text-[#00ff41] mb-1">$ challenge --info</div>
                                <div className="text-gray-400">{levels[currentLevel].hint}</div>
                            </div>

                            {/* Hint toggle */}
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4"
                            >
                                {showHint ? 'Hide hint' : '💡 Need a hint?'}
                            </button>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-sm text-yellow-400/70 mb-4 bg-yellow-400/5 rounded p-3 border border-yellow-400/10"
                                    >
                                        💡 {levels[currentLevel].extraHint}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Flag input */}
                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => { setInput(e.target.value); setError('') }}
                                    placeholder="Enter flag{...}"
                                    className="flex-1 bg-[#0d1117] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff41]/50"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gradient-to-r from-offensive to-threat rounded-lg font-medium text-white flex items-center gap-2"
                                >
                                    Submit <FaArrowRight />
                                </motion.button>
                            </form>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400 text-sm mt-3 font-mono"
                                >
                                    ✗ {error}
                                </motion.p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaTrophy className="text-8xl text-yellow-400 mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                <span className="gradient-text">All Flags Captured! 🎉</span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-2">
                                Congratulations! You solved all 3 challenges.
                            </p>
                            <p className="text-gray-500 mb-8">
                                You clearly know your way around cybersecurity. Let's connect!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <motion.a
                                    href="https://www.linkedin.com/in/mohitkumar111/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    className="px-6 py-3 bg-gradient-to-r from-offensive to-defensive rounded-lg font-medium"
                                >
                                    Connect on LinkedIn
                                </motion.a>
                                <motion.a
                                    href="mailto:mohit.kr1103@gmail.com"
                                    whileHover={{ scale: 1.05 }}
                                    className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all"
                                >
                                    Send Email
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
