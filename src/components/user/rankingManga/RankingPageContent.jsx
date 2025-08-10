import { Box } from '@mui/material'
import RankingPageCard from './RankingPageCard'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api';
import MyPagination from '../../common/MyPagination';
import Loader from '../../common/Loader';
import usePhone from '../../../hooks/usePhone';
import { useTranslation } from 'react-i18next';

function RankingPageContent() {
    const { isMobile } = usePhone();
    const {i18n}=useTranslation();
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = isMobile ? 15 : 20;;

    useEffect(() => {
        const fetchHottestManga = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/Manga/GetMangaByStatus?Status=ongoing&PageNumber=${pageNumber}&OrderBy=1&pageSize=${pageSize}`);
                const data = response.data.data;
                setCount(data.totalPages);
                setMangas(data.data);
            } catch (error) {
                console.error("Error fetching hottest manga:", error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchHottestManga();
    }, [pageNumber,i18n.language]);
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: { xs: .5, sm: 2 }
                        }}>
                        {mangas.map((mangaData, index) => (
                            <RankingPageCard key={index} mangaData={mangaData} rate={(index+1)+(pageSize*(pageNumber-1))} />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            margin: 'auto',
                            pb: { xs: 3, sm: 4, md: 5 },
                        }}>
                        <MyPagination page={pageNumber} setPage={setPageNumber} count={count}/>
                    </Box>
                </>
            }
        </>
    )
}

export default RankingPageContent


