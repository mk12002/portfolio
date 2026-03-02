import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaProjectDiagram, FaShieldAlt, FaFileAlt, FaBriefcase, FaCertificate, FaTools } from 'react-icons/fa'

function CountUp({ end, duration = 2, suffix = '', isInView }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let startTime = null
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }, [end, duration, isInView])

    return <span>{count}{suffix}</span>
}

const stats = [
    { label: 'Projects Built', icon: FaProjectDiagram, value: 12, suffix: '+', color: '#00ff41' },
    { label: 'Security Tools', icon: FaTools, value: 6, suffix: '+', color: '#3b82f6' },
    { label: 'Publications', icon: FaFileAlt, value: 4, suffix: '', color: '#ef4444' },
    { label: 'Certifications', icon: FaCertificate, value: 15, suffix: '+', color: '#fbbf24' },
]

export default function StatsCounter() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    By The <span className="gradient-text">Numbers</span>
                </h2>
                <p className="text-gray-400">A snapshot of my journey so far</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="relative group"
                    >
                        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-white/5
              hover:border-white/20 transition-all text-center group-hover:scale-[1.02] duration-300">
                            {/* Glow */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                style={{ background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)` }}
                            />

                            {/* Icon */}
                            <stat.icon
                                className="text-3xl mx-auto mb-3"
                                style={{ color: stat.color }}
                            />

                            {/* Number */}
                            <div
                                className="text-4xl md:text-5xl font-bold font-mono mb-2"
                                style={{ color: stat.color }}
                            >
                                <CountUp end={stat.value} suffix={stat.suffix} isInView={isInView} />
                            </div>

                            {/* Label */}
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
