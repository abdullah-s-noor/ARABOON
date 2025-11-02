import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, useTheme, useMediaQuery, Typography, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import usePaginatedMangaList from '../../hooks/usePaginatedMangaList';
import GeneralPreviewCards from "../../components/common/GeneralPreviewCards";
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { api } from '../../services/api';
import LogoLoader from '../../components/common/LogoLoader';
import SearchBar from '../../components/admin/mangaManagment/SearchBar';
import MangaDialog from '../../components/admin/mangaManagment/MangaDialog';
import AlertDialog from '../../components/user/dialog/AlertDialog';

function SearchBarMUI() {
  const { i18n, t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") || "")
  const { mangas, setMangas, loading, count, pageNumber, setPageNumber, hasNextPage, fetchMangas, pageSize, serverError } = usePaginatedMangaList({ baseUrl: `/Manga/dashboard?search=${searchParams.get("q") || ""}` });
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [allCategories, setAllCategories] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedManga, setSelectedManga] = useState(null) // null for add, filled for edit
  const [selectedForDeletion, setSelectedForDeletion] = useState(null)
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
    const fetchAllCategories = async () => {
      try {
        const { data } = await api.get("/Categories/GetCategories")
        setAllCategories(data.data)
      } catch (error) {

      } finally {
        setCategoryLoading(false)
      }
    }
    fetchAllCategories()
  }, [])
  const handleOpenAddDialog = () => {
    setSelectedManga(null)
    setDialogOpen(true)
  }
  const handleOpenEditDialog = (manga) => {
    setSelectedManga(manga)
    setDialogOpen(true)
  }
  const handleSaveManga = (form) => {
    if (selectedManga) {
      setMangas((prev) => prev.map(m => m.mangaID === selectedManga.mangaID ? form : m))
    } else {
      setMangas(prev => [{ ...form }, ...prev]);
    }
  }
  useEffect(() => {
  }, [mangas])
  const handleDeleteManga = (manga) => {
    setSelectedForDeletion(manga)
  }
  if (categoryLoading) return <LogoLoader />
  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              {t("manga")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("manage_manga")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
            sx={{ height: "fit-content", borderRadius: 3, direction: "ltr" }}
          >
            {t("add_manga")}
          </Button>
        </Box>
        <SearchBar fetchMangas={fetchMangas} serverError={serverError} setMangas={setMangas} value={value} handleChange={handleChange} />
        <GeneralPreviewCards mangas={mangas} loading={loading} pageNumber={pageNumber}
          count={count} setPageNumber={setPageNumber} hasNextPage={hasNextPage} pageSize={pageSize} onEditManga={handleOpenEditDialog} onDelete={handleDeleteManga}
        />
      </Stack>
      <MangaDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveManga}
        manga={selectedManga}
        allCategories={allCategories}
      />
      <AlertDialog
        mangas={mangas} setMangas={setMangas}
        selectedForDeletion={selectedForDeletion} setSelectedForDeletion={setSelectedForDeletion}
      />
    </>


  );
}

export default SearchBarMUI;
