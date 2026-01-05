import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import Terminal from './components/Terminal'
import ThemeSwitcher from './components/ThemeSwitcher'
import ScrollToTop from './components/ScrollToTop'

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

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/events" element={<Events />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/reads" element={<Reads />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<BuyMeCoffee />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          toastStyle={{ backgroundColor: '#0b1020', border: '1px solid rgba(168, 85, 247, 0.3)' }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
