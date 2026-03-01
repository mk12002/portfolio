import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
  offensive: {
    name: 'Offensive Security',
    colors: {
      primary: '#ef4444',    // red
      secondary: '#f97316',  // orange
      accent: '#dc2626',     // red-600
      vision: '#ef4444',
      audio: '#f97316',
      reasoning: '#dc2626',
    },
    particles: {
      type: 'attack',
      count: 60,
      speed: 1.2,
      pattern: 'directional'
    },
    description: 'Red team operations, penetration testing & exploit development'
  },
  defensive: {
    name: 'Defensive Security',
    colors: {
      primary: '#3b82f6',    // blue
      secondary: '#06b6d4',  // cyan
      accent: '#0ea5e9',     // sky
      vision: '#3b82f6',
      audio: '#06b6d4',
      reasoning: '#0ea5e9',
    },
    particles: {
      type: 'shield',
      count: 80,
      speed: 0.5,
      pattern: 'layered'
    },
    description: 'Blue team SOC monitoring, incident response & threat hunting'
  },
  forensics: {
    name: 'Digital Forensics',
    colors: {
      primary: '#00ff41',    // neon green
      secondary: '#22c55e',  // green-500
      accent: '#10b981',     // emerald
      vision: '#00ff41',
      audio: '#22c55e',
      reasoning: '#10b981',
    },
    particles: {
      type: 'trace',
      count: 50,
      speed: 0.8,
      pattern: 'sequential'
    },
    description: 'Evidence analysis, malware reverse engineering & log forensics'
  },
  adversarial: {
    name: 'Adversarial ML',
    colors: {
      primary: '#a855f7',    // purple
      secondary: '#ec4899',  // pink
      accent: '#8b5cf6',     // violet
      vision: '#a855f7',
      audio: '#ec4899',
      reasoning: '#8b5cf6',
    },
    particles: {
      type: 'adversarial',
      count: 70,
      speed: 1.5,
      pattern: 'opposing'
    },
    description: 'AI for Security & Security for AI — adversarial robustness'
  }
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('forensics')

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('security-portfolio-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      localStorage.setItem('security-portfolio-theme', themeName)

      // Update CSS variables
      const theme = themes[themeName]
      const root = document.documentElement
      root.style.setProperty('--color-vision', theme.colors.vision)
      root.style.setProperty('--color-audio', theme.colors.audio)
      root.style.setProperty('--color-reasoning', theme.colors.reasoning)
      root.style.setProperty('--color-primary', theme.colors.primary)
    }
  }

  useEffect(() => {
    // Initialize CSS variables
    changeTheme(currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      theme: themes[currentTheme],
      themes,
      changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
