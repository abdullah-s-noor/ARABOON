import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import useIsPhone from '../../../hooks/usePhone'
import React, { useState } from 'react'
import { BookmarkRemove, Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { api } from '../../../services/api'
import { useNavigate } from 'react-router-dom'

function DashboardMangaCard({ mangaData, onEditManga, onDelete }) {
    console.log(mangaData)
    const { i18n } = useTranslation()
    const { isPhone } = useIsPhone()
    const [isActive, setIsActive] = useState(mangaData.isActive)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleActivate = async () => {
        try {
            setLoading(true)
            const { data } = await api.patch(`/Manga/${mangaData.mangaID}/active-toggle`)
            setIsActive(prev => !prev);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const style = styles(isPhone)
    return (
        <>
            <Card sx={style.card} manga-id={mangaData.mangaID} >
                <Box sx={{ opacity: 0, transition: "opacity 0.2s ease", position: "absolute", right: 8, top: 8, display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "flex-end", gap: { xs: .5, sm: 1 }, }} className="delete-btn">
                    <IconButton size="small" color="error" onClick={() => { onDelete(mangaData) }} sx={{ ...style.deleteIcon }}>
                        <Delete fontSize="small" sx={{ zIndex: 20 }} />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => { onEditManga && onEditManga(mangaData) }} sx={style.EditIcon}>
                        <Edit fontSize="small" sx={{ zIndex: 20 }} />
                    </IconButton>
                </Box>

                <CardActionArea sx={style.cardAction} onClick={() => { navigate(`/dashboard/manga/${mangaData.mangaID}`) }}>
                    <CardMedia component="img" image={mangaData.mangaImageUrl} alt="green iguana" sx={style.img} />
                </CardActionArea>
                <CardContent sx={{ bgcolor: 'background.default' }} onClick={() => { navigate(`/dashboard/manga/${mangaData.mangaID}`) }}>
                    <Typography gutterBottom variant="body1" component="div" sx={style.title} className='title'>
                        {mangaData.mangaName}
                    </Typography>
                    <Typography className='author' variant="body2" sx={style.author} >
                        {mangaData.authorName}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                        {mangaData.categories?.map((category) => (
                            <Chip key={category.id} label={category[i18n.language]} size="small" sx={style.categoryChip} />
                        ))}
                    </Box>
                    {/* Activate / Deactivate Button */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1.5 }}>
                        <Button disabled={loading} startIcon={isActive ? <Cancel /> : <CheckCircle />} variant={isActive ? "outlined" : "contained"} color={isActive ? "error" : "success"} size="small" sx={style.activateButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleActivate()
                            }}>
                            {isActive ? "InActivate" : "Activate"}
                        </Button>
                        <Typography sx={{ mt: 0.8, fontSize: 13, fontWeight: 500, color: isActive ? "success.main" : "error.main", }}>
                            {isActive ? "Active" : "Inactive"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}
export default React.memo(DashboardMangaCard, (prevProps, nextProps) => {
    return (
        prevProps.mangaData === nextProps.mangaData
    );
});

