import { Box, Chip, Stack } from '@mui/material';
import React, { useState } from 'react';

function LanguageSelector({selectedLanguage,setSelectedLanguage ,isArabicAvailable, isEnglishAvailable }) {
    return (
        <Stack direction="row" gap={1} alignItems="center">
            {isEnglishAvailable && <Chip
                label="English"
                clickable
                variant={selectedLanguage === 'en' ? 'filled' : 'outlined'}
                onClick={() => setSelectedLanguage('en')}
                sx={{
                    bgcolor: selectedLanguage === 'en' ? 'primary.main' : 'transparent',
                    color: selectedLanguage === 'en' ? '#fff' : 'text.secondary',
                    borderColor: selectedLanguage === 'en' ? 'primary.main' : 'divider',
                    fontWeight: 500,
                    fontSize: 14,
                    '&:hover': {
                        bgcolor: selectedLanguage === 'en' ? 'thirdly.main' : 'action.hover',
                    }
                }}
            />}
            {isArabicAvailable && <Chip
                label="العربية"
                clickable
                variant={selectedLanguage === 'ar' ? 'filled' : 'outlined'}
                onClick={() => setSelectedLanguage('ar')}
                sx={{
                    bgcolor: selectedLanguage === 'ar' ? 'primary.main' : 'transparent',
                    color: selectedLanguage === 'ar' ? '#fff' : 'text.secondary',
                    borderColor: selectedLanguage === 'ar' ? 'primary.main' : 'divider',
                    fontWeight: 500,
                    fontSize: 14,
                    '&:hover': {
                        bgcolor: selectedLanguage === 'ar' ? 'thirdly.main' : 'action.hover',
                    }
                }}
            />}
        </Stack>
    );
}

export default LanguageSelector;
