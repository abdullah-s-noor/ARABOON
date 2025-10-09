import { FormControl, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function ChapterSelector() {
  const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const theme =useTheme()
  const sm = useMediaQuery('(min-width:600px)');
  const {i18n}=useTranslation()
  return (
    <FormControl
      sx={{
        width: 90,
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        ...(i18n.language==="en"?{mr:sm?"0px":"35px"}:{ml:sm?"0px":"35px"})
      }}
      size="small"
    >
      <Select
        value={1}
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
        {chapters.map((chapter) => (
          <MenuItem key={chapter} value={chapter}>
            {chapter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ChapterSelector
