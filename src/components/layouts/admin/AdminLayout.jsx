import * as React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from './layoutParts/AdminNavbar';
import AdminSidebar from './layoutParts/AdminSidebar';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language?.toUpperCase() || "EN");
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const pathname = useLocation().pathname
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname])
  return (
    <>
      {/* Navbar always at top */}
      <AdminNavbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        language={language}
        setLanguage={setLanguage}
        isMobile={isMobile}
      />

      {/* Desktop: Drawer and main content in flex box */}
      <Box sx={{ display: 'flex' }}>
        {!isMobile && (
          <AdminSidebar
            open={open}
            handleDrawerClose={handleDrawerClose}
            variant="permanent"
          />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 0, sm: 3 },
            overflowX: "auto",
          }}
        >
          {/* Offset for AppBar */}
          <div style={{ minHeight: 64 }} />
          <Outlet />
        </Box>
      </Box>

      {/* Mobile: Drawer overlays root, outside flex */}
      {isMobile && (
        <AdminSidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          variant="temporary"
        />
      )}
    </>
  );
}
