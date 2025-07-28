import { useState } from 'react'
import { Box, Typography, IconButton, Tooltip, Divider } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

const actions = [
    { key: 'completed', icon: <CheckCircleIcon />, label: 'Completed Reading', color: 'success' },
    { key: 'later', icon: <BookmarkIcon />, label: 'Reading Later', color: 'primary' },
    { key: 'current', icon: <LocalFireDepartmentIcon />, label: 'Currently Reading', color: 'warning' },
    { key: 'favorite', icon: <FavoriteIcon />, label: 'Favorite', color: 'error' },
    { key: 'notify', icon: <NotificationsActiveIcon />, label: 'Notification', color: 'secondary.main' },
]

export default function MangaActionSidebar() {
    const [activeActions, setActiveActions] = useState({})

    const toggleAction = (key) => {
        setActiveActions((prev) => ({
            ...prev,
            [key]: !prev[key], // Flip the status (on/off)
        }))

        // 👉 (اختياري) هون ممكن تبعت طلب للباك إند
        // api.updateUserList(mangaId, key, newStatus)
    }

    return (
        <Box
            sx={{
                width: '25%',
                '@media (max-width:750px)': {
                    width:'100% !important'
                },
                height: 'fit-content',
                borderRadius: 2
            }}

        //  

        >
            <Typography
                sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: 16,
                    color: 'text.secondary',
                }}
            >
                CHAPTER LIST
            </Typography>
            <Divider sx={{ textAlign: 'center', my: { xs: 1, md: 2 }, borderColor: 'text.secondary', width: '100%' }} />

            {actions.map(({ key, icon, label, color }) => {
                const isActive = activeActions[key]

                return (
                    <Tooltip title={label} placement="left" key={key}>
                        <Box
                            onClick={() => toggleAction(key)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                bgcolor: isActive ? `${color}.100` : 'transparent',
                                borderLeft: isActive ? `4px solid` : '4px solid transparent',
                                borderColor: isActive ? `${color}.main` : 'transparent',
                                p: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <IconButton color={isActive ? color : 'default'}>
                                {icon}
                            </IconButton>
                            <Typography variant="body2" fontWeight={isActive ? 'bold' : 'normal'}>
                                {label}
                            </Typography>
                        </Box>
                    </Tooltip>
                )
            })}
        </Box>
    )
}
