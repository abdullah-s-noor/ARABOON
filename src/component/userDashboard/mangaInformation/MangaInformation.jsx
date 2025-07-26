import { Box } from '@mui/material'
import ChapterList from './chapterList/ChapterList'
import MangaHeader from './mangaHeader/MangaHeader'
function MangaInformation() {
    return (
        <Box
            component={'div'}
            sx={{
                width: '100%',
                height: '2000px',
                pt: { xs: 5, sm: 10 },
                bgcolor: '#191919',
                color: 'white'
            }}>
            <Box
                component={'div'}
                maxWidth={'90%'}
                margin={'auto'}
            >
                {/* manga info */}
                <MangaHeader />
                {/* chapters list */}
                <ChapterList />

            </Box>
        </Box >
    )
}

export default MangaInformation
