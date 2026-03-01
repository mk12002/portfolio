import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import Terminal from './components/Terminal'
import ThemeSwitcher from './components/ThemeSwitcher'
import ScrollToTop from './components/ScrollToTop'
import { useProfile } from './hooks/useApi'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Resume = lazy(() => import('./pages/Resume'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Posts = lazy(() => import('./pages/Posts'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Events = lazy(() => import('./pages/Events'))
const Publications = lazy(() => import('./pages/Publications'))
const Reads = lazy(() => import('./pages/Reads'))
const Contact = lazy(() => import('./pages/Contact'))
const BuyMeCoffee = lazy(() => import('./pages/BuyMeCoffee'))
const CTF = lazy(() => import('./pages/CTF'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { loading: profileLoading } = useProfile()
  const location = useLocation()

  useEffect(() => {
    // Show loading until profile data resolves AND minimum 800ms elapsed
    const minTimer = new Promise(resolve => setTimeout(resolve, 800))
    const dataReady = new Promise(resolve => {
      if (!profileLoading) {
        resolve()
      }
    })

    Promise.all([minTimer, dataReady]).then(() => setIsLoading(false))
  }, [profileLoading])

  // Also dismiss loading if profile finishes after min timer
  useEffect(() => {
    if (!profileLoading) {
      const timer = setTimeout(() => setIsLoading(false), 100)
      return () => clearTimeout(timer)
    }
  }, [profileLoading])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary text-white relative">
        <LoadingScreen isLoading={isLoading} />
        <ParticleBackground />
        <Terminal />
        <ThemeSwitcher />
        <ScrollToTop />
        <Navbar />
        <main className="relative z-10">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
                <Route path="/posts" element={<PageTransition><Posts /></PageTransition>} />
                <Route path="/experiences" element={<PageTransition><Experiences /></PageTransition>} />
                <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
                <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
                <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
                <Route path="/reads" element={<PageTransition><Reads /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/support" element={<PageTransition><BuyMeCoffee /></PageTransition>} />
                <Route path="/ctf" element={<PageTransition><CTF /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          toastStyle={{ backgroundColor: '#0b1020', border: '1px solid rgba(0, 255, 65, 0.3)' }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
