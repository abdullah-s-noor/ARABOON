import { Box } from '@mui/material'
import MangaListHeaderPreview from '../../components/user/mangaList/MangaListHeaderPreview'
import MangaListCardsPreview from '../../components/user/mangaList/MangaListCardsPreview';
import useMangaListFilter from '../../hooks/useMangaListFilter';
import { useEffect } from 'react';
import { api } from '../../services/api';
import LogoLoader from '../../components/common/LogoLoader';

function MangaList() {
  const {
    isLoading,
    selectedStatus,
    setSelectedStatus,
    statusOptions,
    selectedGenre,
    setSelectedGenre,
    genreOptions,
    selectedSort,
    setSelectedSort,
    sortOptions
  } = useMangaListFilter();

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2
        }}
      >
        <MangaListHeaderPreview
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} statusOptions={statusOptions}
          selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genreOptions={genreOptions}
          selectedSort={selectedSort} setSelectedSort={setSelectedSort} sortOptions={sortOptions}
        />
        <MangaListCardsPreview status={selectedStatus} genre={selectedGenre.en} sort={selectedSort} />
      </Box>
    </>
  );
}

export default MangaList;