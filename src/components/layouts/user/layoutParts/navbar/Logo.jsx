import { Box, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function Logo() {
    const theme=useTheme()
    const navigate=useNavigate()
    const {i18n}=useTranslation()
  return (
    <>
    <Box
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer", display: "flex", alignItems: "center", position: "relative" }}
      aria-label="Home"
    >
      <img
        src={`/image/logo/${theme.palette.mode === "dark" ? 6 : 5}.png`}
        alt="Logo"
        style={{ height: 64, marginRight: 8 }}
      />
      <img
        src="/image/logo/7.gif"
        alt="Animated Logo"
        style={{
          height: 55,
          position: "absolute",
          bottom: 0,
          ...(i18n.language === "ar" && { left: 0 })
        }}
      />
    </Box>
    </>
  )
}

export default Logo
