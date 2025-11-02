import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Search, Favorite, Warning, MenuBook } from '@mui/icons-material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Bell, Clock, CheckCircle, BookOpen, Plus, Check, Loader, } from "lucide-react"
import { blue, green, red, yellow } from '@mui/material/colors'
import { useTranslation } from 'react-i18next';

const NoDataBox = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {t}=useTranslation();
    const page = {
        isSearchPage: location.pathname === '/search',
        isMangaListPage: location.pathname.includes('/manga-list'),
        isDashboardManga:location.pathname.startsWith("/dashboard/manga-management"),
        library: location.pathname.includes('/library')
            ? {
                isFavoritesPage: location.pathname.includes('/favorites'),
                isReadingLaterPage: location.pathname.includes('/reading-later'),
                isNotificationsPage: location.pathname.includes('/notifications'),
                isCompletedReads: location.pathname.includes('/completed-reads'),
                isCurrentlyReading: location.pathname.includes('/currently-reading'),
            }
            : false,
    };
    const { variant, title, subtitle, actionText, onActionClick } = (() => {
        if (page?.isSearchPage) {
            return {
                variant: 'search',
                title: t('no_data.search.title'),
                subtitle: t('no_data.search.subtitle'),
                actionText: t('no_data.search.action'),
                onActionClick: () => navigate('/'),
            };
        } else if (page.isMangaListPage) {
            return {
                variant: 'error',
                title: t('no_data.error.title'),
                subtitle: t('no_data.error.subtitle'),
                actionText: t('no_data.error.action'),
                onActionClick: () => navigate(`/manga-list?status=${searchParams.get('status')}&genre=all&sort=${searchParams.get('sort')}`),
            };
        }else if(page.isDashboardManga){
            return {
                variant: 'search',
                title: t('no_data.search.title'),
                subtitle: t('no_data.dashboardManga.subtitle'),
            };
        } 
        else if (page.library && typeof page.library === 'object') {
            if (page.library.isFavoritesPage) {
                return {
                    variant: 'favorites',
                    title: t('no_data.favorites.title'),
                    subtitle: t('no_data.favorites.subtitle'),
                    actionText: t('no_data.favorites.action'),
                    onActionClick: () => navigate('/'),
                };
            } else if (page.library.isReadingLaterPage) {
                return {
                    variant: 'reading-later',
                    title: t('no_data.reading_later.title'),
                    subtitle: t('no_data.reading_later.subtitle'),
                    actionText: t('no_data.reading_later.action'),
                    onActionClick: () => navigate('/'),
                };
            } else if (page.library.isNotificationsPage) {
                return {
                    variant: 'notifications',
                    title: t('no_data.notifications.title'),
                    subtitle: t('no_data.notifications.subtitle'),
                    actionText: t('no_data.notifications.action'),
                    onActionClick: () => navigate('/'),
                };
            } else if (page.library.isCompletedReads) {
                return {
                    variant: 'completed-reads',
                    title: t('no_data.completed_reads.title'),
                    subtitle: t('no_data.completed_reads.subtitle'),
                    actionText: t('no_data.completed_reads.action'),
                    onActionClick: () => navigate('/'),
                };
            } else if (page.library.isCurrentlyReading) {
                return {
                    variant: 'currently-reading',
                    title: t('no_data.currently_reading.title'),
                    subtitle: t('no_data.currently_reading.subtitle'),
                    actionText: t('no_data.currently_reading.action'),
                    onActionClick: () => navigate('/'),
                };
            }
        }
    })();
    const getIcon = () => {
        switch (variant) {
            case 'search': return <Search sx={{ fontSize: 48 }} />;
            case 'favorites': return <Heart style={{ fontSize: 48, color: red[500] }} />;
            case 'reading-later': return <Clock style={{ fontSize: 48, color: yellow[900] }} />;
            case 'notifications': return <Bell style={{ fontSize: 48, color: blue[500] }} />;
            case 'completed-reads': return <CheckCircle style={{ fontSize: 48, color: green[500] }} />;
            case 'currently-reading': return <BookOpen style={{ fontSize: 48 }} />;
            case 'error': return <Warning sx={{ fontSize: 48 }} />;
            default: return <MenuBook sx={{ fontSize: 48 }} />;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 300,
                p: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                    border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#ddd'}`,
                    borderRadius: 4,
                    p: 4,
                    textAlign: 'center',
                    maxWidth: 400,
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        color: "primary.main",
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    {getIcon()}
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        mb: 1
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                        mb: 3,
                        opacity: 0.9
                    }}
                >
                    {subtitle}
                </Typography>

               {!page.isDashboardManga&& <Button
                    variant="contained"
                    onClick={onActionClick}
                    sx={{
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                        },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                >
                    {actionText}
                </Button>}
            </Paper>
        </Box>
    );
};

export default NoDataBox;
