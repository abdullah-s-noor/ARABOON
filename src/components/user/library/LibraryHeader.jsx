import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import useIsPhone from '../../../hooks/usePhone';
function LibraryHeader() {
  const { i18n,t } = useTranslation()
  const theme = useTheme()
  const {isPhone} = useIsPhone()
  const [status, setStatus] = useState('favorited')
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
        justifyContent:'center'
      },
      flexWrap:'wrap',
      gap: {sm:4},
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
      fontFamily: '"Open Sans",sans-serif,Cairo',
      fontSize: { xs: '15px', sm: '18px' },
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
  const tabs = [
    { tab: t('favorited'), value: 'favorited' },
    { tab: t('completed'), value: 'completed' },
    { tab: t('reading'), value: 'reading' },
    { tab: t('later'), value: 'later' },
    { tab: t('notifications'), value: 'notifications' },
  ]
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
          {i18n.language==="en"?<KeyboardArrowRight sx={{ display: 'block', fontSize: '20px' }} />:<KeyboardArrowLeft sx={{ display: 'block', fontSize: '20px' }} />}
          <Link to="" style={style.link}>{t(status).toLowerCase()}</Link>
        </Box>
      </Box>
      <Box
        sx={style.tabsBoxOuter}>
        <Box
          sx={style.tabsBoxInner}
        >
          {
            tabs.map(({ tab, value }, index) => (
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
                    setStatus(value)
                    localStorage.setItem("status", value)
                  }}
                  disabled={status === value}
                  sx={{
                    ...style.tabButton,
                    ...(isPhone ? {
                      ":active": { color: value !== status && 'text.primary', }
                    } : {
                      ":hover": { color: value !== status && 'text.primary', }
                    }
                    )
                  }}>{tab}
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
