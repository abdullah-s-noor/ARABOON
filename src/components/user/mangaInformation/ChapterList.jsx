import { Box, Divider, Typography, useTheme } from '@mui/material'
import useIsPhone from '../../../hooks/usePhone';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

function ChapterList() {
    const arr = [1, 2, 3, 4]
    const {isPhone} = useIsPhone()
    const [selectedIndex, setSelectedIndex] = useState(null)
    const theme = useTheme()
    const { i18n } = useTranslation();

    const hoverStyle = {
        '&:hover': {
            background: i18n.language === "en" ?
                (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
                (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))'),
        },
        '&:hover .episode-num': {
            color: 'primary.main',
        },
        '&:hover .episode-name': {
            color: 'inherit',
        },
    }
    const activeStyle = {
        '&:active .episode-num': {
            color: 'primary.main',
        },
        '&:active .episode-name': {
            color: 'inherit',
        },

    }

    return (
        <>
            {/* chapters list */}
            <Box
                sx={{
                    width: '70%',
                    '@media (max-width:750px)': {
                        width: '100% !important'
                    },
                }}
            >
                <Typography
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: 16,
                        color: 'text.secondary',
                    }}
                >
                    CHAPTER LIST
                </Typography>
                <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />
                {arr.map((item, index) => (

                    <Box
                        key={index}
                        onTouchStart={() => {
                            setSelectedIndex(index);
                        }}

                        sx={{
                            display: 'flex',
                            ...(!isPhone ? hoverStyle
                                :
                                {
                                    ...(activeStyle),
                                    ...(selectedIndex === index &&
                                    {
                                        background: i18n.language === "en" ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))',
                                    }
                                    )
                                }
                            ),
                            cursor: 'pointer',
                            mb: 2,
                            gap: 5

                        }}
                    >
                        {/* chapter image */}
                        <Box
                            component={'img'}
                            src='/image/chapters/10.jpg'
                            alt='chapter'
                            display={'block'}
                            width={{ xs: 120, sm: 200 }}
                        />
                        {/* chapter info */}
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            {/* chapter number */}
                            <Typography
                                className='episode-num'
                                sx={{
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: { xs: '14px', sm: '28px' },
                                    fontWeight: 400
                                }}
                            >
                                #001
                            </Typography>
                            {/* chapter episode */}
                            <Typography
                                className="episode-name"
                                sx={{
                                    fontSize: { xs: 10, sm: 14 },
                                    color: 'text.secondary',
                                }}
                            >
                                Episode 3: Femme Fatale
                            </Typography>
                            {/* chapter released */}
                            <Typography
                                sx={{
                                    fontSize: { xs: 7, sm: 10 },
                                    color: '#a0a0a0',
                                    mt: { xs: .5, sm: 2 },
                                }}
                            >
                                Released: July 20, 2025
                            </Typography>
                        </Box>
                    </Box>
                ))}

            </Box>
        </>
    )
}

export default ChapterList
