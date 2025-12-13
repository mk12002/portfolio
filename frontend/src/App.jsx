import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import EasterEggs from './components/EasterEggs'
import ThemeSwitcher from './components/ThemeSwitcher'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Posts from './pages/Posts'
import Experiences from './pages/Experiences'
import Certificates from './pages/Certificates'
import Events from './pages/Events'
import Publications from './pages/Publications'
import Reads from './pages/Reads'
import Contact from './pages/Contact'
import BuyMeCoffee from './pages/BuyMeCoffee'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500) // Show loading for 3.5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary text-white relative">
        <LoadingScreen isLoading={isLoading} />
        <ParticleBackground />
        <EasterEggs />
        <ThemeSwitcher />
        <ScrollToTop />
        <Navbar />
        <main className="relative z-10">
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
