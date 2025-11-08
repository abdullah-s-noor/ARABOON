import { Brightness1, Comment, Star } from '@mui/icons-material';
import { Badge, Box, Button, Divider, Rating, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next'
import styles from './style'
import { Star as S } from 'lucide-react';
import MangaCommentIcon from './MangaCommentIcon';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { UserContext } from '../../../context/UserContext';
import { useLocation } from 'react-router-dom';
function MangaInfoHeader({ mangaInfo }) {
    const { t, i18n } = useTranslation();
    const theme = useTheme()
    const style = styles(theme, i18n)
    const isAdmin=useLocation().pathname.startsWith("/dashboard")
    console.log(isAdmin)
    const [rating, setRating] = useState({ avgRate: mangaInfo.rate, myRate: mangaInfo.myRate, myRateID: mangaInfo.myRateID })
    const { userToken } = useContext(UserContext)
    console.log(rating)
    const InfoItem = ({ text }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .1 }}>
            <Brightness1 sx={{ color: 'primary.main', fontSize: 18 }} />
            <Typography variant="body2">{text}</Typography>
        </Box>
    );
    const handleRate = async (newValue) => {
        try {
            if (newValue) {
                const { data } = await api.put("/ratings", { mangaId: mangaInfo.mangaId, rate: newValue })
                toast.success(data.message)
                setRating(prev => ({ avgRate: data.data.newRate, myRate: newValue, myRateID: data.data.id }))
            } else {
                const { data } = await api.delete(`/ratings/${rating.myRateID}`)
                toast.success(data.message)
                setRating(prev => ({ avgRate: data.data.newRate, myRate: 0, myRateID: null }))
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        } finally {

        }
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
                            <Typography variant="body1" color="text.secondary">{rating.avgRate}</Typography>
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
                    {userToken &&!isAdmin&&
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <Typography sx={style.descriptionText}>
                                {t("tap_to_rate")}
                            </Typography>
                            <Box sx={{ direction: "ltr" }}>
                                <Rating
                                    name="user-rate"
                                    precision={0.5}
                                    defaultValue={0}
                                    value={rating.myRate}
                                    onChange={(e, newValue) => {
                                        handleRate(newValue);
                                    }}
                                    emptyIcon={<Star style={{ color: '#a9a9a9' }} fontSize="inherit" />}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </>
    )
}

export default MangaInfoHeader
