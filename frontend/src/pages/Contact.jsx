import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useContactInfo, submitContactForm } from '../hooks/useApi'

export default function Contact() {
  const { data: contactInfo } = useContactInfo()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitContactForm(formData)
      toast.success(contactInfo?.successMessage || 'Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
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
            <span className="gradient-text">{contactInfo?.title || 'Contact Me'}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {contactInfo?.description || 'Feel free to reach out for collaborations, internships, or project inquiries.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlowCard glowColor="reasoning">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-vision transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-vision transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-vision transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-vision to-reasoning rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <GlowCard glowColor="vision">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-vision/20 flex items-center justify-center">
                  <FaEnvelope className="text-vision text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href={`mailto:${contactInfo?.email || 'mohit.kr1103@gmail.com'}`} className="text-gray-400 hover:text-vision transition-colors">
                    {contactInfo?.email || 'mohit.kr1103@gmail.com'}
                  </a>
                </div>
              </div>
            </GlowCard>

            <GlowCard glowColor="audio">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-audio/20 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-audio text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-400">{contactInfo?.location || 'Bengaluru, India'}</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard glowColor="reasoning">
              <h3 className="font-semibold mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/mohitkumar111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-vision hover:bg-white/10 transition-all"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/mohitkumar111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-vision hover:bg-white/10 transition-all"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
