import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Theme from "./services/theme.js";
import { ThemeModeContext } from "./context/darkMode.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Toast.css";
import { UserContext } from "./context/UserContext.jsx";
import LogoLoader from "./components/common/LogoLoader.jsx";

function App() {
  const { darkMode } = useContext(ThemeModeContext);
  const { i18n } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  const { contextLoading } = useContext(UserContext);

  const [showLoader, setShowLoader] = useState(true);
  const [index, setIndex] = useState(0);

  const interval = 700; // 1 seconds

  // Set direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [lng, i18n]);

  // Control loader visibility timing
  useEffect(() => {
    let hideTimer;
    if (contextLoading) {
      setShowLoader(true);
    } else {
      // wait for the interval duration before hiding loader
      hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, interval);
    }
    return () => clearTimeout(hideTimer);
  }, [contextLoading, interval]);

  // Optional: rotating logos or texts
  useEffect(() => {
    if (showLoader) {
      const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % 3);
      }, interval);
      return () => clearInterval(id);
    }
  }, [showLoader, interval]);

  // ✅ Keep showing loader even after contextLoading finishes until timeout
  if (showLoader) {
    return (
      <ThemeProvider theme={Theme(darkMode)}>
        <CssBaseline />
        <LogoLoader  />
      </ThemeProvider>
    );
  }

  // ✅ Main App after loader finishes
  return (
    <ThemeProvider theme={Theme(darkMode)}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        rtl={i18n.dir() === "rtl"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="professional-toast"
        progressClassName="professional-toast-progress"
        style={{ fontSize: "14px", fontFamily: "inherit" }}
      />
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
