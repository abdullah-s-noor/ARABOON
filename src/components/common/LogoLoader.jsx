import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
    const theme = useTheme();
    const {i18n} = useTranslation();
    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            {/* Gradient overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom right, rgba(25,118,210,0.05), transparent, rgba(255,64,129,0.05))",
                }}
            />

            {/* Center content */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                }}
            >
                {/* Logo & GIF */}
                <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <Box
                        component="img"
                        src={`/image/logo/${theme.palette.mode==="dark"?6:5}.png`}
                        alt="ARABOON Logo"
                        sx={{
                            height: 128,
                            mr: 3,
                            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
                        }}
                    />
                    <Box
                        component="img"
                        src="/image/logo/7.gif"
                        alt="Animated character"
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: 112,
                            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
                        }}
                    />
                </Box>

                {/* Bouncing dots */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    {[0, 0.15, 0.3].map((delay, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                animation: `bounce 1s infinite`,
                                animationDelay: `-${delay}s`,
                                "@keyframes bounce": {
                                    "0%, 100%": { transform: "translateY(0)" },
                                    "50%": { transform: "translateY(-10px)" },
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Loading bar */}
                <Box
                    sx={{
                        width: 256,
                        height: 6,
                        bgcolor: "rgba(0,0,0,0.1)",
                        borderRadius: 9999,
                        overflow: "hidden",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 9999,
                            background:theme.palette.mode==="dark"?
                                "linear-gradient(to right, #d32f2f, rgba(183,28,28,0.8), #d32f2f)":
                                "linear-gradient(to right, #1976d2, rgba(112,112,225,0.8), #1976d2)",
                            animation: "loading 2s ease-in-out infinite",
                            "@keyframes loading": {
                                "0%": { transform: "translateX(-100%)" },
                                "50%": { transform: "translateX(0)" },
                                "100%": { transform: "translateX(100%)" },
                            },
                        }}
                    />
                </Box>

                {/* Text */}
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "text.secondary",
                        letterSpacing: "0.05em",
                    }}
                >
                    {i18n.language==="en"?"Loading...":"جارٍ التحميل..."}
                </Typography>
            </Box>
        </Box>
    );
}
