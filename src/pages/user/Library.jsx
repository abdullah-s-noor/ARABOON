import { Box } from '@mui/material'
import LibraryHeader from '../../components/user/library/LibraryHeader'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LibraryCardsPreview from '../../components/user/library/LibraryCardsPreview';

function Library() {
  const navigate = useNavigate();
  const params = useParams();
  const sections = ['favorites', 'notifications', 'completed-reads', 'currently-reading', 'reading-later',]
  const [librarySection, setLibrarySection] = useState(() => {
    const storedSection = localStorage.getItem('librarySection')?.toLowerCase();
    return sections.includes(storedSection) ? storedSection : 'favorites';
  });

  
  useEffect(() => {
    const s = params?.section?.toLowerCase();
    if (!params.section) {
      navigate(`/library/${librarySection}`);
    }
    else if (params.section && sections.includes(s)) {
      setLibrarySection(s);
      localStorage.setItem("librarySection", s);
    } else {
      navigate("not-found");
    }
  }, [params.section]);

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
