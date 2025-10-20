import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageList from './LanguageList';
import { api } from '../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterCard from './ChapterCard';
import ChapterCardSkeleton from './ChapterCardSkeleton';

function ChapterList({ isArabicAvailable, isEnglishAvailable }) {
    console.log(isArabicAvailable)
    const mnagaID = useParams().mangaID
    const [selectedLanguage, setSelectedLanguage] = useState(isEnglishAvailable?'en':isArabicAvailable?"ar":"en")
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true)
    const [ChaptersData, setChaptersData] = useState(null)
    const memoizedChapters = useMemo(() => ChaptersData ? ChaptersData : [], [ChaptersData]);
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/Chapters/ViewChaptersForSpecificMangaByLanguage?MangaID=${mnagaID}&Language=${selectedLanguage}`)
                setChaptersData(data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchChapters()
    }, [selectedLanguage])
    return (
        <>
            {/* chapters list */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1
                }}>

                    <Typography
                        sx={{
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: 16,
                            color: 'text.secondary',

                        }}
                    >
                        {t("chapter_list")}
                    </Typography>
                    <LanguageList selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} isArabicAvailable={isArabicAvailable} isEnglishAvailable={isEnglishAvailable} />
                </Box>

                <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />
                {(loading) ?
                    [1, 2, 3].map(() => (
                        <Box sx={{ display: 'flex', gap: 5, mb: 2 }}>
                            <ChapterCardSkeleton />
                        </Box>
                    )) :
                    memoizedChapters.map((item, index) => (
                        <ChapterCard
                            key={item.chapterID}
                            item={item}
                            chapterNum={index + 1}
                            index={index}
                            selectedLanguage={selectedLanguage}
                        />
                    ))
                }

            </Box>
        </>
    )
}

export default ChapterList
