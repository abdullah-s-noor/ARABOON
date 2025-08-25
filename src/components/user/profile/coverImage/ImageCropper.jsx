"use client"

import { useState, useCallback, useEffect } from "react"
import { Box, Button, Slider, Typography } from "@mui/material"
import Cropper from "react-easy-crop"

export default function ImageCropper({
    onCropComplete,
    aspectRatio = 1200 / 450,
    onCancel,
    fileInputRef,
    onDelete,
    existingImage,
    hasExistingCover,
    mode = "upload", // 'upload' or 'reposition'
}) {
    const [imageSrc, setImageSrc] = useState("")
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    useEffect(() => {
        if (mode === "reposition" && existingImage) {
            setImageSrc(existingImage)
        } else if (mode === "upload") {
            // الصورة ستأتي من existingImage prop بعد اختيارها في parent
            if (existingImage) {
                setImageSrc(existingImage)
            }
        }
    }, [mode, existingImage])

    const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image))
            image.addEventListener("error", (error) => reject(error))
            image.setAttribute("crossOrigin", "anonymous")
            image.src = url
        })

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        )

        return canvas.toDataURL("image/jpeg")
    }

    const handleSave = async () => {
        if (croppedAreaPixels && imageSrc) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
            onCropComplete(croppedImage, imageSrc)
        }
    }

    return (
        <Box sx={{ width: "100%", height: "500px", position: "relative" }}>
            {!imageSrc ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        border: "2px dashed",
                        borderColor: "grey.300",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        جاري تحميل الصورة...
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={setZoom}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                            Zoom
                        </Typography>
                        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, value) => setZoom(value)} sx={{ mb: 2 }} />

                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                            <Button variant="outlined" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    )
}
