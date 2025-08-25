"use client"

import { useState, useCallback, useRef } from "react"
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Avatar,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import { Camera, Edit, Upload, CropRotate, Delete } from "@mui/icons-material"
import ImageCropper from "./ImageCropper"

export default function ProfilePage() {
    const [coverImage, setCoverImage] = useState(null)
    const [originalCoverImage, setOriginalCoverImage] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [isEditingCover, setIsEditingCover] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [cropperMode, setCropperMode] = useState("upload") // 'upload' or 'reposition'
    const fileInputRef = useRef(null)

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
            setIsEditingCover(true)
        }
        handleMenuClose()
    }

    const handleRemoveFromMenu = () => {
        setShowDeleteConfirm(true)
        handleMenuClose()
    }

    const handleConfirmDelete = () => {
        setCoverImage(null)
        setOriginalCoverImage(null)
        setShowDeleteConfirm(false)
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setOriginalCoverImage(reader.result)
                setIsEditingCover(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCropComplete = useCallback((croppedImage, originalImage) => {
        setCoverImage(croppedImage)
        if (originalImage) {
            setOriginalCoverImage(originalImage)
        }
        setIsEditingCover(false)
    }, [])

    const handleDeleteCover = useCallback(() => {
        setCoverImage(null)
        setOriginalCoverImage(null)
        setIsEditingCover(false)
    }, [])

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
                }}
            />

            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Camera />}
                    onClick={handleEditCoverClick}
                    sx={{
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                    }}
                >
                    Edit Cover
                </Button>
            </Box>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleUploadNew}>
                    <ListItemIcon>
                        <Upload fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="تحميل صورة غلاف جديدة" />
                </MenuItem>

                {coverImage && (
                    <MenuItem onClick={handleReposition}>
                        <ListItemIcon>
                            <CropRotate fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="إعادة تغيير الموضع" />
                    </MenuItem>
                )}

                {coverImage && (
                    <MenuItem onClick={handleRemoveFromMenu}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="إزالة" />
                    </MenuItem>
                )}
            </Menu>
            <Dialog open={isEditingCover} onClose={() => setIsEditingCover(false)} maxWidth="lg" fullWidth>
                <DialogTitle>Edit Cover Image</DialogTitle>
                <DialogContent>
                    <ImageCropper
                        onCropComplete={handleCropComplete}
                        aspectRatio={1250 / 463}
                        onCancel={() => setIsEditingCover(false)}
                        fileInputRef={fileInputRef}
                        onDelete={handleDeleteCover}
                        existingImage={originalCoverImage}
                        hasExistingCover={!!coverImage}
                        mode={cropperMode}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <DialogTitle>تأكيد الحذف</DialogTitle>
                <DialogContent>
                    <Typography>هل أنت متأكد من حذف صورة الغلاف؟</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteConfirm(false)}>No</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </Box >
    )
}
