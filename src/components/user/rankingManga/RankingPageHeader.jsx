import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function RankingPageHeader() {
    const { i18n, t } = useTranslation()
    const theme = useTheme()

    const styles = (theme, i18n) => ({
        headerWrapper: {
            p: '30px 50px 30px 25px',
            background: i18n.language === "en" ?
                (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
                (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
            display: 'flex',
            '@media (max-width:600px)': {
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
        breakLine: {
            '@media (max-width:600px)': {
                display: 'block',
                width: '100%',
                height: '8px'
            },
        }

    })
    const style = styles(theme, i18n)
    return (
        <Box component={'div'} sx={style.headerWrapper}>
            <Typography
                sx={style.headerTitle}>
                {t("ranking")}
            </Typography>
            <Box sx={{ ...(style.breakLine) }} />
            <Box sx={{ display: 'flex', alignItems: "center", pt: "8px" }}>
                <Link to="/" style={style.link}>{t("home").toLowerCase()}</Link>
                {i18n.language === "en" ? <KeyboardArrowRight sx={{ display: 'block', fontSize: '20px' }} /> : <KeyboardArrowLeft sx={{ display: 'block', fontSize: '20px' }} />}
                <Link to="/manga-ranking" style={style.link}>{t("ranking").toLowerCase()}</Link>
            </Box>
        </Box>
    )
}

export default RankingPageHeader
