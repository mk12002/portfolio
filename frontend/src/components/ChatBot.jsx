import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
})

const SUGGESTED_QUESTIONS = [
    "What are Mohit's key projects?",
    "Tell me about the cybersecurity internship",
    "What skills does Mohit have?",
    "What are Mohit's publications?",
]

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hey! I'm Mohit's AI assistant. Ask me anything about his projects, skills, experience, or publications." }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    const sendMessage = async (text) => {
        const userMsg = text || input.trim()
        if (!userMsg || isLoading) return

        setShowSuggestions(false)
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setInput('')
        setIsLoading(true)

        try {
            const res = await api.post('/chat', { message: userMsg })
            setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }])
        } catch (err) {
            const errorMsg = err.response?.status === 429
                ? 'Too many requests — please wait a moment.'
                : err.response?.status === 503
                    ? 'Chat is currently unavailable.'
                    : 'Sorry, something went wrong. Try again.'
            setMessages(prev => [...prev, { role: 'bot', text: errorMsg }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Chat bubble */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-offensive to-defensive flex items-center justify-center shadow-lg shadow-offensive/30 hover:shadow-offensive/50 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Chat with AI assistant"
            >
                {isOpen ? <FaTimes size={20} /> : <FaRobot size={22} />}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] bg-[#0d1117] border border-offensive/30 rounded-2xl shadow-2xl shadow-offensive/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-offensive/20">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-offensive to-defensive flex items-center justify-center">
                                <FaRobot size={14} />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold">Ask MK</div>
                                <div className="text-xs text-gray-500">AI-powered portfolio assistant</div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[360px]">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${msg.role === 'user'
                                            ? 'bg-defensive/20 text-defensive'
                                            : 'bg-offensive/20 text-offensive'
                                        }`}>
                                        {msg.role === 'user' ? <FaUser size={10} /> : <FaRobot size={10} />}
                                    </div>
                                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-defensive/10 text-gray-200 rounded-br-sm'
                                            : 'bg-white/5 text-gray-300 rounded-bl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-start gap-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-offensive/20 text-offensive flex items-center justify-center text-xs">
                                        <FaRobot size={10} />
                                    </div>
                                    <div className="bg-white/5 px-3 py-2 rounded-xl rounded-bl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-offensive/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-offensive/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-offensive/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {showSuggestions && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTED_QUESTIONS.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs px-2.5 py-1 rounded-full border border-offensive/20 text-gray-400 hover:text-offensive hover:border-offensive/50 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); sendMessage() }}
                            className="px-3 py-3 border-t border-white/5 flex gap-2"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Mohit..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-offensive/40"
                                disabled={isLoading}
                            />
                            <motion.button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-9 h-9 rounded-xl bg-offensive/20 text-offensive flex items-center justify-center hover:bg-offensive/30 transition-colors disabled:opacity-30"
                            >
                                <FaPaperPlane size={12} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
