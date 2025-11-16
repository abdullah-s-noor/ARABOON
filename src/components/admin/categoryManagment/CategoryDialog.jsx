import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { getValidations } from '../shared/validation'
import { useTranslation } from 'react-i18next'
import RenderFields from '../shared/RenderFields'
import { addCategoryFields } from '../shared/formFields'
import { api } from '../../../services/api'

function CategoryDialog({
  openDialog,
  editingCategory,
  handleCloseDialog,
  onSave,
  formData,
}) {
  const [serverError, setServerError] = useState(null)
  const { t, i18n } = useTranslation()
  // All values use Formik!
  const initialValues = {
    categoryNameEn: formData?.en || '',
    categoryNameAr: formData?.ar || '',
  }

  const validations = getValidations(t)

  const onSubmit = async (values) => {
    console.log(values)
    setServerError(null)
    try {
      if (editingCategory) {
        console.log(editingCategory)
        const { data } = await api.put(`/Categories`, {
          id: editingCategory.id,
          categoryNameEn: values.categoryNameEn,
          categoryNameAr: values.categoryNameAr,
        });
        console.log(data)
        const updatedCat = {
          ...editingCategory,
          en: values.categoryNameEn,
          ar: values.categoryNameAr,
        };
        onSave(updatedCat, data.message);
      } else {
        // ADD new
        const { data } = await api.post("/Categories", {
          categoryNameEn: values.categoryNameEn,
          categoryNameAr: values.categoryNameAr,
        });
        console.log(data)
        const newCat = {
          id: data.data?.id || String(Date.now()),
          en: values.categoryNameEn,
          ar: values.categoryNameAr,
          availableMangaCounts: 0,
          isActive: false,
          createdAt: new Date().toISOString().split("T")[0],
        };
        onSave(newCat, data.message);
        handleCloseDialog()
        formik.resetForm()
      }
      handleCloseDialog();
    } catch (error) {
      if (error.response?.data?.message) {
        setServerError(error.response?.data?.message)
      }
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validations.addCategoryFields,
    enableReinitialize: true,

  })
  useEffect(() => {
    if (editingCategory) {
      formik.setValues({
        categoryNameEn: formData?.en || '',
        categoryNameAr: formData?.ar || ''
      });
    }
  }, [openDialog, formData]);

  return (
    <Dialog open={openDialog} onClose={() => { handleCloseDialog(); formik.resetForm() }} maxWidth="sm" fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          m: "0px",
        },
      }}>
      <DialogTitle>
        {editingCategory ? t("edit_category") : t("add_category")}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {/* Fields use RenderFields - all are controlled by Formik */}
            <RenderFields formik={formik} fields={addCategoryFields} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => { handleCloseDialog(); formik.resetForm(); setServerError(null) }}>{i18n.language === "en" ? "Cancel" : "الغاء"}</Button>
          <Button
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              !formik.dirty
            }
            variant="contained" type="submit">
            {editingCategory ? i18n.language === "en" ? "Update" : "تعديل" : i18n.language === "en" ? "Add" : "إضافة"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default React.memo(CategoryDialog, (prevProps, nextProps) => {
  return (
    prevProps.formData === nextProps.formData &&
    prevProps.openDialog === nextProps.openDialog
  )
})
