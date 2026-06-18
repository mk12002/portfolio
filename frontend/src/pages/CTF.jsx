import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFlag, FaLock, FaUnlock, FaTrophy, FaArrowRight, FaBookOpen } from 'react-icons/fa'
import SEO from '../components/SEO'

// Flags are validated by SHA-256 so the answers are not sitting in plaintext
// in the bundle. (Level 2's flag lives in an HTML comment on purpose — that
// IS the challenge.)
const LEVEL_1_ENCODED = 'ZmxhZ3tiNHMzXzY0X2QzYzBkM2R9'
const LEVEL_3_HINT = '0c0e07010d3b10360f364e331b16330f3d'
const LEVEL_4_ROT13 = 'synt{e0g13_e0yyf}'
const LEVEL_5_HEX = '666c61677b6833785f643363306433647d'
const LEVEL_6_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdGYiLCJmbGFnIjoiZmxhZ3tqd3RfcDR5bDA0ZH0ifQ.c2lnbmF0dXJl'

const FLAG_HASHES = {
  1: '23f09ec62da8205be83c0dcc4431e3adac50ec8103e4468613805d5a7adf0a1d',
  2: '01add790a6c587d7dd815aaa137d2050e0e15eb3d1877dc44bfa078e47a9e4d0',
  3: 'd139c9db85d8f5df1b38f1fa6168faa76512f36b48c7733efcf2fecf739131ef',
  4: '45617386a84f84fba90f65e5529d705f2066f8eb4257434befc821cc4903cfb4',
  5: '4ebfcced633ed201f003ea03dae0f0c9158c12bfe854c84a32225287d7e307bb',
  6: '50b0b0da319b879874854ebb7ea91d44ad9ae0783bf072252ca7159440b9c953',
}

const levels = [
  {
    id: 1,
    title: 'Level 1: Decode the Signal',
    description: 'An intercepted transmission contains a Base64-encoded flag. Decode it to proceed.',
    hint: `Encoded message: ${LEVEL_1_ENCODED}`,
    extraHint: 'Run atob("…") in your browser console, or paste it into any Base64 decoder.',
    color: '#10b981',
    writeup: 'The string is standard Base64. `atob(LEVEL_1_ENCODED)` (or `base64 -d`) yields the flag directly. Base64 is encoding, not encryption — it provides zero confidentiality.',
  },
  {
    id: 2,
    title: 'Level 2: Hidden in Plain Sight',
    description: 'The flag is hidden somewhere in this page. A real security researcher knows where to look.',
    hint: 'Inspect the page source carefully. Not everything visible is all there is.',
    extraHint: 'Right-click → View Page Source, or open DevTools (Ctrl+Shift+I) and search the DOM for "flag".',
    color: '#0891b2',
    writeup: 'The flag is embedded in an HTML comment rendered by this page. Client-side "hiding" is never security — anything shipped to the browser is readable. View-source or the Elements panel reveals it.',
  },
  {
    id: 3,
    title: 'Level 3: Break the Cipher',
    description: 'This flag has been XOR-encrypted with a single-byte key. Can you crack it?',
    hint: `Ciphertext (hex): ${LEVEL_3_HINT}`,
    extraHint: 'The key is one byte (1–255). Brute-force all 255 keys and look for printable "flag{...}" output. (This one used 0x2A.)',
    color: '#f59e0b',
    writeup: 'Single-byte XOR has only 255 possible keys — trivially brute-forceable. Decode the hex to bytes, XOR every byte with each candidate key, and the key that produces a printable "flag{" prefix wins. Here the key was 42 (0x2A).',
  },
  {
    id: 4,
    title: 'Level 4: Rotate the Alphabet',
    description: 'A classic substitution cipher shifted every letter by a fixed amount. Roll it back.',
    hint: `Ciphertext: ${LEVEL_4_ROT13}`,
    extraHint: 'Each letter is shifted 13 places — this is ROT13. Digits and symbols are untouched. Many online decoders (or `tr a-z n-za-m`) reverse it.',
    color: '#8b5cf6',
    writeup: 'ROT13 is a Caesar cipher with a fixed shift of 13. Because 13 is half of 26, applying ROT13 twice returns the original — encoding and decoding are the same operation. It offers no security; it is obfuscation at best.',
  },
  {
    id: 5,
    title: 'Level 5: Read the Hex',
    description: 'The flag has been converted to its hexadecimal byte representation. Turn it back into text.',
    hint: `Hex: ${LEVEL_5_HEX}`,
    extraHint: 'Each pair of hex digits is one ASCII byte. `xxd -r -p`, Python `bytes.fromhex(...)`, or any hex-to-text tool will decode it.',
    color: '#0891b2',
    writeup: 'Hex is just a base-16 encoding of raw bytes — two hex characters per byte. Splitting into pairs and mapping each to its ASCII character reconstructs the string. Like Base64, it is encoding, not encryption.',
  },
  {
    id: 6,
    title: 'Level 6: Crack the Token',
    description: 'A JSON Web Token carries a hidden claim. Decode it to read the flag — no signature required.',
    hint: `Token: ${LEVEL_6_JWT}`,
    extraHint: 'A JWT is three base64url parts separated by dots. Decode the middle (payload) part and read the "flag" claim — or paste the whole token into the JWT Analyzer in my Playground.',
    color: '#10b981',
    writeup: 'JWT header and payload are only base64url-encoded, not encrypted — anyone can read the claims without the signing key. The flag lives in the payload "flag" claim. This is exactly why you must never put secrets in a JWT payload.',
  },
]

