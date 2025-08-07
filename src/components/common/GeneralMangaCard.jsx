import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import useIsPhone from '../../hooks/useIsPhone'
import React from 'react'

function GeneralMangaCard({ n }) {
    const isPhone = useIsPhone()
    const style = {
        card: {
            maxWidth: { xs: 100, sm: 150, md: 230 },
            boxShadow: 'none',
            ...(
                isPhone ? {
                    '&:active .title': {
                        color: "primary.main",
                    },
                    '&:active .author': {
                        color: "text.primary",

                    },
                } : {
                    '&:hover .title': {
                        color: "primary.main",
                    },
                    '&:hover .author': {
                        color: "text.primary",

                    },
                }
            ),
            transition: '0.3s',
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
    }
    return (
        <Card
            sx={style.card}>
            <CardActionArea
                sx={style.cardAction}
            >
                <CardMedia
                    component="img"
                    image={`/image/mediaCard/${n}.jpg`}
                    alt="green iguana"
                    sx={style.img}
                />
            </CardActionArea>
            <CardContent sx={{ bgcolor: 'background.default' }}>
                <Typography gutterBottom variant="body1" component="div"
                    sx={style.title}
                    className='title'
                >
                    The Creepy and Freaky
                </Typography>
                <Typography
                    className='author'
                    variant="body2"
                    sx={style.author}
                >
                    Masashi Kishimoto / Mikio Ikemoto
                </Typography>
            </CardContent>
        </Card>
    )
}

export default GeneralMangaCard
