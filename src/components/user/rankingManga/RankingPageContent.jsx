import { Box} from '@mui/material'
import RankingPageCard from './RankingPageCard'

function RankingPageContent() {
    return (
        <>
            <Box
                sx={{
                    p: { xs: "20px 3px", sm: "30px 10px" },
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: { xs: .5, sm: 2 }
                }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, index) => (
                    <RankingPageCard key={index} n={n}/>
                ))}

            </Box>
        </>
    )
}

export default RankingPageContent
