import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import { FaDiscord, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Navigation Section Data
const navSectionOrder = ['company', 'legal', 'support', 'products'];
const navSectionTitles = {
  company: 'Company',
  legal: 'Legal',
  support: 'Support',
  products: 'Products',
};
const navigationSections = {
  company: ["About Us", "Careers", "Press", "Contact"],
  legal: ["Privacy Policy", "Terms of Service", "Content Ratings", "Copyrights"],
  support: ["Help Center", "Community Guidelines", "News & Events", "Documentation"],
  products: ["Services", "Features", "Pricing", "API"]
};

const brandInfo = {
  companyName: "ARABOON",
  trademark: "ARABOON Mark is a registered trademark (Registration No. 10921042)",
  serviceDescription: "Indicating that this service is an authorized distribution service that gained permission to use content from the copyright holder.",
  websiteUrl: "https://araboon.com",
  copyrightYear: 2025,
  legalEntity: "Araboon Inc."
};

const socialLinks = [
  { name: "Discord", url: "https://discord.gg/araboon", color: "#5865F2" },
  { name: "Twitter", url: "https://twitter.com/araboon", color: "#1DA1F2" },
  { name: "Facebook", url: "https://facebook.com/araboon", color: "#1877F2" },
  { name: "Instagram", url: "https://instagram.com/araboon", color: "#E4405F" },
  { name: "LinkedIn", url: "https://linkedin.com/company/araboon", color: "#0A66C2" },
  { name: "YouTube", url: "https://youtube.com/@araboon", color: "#FF0000" }
];

const socialIconMap = {
  Discord: <FaDiscord />,
  Twitter: <FaTwitter />,
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  LinkedIn: <FaLinkedin />,
  YouTube: <FaYoutube />
};

const AraboonFooter = ({
  layout = 'comprehensive',
  direction = 'ltr'
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
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
              <Link
                key={sl.name}
                href={sl.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sl.name}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
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
                  fontSize: "30px",
                  lineHeight: 0,
                  transition: "transform 0.2s",
                  display: "inline-block"
                }}>
                  {socialIconMap[sl.name]}
                </span>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Navigation Section */}
      <Box sx={{
        background: theme.palette.background.default,
        p: { xs: '30px 20px', md: '60px' },
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
          gap: { xs: '40px', md: '80px' }
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
                    <Link
                      href={`/${item.toLowerCase().replace(/[\s&]+/g, '').replace(/[^a-z]/gi, '')}`}
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontSize: 18,
                        fontWeight: 500,
                        lineHeight: 2.3,
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        mb: 3,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: -10,
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
                    </Link>
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
            alignItems: 'center',
            gap: { xs: '20px', md: '48px' },
            textAlign: { xs: 'center', md: 'left' }
          }}
          spacing={4}
        >
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                fontSize: 32,
                fontWeight: 'bold',
                fontFamily: "'Arial Black', sans-serif"

              }}>
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
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {brandInfo.trademark}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary, opacity: 0.8 }}>
                {brandInfo.serviceDescription}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                &copy; {brandInfo.copyrightYear} {brandInfo.legalEntity}. All rights reserved
              </Typography>
              <Typography variant="body2">
                Visit us at{' '}
                <Link
                  href={brandInfo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'underline',
                    '&:hover': { color: theme.palette.thirdly?.main || theme.palette.secondary.main }
                  }}
                >
                  {brandInfo.websiteUrl.replace(/^https?:\/\//, '')}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AraboonFooter;
