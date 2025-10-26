import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Inbox, Mail } from '@mui/icons-material'
function AdminSidebarContent() {
    const { i18n } = useTranslation()
    const isArabic = i18n.language === "ar"
    return (
        <>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={[
                                { minHeight: 48, px: 2.5 },
                                open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    { minWidth: 0, justifyContent: 'flex-end' },
                                    open ? (isArabic ? { ml: 3 } : { mr: 3 }) : (isArabic ? { ml: 'auto' } : { mr: 'auto' })
                                ]}
                            >
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text}
                                sx={[
                                    { textAlign: isArabic ? "right" : "left" },
                                    open ? { opacity: 1 } : { opacity: 0 }
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={[
                                { minHeight: 48, px: 2.5 },
                                open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    { minWidth: 0, justifyContent: 'center' },
                                    open ? (isArabic ? { ml: 3 } : { mr: 3 }) : (isArabic ? { ml: 'auto' } : { mr: 'auto' })
                                ]}
                            >
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text}
                                sx={[
                                    open ? { opacity: 1 } : { opacity: 0 }
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default AdminSidebarContent
