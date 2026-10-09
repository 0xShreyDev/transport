import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Hero from './Hero'
import Services from './Services'
import Testimonials from './Testimonial'
import Footer from './Footer'
import { translateMany } from '../utils/freeTranslate'

const defaultTexts = {
  heroTitle: "Welcome to Ten Transport",
  heroSubtitle: "Reliable transportation at your fingertips",
  servicesTitle: "Our Services",
  testimonialsTitle: "What our clients say",
  footerText: "© 2025 Ten Transport. All rights reserved."
}

const Home = () => {
  const { language, setLoading } = useOutletContext() // ✅ get language from context
  const [texts, setTexts] = useState(defaultTexts)

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true)
      if (language === 'en') {
        setTexts(defaultTexts)
        setLoading(false)
        return
      }
      try {
        const keys = Object.keys(defaultTexts)
        const values = Object.values(defaultTexts)
        const translated = await translateMany(values, language, 'en')
        const newTexts = {}
        keys.forEach((key, idx) => {
          newTexts[key] = translated[idx] || defaultTexts[key]
        })
        setTexts(newTexts)
      } catch {
        setTexts(defaultTexts)
      } finally {
        setLoading(false)
      }
    }

    fetchTranslations()
  }, [language, setLoading])

  return (
    <div>
      <Hero language={language} />
      <Services language={language} />
      <Testimonials language={language} />
      <Footer language={language} />
    </div>
  )
}

export default Home
