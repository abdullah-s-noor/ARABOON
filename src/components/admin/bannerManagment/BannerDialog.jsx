
import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button,
  Tabs,
  Tab,
  Divider,
  Fade,
  Box,
  Slide,
  Alert,
  Stack
} from "@mui/material";
import { useFormik } from 'formik';
import { getValidations } from "../shared/validation";
import { useTranslation } from "react-i18next";
import { api } from "../../../services/api";
import { addBannerFields } from "../shared/formFields";
import RenderFields from "../shared/RenderFields";
import UploadMangaImage from "../mangaManagment/mangaDialog/UploadMangaImage";
import Input from "../../../components/common/Input";
import ChapterTabsFields from "../chapterManagment/ChapterTabsFields";
function MangaDialog({ open, onClose, onSave, banner }) {
  const { t, i18n } = useTranslation()
  const validations = getValidations(t)
  const [serverError, setServerError] = useState(null)
  const { link } = addBannerFields;
  const [tab, setTab] = useState(0)
  const initialValues = {
    link: banner?.link || "",
    noteEn: banner?.noteEn || "",
    noteAr: banner?.noteAr || "",
    bannerImageUrl: banner?.url || "",
  };
  const onSubmit = async (values) => {
    setServerError(null)
    let payload = {
      noteEn: values.noteEn,
      noteAr: values.noteAr,
      link: values.link,
    }
    if (banner) {
      payload.id = banner.id
      const formData = new FormData();
      if (values.bannerImageUrl instanceof Blob) {
        formData.append("id", banner.id);
        formData.append("Image", values.bannerImageUrl);
      }
      try {
        // await 
        const [updateBannerInfo, uploadBannerImage] = await Promise.all([
          api.patch("/swipers", payload),
          ((values.bannerImageUrl instanceof Blob) ? api.patch("/swipers/upload-image", formData) : null),
        ]);
        payload = updateBannerInfo.data.data
        if (uploadBannerImage) {
          payload.url = uploadBannerImage.data.data.url
        }
        onSave(payload,updateBannerInfo.data.message)
        onClose()
        formik.resetForm()
      } catch (err) {
       if (err.response?.data?.errors?.link[0]) {
          setServerError(err.response?.data?.errors?.link[0])
        }
        else if (err.response?.data?.message) {
          setServerError(err.response?.data?.message)
        }  else {
          console.log(err)
        }
      }
    } else {
      try {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        })
        formData.append("Image", values.bannerImageUrl)
        const { data } = await api.post(`/swipers`, formData)
        payload = data.data
        onSave(payload,data.message)
        onClose()
        formik.resetForm()
      } catch (err) {
        if (err.response?.data?.errors?.link[0]) {
          setServerError(err.response?.data?.errors?.link[0])
        }
        else if (err.response?.data?.message) {
          setServerError(err.response?.data?.message)
        }  else {
          console.log(err)
        }
      }
    }

  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validationSchema: validations.addBannerFields
  });
  useEffect(() => {
    if (open) setTab(0);
  }, [open]);
  const linkInput = React.useMemo(() => (
    <Input
      type={link.type}
      title={link.title}
      id={link.id}
      name={link.name}
      value={formik.values[link.name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      errors={formik.errors}
      touched={formik.touched}
    />
  ), [formik.values.link, formik.errors.link, formik.touched.link]);
  return (
    <Dialog open={open} onClose={() => { onClose(); formik.resetForm();setServerError(null) }} maxWidth="md" fullWidth PaperProps={{ sx: { width: "100%", m: "0px", }, }}>
      <DialogTitle>{banner ? t("edit_banner") : t("add_banner")}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ pt: 2, overflowX: "hidden" }}>
          <Tabs value={tab} onChange={(e, t) => setTab(t)} sx={{ mb: 2 }}>
            <Tab label={i18n.language === "en" ? "English" : "الانجليزية"} />
            <Tab label={i18n.language === "en" ? "Arabic" : "العربية"} />
          </Tabs>
          {serverError && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: "#FFE9D5", color: "#7A0916", width: "100%", }}>
              {serverError}
            </Alert>
          )}
          {/* Container to reserve space and prevent height jump */}
          <Box sx={{ position: "relative", minHeight: 220 }}>
            {linkInput}
            <Slide direction={i18n.language === "en" ? "right" : "left"} in={tab === 0} mountOnEnter unmountOnExit timeout={400}>
              <div style={{ position: "absolute", width: "100%" }}>
                <ChapterTabsFields formik={formik} language="en" type="banner" />
              </div>
            </Slide>
            <Slide direction={i18n.language === "en" ? "left" : "right"} in={tab === 1} mountOnEnter unmountOnExit timeout={400}>
              <div style={{ position: "absolute", width: "100%" }}>
                <ChapterTabsFields formik={formik} language="ar" type="banner" />
              </div>
            </Slide>
          </Box>
          {/* Modern, light divider with optional label */}
          <Divider textAlign="center" sx={{ my: 0, fontWeight: "bold", "&::before, &::after": { borderColor: "primary.light", borderBottomWidth: 2 } }}>
            Meta
          </Divider>
          {/* this is for manga but also you can use this component for banner image  */}
          <UploadMangaImage pastMangaImage={banner?.url} formik={formik} aspectRatio={1280 / 480} fieldKey="bannerImageUrl" />
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => { onClose(); formik.resetForm();setServerError(null) }}>{i18n.language === "en" ? "Cancel" : "الغاء"}</Button>
          <Button
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              !formik.dirty ||
              !formik.values.bannerImageUrl
            }
            variant="contained" type="submit">
            {banner ? i18n.language === "en" ? "Update" : "تعديل" : i18n.language === "en" ? "Add" : "إضافة"}
          </Button>
        </DialogActions>
      </form>

    </Dialog>
  );
}

export default MangaDialog;
