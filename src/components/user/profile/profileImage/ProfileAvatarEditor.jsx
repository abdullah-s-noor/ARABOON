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

export default function ProfileAvatarEditor({ open, onClose, onSave, existingImage, hasExistingProfile, onDelete }) {
    const [image, setImage] = useState(existingImage || null)
    const [scale, setScale] = useState(1.2)
    const [rotate, setRotate] = useState(0)
    const editorRef = useRef(null)
    const fileInputRef = useRef(null)
    useEffect(() => {
        setImage(existingImage || null)
    }, [existingImage])
    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file)
        }
    }

    const handleSave = () => {
        if (editorRef.current && image) {
            const canvas = editorRef.current.getImageScaledToCanvas()
            const croppedImageUrl = canvas.toDataURL()
            onSave(croppedImageUrl, image)
        }
    }

    const handleRotateLeft = () => {
        setRotate(rotate - 90)
    }

    const handleRotateRight = () => {
        setRotate(rotate + 90)
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()

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
                                        scale={scale}
                                        rotate={rotate}
                                    />
                                </Box>

                                <Box sx={{ width: "100%", px: 2 }}>
                                    <Typography variant="body2" gutterBottom>
                                        Zoom
                                    </Typography>
                                    <Slider
                                        value={scale}
                                        onChange={(e, value) => setScale(value)}
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
                                    {hasExistingProfile ? "Upload New Profile Picture" : "Upload Profile Picture"}
                                </Typography>
                                <Button variant="contained" onClick={handleUploadClick} startIcon={<CloudUpload />}>
                                    Choose Image
                                </Button>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Box>
                        {existingImage && <Button onClick={() => { onDelete(true) }} sx={{ mr: 1 }}>Delete</Button>}
                        {image && <Button onClick={handleSave} variant="contained">Save</Button>}
                    </Box>
                </DialogActions>
            </Dialog>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </>
    )
}
