import { Whatshot } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material'
import useIsPhone from '../../../hooks/usePhone'
import React, { useEffect } from 'react'

function RankingPageCard({ mangaData,rate }) {
    const {isPhone} = useIsPhone()
    const theme = useTheme()
    const style = {
        card: {
            maxWidth: { xs: 120, sm: 170, md: 200, lg: 230 },
            p: { xs: '5px', sm: '10px' },
            bgcolor: 'secondary.main',
            background: (theme.palette.mode === 'dark' ? 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(220,9,20,0))'
                : 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
            boxShadow: 'none',
            ...(
                isPhone ? {
                    '&:active .title': {
                        color: "primary.main",
                    },
                    '&:active .author': {
                        color: "text.primary",

                    },
                    '&:active': {
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(180deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))' :
                            'linear-gradient(180deg, rgba(12, 112, 222, 0.5), rgba(12, 112, 222, 0))',
                    },
                    '&:active .image': {
                        transform: 'translateY(-2px)',

                    }

                } : {
                    '&:hover .title': {
                        color: "primary.main",
                    },
                    '&:hover .author': {
                        color: "text.primary",

                    },
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(180deg, rgba(220, 9, 20, 0.5), rgba(220, 9, 20, 0))' :
                            'linear-gradient(180deg, rgba(12, 112, 222, 0.5), rgba(12, 112, 222, 0))',
                    },
                    '&:hover .image': {
                        transform: 'translateY(-4px)',

                    }
                }

            ),
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform .25s, box-shadow .25s',
            borderRadius: '10px',

        },
        img: {
            display: 'block',
            borderRadius: '10px',
            transition: '.2s ease'
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
            sx={style.card}
        >
            <CardMedia
                component="img"
                image={mangaData.mangaImageUrl}
                alt="green iguana"
                sx={style.img}
                className='image'
            />
            <CardContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 1,
                        py: 0.6,//'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'
                    }}
                >
                    {[1, 2, 3].includes(rate) ? (
                            <Box
                                component={'img'}
                                src={`/image/medal/${rate}.svg`}
                                sx={{
                                    width: { xs: '20px', sm: '30px' },
                                }}
                            />
                        ) : (
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 16 } }}>
                        #{rate}
                    </Typography>
                        )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs:0.2,sm:0.6} }}>
                        <Whatshot sx={{ fontSize: {xs:12,sm:18} }} />
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: 12, sm: 14 } }}>
                            {mangaData.popularityScore}
                        </Typography>
                    </Box>
                </Box>
                <Typography gutterBottom variant="body1" component="div"
                    className='title'
                    sx={style.title}
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
    )
}

export default RankingPageCard
