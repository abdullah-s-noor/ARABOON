import { Brightness1, Star } from '@mui/icons-material';
import { Box, Button, Divider, Rating, Typography, useTheme } from '@mui/material'
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import styles from './style'
function MangaInfoHeader() {
    const { i18n } = useTranslation();
    const theme = useTheme()
    const [value, setValue] = useState(2)
    const style = styles(theme, i18n)
    const InfoItem = ({ text }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .1 }}>
            <Brightness1 sx={{ color: 'primary.main', fontSize: 18 }} />
            <Typography variant="body2">{text}</Typography>
        </Box>
    );
    return (
        <>
            <Box sx={style.container}>
                {/* Manga image */}
                <Box
                    component={'img'}
                    src='/image/mediaCard/1.jpg'
                    alt='mediaCard'
                    sx={style.mangaImage}
                />
                {/* info section */}
                <Box
                    component={'div'}
                    sx={style.infoSection}
                >
                    {/* Name of Manga and Author and rating and favorite */}
                    <Box component={'div'}
                        sx={style.headerBar}
                    >
                        <Box sx={{ p: 0, m: 0 }}>
                            <Typography sx={style.title}>
                                The Creepy and Freaky
                            </Typography>
                            <Typography sx={style.subtitle}>
                                Masashi Kishimoto / Mikio Ikemoto
                            </Typography>
                        </Box>
                        <Rating
                            name="read-only"
                            value={value}
                            readOnly
                            size="large"
                            emptyIcon={<Star style={{ color: '#a9a9a9' }} fontSize="inherit" />}
                        />
                    </Box>
                    {/* info list about manga */}
                    <Box
                        component={'div'}
                        sx={style.infoGrid}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                            <InfoItem text="Category: Drama, Fantasy, Action" />
                            <InfoItem text="Status: Ongoing" />
                            <InfoItem text="Type: Manga" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <InfoItem text="Published on: July 16, 2025" />
                            <InfoItem text="Updated on: July 16, 2025" />
                        </Box>
                    </Box>
                    {/* Summary of Manga */}
                    <Box component={'div'} sx={{ color: 'text.primary', }}
                    >
                        <Typography sx={style.descriptionTitle}>
                            DESCRIPTION
                        </Typography>
                        <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />
                        <Typography sx={style.descriptionText}>
                            Denji harbors a chainsaw devil within him. The world is introduced to Chainsaw Man, but...?!
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MangaInfoHeader
