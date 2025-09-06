import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchProvider from './components/SearchContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>

    <App />
    </SearchProvider>
  </StrictMode>,
)
