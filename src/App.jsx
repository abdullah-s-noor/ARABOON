import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
function App() {
  const [themeMode, setThemeMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
      primary: {
        main: themeMode ? "#ffffff" : "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
      background: {
        default: themeMode ? "#000000" : "#ffffff",
        paper: "#ffffff",
      }
    },
  });
  const handleThemeMode = () => {
    setThemeMode(!themeMode);
  };
  const { i18n } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [lng]);

  return (
    <>
      <ThemeProvider theme={theme}>
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
          theme={themeMode ? "dark" : "light"}
        />
        <CssBaseline />
        <RouterProvider router={router} />
        {/* <Button onClick={handleThemeMode} color="primary" variant="contained">
          {themeMode ? "change to Light Mode" : "change to Dark Mode"}
        </Button> */}
      </ThemeProvider>
    </>
  );
}


export default App
