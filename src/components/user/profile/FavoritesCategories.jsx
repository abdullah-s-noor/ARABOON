import { Box, Typography, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

// Define a set of colors for the dots
const dotColors = ["#FF5733", "#33C3FF", "#28A745", "#FFC107", "#9C27B0", "#E91E63"]

function FavoritesCategories({ favoritesCategories }) {
    const { i18n, t } = useTranslation()
    const theme = useTheme()

    useEffect(() => {
        console.log("Favorites:", favoritesCategories)
    }, [favoritesCategories])

    const style = {
        container: {
            mt: 5,
            mx: "auto",
            maxWidth: "1200px",
            bgcolor: theme.palette.mode === "dark" ? "#000 !important" : "#fff !important",
            borderRadius: "20px",
            p: 5,
            boxShadow: 3,
            background: "linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))",
            display: "flex",
            flexDirection: "column",
            gap: 3,
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        dot: (color) => ({
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: color,
            marginRight: 8,
        }),
    }

    return (
        <Box sx={style.container}>
            <Typography sx={{fontSize:{xs:"20px",sm:30},fontWeight:"bold"}}>{t("profile.favorites_categories")}</Typography>
            {favoritesCategories.map((category, index) => {
                const color = dotColors[index % dotColors.length] 
                return (
                    <Box key={index} sx={style.row}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* Colored Dot */}
                            <Box sx={style.dot(color)} />
                            <Typography>{category.category}</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: "bold" }}>{category.count}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}

export default FavoritesCategories
