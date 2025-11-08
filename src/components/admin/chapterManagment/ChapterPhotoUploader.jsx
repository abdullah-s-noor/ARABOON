import React, { useRef } from "react";
import { Box, Button, Typography, Link, Paper } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function ChapterPhotoUploader({ formik, fieldKey = "pages", totalPhotos = 20 }) {
    const inputRef = useRef(null);
    const {t}=useTranslation()
    const selectedCount = formik.values[fieldKey]?.length || 0;

    // Open file picker
    const handleAddPhotos = () => {
        inputRef.current.click();
    };

    // When user selects files
     const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files);

    // Filter only allowed types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length === 0) return;

    const mappedFiles = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    formik.setFieldValue(fieldKey, [...(formik.values[fieldKey] || []), ...mappedFiles]);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDeleteAll = () => {
    formik.setFieldValue(fieldKey, []);
  };

    return (
        <Box sx={{ py: 2, width: "100%", mx: "auto" }}>
            {/* Hidden file input */}
            <input
                type="file"
                multiple
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFilesSelected}
            />
            {
                selectedCount != 0 &&
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === "dark" ? "#350000" : "#e6f1ff",
                        mt: 2,
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomRightRadius:0,
                        borderBottomLeftRadius:0
                    }}
                >
                    <Typography variant="body1">
                        {t("uploadChaptersImage.photos_selected", { count: selectedCount })}
                    </Typography>
                    <Link
                        component="button"
                        onClick={handleDeleteAll}
                        underline="none"
                        sx={{ color: "primary.main", fontWeight: 500 }}
                    >
                        {t("uploadChaptersImage.delete_all")}
                    </Link>
                </Paper>}

            {/* Add Photos Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: "uppercase", py: 1.5,...(selectedCount!=0&&{borderTopLeftRadius: 0, borderTopRightRadius: 0 }) }}
                onClick={handleAddPhotos}
                disabled={selectedCount >= totalPhotos}
            >
                <AddPhotoAlternate />{t("uploadChaptersImage.add_chapter_photos")}
            </Button>

            {/* Status Bar */}
        </Box>
    );
}
