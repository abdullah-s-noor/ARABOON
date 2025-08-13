import { Box, Typography } from '@mui/material'
import GeneralMangaCard from '../../common/GeneralMangaCard'
import { useEffect, useState, useTransition } from 'react'
import MyPagination from '../../../components/common/MyPagination'
import axios from 'axios'
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList'
import RankingPageSkeleton from '../mySkeletons/RankingPageSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePhone from '../../../hooks/usePhone'
import { useTranslation } from 'react-i18next'

function MangaCards({ status, genre, sort }) {
  const baseUrl = `/Manga/GetMangaByStatus?Status=${status}&${genre !== 'all' ? `filter=${genre}`:'filter='}&OrderBy=${sort.key === "az" ? 0 : sort.key === "za" ? 1 : 2}`;
  const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize } = usePaginatedMangaList({ baseUrl });
  const { i18n } = useTranslation();
      const { isMobile, isTablet } = usePhone();
  useEffect(() => {
    fetchMangas(1);
    setPageNumber(1);
  }, [status, genre, sort.key, i18n.language]);
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
          loader={<RankingPageSkeleton SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))} />}
          style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '10px'
        }}
        >
          {
            mangas?.map((manga, index) => (
              <GeneralMangaCard key={index} mangaData={manga} />
            ))
          }


        </InfiniteScroll>
      }

    </>
  )
}

export default MangaCards
