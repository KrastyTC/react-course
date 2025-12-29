import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-button ${i18n.language === 'he' ? 'active' : ''}`}
        onClick={() => changeLanguage('he')}
      >
        HE
      </button>
    </div>
  )
}

export default LanguageSwitcher

