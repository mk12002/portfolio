import { motion } from 'framer-motion'
import { FaCoffee, FaExternalLinkAlt, FaHeart } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useBuyMeACoffee } from '../hooks/useApi'

export default function BuyMeCoffee() {
  const { data: coffeeData } = useBuyMeACoffee()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-audio to-reasoning flex items-center justify-center mx-auto">
              <FaCoffee className="text-4xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{coffeeData?.title || 'Buy Me a Coffee'}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {coffeeData?.description || 'If you enjoy my work, consider supporting me with a coffee!'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlowCard glowColor="audio" className="text-center">
              <h2 className="text-xl font-semibold mb-6">Scan to Support</h2>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative inline-block"
              >
                <div className="w-64 h-64 mx-auto bg-white rounded-2xl p-4 shadow-lg shadow-audio/20">
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FaCoffee className="text-4xl mx-auto mb-2 text-audio" />
                      <p className="text-sm">QR Code</p>
                      <p className="text-xs">Upload your QR image</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-2 bg-gradient-to-r from-audio via-reasoning to-vision rounded-3xl opacity-20 blur-xl -z-10" />
              </motion.div>

              {coffeeData?.upiId && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">UPI ID</p>
                  <p className="font-mono text-vision">{coffeeData.upiId}</p>
                </div>
              )}
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <GlowCard glowColor="reasoning">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaHeart className="text-audio" /> Why Support?
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-vision">-</span>
                  Helps me dedicate more time to open-source projects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-audio">-</span>
                  Supports continued ML research and experimentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-reasoning">-</span>
                  Enables creation of more educational content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vision">-</span>
                  Keeps me caffeinated for late-night coding sessions
                </li>
              </ul>
            </GlowCard>

            <GlowCard glowColor="vision">
              <p className="text-center text-gray-400">
                Every contribution, big or small, means the world to me. Thank you for your support! 
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
