import{ useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Menu, Home, Leaderboard, MenuBook, Favorite, Info, Login, PersonAdd, Logout, Brightness7 } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import style from './style';
import SelectLanguage from '../../common/SelectLanguage';
function Sidebar({ language, setLanguage }) {
    const [open, setOpen] = useState(false);
    const { i18n, t } = useTranslation();
    const menuItems = [
        { text: t("home"), icon: <Home /> },
        { text: t("ranking"), icon: <Leaderboard /> },
        { text: t("manga list"), icon: <MenuBook /> },
        { text: t("favorited"), icon: <Favorite /> },
        { text: t("login"), icon: <Login /> },
        { text: t("sign up"), icon: <PersonAdd /> },
        { text: t("logout"), icon: <Logout /> },
        { text: t("about us"), icon: <Info /> },
    ]
    return (
        <>
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
                            color: "#fff", "&:hover": {backgroundColor: "#333",},
                        }} >
                            <Brightness7 />
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
                                <ListItemButton sx={{
                                    "&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                                        color: "#ffd600",
                                    },
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