const STORAGE_KEY = 'ctf-solved-levels'

async function sha256hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function CTF() {
  const [solvedLevels, setSolvedLevels] = useState([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showWriteups, setShowWriteups] = useState(false)

  // Restore progress
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved) && saved.length) {
        setSolvedLevels(saved)
        setCurrentLevel(Math.min(saved.length, levels.length - 1))
      }
    } catch { /* ignore */ }
  }, [])

  const completed = solvedLevels.length >= levels.length

  const handleSubmit = async (e) => {
    e.preventDefault()
    const guess = input.trim().toLowerCase()
    const expected = FLAG_HASHES[levels[currentLevel].id]
    const hashed = await sha256hex(guess)
    if (hashed === expected) {
      const next = Array.from(new Set([...solvedLevels, currentLevel]))
      setSolvedLevels(next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setInput(''); setError(''); setShowHint(false)
      if (currentLevel < levels.length - 1) setCurrentLevel((p) => p + 1)
    } else {
      setError('Incorrect flag. Keep trying!')
    }
  }

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    setSolvedLevels([]); setCurrentLevel(0); setInput(''); setError('')
  }

  return (
    <>
      <SEO
        title="CTF Challenge | Mohit Kumar"
        description="A small capture-the-flag: 3 client-side cybersecurity challenges (Base64, source inspection, XOR) with writeups. Built by Mohit Kumar."
        pathname="/ctf"
      />
      {/* Hidden flag for Level 2 — finding this is the point. */}
      {/* flag{1nsp3ct_3lem3nt} */}
      <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium mb-4">
            <FaFlag /> Capture The Flag
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">Can You Hack It?</span>
          </h1>
          <p className="text-gray-400">6 levels · 6 flags · validated by SHA-256, so no peeking at the source.</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-1.5 mb-10">
          {levels.map((level, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 font-mono font-bold text-sm ${
                  solvedLevels.includes(idx)
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : idx === currentLevel && !completed
                      ? 'border-white/50 text-white'
                      : 'border-white/10 text-gray-600'
                }`}
              >
                {solvedLevels.includes(idx) ? <FaUnlock /> : <FaLock />}
              </div>
              {idx < levels.length - 1 && (
                <div className={`w-5 h-0.5 ${solvedLevels.includes(idx) ? 'bg-green-500' : 'bg-white/10'}`} />
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
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: levels[currentLevel].color }}>
                {levels[currentLevel].title}
              </h2>
              <p className="text-gray-300 mb-6">{levels[currentLevel].description}</p>

              <div className="bg-[#0d1117] rounded-lg p-4 mb-6 font-mono text-sm border border-white/5">
                <div className="text-emerald-400 mb-1">$ challenge --info</div>
                <div className="text-gray-400 break-all">{levels[currentLevel].hint}</div>
              </div>

              <button onClick={() => setShowHint(!showHint)} className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4">
                {showHint ? 'Hide hint' : '💡 Need a hint?'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-yellow-400/80 mb-4 bg-yellow-400/5 rounded p-3 border border-yellow-400/10"
                  >
                    💡 {levels[currentLevel].extraHint}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError('') }}
                  placeholder="Enter flag{...}"
                  className="flex-1 bg-[#0d1117] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50"
                />
                <motion.button
                  type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-vision to-reasoning text-primary rounded-lg font-semibold flex items-center gap-2"
                >
                  Submit <FaArrowRight />
                </motion.button>
              </form>
              {error && <p className="text-red-400 text-sm mt-3 font-mono">✗ {error}</p>}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <FaTrophy className="text-7xl text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-3"><span className="gradient-text">All Flags Captured! 🎉</span></h2>
              <p className="text-gray-300 text-lg mb-2">You solved all 6 challenges.</p>
              <p className="text-gray-500 mb-8">You clearly know your way around. Let's connect!</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="https://www.linkedin.com/in/mohitkumar111/" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-vision to-reasoning text-primary rounded-lg font-semibold">Connect on LinkedIn</a>
                <a href="mailto:mohit.kr1103@gmail.com" className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">Send Email</a>
                <button onClick={resetProgress} className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all">Reset & replay</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Writeups */}
        <div className="mt-12">
          <button
            onClick={() => setShowWriteups((s) => !s)}
            className="flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-accent transition-colors"
          >
            <FaBookOpen /> {showWriteups ? 'Hide writeups' : 'Show writeups (spoilers)'}
          </button>
          <AnimatePresence>
            {showWriteups && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 space-y-4">
                  {levels.map((l) => (
                    <div key={l.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h3 className="font-semibold mb-1.5" style={{ color: l.color }}>{l.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{l.writeup}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
