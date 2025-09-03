import { Brightness1, Star } from '@mui/icons-material';
import { Box, Button, Divider, Rating, Typography, useTheme } from '@mui/material'
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import styles from './style'
function MangaInfoHeader({ mangaInfo }) {
    const { t,i18n } = useTranslation();
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
                    src={mangaInfo.mangaImageUrl}
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
                                {mangaInfo.mangaName}
                            </Typography>
                            <Typography sx={style.subtitle}>
                                {mangaInfo.author}
                            </Typography>
                        </Box>
                        <Rating
                            name="read-only"
                            value={mangaInfo.rate}
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
                            {/* <InfoItem text="Category: Drama, Fantasy, Action" /> */}
                            <InfoItem text={t("categories")+':'+mangaInfo.categories.map((category, index) => { return (' '+category) })} />

                            <InfoItem text={t("status")+": "+mangaInfo.status} />
                            <InfoItem text={t("type")+": "+mangaInfo.type} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <InfoItem text={t("published_on") + ": " + mangaInfo.publishedOn} />
                            <InfoItem text={t("updated_on") + ": " + mangaInfo.updatedOn} />
                        </Box>
                    </Box>
                    {/* Summary of Manga */}
                    <Box component={'div'} sx={{ color: 'text.primary', }}
                    >
                        <Typography sx={style.descriptionTitle}>
                            {t('description')}
                        </Typography>
                        <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />
                        <Typography sx={style.descriptionText}>
                            {mangaInfo.description}
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MangaInfoHeader
