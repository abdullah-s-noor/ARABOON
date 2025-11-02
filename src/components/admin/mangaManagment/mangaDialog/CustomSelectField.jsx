import React from "react";
import { Box, FormControl, Typography, Select, MenuItem, FormHelperText, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function CustomSelectField({
    value,
    name,
    label,
    options,
    onChange,
    error,
    touched,
    displayEmpty = false
}) {
    const theme = useTheme();

    const isError = Boolean(error && touched);
    const { i18n } = useTranslation()
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
                        padding: "18px 14px"
                    },
                    "& .MuiFormHelperText-root": {
                        color: "#f87171",
                        fontSize: "0.8rem",
                    }

                }}
            >
                <Select
                    value={value}
                    name={name}
                    onChange={onChange}
                    displayEmpty={displayEmpty}
                    IconComponent={() => null} // 🚫 تأكيد حذف السهم الافتراضي
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:
                            i18n.language === "ar" ? "flex-start" : "flex-end", // اتجاه النص
                        textAlign: i18n.language === "ar" ? "left" : "right",
                        "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            paddingRight: "14px !important", 
                        },


                    }}
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                paddingRight: "0px"
                            }}
                        >
                            <Typography>{selected || (displayEmpty ? "" : "")}</Typography>
                            <ArrowDropDownIcon
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: 24,
                                }}
                            />
                        </Box>
                    )}
                >
                    {displayEmpty && (
                        <MenuItem value="" disabled>
                            {i18n.language === "ar"
                                ? `اختر ${label}`
                                : `Select ${label.toLowerCase()}`}
                        </MenuItem>
                    )}
                    {options.map((opt) => (
                        <MenuItem key={opt.value || opt} value={opt.value || opt}>
                            {opt.label || opt}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {touched && error ? error : ""}
                </FormHelperText>
            </FormControl>
        </Box>
    );
}

export default CustomSelectField;
