import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaShieldAlt } from 'react-icons/fa'
import SEO from '../components/SEO'

export default function NotFound() {
    return (
        <>
            <SEO
                title="404 — Page Not Found | Mohit Kumar"
                description="The page you're looking for doesn't exist."
                pathname="/404"
            />
            <div className="min-h-screen pt-20 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-lg"
                >
                    {/* Animated 404 */}
                    <motion.div
                        className="mb-8"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <h1 className="text-8xl md:text-9xl font-extrabold gradient-text mb-2">
                            404
                        </h1>
                    </motion.div>

                    {/* Shield icon */}
                    <motion.div
                        className="mb-6"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaShieldAlt className="text-6xl text-threat/60 mx-auto" />
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Access Denied — this resource was not found on the server.
                        The page you're looking for may have been moved or doesn't exist.
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-vision to-reasoning rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-vision/25"
                        >
                            <FaHome /> Go Home
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}
