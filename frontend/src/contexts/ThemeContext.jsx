import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
  transformer: {
    name: 'Transformer',
    colors: {
      primary: '#a855f7',    // purple
      secondary: '#ec4899',  // pink
      accent: '#8b5cf6',     // violet
      vision: '#a855f7',
      audio: '#ec4899',
      reasoning: '#8b5cf6',
    },
    particles: {
      type: 'attention',
      count: 60,
      speed: 0.5,
      pattern: 'bidirectional'
    },
    description: 'Self-attention mechanisms with bidirectional flow'
  },
  cnn: {
    name: 'CNN',
    colors: {
      primary: '#22d3ee',    // cyan
      secondary: '#06b6d4',  // cyan-600
      accent: '#0ea5e9',     // sky
      vision: '#22d3ee',
      audio: '#06b6d4',
      reasoning: '#0ea5e9',
    },
    particles: {
      type: 'convolution',
      count: 80,
      speed: 1.2,
      pattern: 'layered'
    },
    description: 'Hierarchical feature extraction through convolution layers'
  },
  rnn: {
    name: 'RNN',
    colors: {
      primary: '#f97316',    // orange
      secondary: '#fb923c',  // orange-400
      accent: '#ea580c',     // orange-600
      vision: '#f97316',
      audio: '#fb923c',
      reasoning: '#ea580c',
    },
    particles: {
      type: 'sequential',
      count: 50,
      speed: 0.8,
      pattern: 'temporal'
    },
    description: 'Sequential processing with temporal dependencies'
  },
  gan: {
    name: 'GAN',
    colors: {
      primary: '#10b981',    // emerald
      secondary: '#14b8a6',  // teal
      accent: '#059669',     // emerald-600
      vision: '#10b981',
      audio: '#14b8a6',
      reasoning: '#059669',
    },
    particles: {
      type: 'adversarial',
      count: 70,
      speed: 1.5,
      pattern: 'opposing'
    },
    description: 'Generator vs Discriminator adversarial training'
  }
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('transformer')

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('ml-portfolio-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      localStorage.setItem('ml-portfolio-theme', themeName)
      
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
