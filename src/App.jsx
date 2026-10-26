import { useState } from 'react'
import Home from './pages/Home'
import Nav from './components/Nav'
import { WeatherContext } from './contexts/weatherContext.jsx'
import Footer from './components/Footer.jsx'
import 'lenis/dist/lenis.css'

function App() {
  const [isCelcius, setIsCelcius] = useState(true)

  return (
    <WeatherContext.Provider value={{ isCelcius, setIsCelcius }}>
      
      <Nav />
      <Home />
      <Footer/>
    </WeatherContext.Provider>
  )
}

export default App