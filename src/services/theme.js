import { createTheme } from "@mui/material";

const theme = (darkMode, direction) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#b71c1c' : '#0c70de', // Red in dark, Blue in light
      },
      secondary: {
        main: darkMode ? '#191919' : '#d7dad8', // BG of all pages
      },
      // @ts-ignore
      thirdly: {
        main: darkMode ? '#d32f2f' : '#5aa1f0'
      },
      background: {
        default: darkMode ? '#191919' : '#d7dad8', // Page background
        paper: darkMode ? '#000000' : '#ffffff',   // Cards, modals, etc.
      },
      text: {
        primary: darkMode ? '#eeeeee' : '#000000',
        secondary: darkMode ? '#bebebe' : '#444444',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

export default theme