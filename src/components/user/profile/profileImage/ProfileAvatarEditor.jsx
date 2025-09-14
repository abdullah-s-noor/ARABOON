"use client"

import { useState, useRef, useEffect } from "react"
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Slider,
    Typography,
    IconButton,
} from "@mui/material"
import { CloudUpload, RotateLeft, RotateRight } from "@mui/icons-material"
import AvatarEditor from "react-avatar-editor"
import { api } from "../../../../services/api"
import { handleImageBeforeSave } from "../handleImageBeforeSave"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
//onDelete=true  open the confirmation delete dialog
//originalProfileImage => the origin image that stored in database
//image =>this image take the initial value from the originalProfileimage and create some edition on this useState image not on the original direcly
export default function ProfileAvatarEditor({ open, onClose, originalProfileImage, setOriginalProfileImage, onDelete, cropData, setCropData, onSave,loading,setLoading,checkUserSession }) {
    const initialCropData = { scale: 1.2, rotate: 0, position: { x: .5, y: .5 } }
    const [image, setImage] = useState(originalProfileImage || null)
    const editorRef = useRef(null)
    const fileInputRef = useRef(null)
    const [tempCropData, setTempCropData] = useState(cropData)
    const { t, i18n } = useTranslation()
    useEffect(() => {
        setImage(originalProfileImage || null)
        setTempCropData(cropData)
    }, [open])
    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file)
            setTempCropData(initialCropData)
        }
    }

    const handleRotateLeft = () => {
        setTempCropData(prev => ({ ...prev, rotate: prev.rotate - 90 }))
    }

    const handleRotateRight = () => {
        setTempCropData(prev => ({ ...prev, rotate: prev.rotate + 90 }))
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }
    const handleSave = async () => {
        setLoading(true)
        const payloadImage = await handleImageBeforeSave(image); // لازم await هنا
        console.log(payloadImage);
        if (editorRef.current && image) {
            try {
                const formData = new FormData()
                formData.append("ProfileImage", payloadImage)
                formData.append("CropData.Position.X", tempCropData.position.x)
                formData.append("CropData.Position.Y", tempCropData.position.y)
                formData.append("CropData.Scale", tempCropData.scale)
                formData.append("CropData.Rotate", tempCropData.rotate)

                const { data } = await api.put("/users/upload/profile-image", formData)
                toast.success(data.message)
                setCropData(tempCropData)
                setOriginalProfileImage(image)
                checkUserSession()
                onSave(false)

            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                } else {
                    toast.error("something went wrong")
                }
            } finally {
                setLoading(false)
            }
        }
    }
    return (
        <>

            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{t("profile.edit_profile_image")}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 2 }}>
                        {image ? (
                            <>
                                <Box sx={{ position: "relative" }}>
                                    <AvatarEditor
                                        ref={editorRef}
                                        image={image}
                                        width={250}
                                        height={250}
                                        border={20}
                                        borderRadius={125}
                                        color={[255, 255, 255, 0.6]}
                                        scale={tempCropData.scale}
                                        rotate={tempCropData.rotate}
                                        position={tempCropData.position}
                                        onPositionChange={(pos) => setTempCropData(prev => ({ ...prev, position: pos }))}
                                    />
                                </Box>

                                <Box sx={{ width: "100%", px: 2 }}>
                                    <Typography variant="body2" gutterBottom>
                                        {t("profile.zoom")}
                                    </Typography>
                                    <Slider
                                        value={tempCropData.scale}
                                        onChange={(e, value) => setTempCropData(prev => ({ ...prev, scale: value }))}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton onClick={handleRotateLeft} size="small">
                                        <RotateLeft />
                                    </IconButton>
                                    <Button variant="outlined" onClick={handleUploadClick}>
                                        {t("profile.addNewProfileImage")}<CloudUpload sx={{ mx: 1 }} />
                                    </Button>
                                    <IconButton onClick={handleRotateRight} size="small">
                                        <RotateRight />
                                    </IconButton>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ textAlign: "center", py: 4 }}>
                                <CloudUpload sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                                <Typography variant="h6" gutterBottom>{t("profile.uplaod_profile_picture")}
                                </Typography>
                                <Button variant="contained" onClick={handleUploadClick}>
                                    {t("profile.choose_image")}<CloudUpload sx={{ mx: 1 }} />
                                </Button>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => { onClose(true) }}>{t("profile.cancel")}</Button>
                    <Box>
                        {originalProfileImage && <Button onClick={() => { onDelete(true) }} sx={{ mr: 1 }}>{t("profile.delete")}</Button>}
                        {image && <Button loading={loading} onClick={() => { handleSave() }} variant="contained">{t("profile.save")}</Button>}
                    </Box>
                </DialogActions>
            </Dialog>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </>
    )
}
