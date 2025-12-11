import { useState, useEffect } from 'react'
import './About.css'

// Module-level flag to prevent double counting in StrictMode
// This persists across component remounts in development
let hasIncremented = false

function About() {
  const [visitCount] = useState(() => {
    // Only increment on the first initialization (prevents double counting in StrictMode)
    if (!hasIncremented) {
      hasIncremented = true
      const saved = localStorage.getItem('aboutVisitCount')
      const currentCount = saved ? parseInt(saved, 10) : 0
      const newCount = currentCount + 1
      localStorage.setItem('aboutVisitCount', newCount.toString())
      return newCount
    }
    // On second initialization (StrictMode), just read the value we just saved
    const saved = localStorage.getItem('aboutVisitCount')
    return saved ? parseInt(saved, 10) : 0
  })

  // Reset flag when component unmounts (allows proper counting on remount)
  useEffect(() => {
    return () => {
      hasIncremented = false
    }
  }, [])

  return (
    <div className="about-page">
      <h1>About Page</h1>
      <p>This is the About page of the application.</p>
      <p>You've visited this page {visitCount} time{visitCount !== 1 ? 's' : ''}.</p>
      <div className="about-content">
        <h2>About This App</h2>
        <p>
          This is a React application built with Vite and TypeScript.
          It demonstrates the use of React Router for navigation and various React hooks.
        </p>
      </div>
    </div>
  )
}

export default About

