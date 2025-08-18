import { Box, Typography } from '@mui/material';
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import MySkeleton from '../mySkeletons/MySkeleton'
import usePhone from '../../../hooks/usePhone';
import InfiniteScroll from 'react-infinite-scroll-component';
import GeneralMangaCard from '../../common/GeneralMangaCard';
import AlertDialog from '../dialog/AlertDialog';

function LibraryCardsPreview({ librarySection }) {
  const navigate = useNavigate();
  const { isMobile, isTablet } = usePhone();
  const { i18n, t } = useTranslation()
  const s = librarySection?.split('-')?.join('');
  const baseUrl = `/${s}/View${s}Manga?`;
  const { mangas,setMangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl });
  const [selectedForDeletion, setSelectedForDeletion] = useState(null)

  useEffect(() => {
    console.log(serverError, mangas)
    navigate(`/library/${librarySection}`);
    const fetchData = async () => {
      fetchMangas(1);
      setPageNumber(1);
    }
    fetchData();
  }, [librarySection, i18n.language])
  const skeletonStyle = {
    h: { xs: "150px", sm: "225px", md: "345px" },
    w: { xs: "100px", sm: "150px", md: "230px" },
    pd: '0px'
  }
  return (
    <>
      {/* dialog for confirmation delete */}
      <AlertDialog
        mangas={mangas} setMangas={setMangas}
        selectedForDeletion={selectedForDeletion} setSelectedForDeletion={setSelectedForDeletion}
      />
      {/* if not authorized */}
      {mangas.length === 0 && serverError && (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', }}>
          <Typography variant="h6" >
            {serverError}
          </Typography>
        </Box>
      )}
      {/* loading when open the page */}
      {loading && pageNumber === 1 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', }}>
          <MySkeleton
            SkeletonCount={isMobile ? 6 : isTablet ? 10 : 12}
            pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
          />
        </Box>
      ) :
        // if mangas doesnot empty use a pagination
        mangas && mangas.length > 0 ?
          (<InfiniteScroll
            dataLength={mangas.length}
            next={() => setPageNumber(prev => prev + 1)} // زيادة الصفحة عند تحميل المزيد
            hasMore={hasNextPage} // true أو false حسب وجود صفحات إضافية
            loader={
              <MySkeleton
                SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))}
                pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
              />
            }
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {
              mangas?.map((manga, index) => (
                <GeneralMangaCard key={index} mangaData={manga} setSelectedForDeletion={setSelectedForDeletion} />
              ))
            }
          </InfiniteScroll>
          ) :
          //if the mangas array is empty
          (<Typography sx={{ fontSize: { xs: 18, sm: 22, md: 25 } }}>
            {t("noData")}
          </Typography>)
      }
    </>
  )
}

export default LibraryCardsPreview
/*
  const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize } = usePaginatedMangaList({ baseUrl });

*/