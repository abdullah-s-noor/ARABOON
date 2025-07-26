import { Box, Divider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { isMobile, isTablet } from 'react-device-detect'
import { useTranslation } from 'react-i18next';

function ChapterList() {
    const arr = [1, 2, 3, 4]
    const [isPhone, setIsphone] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null)
    const { i18n } = useTranslation();
    useEffect(() => {
        const handlePhoneLayout = () => {
            setIsphone(isMobile || isTablet)
            console.log(isTablet)
        }
        handlePhoneLayout()
    }, [])
    const hoverStyle = {
        '&:hover': {
            background: i18n.language === "en" ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))',
        },
        '&:hover .episode-num': {
            color: '#ffd600',
        },
        '&:hover .episode-name': {
            color: 'inherit',
        },
    }
    const activeStyle = {
        '&:active .episode-num': {
            color: '#ffd600',
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
                }}
            >
                <Typography
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: 16,
                        color: '#bebebe',
                    }}
                >
                    CHAPTER LIST
                </Typography>
                <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: '#bebebe', width: '100%' }} />
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
                                    color: '#bebebe',
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
