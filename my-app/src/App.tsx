import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import { FilterSidebar } from './components/FilterSidebar'
import { useFilterSidebar } from './ui/FilterSidebarContext'
import { ToastHost } from './components/ToastHost'
import LanguageSwitcher from './components/LanguageSwitcher'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const { toggle } = useFilterSidebar()
  const { t } = useTranslation('common')

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/" className="app-nav-link">
            {t('nav.home')}
          </Link>
          <Link to="/about" className="app-nav-link">
            {t('nav.about')}
          </Link>
          <Link to="/products" className="app-nav-link">
            {t('nav.products')}
          </Link>
          <button type="button" className="app-nav-button" onClick={toggle}>
            {t('nav.filters')}
          </button>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </nav>
        <FilterSidebar />
        <ToastHost />
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
