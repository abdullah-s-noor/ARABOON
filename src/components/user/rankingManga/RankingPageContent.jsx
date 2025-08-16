import { Box, useTheme } from '@mui/material'
import RankingPageCard from './RankingPageCard'
import { useEffect, useState } from 'react'
import usePhone from '../../../hooks/usePhone';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import MySkeleton from '../mySkeletons/MySkeleton';
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList';

function RankingPageContent() {
    const theme = useTheme();
    const { isMobile, isTablet } = usePhone();
    const { i18n } = useTranslation();
    const baseUrl = "/Manga/GetMangaByStatus?Status=ongoing&OrderBy=1"
    const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize } = usePaginatedMangaList({ baseUrl });

    useEffect(() => {
        const fetchData = async () => {
            await fetchMangas(1);
        };
        fetchData();
    }, [i18n.language]);
    const skeletonStyle = {
        h: { xs: "165px", sm: "225px", md: "270px", lg: "315px" },
        w: { xs: "110px", sm: "150px", md: "180px", lg: "210px" },
        pd: { xs: '5px', sm: '10px' }
    }
    return (
        <>
            {loading && pageNumber === 1 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', }}>
                    <MySkeleton
                        pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
                        SkeletonCount={isMobile ? 6 : isTablet ? 10 : 12}
                    />
                </Box>
            ) :
                <InfiniteScroll
                    dataLength={mangas.length}
                    next={() => setPageNumber(prev => prev + 1)} // زيادة الصفحة عند تحميل المزيد
                    hasMore={hasNextPage} // true أو false حسب وجود صفحات إضافية
                    loader={<MySkeleton
                        pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
                        SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))}
                    />}
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
                            rate={index + 1}
                        />
                    ))}


                </InfiniteScroll>
            }
        </>


    )
}

export default RankingPageContent


