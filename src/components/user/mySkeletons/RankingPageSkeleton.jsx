import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

function RankingPageSkeleton({ SkeletonCount }) {
    return (

<>
            {
                Array.from({ length: SkeletonCount }, (_, index) => (
                    <Stack key={index} spacing={0} sx={{  p: { xs: '5px', sm: '10px' }, }}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: { xs: "165px", sm: "225px", md: "270px", lg: "315px" },
                                width: { xs: "110px", sm: "150px", md: "180px", lg: "210px" },
                            }}
                            />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="40%" />
                    </Stack>
                ))
            }
            </>
    )
}

export default RankingPageSkeleton
