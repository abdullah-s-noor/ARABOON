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
  serverError,
} = useResource({
  baseUrl: "/Categories",
  resourceName: "category",
  searchableFields: ["en", "ar"],
});

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ en: "", ar: "" });
  const [secondaryLoading, setSecondaryLoading] = useState(false)
  const [dialogLoading, setDialogLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const {t}=useTranslation()
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

  const handleSaveCategory = async values => {
    try {
      setDialogLoading(true)
      if (editingCategory) {
        console.log(editingCategory)
        const { data } = await api.put(`/Categories`, {
          id: editingCategory.id,
          categoryNameEn: values.categoryNameEn,
          categoryNameAr: values.categoryNameAr,
        });
        const updatedCat = {
          ...editingCategory,
          en: values.categoryNameEn,
          ar: values.categoryNameAr,
        };
        handleUpdateCategory(updatedCat);
        setSnackbar({ open: true, message: data.message || "Updated!", severity: "success" });
      } else {
        // ADD new
        const { data } = await api.post("/Categories", {
          categoryNameEn: values.categoryNameEn,
          categoryNameAr: values.categoryNameAr,
        });
        const newCat = {
          id: data.data?.id || String(Date.now()),
          en: values.categoryNameEn,
          ar: values.categoryNameAr,
          availableMangaCounts: 0,
          isActive: false,
          createdAt: new Date().toISOString().split("T")[0],
        };
        handleAddCategory(newCat);
        setSnackbar({ open: true, message: data.message || "Added!", severity: "success" });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to save", severity: "error" });
    } finally {
      setDialogLoading(false)
    }
  };

  const handleDelete = async (category) => {
    try {
      setSecondaryLoading(true)
      console.log(category)
      const { data } = await api.delete(`/Categories/${category.id}`);
      handleDeleteCategory(category);
      setSnackbar({ open: true, message: data.message, severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setSecondaryLoading(false)
    }
  };

  const handleToggleActive = async cat => {
    try {
      setSecondaryLoading(true)
      if (!cat) return;
      if (cat.isActive) {
        const { data } = await api.delete(`/Categories/${cat.id}/deactive`)
        console.log(data)
        setSnackbar({ open: true, message: data.message, severity: "success" });
      } else {
        const { data } = await api.post(`/Categories/${cat.id}/active`)
        setSnackbar({ open: true, message: data.message, severity: "success" });
      }
      handleUpdateCategory({ ...cat, isActive: !cat.isActive });
    } catch {
      setSnackbar({ open: true, message: "Failed to update status", severity: "error" });
    } finally {
      setSecondaryLoading(false)
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              {t("categories")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
        </Box>
        <StatsCards stats={statsCategories} resource={"categories"} />
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <CategoriesTable
            serverError={serverError}
            categories={categories}
            handleToggleActive={handleToggleActive}
            handleOpenDialog={handleOpenDialog}
            handleDeleteCategory={handleDelete}
            search={search}
            handleSearchChange={handleSearchChange}
            loading={loading}
            secondaryLoading={secondaryLoading}
          />
        </Box>

      </Stack>
      <CategoryDialog
        openDialog={openDialog}
        editingCategory={editingCategory}
        handleCloseDialog={handleCloseDialog}
        handleSaveCategory={handleSaveCategory}
        formData={formData}
        dialogLoading={dialogLoading}
      />
      <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Container>
  );
}
