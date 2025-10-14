import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function ChapterFooter({ currentPage, totalPages }) {
  const theme = useTheme()
  return (
    <Box
      footer-name="chapter-footer"
      sx={{
        position: "absolute",
        bottom: "0px",
        width: "100%",
        borderBottom: `5px solid ${theme.palette.primary.main}`,
        height: 80,
        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.1) 100%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        transition: "transform .3s ease"

      }}
    >
      <Typography sx={{ m: "auto", color: "white" }}>
        <Typography component="span" sx={{ fontWeight: "bold", display: "inline", fontSize: "20px" }}>
          {currentPage}
        </Typography>
        /{totalPages}
      </Typography>
    </Box>
  )
}

export default ChapterFooter
