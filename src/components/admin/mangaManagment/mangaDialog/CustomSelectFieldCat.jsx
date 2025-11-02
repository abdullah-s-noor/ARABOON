import { ArrowDropDown } from '@mui/icons-material';
import { Box, FormControl, Select, MenuItem, Chip, Typography, FormHelperText, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

function CustomSelectFieldCat({
    label,
    name,
    value,
    options, // array of {id, en, ar}
    error,
    touched,
    onChange,
    i18n
}) {
    const theme = useTheme();
    const isError = Boolean(error && touched);

    return (
        <Box>
            <Typography
                sx={{
                    mb: .5,
                    fontSize: "14px",
                    color: isError ? "#f87171" : theme.palette.text.secondary,
                    fontWeight: 500
                }}
            >
                {label}
            </Typography>
            <FormControl
                fullWidth
                variant="outlined"
                error={isError}
                sx={{
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                        bgcolor: theme.palette.mode === "dark" ? "#1e293b" : "#f9fafb",
                        color: theme.palette.mode === "dark" ? "#fff" : "#000",
                        borderRadius: "7px",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.palette.mode === 'dark'
                                ? "0 0 0 3px rgba(128,28,28,0.5)"
                                : "0 0 0 3px rgba(12,112,222,0.3)",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f87171",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        },
                    },
                    "& .MuiSelect-outlined": {
                        padding: "13px 14px"
                    },
                    "& .MuiFormHelperText-root": {
                        color: "#f87171",
                        fontSize: "0.8rem",
                        textAlign: i18n.language === "ar" ? "right" : "left"
                    }
                }}
            >
                <Select
                    multiple
                    name={name}
                    value={value}
                    onChange={onChange}
                    IconComponent={() => null} // نحذف السهم الافتراضي
                    sx={{
                        position: "relative",
                        "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            paddingRight: "14px !important", // مساحة للسهم
                        },
                    }}
                    renderValue={(selected) => {
                        return (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((id) => {
                                    const cat = options.find((c) => c.id === id);
                                    return (
                                        <Chip
                                            key={id}
                                            label={cat ? `${cat.en} // ${cat.ar}` : id}
                                            size="small"
                                        />
                                    );
                                })}
                            </Box>
                        );
                    }}
                >
                    {options.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.en + " // " + cat.ar}
                        </MenuItem>
                    ))}
                </Select>

                {/* 👇 سهم ثابت دائمًا */}
                <ArrowDropDown
                    sx={{
                        position: "absolute",
                        right: i18n.language === "ar" ? "unset" : "10px",
                        left: i18n.language === "ar" ? "10px" : "unset",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: theme.palette.text.secondary,
                        pointerEvents: "none",
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default CustomSelectFieldCat;
