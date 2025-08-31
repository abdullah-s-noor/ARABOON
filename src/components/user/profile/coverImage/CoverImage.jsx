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
} from "@mui/material"
import { Camera, Upload, CropRotate, Delete } from "@mui/icons-material"
import ImageCropper from "./ImageCropper"
import AlertProfileImage from "../profileImage/AlertProfileImage"
import { api } from "../../../../services/api"
import { base64ToBlob, handleImageBeforeSave } from "../handleImageBeforeSave"
import { toast } from "react-toastify"
import usePhone from "../../../../hooks/usePhone"
import { useTranslation } from "react-i18next"

export default function ProfilePage({ originalImage, croppedImage }) {
    const [coverImage, setCoverImage] = useState(croppedImage || null)
    const [originalCoverImage, setOriginalCoverImage] = useState(originalImage || null)
    const [isEditingCover, setIsEditingCover] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [cropperMode, setCropperMode] = useState("upload")
    const [tempImageForCrop, setTempImageForCrop] = useState(null)
    const fileInputRef = useRef(null)
    const { isPhone } = usePhone()
    const { t, i18n } = useTranslation()
    const[loading,setLoading]=useState(false)

    const handleEditCoverClick = (event) => {
        setMenuAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }

    const handleUploadNew = () => {
        setCropperMode("upload")
        handleMenuClose()
        setTimeout(() => {
            fileInputRef.current?.click()
        }, 100)
    }

    const handleReposition = () => {
        if (originalCoverImage) {
            setCropperMode("reposition")
            setTempImageForCrop(originalCoverImage)
            setIsEditingCover(true)
        }
        handleMenuClose()
    }

    const handleRemoveFromMenu = () => {
        setShowDeleteConfirm(true)
        handleMenuClose()
    }

    const handleConfirmDelete = async () => {
        try {
            setLoading(true)
            const {data} =await api.delete("/users/cover-image")
            setCoverImage(null)
            setOriginalCoverImage(null)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.message){
                toast.error(error?.response?.data?.message)
            }else{
                toast.error("something went wrong")
            }
        } finally {
            setShowDeleteConfirm(false)
            setLoading(false)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
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
        setLoading(true)
        const payloadOriginalImage = await handleImageBeforeSave(originalImage)
        try {
            const formData = new FormData()
            formData.append("OriginalImage", base64ToBlob(payloadOriginalImage))
            formData.append("CroppedImage", base64ToBlob(croppedImage))
            const response = await api.put("/users/upload/cover-image", formData)
            console.log(response)
            setCoverImage(croppedImage)
            setOriginalCoverImage(payloadOriginalImage)
            
            setIsEditingCover(false)
            setTempImageForCrop(null)
            toast.success("Cover image updated successfully!")
        } catch (error) {
            const errorMessage = error?.response?.data?.Errors?.['OriginalImage.Length']?.[0] || "An error occurred."
            toast.error(errorMessage)
        }finally{
            setLoading(false)
        }
    }, [])

    const handleCancelCrop = () => {
        setIsEditingCover(false)
        setTempImageForCrop(null)
    }

    return (
        <Box
            sx={{
                position: "relative",
                bgcolor: "grey.100",
                overflow: "hidden",
                maxWidth: "1200px",
                width: "100%",
                height: "auto",
                margin: "0 auto",
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
            }}
        >
            <Box
                component="img"
                src={coverImage || "/image/nature/cover_image_nature.png"}
                alt="Cover"
                sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: 'block'
                }}
            />

            <Box sx={{ position: "absolute", top: 16, ...(i18n.language === 'en' ? { left: 16 } : { right: 16 }) }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleEditCoverClick}
                    sx={{
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        ...(isPhone ? {
                            "&:active": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                        } : {
                            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                        }),
                    }}
                >
                    <Camera sx={{ mx: 1 }} /> {t("profile.edit_cover")}
                </Button>
            </Box>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: i18n.language === "en" ? "left" : "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: i18n.language === "en" ? "left" : "right",
                }}
            >
                <MenuItem onClick={handleUploadNew}>
                    <ListItemIcon>
                        <Upload fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t("profile.addNewCoverImage")} />
                </MenuItem>

                {coverImage && (
                    <MenuItem onClick={handleReposition}>
                        <ListItemIcon>
                            <CropRotate fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("profile.reposition")} />
                    </MenuItem>
                )}

                {coverImage && (
                    <MenuItem onClick={handleRemoveFromMenu}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("profile.delete")} />
                    </MenuItem>
                )}
            </Menu>
            <Dialog open={isEditingCover} onClose={handleCancelCrop} maxWidth="lg" fullWidth>
                <DialogTitle>{t("profile.edit_cover_image")}</DialogTitle>
                <DialogContent>
                    <ImageCropper
                        onCropComplete={handleCropComplete}
                        aspectRatio={1250 / 463}
                        onCancel={handleCancelCrop}
                        existingImage={tempImageForCrop}
                        loading={loading}
                    />
                </DialogContent>
            </Dialog>

            <AlertProfileImage
                open={showDeleteConfirm}
                setOpen={setShowDeleteConfirm}
                handleDelete={handleConfirmDelete}
                type={"cover_image"}
                loading={loading}
            />

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </Box >
    )
}