import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

function MySkeleton({ SkeletonCount, h, w, pd }) {
    return (
        <>
            {
                Array.from({ length: SkeletonCount }, (_, index) => (
                    <Stack key={index} spacing={0} sx={{ p: pd, }}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: h,
                                width: w,
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

export default MySkeleton
