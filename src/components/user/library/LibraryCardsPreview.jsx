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
import GeneralPreviewCards from '../../common/GeneralPreviewCards';

function LibraryCardsPreview({ librarySection }) {
  const navigate = useNavigate();
  const { isMobile, isTablet } = usePhone();
  const { i18n, t } = useTranslation()
  const s = librarySection?.split('-')?.join('');
  const baseUrl = `/${s}/View${s}Manga?`;
  const { mangas, setMangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl });
  const [selectedForDeletion, setSelectedForDeletion] = useState(null)

useEffect(() => {
  const currentPath = window.location.pathname;
  const targetPath = `/library/${librarySection}`;

  // Only navigate if the path is different
  if (currentPath !== targetPath) {
    navigate(targetPath, { replace: true }); // <- replace prevents double back issue
  }

  const fetchData = async () => {
    fetchMangas(1);
    setPageNumber(1);
  }
  fetchData();
}, [librarySection, i18n.language]);

  return (
    <>
      {/* dialog for confirmation delete */}
      <AlertDialog
        items={mangas} setItems={setMangas}
        selectedForDeletion={selectedForDeletion} setSelectedForDeletion={setSelectedForDeletion}
        removeTitle={i18n.language === "en" ? "Remove Bookmark" : "حذف المرجع"}
        removeContent={i18n.language === "en" ? `Are you sure you want to remove ${selectedForDeletion?.mangaName} from your library? This action cannot be undone.` :
          `هل أنت متأكد أنك تريد حذف ${selectedForDeletion?.mangaName}من مكتبتك؟ هذا الإجراء لا يمكن التراجع عنه.`}
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
      <GeneralPreviewCards mangas={mangas} loading={loading} pageNumber={pageNumber}
        count={count} setPageNumber={setPageNumber} hasNextPage={hasNextPage} pageSize={pageSize} setSelectedForDeletion={setSelectedForDeletion} />
    </>
  )
}

export default LibraryCardsPreview
/*
  const { mangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize } = usePaginatedMangaList({ baseUrl });

*/