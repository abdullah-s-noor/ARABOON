import { Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '../../../services/api'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

function LanguageAvailable({ langAvailable, setLangAvailable, selectedLanguage }) {
    const { i18n } = useTranslation()
    const mangaId = useLocation().pathname.split('/')[3]
    const [loading, setLoading] = useState(false)
    const handleChangeSwitch = async () => {
        const lang = selectedLanguage === "en" ? "english-toggle" : "arabic-toggle"
        try {
            setLoading(true)
            const { data } = await api.patch(`/Manga/${mangaId}/${lang}`)
            setLangAvailable(prev => ({ ...prev, [selectedLanguage]: !prev[selectedLanguage] }))
            toast.success(data.message)
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response?.data?.message)
            }
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" sx={{ minWidth: 120, whiteSpace: "nowrap" }}>
                    {i18n.language === "en" ? `${selectedLanguage === "en" ? "English" : "Arabic"} Available` : `متوفر باللغة ${selectedLanguage === "en" ? "الأنجليزية" : "العربية"}`}
                </Typography>
                <Switch
                    disabled={loading}
                    checked={langAvailable[selectedLanguage]}
                    onChange={() => { handleChangeSwitch() }}
                    color="success"
                />
            </Stack>
        </>
    )
}

export default LanguageAvailable
