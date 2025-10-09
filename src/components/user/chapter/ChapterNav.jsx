import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ChapterSelector from './ChapterSelector';
import LanguageIcon from './LanguageIcons';
import LanguageSelector from './LanguageSelector';

function ChapterNav() {
  const sm = useMediaQuery('(min-width:600px)');
  const theme = useTheme()
  const { i18n } = useTranslation()
  const Logo = () => (<Box sx={{ display: "flex", alignItems: "center", position: 'relative' }}>
    <img src={`/image/logo/${theme.palette.mode === 'dark' ? 6 : 5}.png`} alt="Logo" style={{ height: sm ? 96 : 64, marginRight: 8 }} />
    <img src="/image/logo/7.gif" style={{ height: sm ? 82.5 : 55, position: 'absolute', bottom: '0', ...(i18n.language === 'ar' && { left: 0 }) }} />
  </Box>)
  return (
    <Box
    navbar-name="chapter-nav" 
      sx={{
        position:"absolute",
        width:"100%",
        top:"0px",
        borderTop: `10px solid ${theme.palette.primary.main}`,
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        transition:"transform .3s ease"
      }}//122 90
    >
      {/* Left: Logo + Text + Chapter Selector */}
      {sm ? <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Logo />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            sx={{
              fontFamily: '"Roboto", sans-serif',
              color: '#eeeeee',
              fontSize: { xs: '24px', md: '28px' },
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            Demon Slayer
          </Typography>
          <ChapterSelector />
        </Box>
      </Box> :
        <>
          <Logo />
          <ChapterSelector />
        </>
      }

      {/* Right: Language Icon */}
      <LanguageSelector />
    </Box>

  )
}

export default ChapterNav
