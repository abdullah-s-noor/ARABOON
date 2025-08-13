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
import usePaginatedManga from '../../../hooks/usePaginatedManga';

function RankingPageContent() {
    const theme = useTheme();
    const { isMobile, isTablet } = usePhone();
    const { i18n } = useTranslation();
    const baseUrl = "/Manga/GetMangaByStatus"
        const { mangas,loading,count,pageNumber,setPageNumber,hasNextPage,fetchMangas,pageSize}=usePaginatedManga(baseUrl);
        
        useEffect(() => {
            const fetchData = async ( ) => {
                await fetchMangas();
            };
            fetchData( );
        }, []);
        
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


