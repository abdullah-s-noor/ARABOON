import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router.jsx"
import { ToastContainer } from "react-toastify"
import { useContext, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Cookies from "js-cookie"
import Theme from "./services/theme.js"
import { ThemeModeContext } from "./context/darkMode.jsx"
import "react-toastify/dist/ReactToastify.css"
import "./styles/Toast.css"
import{ UserContext } from "./context/UserContext.jsx"

function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext)
  const { i18n } = useTranslation()
  const lng = Cookies.get("i18next") || "en"
  const {contextLoading}=useContext(UserContext)
  useEffect(() => {
  document.documentElement.dir = i18n.dir()
}, [lng])
  if (contextLoading) {
    return
  }

  return (
    <>
      <ThemeProvider theme={Theme(darkMode)}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={i18n.dir() === "rtl"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          toastClassName="professional-toast"
          progressClassName="professional-toast-progress"
          style={{
            fontSize: "14px",
            fontFamily: "inherit",
          }}
        />
        <CssBaseline />
        
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
