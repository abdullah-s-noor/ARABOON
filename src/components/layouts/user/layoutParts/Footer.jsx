import React from 'react';
import Box from '@mui/material/Box';
import { Link as MUILink } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FooterFields from './FooterFields';


const AraboonFooter = ({
    layout = 'comprehensive',
}) => {
    const { i18n, t } = useTranslation();
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const direction = i18n.dir();
    const { navigationSections, navSectionOrder, navSectionTitles, brandInfo, socialLinks, socialIconMap } = FooterFields()
    return (
        <Box
            footer-name="main-footer"
            zIndex={0}
            component="footer"
            className="araboon-footer"
            data-layout={layout}
            data-theme={theme.palette.mode}
            data-direction={direction}
            sx={{
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: 2,
                overflow: 'hidden',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                border: isLight ? `1px solid ${theme.palette.secondary.main}` : undefined,
                direction,
            }}
        >

            {/* Social Media Section */}
            <Box sx={{
                background: isLight
                    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.background.default} 100%)`,
                p: { xs: '30px 20px', md: '40px 60px' },
                borderBottom: `1px solid ${theme.palette.primary.main}`
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 2, md: 2.5 },
                        flexWrap: 'wrap'
                    }}>
                        {socialLinks.map(sl => (
                            <MUILink
                                key={sl.name}
                                href={sl.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={sl.name}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { xs: 45, sm: 48 },
                                    height: { xs: 45, sm: 48 },
                                    background: isLight
                                        ? 'rgba(0,0,0,0.04)'
                                        : 'rgba(255,255,255,0.07)',
                                    border: `1px solid ${isLight ? theme.palette.primary.main : theme.palette.primary.main
                                        }`,
                                    borderRadius: 3,
                                    color: theme.palette.text.secondary,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.22)',
                                        background: sl.color,
                                        borderColor: sl.color,
                                        color: '#FFF',
                                        '& .social-icon': {
                                            transform: 'scale(1.12)',
                                            transition: 'transform 0.19s cubic-bezier(0.3,0.65,0.45,1.08)'
                                        }
                                    }
                                }}
                                data-social={sl.name.toLowerCase()}
                            >
                                <span className="social-icon" style={{
                                    fontSize: "25px",
                                    lineHeight: 0,
                                    transition: "transform 0.2s",
                                    display: "inline-block"
                                }}>
                                    {socialIconMap[sl.name]}
                                </span>
                            </MUILink>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Navigation Section */}
            <Box sx={{
                background: theme.palette.background.default,
                p: { xs: '30px 20px', md: '60px 30px', lg: '60px' },
                borderBottom: `1px solid ${theme.palette.primary.main}`,
            }}>
                <Grid container sx={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: { xs: '40px', md: "60px", lg: '80px' }
                }}>
                    {navSectionOrder.map(section => (
                        <Grid item xs={6} md={3} key={section}>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                lineHeight: 2.3,
                                letterSpacing: '-0.01em'
                            }}>
                                {navSectionTitles[section]}
                            </Typography>
                            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                                {navigationSections[section].map(item => (
                                    <li key={item}>
                                        <MUILink
                                            sx={{
                                                cursor: 'pointer',
                                                color: theme.palette.text.secondary,
                                                textDecoration: 'none',
                                                fontSize: { xs: 15, lg: 18 },
                                                fontWeight: 500,
                                                lineHeight: 2.3,
                                                position: 'relative',
                                                transition: 'all 0.2s ease',
                                                mb: 3,
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    ...(i18n.language === "en" ? { left: -10 } : { right: -10 }),
                                                    top: '50%',
                                                    transform: 'translateY(-50%) scaleY(0)',
                                                    width: '4px',
                                                    height: '100%',
                                                    backgroundColor: theme.palette.primary.main,
                                                    borderRadius: '2px',
                                                    opacity: 0,
                                                    transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s',
                                                },
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                                '&:hover::before': {
                                                    transform: 'translateY(-50%) scaleY(1)',
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            {item}
                                        </MUILink>
                                    </li>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Brand and Copyright Section */}
            <Box sx={{
                background: isLight
                    ? `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.background.paper} 100%)`
                    : `linear-gradient(135deg, #3D1A1A 0%, #2D1010 100%)`,
                p: { xs: '30px 20px', md: '40px 60px' }
            }}>
                <Grid container
                    sx={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        flexWrap: { xs: "wrap", md: 'nowrap' },
                        flexGrow: 1,
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                    spacing={4}
                >
                    <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                fontSize: 32,
                                fontWeight: 'bold',
                                fontFamily: "'Arial Black', sans-serif",
                                justifyContent: { xs: 'center', md: 'flex-start' },
                                flexGrow: 1,
                            }}>
                            <span>

                                <span
                                    style={{
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.text.primary})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        color: 'transparent'
                                    }}
                                    key={theme.palette.mode} // this forces re-render on theme change
                                    className="arab-part"
                                >
                                    ARAB
                                </span>
                                <span>OON</span>
                            </span>

                        </Box>
                        <Box sx={{ textAlign: { xs: "center", md: i18n.language === "en" ? "left" : "right" }, maxWidth: 1200, flexGrow: 1, }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {brandInfo.trademark}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, opacity: 0.8 }}>
                                {brandInfo.serviceDescription}
                            </Typography>
                        </Box>
                    </Grid>
                    <Box sx={{ m: { xs: "auto", md: "0" }, position: "relative", minWidth: "300px", alignItems: "flex-end", textAlign: { xs: 'center', md: i18n.language === "en" ? 'right' : "left" } }}>
                        <Box sx={{ position: { md: "absolute" }, right: 0, bottom: 0 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                &copy; {brandInfo.copyrightYear} {brandInfo.legalEntity}{" "}{t("footer.all_rights_reserved")}
                            </Typography>
                            <Typography variant="body2">
                                {t("footer.visit_us") + ' '}
                                <MUILink
                                    href={brandInfo.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        textDecoration: 'underline',
                                        // @ts-ignore
                                        '&:hover': { color: theme.palette.thirdly?.main || theme.palette.secondary.main }
                                    }}
                                >
                                    {brandInfo.websiteUrl.replace(/^https?:\/\//, '')}
                                </MUILink>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default AraboonFooter;
