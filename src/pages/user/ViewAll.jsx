import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import usePaginatedMangaList from '../../hooks/usePaginatedMangaList'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GeneralPreviewCards from '../../components/common/GeneralPreviewCards'

function ViewAll() {
    const { i18n, t } = useTranslation()
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const categoryName = location?.state?.categoryName
    const baseUrl = `/Manga/GetMangaByCategoryName?category=${categoryName.en}`
    const { mangas, setMangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl });
    useEffect(() => {
        if (!categoryName) {
            navigate('/not-found')
        }
    }, [location])
    useEffect(() => {
        const fetchData = async () => {
            fetchMangas(1);
            setPageNumber(1);
        }
        fetchData();
    }, [i18n.language])
    const style = {
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
        breakLine: {
            '@media (max-width:600px)': {
                display: 'block',
                width: '100%',
                height: '8px'
            },
        }
    }
    return (
        <>
            <Box component={'div'} sx={style.headerWrapper}>
                <Typography
                    sx={style.headerTitle}>
                    {t("view_all")}
                </Typography>
                <Box sx={{ ...(style.breakLine) }} />
                <Box sx={{ display: 'flex', alignItems: "center", pt: "8px" }}>
                    <Link to="/" style={style.link}>{t("home").toLowerCase()}</Link>
                    {i18n.language === "en" ? <KeyboardArrowRight sx={{ display: 'block', fontSize: '20px' }} /> : <KeyboardArrowLeft sx={{ display: 'block', fontSize: '20px' }} />}
                    <Link to="" style={style.link}>{categoryName?.[i18n.language]}</Link>
                </Box>
            </Box>
            <GeneralPreviewCards mangas={mangas} loading={loading} pageNumber={pageNumber}
                count={count} setPageNumber={setPageNumber} hasNextPage={hasNextPage} pageSize={pageSize} />

        </>
    )
}

export default ViewAll
