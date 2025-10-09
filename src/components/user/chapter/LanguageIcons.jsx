import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

function LanguageIcon({ size = 48, color = "#ffffff" ,language="ar"}) {
    const theme = useTheme();

    return (
        <>
        
            <Box
                sx={{
                    color: color || theme.palette.text.primary, // dynamic color
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" ,},
                    pr:language === "ar"?"0px":"3px",
                    ":hover":{color:theme.palette.primary.main}
                }}
            >
                {
                    language === "ar" ?
                        <svg
                            width={size}
                            height={size}
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 31L15.5 16L21 31"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.5 28H18.5"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M26 31L26 19"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M26 31L26 24.5C26 22.0147 28.0147 20 30.5 20V20C32.9853 20 35 22.0147 35"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            
                            <rect
                                x="3"
                                y="6"
                                width="36"
                                height="36"
                                rx="3"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        :
                        <svg
                            width={size}
                            height={size}
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 31V17H21"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13 24H20.5"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13 31H20.5"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M26 31L26 19"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M26 31L26 24.5C26 22.0147 28.0147 20 30.5 20V20C32.9853 20 35 22.0147 35 24.5L35 31"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="6"
                                y="6"
                                width="36"
                                height="36"
                                rx="3"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                }    </Box>
        </>

    );
}

export default LanguageIcon;
