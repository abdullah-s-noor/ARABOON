import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next';
import GenreDialog from '../dialog/GenreDialog';
import SortDialog from '../dialog/SortDialog';
import useIsPhone from '../../../hooks/useIsPhone';

function MangaHeader({ status, setStatus, selectedGenre, setSelectedGenre, selectedSort, setSelectedSort }) {
    const { i18n } = useTranslation();
    const theme = useTheme()
    const isPhone = useIsPhone()
    const styles = (theme, i18n) => ({
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        },
        headerWrapper: {
            display: 'flex',
            alignItems: 'center',
            '@media (max-width:650px)': {
                alignItems: 'stretch',
                flexDirection: 'column',
                alignContent: 'center',

            },
        },
        headerTitle: {
            fontFamily: '"Open Sans",sans-serif,Cairo',
            color: 'text.primary',
            fontSize: { xs: '18px', md: '22px' },
            fontWeight: 'bold',
            textAlign: { sm: 'start' },
            '@media (max-width:650px)': {
                textAlign: 'center'
            },
            p: { xs: '20px', sm: '30px' },
            flexGrow: 1,
            background: i18n.language === "en" ?
                (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
                (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
        },
        tabsBoxOuter: {
            p: { xs: '0px', sm: i18n.language === "en" ? '0px 15px 0px 100px' : '0px 100px 0px 15px' },
            background:
                theme.palette.mode === 'dark'
                    ? ({
                        xs: 'linear-gradient(90deg, rgba(220, 9, 20, .2) 0%, rgba(220, 9, 20, 0.5) 50%, rgba(220, 9, 20, .2) 100%)',
                        sm: `linear-gradient(${i18n.language === "en" ? 270 : 90}deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))`
                    })
                    : ({
                        xs: `linear-gradient(90deg,rgba(12, 112, 222, .2)0%, rgba(12, 112, 222, 0.5)50%, rgba(12, 112, 222, .2)100%)`,
                        sm: `linear-gradient(${i18n.language === "en" ? 270 : 90}deg, rgba(12, 112, 222, 0.5), rgba(12, 112, 222, 0))`,
                    }),
        },
        tabsBoxInner: {
            margin: 'auto',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
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
        filtersContainer: {
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
        },
        filterBtn: {
            textTransform: 'none',
            p: '2px 10px',
            color: 'text.primary',
            borderColor: 'text.primary',
            borderRadius: '15px',

        },
    })
    const style = styles(theme, i18n)
    const tabs = [
        { tab: 'Ongoing', value: 'ongoing' },
        { tab: 'Completed', value: 'completed' },
        { tab: 'One-shot', value: 'one-shot' }
    ]
    const [openGenre, setOpenGenre] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    return (
        <>
            <GenreDialog open={openGenre} setOpen={setOpenGenre} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
            <SortDialog open={openSort} setOpen={setOpenSort} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            <Box
                component={'div'}
                sx={style.container}
            >
                <Box
                    component={'div'}
                    sx={style.headerWrapper}
                >
                    <Typography
                        sx={style.headerTitle}>
                        Manga List
                    </Typography>
                    <Box
                        sx={style.tabsBoxOuter}>
                        <Box
                            sx={style.tabsBoxInner}
                        >

                            {
                                tabs.map(({ tab, value }, index) => (
                                    <Fragment key={index}>
                                        {index > 0 && <Typography component={'span'} sx={{ margin: '0 8px', color: 'text.secondary' }}>|</Typography>}
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
                <Box
                    component={'div'}
                    sx={style.filtersContainer}
                >
                    <Button
                        variant="outlined"
                        sx={{ ...style.filterBtn, color: selectedGenre !== "all" ? "primary.main" : "text.primary", borderColor: selectedGenre !== "all" ? "primary.main" : "text.primary" }}
                        onClick={() => {
                            setOpenGenre(true)
                        }}>
                        {selectedGenre === "all" ? 'Filter' : selectedGenre} <KeyboardArrowDown fontSize='small' sx={{ ml: .5 }} />
                    </Button>
                    <Button

                        variant="outlined"
                        onClick={() => {
                            setOpenSort(true)
                        }}
                        sx={{ ...style.filterBtn, mr: 2 }}>
                        {selectedSort.value} <KeyboardArrowDown fontSize='small' sx={{ ml: .5 }} />
                    </Button>
                </Box>
            </Box>

        </>
    )
}

export default MangaHeader
