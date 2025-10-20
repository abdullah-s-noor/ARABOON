import { Box, Typography, Button, Divider, Container, useTheme } from '@mui/material';
import { Home, Search, ArrowBack, Info, ContactMail, Help } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const theme = useTheme();
    const { t } = useTranslation()
    
    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, sm: 4 },
                py: { xs: 8, sm: 16 },
            }}
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                {/* 404 Number */}
                <Box sx={{ mb: { xs: 5, sm: 13 }, position: 'relative' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '8rem', sm: '10rem', md: '12rem' },
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: '-0.05em',
                            color: theme.palette.primary.main,
                            opacity: 0.1,
                            userSelect: 'none',
                            fontFamily: '"Geist", "Geist Fallback", sans-serif'

                        }}
                    >
                        404
                    </Typography>
                </Box>

                {/* Main Content */}
                <Box sx={{ mt: { xs: -10, sm: -20 }, position: 'relative', zIndex: 10 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: 'text.primary',
                                mb: 2,
                            }}
                        >
                            {t('not_found.title')}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                color: 'text.secondary',
                                maxWidth: '500px',
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            {t("not_found.description")}
                        </Typography>
                    </Box>

                </Box>

                {/* Footer Note */}
                <Box sx={{ mt: 12, pt: 4 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="caption" color="text.secondary">
                        {t("not_found.error_code")} • {t('not_found.title')}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
