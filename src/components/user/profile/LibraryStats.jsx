import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'background.paper',
    borderRadius: 20,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    // ...theme.applyStyles('dark', {
    //     backgroundColor: '#1A2027',
    // }),

}));
function LibraryStats({librariesCount}) {
    const style = {

    }
    const {t}=useTranslation()
    const is750 = useMediaQuery('(min-width:750px)');
    const libraryList = [
        { name: t("favorites"), color: 'primary.main',value:`${librariesCount.favoritesCount}` },
        { name: t("completed-reads"), color: '#f97415',value:`${librariesCount.completedReadsCount}` },
        { name: t("reading-later"), color: '#be83fc',value:`${librariesCount.readingLatersCount}`},
        { name: t("currently-reading"), color: 'text.primary',value:`${librariesCount.currentlyReadingCount}` },
    ]
    return (
        <>
            <Box sx={{ flexGrow: 1, maxWidth: "1200px", margin: "auto", my: 3, mx: { xs: 1, lg: 'auto' } }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={is750 ? 16 : 4}>
                    {libraryList.map((library, index) => (
                        <Grid key={index} size={is750 ? 4 : 2}>
                            <Item >
                                <Typography sx={{ fontSize: '40px', fontWeight: 'bold', color: library.color }}>{library.value}</Typography>
                                <Typography sx={{ ...style.subtitle }}>{library.name}</Typography>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default LibraryStats
