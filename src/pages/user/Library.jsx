import { Box } from '@mui/material'
import LibraryHeader from '../../components/user/library/LibraryHeader'
import React from 'react'

function Library() {
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
        <LibraryHeader/>
      </Box>
  )
}

export default Library
