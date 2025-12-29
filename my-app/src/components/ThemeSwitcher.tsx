import { useEffect, useState } from 'react'
import './ThemeSwitcher.css'

const THEME_STORAGE_KEY = 'primereact-theme'
const DEFAULT_THEME = 'lara-light-blue'

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<string>(DEFAULT_THEME)

  useEffect(() => {
    // Load saved theme or default
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } catch (e) {
      console.warn('Failed to load theme from localStorage', e)
    }
  }, [])

  const applyTheme = (theme: string) => {
    // Remove existing theme links
    const existingLinks = document.querySelectorAll('link[data-theme]')
    existingLinks.forEach((link) => link.remove())

    // Create new theme link
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://cdn.jsdelivr.net/npm/primereact@latest/resources/themes/${theme}/theme.css`
    link.setAttribute('data-theme', theme)
    document.head.appendChild(link)

    // Apply theme class to document element for global styling
    const isDark = theme.includes('dark')
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
    }

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (e) {
      console.warn('Failed to save theme to localStorage', e)
    }
  }

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme)
    applyTheme(theme)
  }

  const isDark = currentTheme.includes('dark')

  return (
    <div className="theme-switcher">
      <button
        type="button"
        className={`theme-button ${!isDark ? 'active' : ''}`}
        onClick={() => changeTheme('lara-light-blue')}
        title="Light Theme"
      >
        ☀️
      </button>
      <button
        type="button"
        className={`theme-button ${isDark ? 'active' : ''}`}
        onClick={() => changeTheme('lara-dark-blue')}
        title="Dark Theme"
      >
        🌙
      </button>
    </div>
  )
}

export default ThemeSwitcher

