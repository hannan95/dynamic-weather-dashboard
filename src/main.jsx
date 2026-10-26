import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/Index.css'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <App />
    </ReactLenis>

  </StrictMode>,
)
