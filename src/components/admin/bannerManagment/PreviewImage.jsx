import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

function PreviewImage({ previewImage, setPreviewImage }) {
    const { t } = useTranslation()
    return (
        <Dialog open={previewImage} onClose={() => { setPreviewImage(null) }} maxWidth="md" fullWidth>
            <DialogTitle>{t("preview image")}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "center" }}>
                    <Box
                        component="img"
                        src={previewImage || "/image/nature/cover_image_nature.png"}
                        alt="Cover"
                        sx={{
                            margin: "auto",
                            height: "auto",
                            objectFit: "cover",
                            display: 'block',
                            width: '100%',
                        }}
                    />
                    <Button variant="outlined" onClick={() => { setPreviewImage(null) }}>
                        {t("profile.cancel")}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewImage
