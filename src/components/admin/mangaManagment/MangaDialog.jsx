
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
    Alert
} from "@mui/material";
import { useFormik } from 'formik';
import ChapterLanguageAvailable from "./mangaDialog/ChapterLanguageAvailable";
import MangaSharedFields from "./mangaDialog/MangaSharedFields";
import MangaTabsFields from "./mangaDialog/MangaTabsFields";
import { getValidations } from "../shared/validation";
import { useTranslation } from "react-i18next";
import UploadMangaImage from "./mangaDialog/UploadMangaImage";
import { api } from "../../../services/api";
function MangaDialog({ open, onClose, onSave, manga, allCategories }) {
    const { t, i18n } = useTranslation()
    const validations = getValidations(t)
    const [tab, setTab] = useState(0)
    const [serverError, setServerError] = useState(null)
    const initialValues = {
        mangaNameEn: manga?.name?.en || "",
        mangaNameAr: manga?.name?.ar || "",
        authorEn: manga?.author?.en || "",
        authorAr: manga?.author?.ar || "",
        descriptionEn: manga?.description?.en || "",
        descriptionAr: manga?.description?.ar || "",
        typeEn: manga?.type?.en || "Manga",
        typeAr: manga?.type?.ar || "مانجا",
        statusEn: manga?.status?.en || "Ongoing",
        statusAr: manga?.status?.ar || "مستمر",
        categories: manga?.categories?.map((cat) => cat.id) || [],
        mangaImageUrl: manga?.mangaImageUrl || "",
        isArabicAvailable: manga?.isArabicAvailable,
        isEnglishAvailable: manga?.isEnglishAvailable,
    };
    const onSubmit = async (values) => {
        let payload = {
            mangaNameEn: values.mangaNameEn.trim(),
            mangaNameAr: values.mangaNameAr.trim(),
            statusEn: values.statusEn,
            statusAr: values.statusAr,
            authorEn: values.authorEn.trim(),
            authorAr: values.authorAr.trim(),
            typeEn: values.typeEn,
            typeAr: values.typeAr,
            descriptionEn: values.descriptionEn.trim(),
            descriptionAr: values.descriptionAr.trim(),
            categoriesIds: values.categories
        }
        setServerError(null)
        if (manga) {
            try {
                payload.mangaId = manga.mangaID
                const formData = new FormData();
                if (values.mangaImageUrl instanceof Blob) {
                    formData.append("Id", payload.mangaId)
                    formData.append("Image", values.mangaImageUrl)
                }
                const [updateMangaInfo, englishToggle, arabicToggle, uploadImage] = await Promise.all([
                    (api.put("/Manga", payload)),
                    (!(manga.isArabicAvailable === values.isArabicAvailable) ? api.patch(`/Manga/${payload.mangaId}/arabic-toggle`) : null),
                    (!(manga.isEnglishAvailable === values.isEnglishAvailable) ? api.patch(`/Manga/${payload.mangaId}/english-toggle`) : null),
                    ((values.mangaImageUrl instanceof Blob) ? api.patch("/Manga/upload-image", formData) : null)
                ]);
                if (updateMangaInfo?.data?.data) payload = { ...updateMangaInfo.data.data };
                if (arabicToggle) payload.isArabicAvailable = values.isArabicAvailable
                if (englishToggle) payload.isEnglishAvailable = values.isEnglishAvailable
                if (uploadImage) payload.mangaImageUrl = uploadImage.data.data.imageUrl
                else payload.mangaImageUrl = manga.mangaImageUrl
                onSave(payload)
                onClose()
                formik.resetForm()
            } catch (err) {
                const error = err.response.data.errors
                if (error) {
                    if (error.mangaNameAr) {
                        setServerError(error.mangaNameAr[0])
                    } else if (error.mangaNameEn) {
                        setServerError(error.mangaNameEn[0])
                    }
                }
            }
        } else {
            try {
                const formData = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    if (key === "categoriesIds") {
                        if (payload.categoriesIds.length === 0) {
                        } else {
                            value.map((category) => {
                                formData.append("CategoriesIds", category);
                            })
                        }
                    } else if (value != null && value !== "") {
                        formData.append(key, value);
                    }
                });
                formData.append("Image", values.mangaImageUrl);
                const { data } = await api.post(`/Manga`, formData);
                onSave(data.data)
                onClose()
                formik.resetForm()
            }
            catch (err) {
                const error = err.response.data.errors
                if (error) {
                    if (error.mangaNameAr) {
                        setServerError(error.mangaNameAr[0])
                    } else if (error.mangaNameEn) {
                        setServerError(error.mangaNameEn[0])
                    }
                }
            }
        }

    }
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit,
        validationSchema: validations.addMangaFields
    });
    useEffect(() => {
        if (open) setTab(0);
    }, [open]);
    return (
        <Dialog open={open} onClose={() => { onClose(); formik.resetForm() }} maxWidth="md" fullWidth>
            <DialogTitle>{manga ? t("edit_manga") : t("add_manga")}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent sx={{ pt: 2 }}>
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
                    <Box sx={{ position: "relative", minHeight: 260 }}>
                        <Slide direction={i18n.language === "en" ? "right" : "left"} in={tab === 0} mountOnEnter unmountOnExit timeout={400}>
                            <div style={{ position: "absolute", width: "100%" }}>
                                <MangaTabsFields formik={formik} language="en" />
                            </div>
                        </Slide>
                        <Slide direction={i18n.language === "en" ? "left" : "right"} in={tab === 1} mountOnEnter unmountOnExit timeout={400}>
                            <div style={{ position: "absolute", width: "100%" }}>
                                <MangaTabsFields formik={formik} language="ar" />
                            </div>
                        </Slide>
                    </Box>

                    {/* Modern, light divider with optional label */}
                    <Divider
                        textAlign="center"
                        sx={{
                            my: 10, fontWeight: "bold",
                            "&::before, &::after": { borderColor: "primary.light", borderBottomWidth: 2 }
                        }}>
                        Meta
                    </Divider>

                    <MangaSharedFields formik={formik} allCategories={allCategories} />
                    {manga && <ChapterLanguageAvailable formik={formik} />}
                    <UploadMangaImage pastMangaImage={manga?.mangaImageUrl} formik={formik} />


                </DialogContent>
                <DialogActions sx={{ display: "flex", gap: 1 }}>
                    <Button onClick={() => { onClose(); formik.resetForm() }}>{i18n.language === "en" ? "Cancel" : "الغاء"}</Button>
                    <Button
                        disabled={
                            !formik.isValid ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.values.mangaImageUrl
                        }
                        variant="contained" type="submit">
                        {manga ? i18n.language === "en" ? "Update" : "تعديل" : i18n.language === "en" ? "Add" : "إضافة"}
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
}

export default MangaDialog;
