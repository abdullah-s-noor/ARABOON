import { Box, Typography } from '@mui/material'
import GeneralMangaCard from '../../common/GeneralMangaCard'
import { useEffect } from 'react'
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList'
import MySkeleton from '../mySkeletons/MySkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePhone from '../../../hooks/usePhone'
import { useTranslation } from 'react-i18next'
import GeneralPreviewCards from '../../common/GeneralPreviewCards'
function MangaListCardsPreview({ status, genre, sort }) {
  const baseUrl = `/Manga/GetMangaByStatus?Status=${status}&${genre !== 'all' ? `filter=${genre}` : 'filter='}&OrderBy=${sort.key === "az" ? 0 : sort.key === "za" ? 1 : 2}`;
  const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl });
  const { i18n, t } = useTranslation();
  useEffect(() => {
    fetchMangas(1);
    setPageNumber(1);
  }, [status, genre, sort.key, i18n.language]);
  return (
    <>
      <GeneralPreviewCards mangas={mangas} loading={loading} pageNumber={pageNumber} 
      count={count} setPageNumber={setPageNumber} hasNextPage={hasNextPage} pageSize={pageSize}/>
    </>
  )
}

export default MangaListCardsPreview
