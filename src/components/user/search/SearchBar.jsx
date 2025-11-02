import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import usePaginatedMangaList from '../../../hooks/usePaginatedMangaList';
import GeneralPreviewCards from '../../common/GeneralPreviewCards';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

function SearchBarMUI() {
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") || "")
  const { mangas, setMangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl: `/Manga?search=${value}` });
  const [focused, setFocused] = useState(false);
  
  const handleChange = (value) => {
    setValue(value)
    if (value === "") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("q");
      setSearchParams(newParams);
    } else {
      setSearchParams({ q: value });
    }

    fetchMangas(`/Manga?search=${value}`, 1)
  }
  useEffect(() => {
    fetchMangas(`/Manga?search=${value}`, 1)
  }, [i18n.language])
  useEffect(() => {
    if (serverError) {
      setMangas(null)
    }
  }, [serverError])
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  let fontSize = "20px";
  if (smUp) fontSize = "25px";
  if (mdUp) fontSize = "30px";
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          maxWidth: '100%',
          margin: '0px 20px',
          padding: '10px 0',
          mb: 1,

          // pseudo-element as bottom border
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px', // max thickness
            background: focused
              ? `linear-gradient(to right, transparent, ${theme.palette.text.primary} 50%, transparent)`
              : `linear-gradient(to right, transparent, ${theme.palette.text.secondary} 50%, transparent)`,
            transform: focused ? 'scaleY(1)' : 'scaleY(0.5)', // animate thickness
            transformOrigin: 'bottom',
            transition: 'transform 0.3s ease, background 0.3s ease',
          },
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          value={value}
          placeholder={t("searchPlaceholder")}
          onChange={(e) => { handleChange(e.target.value) }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search" sx={{ p: 0, color: 'text.secondary' }}>
                  <SearchIcon sx={{ fontSize: { xs: "25px", sm: "30px", md: "35px" } }} />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              color: focused ? theme.palette.text.primary : theme.palette.text.secondary,
              fontSize,
              fontWeight: '400px',
              padding: '0 20px',
              height: '40px',
              textAlign: 'center',
              transition: 'color 0.3s ease',
            }
          }}
          inputProps={{
            style: {
              textAlign: 'center'
            }
          }}
          sx={{
            '& input::placeholder': {
              color: theme.palette.text.secondary, // placeholder color from theme
              opacity: 1,
              textAlign: 'center',
            },
            '& .MuiInputBase-root:before': { borderBottom: 'none' },
            '& .MuiInputBase-root:after': { borderBottom: 'none' },
            '& .MuiInputBase-root:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
          }}
        />
      </Box>
      <GeneralPreviewCards mangas={mangas} loading={loading} pageNumber={pageNumber}
        count={count} setPageNumber={setPageNumber} hasNextPage={hasNextPage} pageSize={pageSize} />
    </>


  );
}

export default SearchBarMUI;
