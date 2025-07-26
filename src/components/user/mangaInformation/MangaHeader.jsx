import { Star } from '@mui/icons-material';
import { Box, Divider, Rating, Typography } from '@mui/material'
import { useState } from 'react';
import { useTranslation } from 'react-i18next'

function MangaHeader() {
    const { i18n } = useTranslation();
    const [value, setValue] = useState(2)
    return (
        <>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    '@media (max-width:750px)': {//the tablet upper than 750px that mean this for phone
                        flexDirection: 'column'
                    },
                    gap: 5,
                    position: 'relative'
                }}
            >
                {/* Manga image */}
                <Box
                    component={'img'}
                    src='/image/mediaCard/1.jpg'
                    alt='mediaCard'
                    sx={{
                        display: 'block',
                        maxWidth: { xs: 290, sm: 300 },
                        margin: 'auto'
                    }}
                />
                {/* <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 230,
                        width: 0,
                        height: 0,
                        borderRight: '70px solid white',
                        borderBottom: '70px solid transparent',

                    }}
                />
                
                <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    size="large"
                    emptyIcon={<Star style={{ color: '#a9a9a9' }} fontSize="inherit" />}

                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        p: '4px 8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // خلفية سوداء شفافة

                    }}
                /> */}
                {/* manga discreption */}
                <Box
                    component={'div'}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 2, md: 4 }
                    }}
                >
                    {/* Name of Manga and Author */}
                    <Box component={'div'}
                        sx={{
                            background: i18n.language === "en" ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))',
                            padding: '20px 20px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Open Sans",sans-serif,Cairo',
                                color: '#eee',
                                fontSize: { xs: '25px', md: '28px' },
                                fontWeight: 'bold',

                            }}
                        >
                            The Creepy and Freaky
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                color: '#bebebe',
                                fontFamily: '"Roboto", sans-serif',
                                fontOpticalSizing: 'auto',
                                fontWeight: 400,
                                textTransform: 'uppercase',

                            }}
                        >
                            Masashi Kishimoto / Mikio Ikemoto
                        </Typography>
                    </Box>
                    {/* info list about manga */}
                    <Box
                        component={'div'}
                        sx={{
                            display: 'flex',
                            gap: 5,
                            color: '#bebebe'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography>🔴Category: Drama, Fantasy, Action</Typography>
                            <Typography>🔴Status: Ongoing</Typography>
                            <Typography>🔴Type: Manga</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography>🔴Published on: July 16, 2025</Typography>
                            <Typography>🔴Updated on: July 16, 2025</Typography>
                        </Box>
                    </Box>
                    {/* Summary of Manga */}
                    <Box component={'div'}
                        sx={{
                            color: '#eee',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '20px',
                                fontWeight: 'bold',

                            }}
                        >
                            DESCRIPTION
                        </Typography>
                        <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: '#bebebe', width: '100%' }} />
                        <Typography
                            sx={{
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: { xs: '14', md: '18px' }
                            }}
                        >
                            Denji harbors a chainsaw devil within him. The world is introduced to Chainsaw Man, but...?!
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MangaHeader
