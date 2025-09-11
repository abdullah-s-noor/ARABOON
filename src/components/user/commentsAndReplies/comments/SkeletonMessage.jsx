// SkeletonComment.jsx
import React, { useContext } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';
import { UserContext } from '../../../../context/UserContext';

const SkeletonMessage = () => {
  const theme = useTheme();
  const {userToken}=useContext(UserContext);
  return (
    <Box sx={{ display: 'flex', py: 2,px:{xs:.5,sm:2},
          backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
          borderRadius: 2,
          ml: 0,
          my: 2, }}>
      <Box
        sx={{
          display: 'flex',
          gap: {xs:.5,sm:2},
          flex:1
        }}
      >
        {/* الافاتار */}
        <Skeleton variant="circular" width={40} height={40} />

        {/* نصوص مكان المحتوى */}
        <Box sx={{ flex: 1 }}>
          {/* اسم المستخدم */}
          <Skeleton variant="text" width="30%" height={20} sx={{ mb: 0.5 }} />
          {/* سطر المحتوى */}
          <Skeleton variant="text" width="80%" height={16} sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
            <Skeleton variant="text" width="69px" height={16} />
            <Skeleton variant="text" width="30px" height={16} />
          </Box>
        </Box>
      </Box>
      <Box display={userToken?'block':'none'} sx={{ width: '40px' }}>
        {/* ثلاث نقاط */}
        <Skeleton variant="text" width="30px" height={16} />
        {/* لايك */}
        <Skeleton variant="text" width="30px" height={40} sx={{mt:0}}/>
      </Box>
    </Box>
  );
};

export default SkeletonMessage;
