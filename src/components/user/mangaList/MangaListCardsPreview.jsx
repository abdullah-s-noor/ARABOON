import { Box, Typography } from '@mui/material'
import GeneralMangaCard from '../../common/GeneralMangaCard'
import { useEffect } from 'react'
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList'
import MySkeleton from '../mySkeletons/MySkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePhone from '../../../hooks/usePhone'
import { useTranslation } from 'react-i18next'

function MangaListCardsPreview({ status, genre, sort }) {
  const baseUrl = `/Manga/GetMangaByStatus?Status=${status}&${genre !== 'all' ? `filter=${genre}` : 'filter='}&OrderBy=${sort.key === "az" ? 0 : sort.key === "za" ? 1 : 2}`;
  const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl });
  const { i18n, t } = useTranslation();
  const { isMobile, isTablet } = usePhone();
  useEffect(() => {
    fetchMangas(1);
    setPageNumber(1);
  }, [status, genre, sort.key, i18n.language]);
  const skeletonStyle = {
    h: { xs: "150px", sm: "225px", md: "345px" },
    w: { xs: "100px", sm: "150px", md: "230px" },
    pd: '0px'
  }
  return (
    <>
      {loading && pageNumber === 1 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', }}>
          <MySkeleton
            SkeletonCount={isMobile ? 6 : isTablet ? 10 : 12}
            pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
          />
        </Box>
      ) :
        mangas && mangas.length > 0 ?
          (<InfiniteScroll
            dataLength={mangas.length}
            next={() => setPageNumber(prev => prev + 1)} // زيادة الصفحة عند تحميل المزيد
            hasMore={hasNextPage} // true أو false حسب وجود صفحات إضافية
            loader={<MySkeleton
              SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))}
              pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
            />}
            style={{
              display: 'flex',
              justifyContent: 'center',
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
          ) :
          (<Typography sx={{ fontSize: { xs: 18, sm: 22, md: 25 } }}>
            {t("noData")}
          </Typography>)
      }
    </>
  )
}

export default MangaListCardsPreview
