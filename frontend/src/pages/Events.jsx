import { motion } from 'framer-motion'
import { FaCalendar, FaTrophy, FaUsers, FaGraduationCap } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useEvents } from '../hooks/useApi'

const typeIcons = {
  competition: FaTrophy,
  workshop: FaGraduationCap,
  conference: FaUsers,
  leadership: FaUsers
}

const typeColors = {
  competition: 'audio',
  workshop: 'vision',
  conference: 'reasoning',
  leadership: 'reasoning'
}

export default function Events() {
  const { data, loading } = useEvents()
  const events = data?.events || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Events & Activities</span>
          </h1>
          <p className="text-gray-400">Hackathons, workshops, and leadership experiences</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => {
            const Icon = typeIcons[event.type] || FaCalendar
            const color = typeColors[event.type] || 'vision'

            return (
              <GlowCard key={i} glowColor={color} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-${color}/20 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-${color} text-xl`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendar />
                      <span>{event.year}</span>
                      {event.type && (
                        <span className={`px-2 py-0.5 rounded text-xs bg-${color}/20 text-${color} capitalize`}>
                          {event.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlowCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
