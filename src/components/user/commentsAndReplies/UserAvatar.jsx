import React from 'react';
import { Avatar, Box } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { useNavigate } from 'react-router-dom';

function UserAvatar({ originalImage, cropData ,profileUsername}) {
    const navigate=useNavigate()
    const avatarSize = 40;
    if (!originalImage) {

        return <Avatar onClick={()=>{navigate(`/${profileUsername}`)}} sx={{ width: avatarSize, height: avatarSize }} />;
    }
    return (
        <Box onClick={()=>{navigate(`/${profileUsername}`)}}>

        <AvatarEditor
        image={originalImage}
        width={avatarSize}
        height={avatarSize}
        border={0}
        borderRadius={avatarSize / 2}
        scale={cropData.scale}
        rotate={cropData.rotate}
        position={cropData.position}
        style={{ borderRadius: "50%",cursor:"pointer" }}
        />
        </Box>
    );
}

export default UserAvatar;