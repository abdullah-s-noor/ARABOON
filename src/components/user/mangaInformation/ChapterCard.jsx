import { DoneOutline } from '@mui/icons-material'
import { Box, Typography, IconButton, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UnViewConfirmation from './UnViewConfirmation'
import { color } from 'framer-motion'
import useIsPhone from '../../../hooks/usePhone';
import { useNavigate, useParams } from 'react-router-dom'

function ChapterCard({ item, chapterNum, index, selectedLanguage }) {
    const hoverStyle = (isView) => ({
        background: isView && (i18n.language === "en" ?
            (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
            (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))')),
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
    })
    const activeStyle = (isView) => ({
        background: isView && (i18n.language === "en" ?
            (theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(220,9,20,0))') :
            (theme.palette.mode === 'dark' ? 'linear-gradient(270deg, rgba(0,0,0,0.5), rgba(220,9,20,0))' : 'linear-gradient(270deg, rgba(255,255,255,0.5), rgba(220,9,20,0))')),

        '&:active .episode-num': {
            color: 'primary.main',
        },
        '&:active .episode-name': {
            color: 'inherit',
        },

    })
    const { isPhone } = useIsPhone()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [chapterInfo, setChaptersInfo] = useState(item)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { t, i18n } = useTranslation()
    const theme = useTheme()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const mangaID = useParams().mangaID
    console.log(chapterInfo)
    const handleDoneClick = () => {
        setDialogOpen(true);
    };
    return (
        <>
            <Box
                key={index}
                onClick={() => { navigate(`/manga/${mangaID}/chapter/${index + 1}?lang=${selectedLanguage}`) }}
                onTouchStart={() => {
                    setSelectedIndex(index);
                }}
                sx={{
                    display: 'flex',

                    ...(!isPhone ? hoverStyle(chapterInfo.isView)
                        :
                        {
                            ...(activeStyle(chapterInfo.isView)),
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
                    src={chapterInfo.chapterImageUrl}
                    alt='chapter'
                    display={'block'}
                    width={{ xs: 120, sm: 200 }}
                />
                {/* chapter info */}
                <Box sx={{ width: '100%' }}>
                    {/* chapter number */}
                    <Typography
                        className='episode-num'
                        sx={{
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: { xs: '14px', sm: '28px' },
                            fontWeight: 400,
                            display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }
                        }}
                    >
                        {chapterInfo.title}
                        {chapterInfo.isView && (
                            <IconButton

                                onClick={e => {
                                    e.stopPropagation();
                                    handleDoneClick();
                                }}
                                sx={{ p: 0.5, ...(isPhone ? { ":active": { color: theme.palette.primary.main } } : { ":hover": { color: theme.palette.primary.main } }), }}
                                size="small"
                                aria-label={i18n.language === "en" ? "Mark as unviewed" : "إزالة تم المشاهدة"}
                            >
                                <DoneOutline sx={{ fontSize: { xs: '14px', sm: '28px' } }} />
                            </IconButton>
                        )}
                    </Typography>
                    <Typography
                        className="episode-name"
                        sx={{
                            fontSize: { xs: 10, sm: 14 },
                            color: 'text.secondary',
                        }}
                    >
                        {`${i18n.language === "en" ? "Episode" : "الحلقة"} ${chapterNum}: ${chapterInfo.chapterTitle}`}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: 7, sm: 10 },
                            color: '#a0a0a0',
                            mt: { xs: .5, sm: 2 },
                        }}
                    >
                        {chapterInfo.releasedOn}
                    </Typography>
                    <UnViewConfirmation
                        open={dialogOpen}
                        onCancel={(e) => { setDialogOpen(false); }}
                        onConfirm={(e) => {
                            setChaptersInfo(prev => ({ ...prev, isView: false }));
                            setSnackbarOpen(true);
                            setDialogOpen(false);
                        }}
                        chapterID={chapterInfo.chapterID}
                        snackbarOpen={snackbarOpen}
                        onSnackbarClose={(e) => { setSnackbarOpen(false) }}
                    />
                </Box>
            </Box>

        </>
    )
}

export default React.memo(ChapterCard, (prevProps, nextProps) => {
    return (
        prevProps.item === nextProps.item &&
        prevProps.chapterNum === nextProps.chapterNum
    );
});
