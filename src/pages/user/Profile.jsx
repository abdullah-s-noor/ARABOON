import { Avatar, Box } from '@mui/material'
import CoverImage from '../../components/user/profile/coverImage/CoverImage'
import React from 'react'
import MyAvatar from '../../components/common/MyAvatar'
import ProfileImage from '../../components/user/profile/profileImage/ProfileImage'

function Profile() {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', bgcolor: 'background.paper' }}>
            <CoverImage />
            <ProfileImage />
            <Avatar sx={{ border: '3px solid', borderColor: 'primary.main', width: 100, height: 100, transform: "translateY(-40px) translatex(20px)" }} />
        </Box>

    )
}

export default Profile
