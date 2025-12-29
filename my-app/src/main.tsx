import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterSidebarProvider } from './ui/FilterSidebarContext.tsx'

// Initialize PrimeReact theme
function ThemeInitializer() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('primereact-theme') || 'lara-light-blue'
    // Check if theme link already exists
    const existingLink = document.querySelector(`link[data-theme="${savedTheme}"]`)
    if (!existingLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://cdn.jsdelivr.net/npm/primereact@latest/resources/themes/${savedTheme}/theme.css`
      link.setAttribute('data-theme', savedTheme)
      document.head.appendChild(link)
    }
    
    // Apply initial theme class
    const isDark = savedTheme.includes('dark')
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.body.classList.add('theme-dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      document.body.classList.add('theme-light')
    }
  }, [])
  return null
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeInitializer />
      <FilterSidebarProvider>
        <App />
      </FilterSidebarProvider>
    </StrictMode>
  </QueryClientProvider>,
)
