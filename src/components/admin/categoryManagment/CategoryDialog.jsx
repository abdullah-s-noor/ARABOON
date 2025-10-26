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

function CategoryDialog({
  openDialog,
  editingCategory,
  handleCloseDialog,
  handleSaveCategory,
  formData,
  dialogLoading
}) {
  const [serverError, setServerError] = useState(null)
  const { t, i18n } = useTranslation()
  // All values use Formik!
  const initialValues = {
    categoryNameEn: '',
    categoryNameAr: '',
  }

  const validations = getValidations(t)

  const onSubmit = async (values, { setSubmitting }) => {
    handleSaveCategory(values)
    setSubmitting(false)
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
        <DialogActions>
          <Button onClick={() => { handleCloseDialog(); formik.resetForm() }}>{i18n.language === "en" ? "Cancel" : "الغاء"}</Button>
          <Button
            variant="contained"
            type="submit"
            disabled={
              dialogLoading || 
              formik.isSubmitting || 
              (!formik.values.categoryNameEn && !formik.values.categoryNameAr) ||
              (editingCategory &&
                formik.values.categoryNameEn === formData?.en &&
                formik.values.categoryNameAr === formData?.ar) 
            }
          >
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
    prevProps.openDialog === nextProps.openDialog &&
    prevProps.dialogLoading === nextProps.dialogLoading
  )
})
