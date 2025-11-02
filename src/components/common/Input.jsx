import React, { useContext, useState } from 'react';
import { TextField, IconButton, InputAdornment, InputLabel, Box, useTheme } from '@mui/material';
import { Category, Email, Person, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
//disabled for profile page specifcly for user Information
//and userToken also for use information and use for padding 
function Input({ type, title, id, name, value, onChange, errors, onBlur, touched, disabled = false }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const { i18n, t } = useTranslation()
    const { userToken } = useContext(UserContext)
    const isMangaDashboard = useLocation().pathname.startsWith("/dashboard/manga-management")
    const theme = useTheme()
    //to change the color of icons in dark&light in disable
    const getIconColor = () => {
        if (disabled) {
            return theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'; // لون رمادي فاتح/داكن للـ disabled
        }
        return "oklch(70.4% 0.04 256.788)";
    };

    const getStartIcon = () => {
        const color = getIconColor();
        if (isMangaDashboard) return
        if (name === "categoryNameEn" || name === "categoryNameAr") return <Category sx={{ color: color, fontSize: "16px" }} />;
        if (type === "email") return <Mail size="16px" color={color} />;
        if (type === "password") return <Lock size="16px" color={color} />;
        if (type === "text") return <User size="16px" color={color} />;
        return null;
    };
    return (
        <>
            <Box>
                <InputLabel htmlFor="email" sx={{ mb: .5, fontSize: '14px', color: disabled ? "text.primary" : "text.secondary" }}>
                    {t(`formFields.${name}`)}
                </InputLabel>
                <TextField
                    autoComplete={
                        type === "password"
                            ? (name === "password" || name === "newPassword" || name === "confirmPassword" ? "new-password" : "current-password")
                            : type === "email"
                                ? "email"
                                : name === "userName"
                                    ? "userName"
                                    : undefined
                    }
                    type={type === 'password' && showPassword ? 'text' : type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors[name] && touched[name])}
                    // The error prop is a boolean (true or false) that tells the TextField component whether or not to show the red border and apply error styles.
                    onBlur={onBlur}
                    helperText={(touched[name] && errors[name]) ? errors[name] : ''}
                    //when make untouched the 
                    // Formik checks your validation function and adds an error for all fields.
                    //now your job to add this code (touched[name]&&errors[name]) to display the errors for the field was toached
                    InputLabelProps={type === 'date' && { shrink: true }}
                    InputProps={{
                        startAdornment: getStartIcon() && (
                            <InputAdornment position={i18n.language === 'en' ? "start" : 'end'}>{getStartIcon()}</InputAdornment>
                        ),
                        endAdornment: type === "password" ? (
                            <InputAdornment position={i18n.language === 'ar' ? "start" : 'end'}>
                                <IconButton onClick={handleClickShowPassword} edge={i18n.language === 'ar' ? "start" : 'end'}>
                                    {showPassword ? <EyeOff size="16px" color="oklch(70.4% 0.04 256.788)" /> : <Eye size="16px" color="oklch(70.4% 0.04 256.788)" />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                    placeholder={t(`formFields.enter_${name}`)}
                    sx={{
                        "& .MuiFormLabel-root.Mui-error": {
                            color: "#f87171", // أحمر فاتح للـ label error

                        },
                        "& .MuiFormHelperText-root.Mui-error": {
                            color: "#f87171", // نفس اللون للـ error text
                            textAlign: i18n.language === "en" ? "left" : "right"
                        },

                        "& .MuiOutlinedInput-root": {
                            "&.Mui-error": {
                                "& fieldset": {
                                    borderColor: "#f87171", // خليه أحمر فاتح غير الأحمر الأساسي
                                },
                            },
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark" ? (!disabled && "#1e293b") : "#f9fafb", // dark / light
                            color: (theme) =>
                                theme.palette.mode === "dark" ? "#fff" : "#000",

                            "&:hover fieldset": {
                                borderColor: theme => theme.palette.primary.main, // حسب الثيم
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: theme => theme.palette.primary.main, // يضل primary
                                boxShadow: (theme) => theme.palette.mode === 'dark' ?
                                    "0 0 0 3px rgba(128,28,28,0.5)"
                                    : "0 0 0 3px rgba(12,112,222,0.3)", // أزرق شفاف
                            },
                            borderRadius: "7px",
                            px: "14px",
                        },

                        "& .MuiOutlinedInput-input::placeholder": {
                            color: "oklch(70.4% 0.04 256.788)",
                            opacity: 1,
                            fontSize: "0.7rem",
                        },
                        "& .MuiFormLabel-root": {
                            color: "#94a3b8",
                        },
                        boxSizing: "border-box",
                        "& .MuiOutlinedInput-input": { padding: userToken ? "18px 0px" : "6px 0px" },
                    }}


                />
            </Box>
        </>
    );
}

export default Input;