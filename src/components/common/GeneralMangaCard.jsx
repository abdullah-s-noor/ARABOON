import { Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import useIsPhone from '../../hooks/usePhone'
import React, { useState } from 'react'
import { BookmarkRemove, Delete } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'

function GeneralMangaCard({ mangaData, setSelectedForDeletion = null }) {
    const { isPhone } = useIsPhone()
    const location = useLocation();
    //for library page
    const isLibraryPage = location.pathname.startsWith('/library')
    //style
    const style = {
        card: {
            position: "relative",
            maxWidth: { xs: 100, sm: 150, md: 230 },
            boxShadow: "none",
            transition: "0.3s",
            ...(isPhone
                ? {
                    "&:active .MuiTypography-root.title": {
                        color: "primary.main",
                    },
                    "&:active .MuiTypography-root.author": {
                        color: "text.primary",
                    },
                    "&:active .delete-btn": { opacity: 1 }, // 📱 على الموبايل يظهر بالضغط
                }
                : {
                    "&:hover .MuiTypography-root.title": {
                        color: "primary.main",
                    },
                    "&:hover .MuiTypography-root.author": {
                        color: "text.primary",
                    },
                    "&:hover .delete-btn": { opacity: 1, display: isLibraryPage && 'flex' }, // 🖥️ على الكمبيوتر يظهر بالهوفر
                }),

        },
        cardAction: {
            transition: '0.3s',
            ...(isPhone ? {
                '&:active': {
                    filter: 'brightness(.6)',
                },
            } : {
                '&:hover': {
                    filter: 'brightness(.6)',
                },
            })
        },
        img: {
            ...(isPhone ? {
                '&:active': {
                    transform: "scale(1.02)",
                },
            } : {
                '&:hover': {
                    transform: "scale(1.02)",
                },
            }),

            transition: '.3s'

        },
        title: {
            fontFamily: '"Open Sans",sans-serif,Cairo',
            textAlign: 'center',
            fontSize: { xs: 12, sm: 18, md: 18 },
            fontWeight: 'bold'
        },
        author: {
            color: 'text.secondary', textAlign: 'center',
            fontSize: { xs: 10, sm: 13 }
        },
        BookMark: {
            display: 'none',
            position: "absolute",
            top: 8,
            right: 8,
            opacity: 0, // مخفي افتراضياً
            transition: "opacity 0.2s ease",
            bgcolor: "error.main",
            color: "error.contrastText",
            "&:hover": {
                bgcolor: "error.dark",
            },
            zIndex: 10,
        }
    }
    return (
        <>
            <Card sx={style.card}>
                <IconButton size="small" color="error" className="delete-btn"
                    onClick={() => { setSelectedForDeletion(mangaData) }}
                    sx={style.BookMark}

                >
                    <Delete fontSize="small" />
                </IconButton>

                <CardActionArea
                    sx={style.cardAction}
                >
                    <CardMedia
                        component="img"
                        image={mangaData.mangaImageUrl}
                        alt="green iguana"
                        sx={style.img}
                    />
                </CardActionArea>
                <CardContent sx={{ bgcolor: 'background.default' }}>
                    <Typography gutterBottom variant="body1" component="div"
                        sx={style.title}
                        className='title'
                    >
                        {mangaData.mangaName}
                    </Typography>
                    <Typography
                        className='author'
                        variant="body2"
                        sx={style.author}
                    >
                        {mangaData.authorName}
                    </Typography>
                </CardContent>
            </Card>
        </>

    )
}

export default GeneralMangaCard

