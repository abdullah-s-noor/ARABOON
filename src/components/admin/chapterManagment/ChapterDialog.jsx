
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
import ChapterTabsFields from "./ChapterTabsFields";
import { getValidations } from "../shared/validation";
import { useTranslation } from "react-i18next";
import { api } from "../../../services/api";
import { addChapterFields } from "../shared/formFields";
import Input from "../../common/Input";
import UploadMangaImage from "../mangaManagment/mangaDialog/UploadMangaImage";
import ChapterPhotoUploader from "./ChapterPhotoUploader";
import { useLocation } from "react-router-dom";
function MangaDialog({ open, onClose, onSave, chapter, selectedLanguage, setLangAvailable }) {
    const { t, i18n } = useTranslation()
    const validations = getValidations(t)
    const { chapterNo } = addChapterFields;
    const mangaId = useLocation().pathname.split('/')[3]
    const [tab, setTab] = useState(0)
    const [serverError, setServerError] = useState(null)
    const initialValues = {
        chapterNo: chapter ? "" + Number(chapter.title.replace('#', '')) : "",
        chapterTitleEn: chapter?.chapterTitleEn || "",
        chapterTitleAr: chapter?.chapterTitleAr || "",
        chapterImageUrl: chapter?.chapterImageUrl || "",
        pages: []
    };
    const onSubmit = async (values) => {
        setServerError(null)
        let payload = {
            EnglishChapterTitle: values.chapterTitleEn,
            ChapterNo: values.chapterNo,
            ArabicChapterTitle: values.chapterTitleAr,
            Language: selectedLanguage === "en" ? "English" : "Arabic",
        }
        if (chapter) {
            payload.id = chapter.chapterID
            const formData1 = new FormData();
            if (values.chapterImageUrl instanceof Blob) {
                formData1.append("Id", chapter.chapterID)
                formData1.append("Image", values.chapterImageUrl)
            }
            const formData2 = new FormData();
            if (values.pages.length !== 0) {
                formData2.append("Id", chapter.chapterID)
                values.pages.forEach(page => {
                    formData2.append("Images", page.file);
                })
            }

            try {
                // await 
                const [updateChapterInfo, uploadChapterImage, uploadChapterPages] = await Promise.all([
                    api.put("/Chapters", payload),
                    ((values.chapterImageUrl instanceof Blob) ? api.patch("/Chapters/upload-image", formData1) : null),
                    ((values.pages.length !== 0) ? api.patch("/Chapters/upload-images", formData2) : null)
                ]);
                payload = updateChapterInfo.data.data
                if (uploadChapterImage) {
                    payload.chapterImageUrl = uploadChapterImage.data.data.imageUrl
                }
                setLangAvailable(prev => ({ ...prev, [selectedLanguage]: updateChapterInfo.data.meta[selectedLanguage === "en" ? "isEnglishAvailable" : "isArabicAvailable"] }))
                onSave(payload)
            } catch (err) {
                if (err.response?.data?.errors?.chapterNo[0]) {
                    setServerError(err.response?.data?.errors?.chapterNo[0])
                } else {
                    console.log(err)
                }
            }
        } else {
            payload.MangaId = mangaId
            try {
                const formData = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    formData.append(key, value);
                })
                formData.append("Image", values.chapterImageUrl)
                values.pages.forEach(page => {
                    formData.append("ChapterImages", page.file);
                })
                const { data } = await api.post(`/Chapters`, formData)
                setLangAvailable(prev => ({ ...prev, [selectedLanguage]: data.meta[selectedLanguage === "en" ? "isEnglishAvailable" : "isArabicAvailable"] }))
                onSave(data.data)
                onClose()
                setServerError(null)
                formik.resetForm()
            } catch (err) {
                if (err.response?.data?.errors?.chapterNo[0]) {
                    setServerError(err.response?.data?.errors?.chapterNo[0])
                } else {
                    console.log(err)
                }
            }
        }
    }
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit,
        validationSchema: validations.addChapterFields
    });
    useEffect(() => {
        if (open) setTab(0);
    }, [open]);
    const chapterNoInput = React.useMemo(() => (
        <Input
            type={chapterNo.type}
            title={chapterNo.title}
            id={chapterNo.id}
            name={chapterNo.name}
            value={formik.values[chapterNo.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
        />
    ), [formik.values.chapterNo, formik.errors.chapterNo, formik.touched.chapterNo]);

    return (
        <Dialog open={open} onClose={() => {setServerError(null); onClose(); formik.resetForm() }} maxWidth="md" fullWidth PaperProps={{sx: {width: "100%",m: "0px",},}}>
            <DialogTitle>{chapter ? t("edit_chapter") : t("add_chapter")}</DialogTitle>
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
                        {chapterNoInput}
                        <Slide direction={i18n.language === "en" ? "right" : "left"} in={tab === 0} mountOnEnter unmountOnExit timeout={400}>
                            <div style={{ position: "absolute", width: "100%" }}>
                                <ChapterTabsFields formik={formik} language="en" />
                            </div>
                        </Slide>
                        <Slide direction={i18n.language === "en" ? "left" : "right"} in={tab === 1} mountOnEnter unmountOnExit timeout={400}>
                            <div style={{ position: "absolute", width: "100%" }}>
                                <ChapterTabsFields formik={formik} language="ar" />
                            </div>
                        </Slide>
                    </Box>
                    {/* Modern, light divider with optional label */}
                    <Divider textAlign="center" sx={{ my: 0, fontWeight: "bold", "&::before, &::after": { borderColor: "primary.light", borderBottomWidth: 2 } }}>
                        Meta
                    </Divider>
                    {/* this is for manga but also you can use this component for chapter image  */}
                    <UploadMangaImage pastMangaImage={chapter?.chapterImageUrl} formik={formik} aspectRatio={450 / 250} fieldKey="chapterImageUrl" />
                    <ChapterPhotoUploader formik={formik} />
                </DialogContent>
                <DialogActions sx={{ display: "flex", gap: 1 }}>
                    <Button onClick={() => { onClose(); formik.resetForm();setServerError(null) }}>{i18n.language === "en" ? "Cancel" : "الغاء"}</Button>
                    <Button
                        disabled={
                            !formik.isValid ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.values.chapterImageUrl ||
                            (!chapter && formik.values.pages.length === 0)}
                        variant="contained" type="submit">
                        {chapter ? i18n.language === "en" ? "Update" : "تعديل" : i18n.language === "en" ? "Add" : "إضافة"}
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
}

export default MangaDialog;
