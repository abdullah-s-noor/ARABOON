import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery } from '@mui/material';
import AdminSidebarContent from './AdminSidebarContent';
import MyAvatar from '../../../common/MyAvatar';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

function DrawerContent({ open, handleDrawerClose, isArabic }) {
    const theme = useTheme()
      const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {userToken,userData}=useContext(UserContext)
    return (
        <>
            {/* DrawerHeader */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:isMobile?"space-between":"flex-end",
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                }}
            >
                {isMobile&&userToken &&(userData && <MyAvatar />) }
                <IconButton onClick={handleDrawerClose}>
                    {isArabic ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
            <Divider />
            <AdminSidebarContent/>
        </>
    );
}

export default function AdminSidebar({ open, handleDrawerClose, variant = "permanent" }) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar"
    if (variant === "temporary") {
        // MUI's temporary drawer overlays the screen (mobile)
        return (
            <MuiDrawer
                anchor={i18n.language === "ar" ? "right" : "left"}
                open={open}
                onClose={handleDrawerClose}
                variant="temporary"
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: { width: drawerWidth }
                }}
            >
                <DrawerContent  open={true} handleDrawerClose={handleDrawerClose} isArabic={isArabic} />
            </MuiDrawer>
        );
    }

    // Desktop: permanent drawer inside flex layout
    return (
        <Drawer variant="permanent" open={open} anchor={i18n.language === "ar" ? 'right' : "left"}>
            <DrawerContent open={open} handleDrawerClose={handleDrawerClose} isArabic={isArabic} />
        </Drawer>
    );
}
