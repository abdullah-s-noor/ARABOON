import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./utils/i18n.js"; 
import ThemeModeContextProvider from './context/darkMode.jsx';
import UserContextProvider from "./context/UserContext.jsx"

createRoot(document.getElementById('root')).render(
  <>
    <UserContextProvider>
    <ThemeModeContextProvider>
    <App />
    </ThemeModeContextProvider>
    </UserContextProvider>
  </>,
)
