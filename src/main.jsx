import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CountProvider } from './context/CountProvider'
import { LoaderProvider } from './context/LoaderProvider'



import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthProvider'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <CountProvider>
          <App />
        </CountProvider>
      </LoaderProvider>
    </AuthProvider>
  </StrictMode>
)
