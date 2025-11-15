"use client"

import { useState, useCallback, useEffect } from "react"
import { Box, Button, Slider, Typography, CircularProgress } from "@mui/material"
import Cropper from "react-easy-crop"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

// Helper function to convert a Blob/File to a Base64 string
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export default function ImageCropper({
    onCropComplete,
    aspectRatio = 1250 / 463,
    onCancel,
    existingImage,
    loading
}) {
    const location = useLocation()
    const isManga = location.pathname.startsWith("/dashboard/manga-management")
    const isChapter = location.pathname.startsWith("/dashboard/manga/")
    const isBanner = location.pathname.startsWith("/dashboard/banner-management")
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { t } = useTranslation()

    useEffect(() => {
        if (!existingImage) {
            setImageSrc(null);
            setIsLoading(false);
            return;
        }

        // Check if the image is a URL or a Base64 string
        if (existingImage.startsWith("data:image")) {
            // It's already a Base64 string (from a new upload), no need to fetch
            setImageSrc(existingImage);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setIsLoading(false);
        } else {
            // It's a URL (from the backend), so we need to fetch it
            setIsLoading(true);
            const fetchAndSetImage = async () => {
                try {
                    const response = await fetch(existingImage);
                    const blob = await response.blob();
                    const base64String = await blobToBase64(blob);
                    setImageSrc(base64String);
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                } catch (error) {
                    console.error("Failed to fetch and convert image:", error);
                    setImageSrc(null);
                    // Handle error, e.g., show a toast notification
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAndSetImage();
        }
    }, [existingImage]);

    const onCropCompleteHandler = useCallback((area, areaPixels) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image))
            image.addEventListener("error", (error) => reject(error))
            image.setAttribute("crossOrigin", "anonymous")
            image.src = url
        })

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        if (!imageSrc || !pixelCrop) return null;
        // options can contain: { targetWidth, targetHeight }
        const targetWidth = isManga ? 352 : isChapter ? 450 :isBanner?1280: null;
        const targetHeight = isManga ? 528 : isChapter ? 250 :isBanner?480: null;

        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const { width: cropW, height: cropH, x, y } = pixelCrop;

        let finalWidth = cropW;
        let finalHeight = cropH;

        if (targetWidth && targetHeight) {
            // Both provided: stretch to fit exactly
            finalWidth = targetWidth;
            finalHeight = targetHeight;
        } else if (targetWidth) {
            // Only width: scale height proportionally
            finalWidth = targetWidth;
            finalHeight = (cropH / cropW) * finalWidth;
        } else if (targetHeight) {
            // Only height: scale width proportionally
            finalHeight = targetHeight;
            finalWidth = (cropW / cropH) * finalHeight;
        }

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        ctx.drawImage(
            image,
            x,
            y,
            cropW,
            cropH,
            0,
            0,
            finalWidth,
            finalHeight
        );

        return canvas.toDataURL("image/jpeg", 0.9);
    };



    const handleSave = async () => {
        if (croppedAreaPixels && imageSrc) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
            onCropComplete(croppedImage, imageSrc)
        }
    }

    return (
        <Box sx={{ width: "100%", height: "500px", position: "relative" }}>
            {isLoading || !imageSrc ? (
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
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {t("profile.loadingImage")}
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
                            {t("profile.zoom")}
                        </Typography>
                        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, value) => setZoom(value)} sx={{ mb: 2 }} />

                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                            <Button variant="outlined" onClick={onCancel}>
                                {t("profile.cancel")}
                            </Button>
                            <Button loading={loading} variant="contained" onClick={handleSave}>
                                {t("profile.save")}
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}