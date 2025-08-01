import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Theme from "./services/theme.js";
import { ThemeModeContext } from "./context/darkMode.jsx";
function App() {
  const {darkMode,toggleDarkMode}=useContext(ThemeModeContext);
  const { i18n } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [lng]);

  return (
    <>
      <ThemeProvider theme={Theme(darkMode)}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}


export default App
