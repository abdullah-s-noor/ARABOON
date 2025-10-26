import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function SelectLanguage({ language, setLanguage }) {
    const { i18n } = useTranslation();
    const isAdmin=useLocation().pathname.startsWith('/dashboard')
    const style = {
        language: {
            backgroundColor: isAdmin?"#222":"primary.main",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            height: 33,
            minWidth: 70,
            borderRadius: "20px",
            ".MuiSelect-icon": { color: "#fff" },
            ".MuiOutlinedInput-notchedOutline": {
                border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
            },
        }
    };
    return (
        <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            size="small"
            variant="outlined"
            sx={style.language}
        >
            <MenuItem value="EN"
                onClick={() => {
                    i18n.changeLanguage("en")
                }}>EN</MenuItem>
            <MenuItem value="AR"
                onClick={() => {
                    i18n.changeLanguage("ar")
                }}>AR</MenuItem>
        </Select>
    )
}

export default SelectLanguage
