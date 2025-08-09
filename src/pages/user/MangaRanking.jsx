import { Box } from '@mui/material'
import React from 'react'
import RankingPageHeader from '../../components/user/rankingManga/RankingPageHeader.jsx'
import RankingPageContent from '../../components/user/rankingManga/RankingPageContent.jsx'
function MangaRanking() {
  return (
    <>
      <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:4,
        }}
      >
        <RankingPageHeader />
        <RankingPageContent/>
      </Box>
    </>
  )
}

export default MangaRanking
