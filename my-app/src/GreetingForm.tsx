import { useState, useEffect } from 'react'

function GreetingForm() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')

  // useEffect to update greeting when name changes
  useEffect(() => {
    if (name.trim()) {
      setGreeting(`Hello, ${name}! 👋`)
    } else {
      setGreeting('')
    }
  }, [name])

  // useEffect to log when component mounts
  useEffect(() => {
    console.log('GreetingForm component mounted')
    
    // Cleanup function
    return () => {
      console.log('GreetingForm component unmounted')
    }
  }, [])

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <h2>Greeting Form</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{
          padding: '8px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          marginRight: '10px',
          width: '200px'
        }}
      />
      {greeting && (
        <p style={{ marginTop: '10px', fontSize: '18px', color: '#ffffffff' }}>
          {greeting}
        </p>
      )}
    </div>
  )
}

export default GreetingForm

