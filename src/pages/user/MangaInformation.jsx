import { Box } from '@mui/material'
import ChapterList from '../../components/user/mangaInformation/ChapterList'
import MangaHeader from '../../components/user/mangaInformation/MangaHeader'
import MangaActionSidebar from '../../components/user/mangaInformation/MangaActionSidebar'
function MangaInformation() {
    return (
        <Box
            component={'div'}
            sx={{
                width: '100%',
                height: '2000px',
                pt: { xs: 5, sm: 10 },
                bgcolor: 'secondary.main',
            }}>
            <Box
                component={'div'}
                maxWidth={'90%'}
                margin={'auto'}
            >
                {/* manga info */}
                <MangaHeader />
                {/* chapters list */}
                <Box
                    sx={{
                        marginTop:'40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                     '@media (max-width:750px)': {
                            flexDirection:'column-reverse',
                            flexWrap:'wrap',
                            gap:3
                        },
                    }}>
                    <ChapterList />
                    <MangaActionSidebar />
                </Box>

            </Box>
        </Box >
    )
}

export default MangaInformation
