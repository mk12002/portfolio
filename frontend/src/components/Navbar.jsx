import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaChevronDown } from 'react-icons/fa'

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experiences' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
]

const moreLinks = [
  { name: 'Publications', path: '/publications' },
  { name: 'Blog', path: '/posts' },
  { name: 'Reads', path: '/reads' },
  { name: 'Support', path: '/support' },
]

const allLinks = [...primaryLinks, ...moreLinks]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const moreRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setMoreOpen(false)
    setIsOpen(false)
  }, [location.pathname])

  const isMoreActive = moreLinks.some(link => location.pathname === link.path)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-vision via-reasoning to-audio flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              onClick={(e) => {
                e.preventDefault()
                if (window.__easterEggLogoClick) {
                  window.__easterEggLogoClick()
                }
              }}
            >
              <span className="text-white font-bold text-lg">MK</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Mohit Kumar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                    ? 'bg-reasoning/20 text-reasoning border-b-2 border-reasoning'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${isMoreActive
                    ? 'bg-reasoning/20 text-reasoning border-b-2 border-reasoning'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                More
                <motion.span
                  animate={{ rotate: moreOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown size={10} />
                </motion.span>
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-secondary/95 backdrop-blur-lg border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="py-2">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`block px-4 py-2.5 text-sm font-medium transition-all ${location.pathname === link.path
                              ? 'bg-reasoning/20 text-reasoning'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - all links flat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary/95 backdrop-blur-lg border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {allLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${location.pathname === link.path
                      ? 'bg-reasoning/20 text-reasoning border-l-2 border-reasoning'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
