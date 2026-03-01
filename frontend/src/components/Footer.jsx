import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaCoffee } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-secondary/50 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-vision via-reasoning to-audio flex items-center justify-center">
                <span className="text-white font-bold">MK</span>
              </div>
              <span className="font-semibold text-lg">Mohit Kumar</span>
            </div>
            <p className="text-gray-400 text-sm">
              Cybersecurity Engineer exploring AI for Security & Security for AI. Deep ML background across vision, reasoning, and multi-agent systems.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-reasoning">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/projects" className="text-gray-400 hover:text-vision transition-colors">Projects</Link>
              <Link to="/resume" className="text-gray-400 hover:text-vision transition-colors">Resume</Link>
              <Link to="/experiences" className="text-gray-400 hover:text-vision transition-colors">Experience</Link>
              <Link to="/publications" className="text-gray-400 hover:text-vision transition-colors">Publications</Link>
              <Link to="/contact" className="text-gray-400 hover:text-vision transition-colors">Contact</Link>
              <Link to="/support" className="text-gray-400 hover:text-audio transition-colors">Support Me</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-reasoning">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/mk12002" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-vision hover:bg-white/10 transition-all">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mohitkumar111/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-vision hover:bg-white/10 transition-all">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:mohit.kr1103@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-audio hover:bg-white/10 transition-all">
                <FaEnvelope size={20} />
              </a>
              <Link to="/support"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-reasoning hover:bg-white/10 transition-all">
                <FaCoffee size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mohit Kumar. Built with React, Spring Boot & Three.js</p>
        </div>
      </div>
    </footer>
  )
}
