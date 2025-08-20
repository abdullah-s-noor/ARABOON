import { Email, Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import React, { useState } from 'react'

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Auth submission:", { formData })

    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }


    return (
        <>
            <Box sx={{ width: '100%', mb: 3 }}>
                <Typography
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '30px',
                        textAlign: 'center',
                        fontWeight: 700,
                        mb: 1
                    }}
                >
                    Join the ARABOON
                </Typography>
                <Typography
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center'
                    }}>
                    Create your account and unlock your potential
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}
            >
                <Box>
                    <InputLabel htmlFor="email" sx={{ mb: .5, fontSize: '14px', color: "#cbd5e1" }}>
                        Full Name
                    </InputLabel>
                    {/* Full Name */}
                    <TextField
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <User size="16px" color="oklch(70.4% 0.04 256.788)" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Enter your name"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                color: "#fff",
                                "&:hover fieldset": { borderColor: "primary.main" }, // purple hover
                                "&.Mui-focused": {
                                    borderColor: "primary.main",
                                    boxShadow: "0 0 0 4px rgba(128,28,28,0.5)", // 🔥 نفس الـ ring من الكلاس
                                },
                                borderRadius: "7px", // 🔥 عدل القيمة حسب ما تحب

                            },
                            "& .MuiOutlinedInput-input::placeholder": {
                                color: "oklch(70.4% 0.04 256.788)",
                                opacity: 1,
                                fontSize: "0.8rem",
                            },
                            "& .MuiFormLabel-root": { color: "#94a3b8" },
                            boxSizing: "border-box",
                            "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                        }}
                    />
                </Box>

                {/* Email */}
                <Box>

                    <InputLabel htmlFor="email" sx={{ fontSize: '14px', color: "#cbd5e1" }}>
                        Email
                    </InputLabel>
                    <TextField
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail size="16px" color="oklch(70.4% 0.04 256.788)" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Enter your email"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                color: "#fff",
                                "&:hover fieldset": { borderColor: "primary.main" }, // purple hover
                                "&.Mui-focused": {
                                    borderColor: "primary.main",
                                    boxShadow: "0 0 0 5px rgba(128,28,28,0.5)", // 🔥 نفس الـ ring من الكلاس
                                },
                            },
                            "& .MuiOutlinedInput-input::placeholder": {
                                color: "oklch(70.4% 0.04 256.788)",
                                opacity: 1,
                                fontSize: "0.8rem",
                            },
                            "& .MuiFormLabel-root": { color: "#94a3b8" },
                            boxSizing: "border-box",
                            "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                        }}
                    />
                </Box>

                {/* Password */}
                <Box>

                    <InputLabel htmlFor="email" sx={{ fontSize: '14px', color: "#cbd5e1" }}>
                        Password
                    </InputLabel>
                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size="16px" color="oklch(70.4% 0.04 256.788)" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Enter your password"
                        sx={{

                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                color: "#fff",
                                "&:hover fieldset": { borderColor: "primary.main" }, // purple hover
                                "&.Mui-focused": {
                                    borderColor: "primary.main",
                                    boxShadow: "0 0 0 5px rgba(128,28,28,0.5)", // 🔥 نفس الـ ring من الكلاس
                                },
                            },
                            "& .MuiOutlinedInput-input::placeholder": {
                                color: "oklch(70.4% 0.04 256.788)",
                                opacity: 1,
                                fontSize: "0.8rem",
                            },
                            "& .MuiFormLabel-root": { color: "#94a3b8" },
                            boxSizing: "border-box",
                            "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                        }}
                    />
                </Box>

                {/* confirm password */}
                <Box>
                    <InputLabel htmlFor="email" sx={{ fontSize: '14px', color: "#cbd5e1" }}>
                        Confirm Password
                    </InputLabel>
                    <TextField
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size="16px" color="oklch(70.4% 0.04 256.788)" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Re-enter your password"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                color: "#fff",
                                "&:hover fieldset": { borderColor: "primary.main" }, // purple hover
                                "&.Mui-focused": {
                                    borderColor: "primary.main",
                                    boxShadow: "0 0 0 5px rgba(128,28,28,0.5)", // 🔥 نفس الـ ring من الكلاس
                                },
                            },
                            "& .MuiOutlinedInput-input::placeholder": {
                                color: "oklch(70.4% 0.04 256.788)",
                                opacity: 1,
                                fontSize: "0.8rem",
                            },
                            "& .MuiFormLabel-root": { color: "#94a3b8" },
                            boxSizing: "border-box",
                            "& .MuiOutlinedInput-input": { padding: "6px 8px" },
                        }}
                    />
                </Box>




                {/* Bottom text */}
                <Typography sx={{ textAlign: "center", fontSize: "0.875rem", color: "#94a3b8" }}>
                    Already have an account?{" "}
                    <Button
                        onClick={() => { }}
                        sx={{ color: "#b71c1c", fontWeight: 500, textTransform: "none", "&:hover": { color: "#d32f2f" } }}
                    >
                        Sign in
                    </Button>
                </Typography>

                {/* Submit Button */}
                <Button
                    type="submit"
                    sx={{
                        width: "100%",
                        bgcolor: "#b71c1c",
                        color: "#fff",
                        fontSize: "15px",
                        fontFamily: '"Roboto", sans-serif',
                        boxShadow: "0 4px 6px rgba(183,28,28,0.3)",
                        "&:hover": { bgcolor: "#d32f2f" },
                        transition: "all 0.3s",
                        textTransform: "none", // 🔥 يلغي الـ uppercase
                    }}
                >
                    Create Account
                </Button>

            </Box>

        </>
    )
}

export default Login
