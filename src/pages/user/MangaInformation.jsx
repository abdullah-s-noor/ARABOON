import { Box, Typography } from '@mui/material'
import ChapterList from '../../components/user/mangaInformation/ChapterList'
import MangaInfoHeader from '../../components/user/mangaInformation/MangaInfoHeader'
import MangaActionSidebar from '../../components/user/mangaInformation/MangaActionSidebar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useTranslation } from 'react-i18next'
function MangaInformation() {
    const { i18n } = useTranslation()
    const params = useParams()
    const mangaID = params.mangaID
    const [loading, setLoading] = useState(true)
    const [mangaInfo, setMangaInfo] = useState(null)

    useEffect(() => {
        const fetchMangaInfo = async () => {
            try {
                setLoading(true)
                const [mangaInfoData/*, chaptersData*/] = await Promise.all([
                    api.get(`/Manga/GetMangaByID/${mangaID}`),
                    // api.get(`/Chapters/ViewChaptersForSpecificMangaByLanguage?MangaID=${mangaID}&Language=arabic`),
                ]);
                console.log(mangaInfoData.data.data)
                setMangaInfo(mangaInfoData.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMangaInfo()
    }, [i18n.language])
    return (
        <>
            {
                loading?<Typography>loading mangaInfo ....</Typography>:
                <Box
                    component={'div'}
                    sx={{
                        width: '100%',
                        height: '2000px',
                        pt: { xs: 5, sm: 10 },
                        bgcolor: 'secondary.main',
                    }}>
                    <Box
                        component={'div'}
                        maxWidth={'90%'}
                        margin={'auto'}
                    >
                        {/* manga info */}
                        <MangaInfoHeader mangaInfo={mangaInfo} />
                        {/* chapters list */}
                        <Box
                            sx={{
                                marginTop: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                '@media (max-width:750px)': {
                                    flexDirection: 'column-reverse',
                                    flexWrap: 'wrap',
                                    gap: 3
                                },
                            }}>
                            <ChapterList />
                            <MangaActionSidebar />
                        </Box>

                    </Box>
                </Box >
            }
        </>
    )
}

export default MangaInformation
