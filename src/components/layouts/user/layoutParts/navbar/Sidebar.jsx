import { useContext, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Menu, Home, Leaderboard, MenuBook, Favorite, Info, Login, PersonAdd, Logout, Brightness7, Brightness4, Person2 } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import styles from './style';
import SelectLanguage from '../../../../common/SelectLanguage';
import { ThemeModeContext } from '../../../../../context/darkMode';
import useIsPhone from '../../../../../hooks/usePhone';
import { useNavigate } from 'react-router-dom';
import { AuthDialog } from '../../../../../pages/auth/AuthDialog';
import { UserContext } from '../../../../../context/UserContext';
function Sidebar({ language, setLanguage }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const { logout, userToken, userData } = useContext(UserContext)
    const { i18n, t } = useTranslation();
    const style = styles(theme)
    const { toggleDarkMode, darkMode } = useContext(ThemeModeContext)
    const { isPhone } = useIsPhone()
    const [open, setOpen] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState({
        open: false,
        mode: null,
    })
    const menuItems = [
        { text: t("home"), icon: <Home />, onActionClick: () => navigate('/') },
        { text: t("ranking"), icon: <Leaderboard />, onActionClick: () => navigate('/manga-ranking') },
        { text: t("manga list"), icon: <MenuBook />, onActionClick: () => navigate('/manga-list') },
        { text: t("library"), icon: <Favorite />, onActionClick: () => navigate('/library') },
        userToken && { text: t("profile.profile"), icon: <Person2 />, onActionClick: () => navigate(`/${userData.UserName}`) },
        !userToken && { text: t("login"), icon: <Login />, onActionClick: () => setOpenAuthDialog({ open: true, mode: "login" }) },
        !userToken && { text: t("sign up"), icon: <PersonAdd />, onActionClick: () => setOpenAuthDialog({ open: true, mode: "register" }) },
        userToken && { text: t("logout"), icon: <Logout />, onActionClick: () => logout() },
        { text: t("about us"), icon: <Info />, onActionClick: () => navigate('/') },
    ].filter(Boolean)
    return (
        <>
            <AuthDialog openAuthDialog={openAuthDialog} onOpenChange={setOpenAuthDialog} />

            {/* menu icon */}
            <IconButton onClick={() => { setOpen(true) }}
                sx={style.menuIcons}
            >
                <Menu sx={{ color: "#ccc" }} fontSize="medium" />
            </IconButton>
            {/* Sidebar */}
            <Drawer
                anchor={i18n.language === "ar" ? "right" : "left"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box component={'div'} sx={style.sidebar}>
                    <Box
                        sx={style.sidebarP1}
                    >
                        {/* Theme Toggle */}
                        <IconButton sx={{
                            color: "#fff",
                            ...(
                                isPhone ? {
                                    "&:active": {
                                        backgroundColor: "#333"
                                    }
                                } : {
                                    "&:hover": { backgroundColor: "#333" },
                                }
                            )
                        }}
                            onClick={() => {
                                toggleDarkMode()
                            }}
                        >
                            {darkMode ?
                                <Brightness7 sx={{ color: 'orange' }} fontSize="medium" />
                                :
                                <Brightness4 sx={{ color: 'white' }} fontSize="medium" />
                            }
                        </IconButton>

                        {/* Language Select */}
                        <SelectLanguage
                            language={language}
                            setLanguage={setLanguage}
                        />
                    </Box>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={index} disablePadding >
                                <ListItemButton
                                    onClick={() => { setOpen(false), item.onActionClick() }}
                                    style={{ textDecoration: "none", color: 'inherit' }}
                                    sx={{
                                        ...(
                                            isPhone ? {
                                                "&:active .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                                                    color: "#ffd600",
                                                },
                                            } : {
                                                "&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                                                    color: "#ffd600",
                                                },
                                            }
                                        )
                                    }}>
                                    <ListItemIcon sx={{ color: '#eee' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{
                                        color: '#eee'
                                    }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Drawer>
        </>
    )
}
export default Sidebar