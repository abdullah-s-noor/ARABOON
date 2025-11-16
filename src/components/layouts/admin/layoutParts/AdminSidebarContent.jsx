import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// Icons suggestion (use whatever you prefer)
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import { ViewCarouselOutlined } from '@mui/icons-material';

function AdminSidebarContent() {
    const { i18n,t } = useTranslation()
    const navigate = useNavigate()
    const isArabic = i18n.language === "ar"

    const menu = [
    { 
        label: isArabic ? "الصفحة الرئيسية" : "Dashboard",
        icon: <DashboardIcon />,
        path: ""
    },
    {
        label: isArabic ? "إدارة التصنيفات" : "Category Management",
        icon: <CategoryIcon />,
        path: "category-management"
    },
    {
        label: isArabic ? "إدارة المانغا" : "Manga Management",
        icon: <MenuBookIcon />,
        path: "manga-management"
    },
    {
        label: isArabic ? "إدارة المستخدمين" : "User Management",
        icon: <GroupIcon />,
        path: "user-management"
    },
    {
        label: isArabic ? "إدارة اللافتات" : "banner Management",
        icon: <ViewCarouselOutlined  />,
        path: "banner-management"
    },
];


    return (
        <>
            <List>
                {menu.map((item) => (
                    <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={[
                                { minHeight: 48, px: 2.5 },
                                open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    { minWidth: 0, justifyContent: 'center' },
                                    open
                                        ? (isArabic ? { ml: 3 } : { mr: 3 })
                                        : (isArabic ? { ml: 'auto' } : { mr: 'auto' })
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                sx={[
                                    { textAlign: isArabic ? "right" : "left" },
                                    open ? { opacity: 1 } : { opacity: 0 }
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 1 }} />
        </>
    )
}

export default AdminSidebarContent
