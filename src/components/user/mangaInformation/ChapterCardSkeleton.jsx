import { Box, Typography, Skeleton } from '@mui/material';
import React from 'react';

function ChapterCardSkeleton() {
    return (
        <>
            {/* Skeleton for chapter image */}
            <Skeleton
                animation="wave" 
                variant="rectangular"
                sx={{ minHeight: { xs: 67, sm: 111 }, minWidth: { xs: 120, sm: 200 } }}
            />
            {/* Skeleton for chapter info */}
            <Box sx={{ width: '100%' }}>
                {/* Skeleton for chapter number/title */}
                <Skeleton variant="text" sx={{width:{xs:"40px",sm:"70px"}, height:{xs:32 ,sm:42}}} />
                {/* Skeleton for episode name */}
                <Skeleton variant="text" sx={{ width: { xs: "140px", sm: "230px" } }} height={24} />
                {/* Skeleton for release date */}
                <Skeleton variant="text" width="80px" height={20} sx={{ mt: { xs: .5, sm: 2 } }} />
            </Box>
        </>
    );
}

export default ChapterCardSkeleton;
