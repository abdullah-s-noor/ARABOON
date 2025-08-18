import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { Fragment, use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import useIsPhone from '../../../hooks/usePhone';
function LibraryHeader({ librarySection, setLibrarySection, sections }) {
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const { isPhone } = useIsPhone()

  const style = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    headerWrapper: {
      p: '30px 50px 30px 25px',
      background: i18n.language === "en" ?
        (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
        (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
      display: 'flex',
      '@media (max-width:600px)': {
        pr: '25px',
        justifyContent: 'center'
      },
      flexWrap: 'wrap',
      gap: { sm: 4 },
    },
    headerTitle: {
      fontFamily: '"Open Sans",sans-serif,Cairo',
      color: 'text.primary',
      fontSize: { xs: '22px', sm: '25px' },
      fontWeight: 'bold',

    },
    link: {
      color: 'inherit',
      fontFamily: '"Roboto", sans-serif',
      fontSize: "14px"
    },
    tabsBoxOuter: {
      p: 0,
      background:
        theme.palette.mode === 'dark'
          ? ({
            xs: 'linear-gradient(90deg, rgba(220, 9, 20, .2) 0%, rgba(220, 9, 20, 0.5) 50%, rgba(220, 9, 20, .2) 100%)',
          })
          : ({
            xs: `linear-gradient(90deg,rgba(12, 112, 222, .2)0%, rgba(12, 112, 222, 0.5)50%, rgba(12, 112, 222, .2)100%)`,
          }),
    },
    tabsBoxInner: {
      margin: 'auto',
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      flexWrap: "wrap",
      justifyContent: 'center'
    },
    tabButton: {
      color: 'text.secondary',
      ":disabled": {
        color: '#ffd600'
      },
      px: { xs: 0, sm: "8px" },
      fontFamily: '"Open Sans",sans-serif,Cairo',
      fontSize: { xs: '13px', sm: '18px' },
      fontWeight: 'bold',
      textTransform: 'none',
      transition: '.3s ease',
      '&:hover': {
        backgroundColor: 'transparent',// to delete the hover
      },

    },
    breakLine: {
      '@media (max-width:600px)': {
        display: 'block',
        width: '100%',
        height: '8px'
      },
    }
  }

  return (
    <Box component={'div'} sx={style.container}>
      <Box component={'div'} sx={style.headerWrapper}>
        <Typography
          sx={style.headerTitle}>
          {t("library")}
        </Typography>
        <Box sx={{ ...(style.breakLine) }} />
        <Box sx={{ display: 'flex', alignItems: "center", pt: "8px" }}>
          <Link to="/" style={style.link}>{t("home").toLowerCase()}</Link>
          {i18n.language === "en" ? <KeyboardArrowRight sx={{ display: 'block', fontSize: '20px' }} /> : <KeyboardArrowLeft sx={{ display: 'block', fontSize: '20px' }} />}
          <Link to="" style={style.link}>{t(librarySection).toLowerCase()}</Link>
        </Box>
      </Box>
      <Box
        sx={style.tabsBoxOuter}>
        <Box
          sx={style.tabsBoxInner}
        >
          {
            sections.map((section, index) => (
              <Fragment key={index}>
                {index === 3 && (
                  <Box sx={{ ...(style.breakLine) }} />
                )
                }
                {index > 0 && <Typography component={'span'}
                  sx={{
                    ...(index === 3 && {
                      '@media (max-width:600px)': {
                        display: 'none'
                      },
                    }),
                    margin: '0 8px',
                    color: 'text.secondary'
                  }}>|
                </Typography>}
                <Button
                  onClick={() => {
                    localStorage.setItem("librarySection", section)
                    setLibrarySection(section)
                  }}
                  disabled={librarySection === section}
                  sx={{
                    ...style.tabButton,
                    ...(isPhone ? {
                      ":active": { color: section !== librarySection && 'text.primary', }
                    } : {
                      ":hover": { color: section !== librarySection && 'text.primary', }
                    }
                    )
                  }}>{t(section.toLowerCase())}
                </Button>
              </Fragment>

            ))
          }
        </Box>
      </Box>


    </Box>
  )
}

export default LibraryHeader
