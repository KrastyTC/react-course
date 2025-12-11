import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

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
          <Link to="/products" className="app-nav-link">
            Products
          </Link>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
