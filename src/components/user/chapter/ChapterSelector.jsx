import { FormControl, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function ChapterSelector({ chaptersCount }) {
  const theme = useTheme()
  const sm = useMediaQuery('(min-width:600px)');
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const param = useParams()
  const mangaID = param.mangaID
  const chapterID = param.chapterID
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  return (
    <FormControl
      sx={{
        width: 90,
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        ...(i18n.language === "en" ? { mr: sm ? "0px" : "35px" } : { ml: sm ? "0px" : "35px" })
      }}
      size="small"
    >
      <Select
        value={chapterID}
        displayEmpty
        sx={{
          py: 0.5,
          borderRadius: 2,
          color: "#eeeeee", // ✅ number color
          "& svg": {
            color: "#eeeeee", // ✅ arrow color
          },
          "& fieldset": {
            borderColor: "#eeeeee", // normal border
          },
          "&:hover fieldset": {
            borderColor: `${theme.palette.primary.main} !important`, // ✅ hover border color
          },
          "&.Mui-focused fieldset": {
            // borderColor: "#eeeeee !important", // ✅ focus border color
          },
          "& .MuiSelect-select": {
            py: 0.5,
          },
        }}
      >
        {[...Array(chaptersCount)].map((_, index) => (
          <MenuItem key={index + 1} value={index + 1} onClick={() => {
            navigate(`/manga/${mangaID}/chapter/${index + 1}?lang=${lang}`)
          }}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ChapterSelector
