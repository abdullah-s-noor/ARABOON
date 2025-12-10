import { Box, Button, Typography, useTheme } from '@mui/material'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function ChapterFooter({ currentPage, totalPages, isAdmin ,onNextChapter,onPrevChapter}) {
  const theme = useTheme();
  const {i18n}=useTranslation();
  return (
    <Box
      footer-name="chapter-footer"
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 85,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 4 },
        background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
        color: "white",
        transition: "transform .3s ease",
        zIndex: 20,
      }}
    >
      {/* PREVIOUS */}
      {(!isAdmin&&onPrevChapter) && <Button
        variant="contained"
        onClick={onPrevChapter}
      >
        {i18n.language==="ar" ? <ArrowForward sx={{ fontSize: 16, mr: 0.5 }} /> : <ArrowBack sx={{ fontSize: 16, mr: 0.5 }} />}
        {i18n.language==="ar" ? "السابق" : "Previous"}
      </Button>}

      {/* PAGE NUMBER */}
      <Typography sx={{ m: "auto", color: "white" }}>
        <Typography component="span" sx={{ fontWeight: "bold", display: "inline", fontSize: "20px" }}>
          {currentPage}
        </Typography>
        /{totalPages}
      </Typography>

      {/* NEXT */}
      {(!isAdmin&&onNextChapter)&& <Button
        variant="contained"
        onClick={onNextChapter}
        sx={{
          display: "flex",
        }}
      >
        {i18n.language==="ar" ? "التالي" : "Next"}
        {i18n.language==="ar" ? <ArrowBack sx={{ fontSize: 16, mr: 0.5 }} /> : <ArrowForward sx={{ fontSize: 16, mr: 0.5 }} />}
      </Button>
      }
    </Box>
  );
}

export default ChapterFooter;
