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
//onDelete=true  open the confirmation delete dialog
//originalProfileImage => the origin image that stored in database
//image =>this image take the initial value from the originalProfileimage and create some edition on this useState image not on the original direcly
export default function ProfileAvatarEditor({ open, onClose, originalProfileImage, setOriginalProfileImage, onDelete, cropData, setCropData,onSave }) {
    const initialCropData = {scale: 1.2,rotate: 0,position: { x: .5, y: .5 }}
    const [image, setImage] = useState(originalProfileImage || null)
    const editorRef = useRef(null)
    const fileInputRef = useRef(null)
    const [tempCropData, setTempCropData] = useState(cropData)
    useEffect(() => {
        setImage(originalProfileImage || null)
    }, [originalProfileImage])
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

    const handleSave = () => {
        if (editorRef.current && image) {
            setCropData(tempCropData)
            setOriginalProfileImage(image)
            onSave(false)
        }
    }
    const handleDelete = () => {
        setImage(null)
        setOriginalProfileImage(null)
        setTempCropData(initialCropData)
        setCropData(initialCropData)
        onDelete(true)
    }

    const handleCancel = () => {
        setImage(null)
        setTempCropData(initialCropData)
    }
    

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Profile Picture</DialogTitle>
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
                                        Zoom
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
                                    <Button variant="outlined" onClick={handleUploadClick} startIcon={<CloudUpload />}>
                                        Choose Different Image
                                    </Button>
                                    <IconButton onClick={handleRotateRight} size="small">
                                        <RotateRight />
                                    </IconButton>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ textAlign: "center", py: 4 }}>
                                <CloudUpload sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    {originalProfileImage ? "Upload New Profile Picture" : "Upload Profile Picture"}
                                </Typography>
                                <Button variant="contained" onClick={handleUploadClick} startIcon={<CloudUpload />}>
                                    Choose Image
                                </Button>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={()=>{onClose()}}>Cancel</Button>
                    <Box>
                        {originalProfileImage && <Button onClick={() => {handleDelete() }} sx={{ mr: 1 }}>Delete</Button>}
                        {image && <Button onClick={()=>{handleSave()}} variant="contained">Save</Button>}
                    </Box>
                </DialogActions>
            </Dialog>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </>
    )
}
