import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./utils/i18n.js"; 
import ThemeModeContextProvider from './context/darkMode.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeContextProvider>
    <App />
    </ThemeModeContextProvider>
  </StrictMode>,
)
