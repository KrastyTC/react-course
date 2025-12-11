import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/" className="app-nav-link">
            Home
          </Link>
          <Link to="/about" className="app-nav-link">
            About
          </Link>
        </nav>
        <main className="app-main">
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
