import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7, Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import SelectLanguage from '../../../common/SelectLanguage';
import { ThemeModeContext } from '../../../../context/darkMode';
import { UserContext } from '../../../../context/UserContext';
import MyAvatar from '../../../common/MyAvatar';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
    // @ts-ignore
})(({ theme, open, isMobile }) => ({
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isMobile?{}:{zIndex: theme.zIndex.drawer + 1}),
    ...(open && !isMobile && theme.direction === 'ltr' && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(open && !isMobile && theme.direction === 'rtl' && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AdminNavbar({ open = false, handleDrawerOpen, handleDrawerClose, language, setLanguage, isMobile = false }) {
    const { toggleDarkMode, darkMode } = React.useContext(ThemeModeContext);
    const { i18n } = useTranslation();
    const {userToken,userData}=React.useContext(UserContext)
    // Use theme.direction for layout logic, with fallback to i18n.language
    const isRtl = i18n.language === 'ar';

    return (
        <AppBar
            position="fixed"
            // @ts-ignore
            open={open}
            isMobile={isMobile}
            sx={{
                backgroundColor: "primary.main",
                ...((open && !isMobile && i18n.language === 'ar') ? { mr: `${drawerWidth}px` } : { ml: drawerWidth })

            }}
            elevation={2}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: { xs: 56, sm: 64 }
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open sidebar menu"
                        onClick={() => { (open && isMobile) ? handleDrawerClose() : handleDrawerOpen() }}
                        edge="start"
                        sx={{
                            mr: isRtl ? 0 : 2,
                            ml: isRtl ? 2 : 0,
                            display: open && !isMobile ? 'none' : undefined
                        }}
                    >
                        {open && isMobile ? <Close /> : <MenuIcon />}

                    </IconButton>
                    <Typography
                        variant="h5"
                        component="div"
                        noWrap
                        sx={{
                            cursor: "pointer",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            color: "white"
                        }}
                    >
                        {i18n.language==="en"?"Dashboard":"لوحة التحكم"}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={.5}>
                    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        <IconButton onClick={toggleDarkMode} color="inherit" aria-label="toggle theme">
                            {darkMode
                                ? <Brightness7 sx={{ color: 'orange' }} fontSize="medium" />
                                : <Brightness4 sx={{ color: 'white' }} fontSize="medium" />}
                        </IconButton>
                    </Tooltip>
                    <SelectLanguage language={language} setLanguage={setLanguage} />
                    {!isMobile&&userToken &&(userData && <MyAvatar />) }
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
