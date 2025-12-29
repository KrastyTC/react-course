import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import enProducts from './locales/en/products.json'
import heCommon from './locales/he/common.json'
import heProducts from './locales/he/products.json'

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = (): string => {
  try {
    const saved = localStorage.getItem('i18nextLng')
    return saved || 'en'
  } catch {
    return 'en'
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        products: enProducts,
      },
      he: {
        common: heCommon,
        products: heProducts,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    lng: getSavedLanguage(),
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

// Function to set document direction and lang
const setDocumentDirection = (lng: string) => {
  const html = document.documentElement
  if (lng === 'he') {
    html.dir = 'rtl'
    html.lang = 'he'
  } else {
    html.dir = 'ltr'
    html.lang = 'en'
  }
}

// Set RTL direction when language changes
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng)
  localStorage.setItem('i18nextLng', lng)
})

// Apply RTL on initial load
setDocumentDirection(i18n.language)

export default i18n

