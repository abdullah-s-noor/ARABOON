import { Cancel, CheckCircle } from '@mui/icons-material'
import { Box, Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ChapterLanguageAvailable({ formik }) {
    const {i18n}=useTranslation()
    return (
        <Box sx={{ display: "flex", flexDirection:"column",gap: 2, justifyContent: "center", mb: 2 }}>
            {/* EN switch */}
            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" sx={{ minWidth: 120 }}>
                    {i18n.language==="en"?"English Available":"متوفر باللغة الإنجليزية"}
                </Typography>
                <Switch
                    checked={formik.values.isEnglishAvailable}
                    onChange={() => formik.setFieldValue("isEnglishAvailable", !formik.values.isEnglishAvailable)}
                    color="success"
                />
                {formik.values.isEnglishAvailable ? (
                    <CheckCircle color="success" fontSize="small" />
                ) : (
                    <Cancel color="error" fontSize="small" />
                )}
                <Typography color={formik.values.isEnglishAvailable ? "success.main" : "error.main"}>
                    {formik.values.isEnglishAvailable ? "Active" : "Inactive"}
                </Typography>
            </Stack>

            {/* AR switch */}
            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" sx={{ minWidth: 120 }}>
                    {i18n.language==="en"?"Arabic Available":"متوفر باللغة العربية"}
                </Typography>
                <Switch
                    checked={formik.values.isArabicAvailable}
                    onChange={() => formik.setFieldValue("isArabicAvailable", !formik.values.isArabicAvailable)}
                    color="success"
                />
                {formik.values.isArabicAvailable ? (
                    <CheckCircle color="success" fontSize="small" />
                ) : (
                    <Cancel color="error" fontSize="small" />
                )}
                <Typography color={formik.values.isArabicAvailable ? "success.main" : "error.main"}>
                    {formik.values.isArabicAvailable ? "Active" : "Inactive"}
                </Typography>
            </Stack>
        </Box>
    )
}

export default ChapterLanguageAvailable
