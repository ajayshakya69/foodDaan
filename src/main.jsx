import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CountProvider } from './context/countProvider'



import App from './App'
import './index.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </StrictMode>
)
