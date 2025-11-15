"use client"

import { useState, useCallback, useRef } from "react"
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
} from "@mui/material"
import { Camera, Upload, CropRotate, Delete, Close } from "@mui/icons-material"
import ImageCropper from "../../../user/profile/coverImage/ImageCropper"
import { base64ToBlob, handleImageBeforeSave } from "../../../user/profile/handleImageBeforeSave"
import { useTranslation } from "react-i18next"

export default function UploadMangaImage({ pastMangaImage, formik, aspectRatio, fieldKey = "mangaImageUrl" }) {
    const { t, i18n } = useTranslation()
    const [mangaImage, setMangaImage] = useState(null)//cropped image 
    const [tempImageForCrop, setTempImageForCrop] = useState(null)
    const fileInputRef = useRef(null)
    const [isEditingCover, setIsEditingCover] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)
    const [imageName, setImageName] = useState("")
    const handleUploadNew = () => {
        setTimeout(() => {
            fileInputRef.current?.click()
        }, 100)
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageName(file.name)
            const reader = new FileReader()
            reader.onload = () => {
                setTempImageForCrop(reader.result)
                setIsEditingCover(true)
            }
            reader.readAsDataURL(file)
        }
        event.target.value = null
    }

    const handleCropComplete = useCallback(async (croppedImage, originalImage) => {
        const payloadOriginalImage = await handleImageBeforeSave(originalImage)
        const formData = new FormData()
        formData.append("OriginalImage", base64ToBlob(payloadOriginalImage))
        formData.append("CroppedImage", base64ToBlob(croppedImage))
        console.log(base64ToBlob(croppedImage))
        setMangaImage(croppedImage)
        setIsEditingCover(false)
        setTempImageForCrop(null)
        formik.setFieldValue(fieldKey, base64ToBlob(croppedImage))
    }, [])

    const handleCancelCrop = () => {
        setIsEditingCover(false)
        setTempImageForCrop(null)
    }
    const handleDeleteImage = () => {
        setMangaImage(null)
        setTempImageForCrop(null)
        formik.setFieldValue(fieldKey, pastMangaImage)
    }
    return (

        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: (theme) => theme.palette.background.paper,
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 0 10px rgba(255,255,255,0.05)"
                            : "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid",
                    borderColor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.1)",
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 0 15px rgba(255,255,255,0.1)"
                                : "0 4px 16px rgba(0,0,0,0.12)",
                    },
                    background: (theme) =>
                        theme.palette.mode === "dark"
                            ? "linear-gradient(180deg, #282626ff 0%, #222222 100%)"
                            : "linear-gradient(180deg, #f0f0f0 0%, #f0f0f0 100%)",
                }}
            >
                {/* Upload Manga Image Button */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Button
                        variant="contained"
                        onClick={handleUploadNew}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 2.5,
                            fontWeight: 500,
                        }}
                    >
                        <Upload />
                        {i18n.language === "en" ? "Upload Image" : "تحميل صورة"}
                    </Button>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: { xs: "none", md: "block" } }}
                    >
                        {i18n.language === "en"
                            ? `Choose or update the ${fieldKey === "mangaImageUrl"
                                ? "manga"
                                : fieldKey === "bannerImageUrl"
                                    ? "banner"
                                    : "chapter"
                            } image.`
                            : `اختر أو قم بتحديث صورة ${fieldKey === "mangaImageUrl"
                                ? "المانجا"
                                : fieldKey === "bannerImageUrl"
                                    ? "اللافتة"
                                    : "الفصل"
                            }.`}

                    </Typography>
                </Box>

                {/* Right Section: Image Info + Preview */}
                {mangaImage && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mt: { xs: 2, sm: 0 },
                            bgcolor: (theme) => theme.palette.secondary.main,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            boxShadow: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "inset 0 0 6px rgba(255,255,255,0.08)"
                                    : "inset 0 0 6px rgba(0,0,0,0.05)",
                        }}
                    >
                        <Camera fontSize="small" color="action" />
                        <Typography
                            variant="body2"
                            sx={{
                                maxWidth: { xs: 50, sm: 100 },
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                            title={imageName}
                        >
                            {imageName}
                        </Typography>

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => setPreviewImage(true)}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                fontSize: "0.8rem",
                            }}
                        >
                            {i18n.language === "en" ? "Preview" : "معاينة"}
                        </Button>
                        <IconButton onClick={() => handleDeleteImage()}>
                            <Close />
                        </IconButton>
                    </Box>
                )}
            </Box>

            <Dialog open={isEditingCover} onClose={handleCancelCrop} maxWidth="lg" fullWidth>
                <DialogTitle>{i18n.language === "en" ? "Edit Manga Picture" : "تعديل صورة المانجا"}</DialogTitle>
                <DialogContent>
                    <ImageCropper
                        onCropComplete={handleCropComplete}
                        aspectRatio={aspectRatio}
                        onCancel={handleCancelCrop}
                        existingImage={tempImageForCrop}
                        loading={false}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={previewImage} onClose={() => { setPreviewImage(false) }} maxWidth={fieldKey === "bannerImageUrl" ? "sm" : "xs"} fullWidth>
                <DialogTitle>{t("preview image")}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={mangaImage || "/image/nature/cover_image_nature.png"}
                            alt="Cover"
                            sx={{
                                margin: "auto",
                                height: "auto",
                                objectFit: "cover",
                                display: 'block',
                                width: '100%',
                                maxWidth: fieldKey === "bannerImageUrl" ? "100%" : { xs: 100, sm: 150, md: 230 },
                            }}
                        />
                        <Button variant="outlined" onClick={() => { setPreviewImage(false) }}>
                            {t("profile.cancel")}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </>
    )
}