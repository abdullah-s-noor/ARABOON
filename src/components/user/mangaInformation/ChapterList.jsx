import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageList from './LanguageList';
import { api } from '../../../services/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChapterCard from './ChapterCard';
import ChapterCardSkeleton from './ChapterCardSkeleton';
import { Add, ArrowRightAlt } from '@mui/icons-material';
import DashboardChaptersPreview from '../../admin/chapterManagment/DashboardChaptersPreview';

function ChapterList({ isArabicAvailable, isEnglishAvailable }) {
    const isAdmin = useLocation().pathname.startsWith("/dashboard")
    const mnagaID = useParams().mangaID
    const [selectedLanguage, setSelectedLanguage] = useState(isEnglishAvailable ? 'en' : isArabicAvailable ? "ar" : "en")
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true)
    const [ChaptersData, setChaptersData] = useState([])
    const memoizedChapters = useMemo(() => ChaptersData ? ChaptersData : [], [ChaptersData]);
    //this states for Dashboard
    const [langAvailable, setLangAvailable] = useState({ en: false, ar: false })

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/Chapters/ViewChaptersForSpecificMangaByLanguage?MangaID=${mnagaID}&Language=${selectedLanguage}`)
                setChaptersData(data.data)
                setLangAvailable({ en: data.meta.isEnglishAvailable, ar: data.meta.isArabicAvailable })
            } catch (error) {
                const message = error.response?.data?.message
                if (message === "There are no chapters yet" || message === "لا توجد فصول بعد") {
                    setChaptersData([])
                }
            } finally {
                setLoading(false)
            }
        }
        fetchChapters()
    }, [selectedLanguage])
    // this function for Dashboard

    return (
        <>
            {/* chapters list */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Typography sx={{ fontFamily: '"Roboto", sans-serif', fontSize: 16, color: 'text.secondary', }}>
                        {t("chapter_list")}
                    </Typography>
                    <LanguageList selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} isArabicAvailable={isArabicAvailable} isEnglishAvailable={isEnglishAvailable} />
                </Box>

                <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />
                {(loading) ?
                    [1, 2, 3].map((index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 5, mb: 2 }}>
                            <ChapterCardSkeleton />
                        </Box>
                    )) :
                    (isAdmin ?
                        <DashboardChaptersPreview memoizedChapters={memoizedChapters} setChaptersData={setChaptersData} selectedLanguage={selectedLanguage} langAvailable={langAvailable} setLangAvailable={setLangAvailable} /> :
                        memoizedChapters.map((item, index) => (
                            <ChapterCard key={item.chapterID} item={item} index={index} selectedLanguage={selectedLanguage} />
                        ))
                    )
                }

            </Box>
        </>
    )
}

export default ChapterList
