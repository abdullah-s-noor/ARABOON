import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AlertSnackbar from "../../components/admin/categoryManagment/AlertSnackbar ";
import CategoryDialog from "../../components/admin/categoryManagment/CategoryDialog";
import CategoriesTable from "../../components/admin/categoryManagment/CategoriesTable";
import StatsCards from "../../components/admin/shared/StatsCards";
import useAllCategories from "../../hooks/useAllCategories";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";
import useResource from "../../hooks/useResource";

export default function CategoriesPage() {
  const {
    data: categories,
    loading,
    search,
    stats: statsCategories,
    handleSearchChange,
    handleAdd: handleAddCategory,
    handleUpdate: handleUpdateCategory,
    handleDelete: handleDeleteCategory,
    snackbar,
    setSnackbar,
    serverError,
    setStats,
    handleToggleActiveCat
  } = useResource({
    baseUrl: "/Categories",
    resourceName: "category",
    searchableFields: ["en", "ar"],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ en: "", ar: "" });
  const { t } = useTranslation()
  // Dialog handlers
  const handleOpenDialog = category => {
    if (category) {
      setEditingCategory(category);
      setFormData({ en: category.en, ar: category.ar });
    } else {
      setEditingCategory(null);
      setFormData({ en: "", ar: "" });
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setFormData({ en: "", ar: "" });
  };

  const handleSaveCategory = async (category, message) => {
    if (editingCategory) {
      handleUpdateCategory(category, message);
    } else {
      handleAddCategory(category, message);
    }
  };

  const handleDelete = async (category) => {
    try {
      console.log(category)
      const { data } = await api.delete(`/Categories/${category.id}`);
      handleDeleteCategory(category);
      setSnackbar({ open: true, message: data.message, severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
    }
  };


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
          <Box>
            <Typography variant="h5" component="h1" >
              {t("categories")}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {t("manage_categories")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ height: "fit-content", borderRadius: 3, direction: "ltr" }}
          >
            {t("add_category")}
          </Button>
        </Stack>
        <StatsCards stats={statsCategories} resource={"categories"} />
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <CategoriesTable
            serverError={serverError}
            categories={categories}
            handleToggleActive={handleToggleActiveCat}
            handleOpenDialog={handleOpenDialog}
            handleDeleteCategory={handleDelete}
            search={search}
            handleSearchChange={handleSearchChange}
            loading={loading}
          />
        </Box>

      </Stack>
      <CategoryDialog
        openDialog={openDialog}
        editingCategory={editingCategory}
        handleCloseDialog={handleCloseDialog}
        formData={formData}
        onSave={handleSaveCategory}
      />
      <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Container>
  );
}
