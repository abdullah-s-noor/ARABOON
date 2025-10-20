import { Box, Typography, useMediaQuery } from '@mui/material'
import ChapterList from '../../components/user/mangaInformation/ChapterList'
import MangaInfoHeader from '../../components/user/mangaInformation/MangaInfoHeader'
import MangaActionSidebar from '../../components/user/mangaInformation/MangaSectionsSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useTranslation } from 'react-i18next'
import LogoLoader from '../../components/common/LogoLoader'
import { UserContext } from '../../context/UserContext'
import LanguageList from '../../components/user/mangaInformation/LanguageList'
function MangaInformation() {
    const navigate=useNavigate()
    const { i18n } = useTranslation()
    const params = useParams()
    const { userToken } = useContext(UserContext)
    const mangaID = params.mangaID
    const [loading, setLoading] = useState(true)
    const [mangaInfo, setMangaInfo] = useState(null)
    const [libraryStatus, setLibraryStatus] = useState(null)
    const is750 = useMediaQuery('(min-width:750px)');
    useEffect(() => {
        const fetchMangaInfo = async () => {
            try {
                setLoading(true)
                const [mangaInfoData, myRate] = await Promise.all([
                    api.get(`/Manga/GetMangaByID/${mangaID}`)
                        .catch(err => (err.response?.status === 404 ?navigate('/not-found')  : Promise.reject(err))),
                    api.get(`/ratings/manga/${mangaID}`)
                        .catch(err => (err.response?.status === 404 || err.response?.status === 401 ? null : Promise.reject(err)))
                ]);
                if (mangaInfoData) {
                    console.log({ ...mangaInfoData.data.data, myRate: myRate?.data.data.rate, myRateID: myRate?.data.data.id })
                    setMangaInfo({ ...mangaInfoData.data.data, myRate: myRate?.data?.data?.rate, myRateID: myRate?.data?.data?.id })
                    setLibraryStatus({
                        Favorites: mangaInfoData.data.data.isFavorite,
                        Notifications: mangaInfoData.data.data.isNotification,
                        ReadingLater: mangaInfoData.data.data.isReadingLater,
                        CompletedReads: mangaInfoData.data.data.isCompletedReading,
                        CurrentlyReading: mangaInfoData.data.data.isCurrentlyReading,
                    })
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMangaInfo()
    }, [i18n.language,userToken])
    return (
        <>
            {
                loading ? <LogoLoader /> :
                    <Box
                        component={'div'}
                        sx={{
                            width: '100%',
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
                                    display: 'flex', flexDirection: 'column', gap: 2
                                }}>
                                {userToken && <MangaActionSidebar libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} mangaID={mangaID} />}
                                <ChapterList isArabicAvailable={mangaInfo.isArabicAvailable} isEnglishAvailable={mangaInfo.isEnglishAvailable}/>
                            </Box>

                        </Box>
                    </Box >
            }
        </>
    )
}

export default MangaInformation
