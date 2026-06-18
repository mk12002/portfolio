import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()
const STORAGE_KEY = 'portfolio-theme-mode'

// Dark is the brand default — always. Light mode is opt-in via the toggle and
// then remembered. We deliberately do NOT auto-switch based on OS preference.
function getInitialMode() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'light' ? 'light' : 'dark'
}

function applyMode(mode) {
  const root = document.documentElement
  root.classList.toggle('light', mode === 'light')
  root.classList.toggle('dark', mode === 'dark')
  root.style.colorScheme = mode
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(getInitialMode)

  useEffect(() => {
    applyMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const setMode = useCallback((next) => {
    if (next === 'light' || next === 'dark') setModeState(next)
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, isDark: mode === 'dark', toggleMode, setMode }}>
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
