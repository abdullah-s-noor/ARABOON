import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, InputLabel, Box } from '@mui/material';
import { Email, Person, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useTranslation } from 'react-i18next';

function Input({ type, title, id, name, value, onChange, errors, onBlur, touched, disabled = false }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const {i18n}=useTranslation()
    const getStartIcon = () => {
        if (type === "email") return <Mail size="16px" color="oklch(70.4% 0.04 256.788)" />;
        if (type === "password") return <Lock size="16px" color="oklch(70.4% 0.04 256.788)" />;
        if (type === "text") return <User size="16px" color="oklch(70.4% 0.04 256.788)" />;
        return null;
    };
    return (
        <>
            <Box>
                <InputLabel htmlFor="email" sx={{ mb: .5, fontSize: '14px', color: "text.secondary" }}>
                    {title}
                </InputLabel>
                <TextField
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
                            <InputAdornment position={i18n.language==='en'?"start":'end'}>{getStartIcon()}</InputAdornment>
                        ),
                        endAdornment: type === "password" ? (
                            <InputAdornment position={i18n.language==='ar'?"start":'end'}>
                                <IconButton onClick={handleClickShowPassword} edge={i18n.language==='ar'?"start":'end'}>
                                    {showPassword ? <EyeOff size="16px" color="oklch(70.4% 0.04 256.788)" /> : <Eye size="16px" color="oklch(70.4% 0.04 256.788)" />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                    placeholder="Enter your name"
                    sx={{
                        "& .MuiFormLabel-root.Mui-error": {
                            color: "#f87171", // أحمر فاتح للـ label error
                        },
                        "& .MuiFormHelperText-root.Mui-error": {
                            color: "#f87171", // نفس اللون للـ error text
                        },

                        "& .MuiOutlinedInput-root": {
                            "&.Mui-error": {
                                "& fieldset": {
                                    borderColor: "#f87171", // خليه أحمر فاتح غير الأحمر الأساسي
                                },
                            },
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark" ? "#1e293b" : "#f9fafb", // dark / light
                            color: (theme) =>
                                theme.palette.mode === "dark" ? "#fff" : "#000",

                            "&:hover fieldset": {
                                borderColor: theme => theme.palette.primary.main, // حسب الثيم
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: theme => theme.palette.primary.main, // يضل primary
                                boxShadow: "0 0 0 3px rgba(12,112,222,0.3)", // أزرق شفاف
                            },
                            borderRadius: "7px",
                            px: "14px",
                        },

                        "& .MuiOutlinedInput-input::placeholder": {
                            color: "oklch(70.4% 0.04 256.788)",
                            opacity: 1,
                            fontSize: "0.8rem",
                        },
                        "& .MuiFormLabel-root": {
                            color: "#94a3b8",
                        },
                        boxSizing: "border-box",
                        "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                    }}

                />
            </Box>
        </>
    );
}

export default Input;