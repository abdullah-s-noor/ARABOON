import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import RankingPageCard from './RankingPageCard'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api';
import MyPagination from '../../common/MyPagination';
import Loader from '../../common/Loader';
import usePhone from '../../../hooks/usePhone';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import RankingPageSkeleton from '../mySkeletons/RankingPageSkeleton';

function RankingPageContent() {
    const theme = useTheme();
    const { isMobile, isTablet } = usePhone();
    const { i18n } = useTranslation();
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = isMobile ? 15 : 20;
    const [hasNextPage, setHasNextPage] = useState(null);
    const fetchHottestManga = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/Manga/GetMangaByStatus?Status=ongoing&PageNumber=${pageNumber}&OrderBy=1&pageSize=${pageSize}`);
            const data = response.data.data;
            setCount(data.totalCount);
            setHasNextPage(data.hasNextPage);
            (pageNumber === 1 ? setMangas(data.data) : setMangas(prev => [...prev, ...data.data]));
        } catch (error) {
            console.error("Error fetching hottest manga:", error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchHottestManga();
    }, [pageNumber, i18n.language]);
    return (
        <>
            {loading && pageNumber === 1 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', }}>
                    <RankingPageSkeleton SkeletonCount={isMobile ? 6 : isTablet ? 10 : 12} />
                </Box>
            ) :
                <InfiniteScroll
                    dataLength={mangas.length}
                    next={() => setPageNumber(prev => prev + 1)} // زيادة الصفحة عند تحميل المزيد
                    hasMore={hasNextPage} // true أو false حسب وجود صفحات إضافية
                    loader={<RankingPageSkeleton SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))}/>}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    {mangas.map((mangaData, index) => (
                        <RankingPageCard
                            key={index}
                            mangaData={mangaData}
                            rate={index + 1 }
                        />
                    ))}


                </InfiniteScroll>
            }
        </>


    )
}

export default RankingPageContent


