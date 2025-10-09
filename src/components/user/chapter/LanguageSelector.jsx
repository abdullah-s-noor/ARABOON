import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from '@mui/material';
import { Check, Language as GlobeIcon } from '@mui/icons-material';
import LanguageIcon from './LanguageIcons';

// --- Data Definition ---
const languages = [
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
];

// Main Component Wrapper for Preview
export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    // console.log(`Language set to: ${code}`); // Removed console log
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    }}>
      {/* The actual LanguageSelector component is placed here */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </Box>
  );
}


// Language Selector Component (MUI Popover Implementation)
function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  // Use anchorEl state for Menu positioning and open/close status
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
    const theme=useTheme()
  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (code) => {
    onLanguageChange(code);
    handleClose();
  };

  return (
    <Box >
      {/* Trigger Button (MUI IconButton) */}
      <IconButton
        onClick={handleClick} sx={{p:"0px !important"}}
      >
         <LanguageIcon language={selectedLanguage}/>
       
      </IconButton>

      {/* Dropdown Panel (MUI Menu) */}
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        // Position the menu slightly below the trigger button
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
            paper: {
                sx: {
                    // Dropdown Panel styling (border-red-600, bg-zinc-950, shadow-2xl)
                    width: 384, // w-96
                    marginTop: '8px', // mt-2
                    borderRadius: '12px', // rounded-xl
                    border: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: '#030712', // zinc-950
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                }
            }
        }}
        // Remove default padding of MenuList
        MenuListProps={{
            sx: { padding: 0 }
        }}
      >
        {/* Header */}
        <Box sx={{
            borderBottom: '1px solid #374151', // border-zinc-800
            backgroundColor: 'rgba(24, 24, 27, 0.5)', // bg-zinc-900/50
            padding: 1.5,
            paddingX: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}>
            <Typography component="span" sx={{ fontSize: '24px', flexShrink: 0 }}>
                {currentLanguage.flag}
            </Typography>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white', lineHeight: 1 }}>
                    Select Language
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', lineHeight: 1 }}>
                    Available translations
                </Typography>
            </Box>
        </Box>

        {/* Language List - Custom height and scrollbar hide */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Box sx={{ padding: 1 }}>
                {languages.map((language) => {
                    const isSelected = selectedLanguage === language.code;
                    return (
                        <MenuItem
                            key={language.code}
                            onClick={() => handleLanguageSelect(language.code)}
                            disableRipple // Disable default MenuItem ripple effect
                            sx={{
                                // Button wrapper styling
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                borderRadius: '8px', // rounded-lg
                                padding: 1.5,
                                marginBottom: 0.5,
                                transition: 'all 200ms ease',
                                backgroundColor: isSelected ? (theme.palette.mode==="dark"?'rgba(255,0,0,0.2)':'rgba(12,112,222,0.2)') : 'transparent', // bg-red-600/20
                                border: `1px solid ${isSelected ?  (theme.palette.mode==="dark"?'rgba(255,0,0,0.5)':'rgba(12,112,222,0.5)')  : 'transparent'}`,
                                '&:hover': {
                                    backgroundColor: 'rgba(39, 39, 42, 0.5)', // hover:bg-zinc-800/50
                                    border: '1px solid transparent',
                                    '& .hover-indicator': { height: '32px' }, // Hover Indicator animation
                                },
                            }}
                        >
                            {/* Hover Indicator (Absolute positioned Box) */}
                            <Box
                                className="hover-indicator"
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: 4,
                                    height: isSelected ? '32px' : 0,
                                    backgroundColor: 'primary.main', // red-600
                                    borderRadius: '0 4px 4px 0',
                                    transition: 'height 200ms ease',
                                }}
                            />
                            {/* Flag */}
                            <Typography component="span" sx={{color: 'white', fontSize: '24px', marginLeft: 0.5, flexShrink: 0 }}>
                                {language.flag}
                            </Typography>
                            {/* Language Info */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 'semibold', color: 'white', lineHeight: 1.2 }}
                                >
                                    {language.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#9CA3AF', lineHeight: 1.2 }}
                                >
                                    {language.nativeName}
                                </Typography>
                            </Box>
                            {/* Check Icon */}
                            {isSelected && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 20,
                                        width: 20,
                                        borderRadius: '50%',
                                        backgroundColor: 'primary.main', // red-600
                                        flexShrink: 0,
                                    }}
                                >
                                    <Check sx={{ height: 12, width: 12, color: 'white' }} />
                                </Box>
                            )}
                        </MenuItem>
                    );
                })}
            </Box>
        </Box>
      </Menu>
    </Box>
  );
}