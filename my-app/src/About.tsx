import { useState, useEffect, useRef } from 'react'

function About() {
  const hasIncrementedRef = useRef(false)
  const [visitCount, setVisitCount] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('aboutVisitCount')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    // Only increment once per actual mount (prevents double counting in StrictMode)
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true
      // Read directly from localStorage to avoid dependency on visitCount state
      const saved = localStorage.getItem('aboutVisitCount')
      const currentCount = saved ? parseInt(saved, 10) : 0
      const newCount = currentCount + 1
      localStorage.setItem('aboutVisitCount', newCount.toString())
      setVisitCount(newCount)
    }
  }, []) // Empty deps - only run on mount

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>About Page</h1>
      <p>This is the About page of the application.</p>
      <p>You've visited this page {visitCount} time{visitCount !== 1 ? 's' : ''}.</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#242424', borderRadius: '8px' }}>
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

