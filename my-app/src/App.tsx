import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Home'
import About from './About'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ 
          padding: '1rem', 
          borderBottom: '1px solid #ccc', 
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: '#242424',
          zIndex: 100
        }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: '#646cff',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{ 
              textDecoration: 'none', 
              color: '#646cff',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            About
          </Link>
        </nav>
        <main style={{ flex: 1, padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
