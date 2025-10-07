import { Brightness1, Comment, Star } from '@mui/icons-material';
import { Badge, Box, Button, Divider, Rating, Typography, useTheme } from '@mui/material'
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import styles from './style'
import { Star as S } from 'lucide-react';
import MangaCommentIcon from './MangaCommentIcon';
import { toast } from 'react-toastify';
function MangaInfoHeader({ mangaInfo }) {
    const { t, i18n } = useTranslation();
    const theme = useTheme()
    const style = styles(theme, i18n)
    console.log(mangaInfo)
    const [rating, setRating] = useState({ avgRate: mangaInfo.rate, myRate: 0 })
    const InfoItem = ({ text }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .1 }}>
            <Brightness1 sx={{ color: 'primary.main', fontSize: 18 }} />
            <Typography variant="body2">{text}</Typography>
        </Box>
    );
    const handleRate = (newValue) => {
        setRating(prev => ({ ...prev, myRate: newValue }))
        toast.success("Thanks for your feedback.")
    }
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
                            <Typography sx={{ ...style.title, display: 'flex', alignItems: 'center', gap: 1 }}>
                                {mangaInfo.mangaName}
                                <MangaCommentIcon count={mangaInfo.commentsCount} />
                            </Typography>
                            <Typography sx={style.subtitle}>
                                {mangaInfo.author}
                            </Typography>

                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, border: "none" }}>
                            <S fill="#faaf00" stroke="#faaf00" />
                            <Typography variant="body1" color="text.secondary">4.5</Typography>
                        </Box>
                    </Box>
                    {/* info list about manga */}
                    <Box
                        component={'div'}
                        sx={style.infoGrid}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* <InfoItem text="Category: Drama, Fantasy, Action" /> */}
                            <InfoItem text={t("categories") + ':' + mangaInfo.categories.map((category, index) => { return (' ' + category) })} />

                            <InfoItem text={t("status") + ": " + mangaInfo.status} />
                            <InfoItem text={t("type") + ": " + mangaInfo.type} />
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
                    {/* my rate */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography sx={style.descriptionText}>
                            Tap to Rate:
                        </Typography>
                        <Rating
                            name="user-rate"
                            precision={0.5}
                            value={rating.myRate}
                            onChange={(e, newValue) => {
                                if (newValue !== null) handleRate(newValue);
                            }}
                            emptyIcon={<Star style={{ color: '#a9a9a9' }} fontSize="inherit" />}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MangaInfoHeader
