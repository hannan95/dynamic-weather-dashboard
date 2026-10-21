import { useState } from 'react'
import Home from './pages/Home'
import Nav from './components/Nav'
import { WeatherContext } from './contexts/weatherContext.jsx'

function App() {
  const [isCelcius, setIsCelcius] = useState(true)

  return (
    <WeatherContext.Provider value={{ isCelcius, setIsCelcius }}>
      <Nav />
      <Home />
    </WeatherContext.Provider>
  )
}

export default App