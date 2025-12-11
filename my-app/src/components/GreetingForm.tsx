import { useState, useEffect } from 'react'
import './GreetingForm.css'

function GreetingForm() {
  const [name, setName] = useState('')
  const greeting = name.trim() ? `Hello, ${name}! 👋` : ''

  // useEffect to log when component mounts
  useEffect(() => {
    console.log('GreetingForm component mounted')
    
    // Cleanup function
    return () => {
      console.log('GreetingForm component unmounted')
    }
  }, [])

  return (
    <div className="greeting-form">
      <h2>Greeting Form</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      {greeting && (
        <p className="greeting-message">
          {greeting}
        </p>
      )}
    </div>
  )
}

export default GreetingForm

