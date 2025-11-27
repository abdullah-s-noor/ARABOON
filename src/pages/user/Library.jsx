import { Box } from '@mui/material'
import LibraryHeader from '../../components/user/library/LibraryHeader'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LibraryCardsPreview from '../../components/user/library/LibraryCardsPreview';

function Library() {
  const navigate = useNavigate();
  const params = useParams();
  const sections = ['favorites', 'notifications', 'completed-reads', 'currently-reading', 'reading-later'];
  
  const getInitialSection = () => {
    const urlSection = params.section?.toLowerCase();
    const storedSection = localStorage.getItem('librarySection')?.toLowerCase();

    if (urlSection && sections.includes(urlSection)) {
      localStorage.setItem('librarySection', urlSection);
      return urlSection;
    }

    if (storedSection && sections.includes(storedSection)) {
      return storedSection;
    }

    return 'favorites';
  };

  const [librarySection, setLibrarySection] = useState(getInitialSection);

  useEffect(() => {
    const urlSection = params.section?.toLowerCase();
    if (!urlSection || urlSection !== librarySection) {
      navigate(`/library/${librarySection}`, { replace: true });
    }
  }, [librarySection, params.section]);

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 2
      }}
    >
      <LibraryHeader librarySection={librarySection} setLibrarySection={setLibrarySection} sections={sections} />
      <LibraryCardsPreview librarySection={librarySection} />
    </Box>
  )
}

export default Library
