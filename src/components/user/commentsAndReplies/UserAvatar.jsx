import React from 'react';
import { Avatar } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

function UserAvatar({ originalImage, cropData }) {
    const avatarSize = 40;

    if (!originalImage) {
        return <Avatar sx={{ width: avatarSize, height: avatarSize }} />;
    }

    return (
        <AvatarEditor
            image={originalImage}
            width={avatarSize}
            height={avatarSize}
            border={0}
            borderRadius={avatarSize / 2}
            scale={cropData.scale}
            rotate={cropData.rotate}
            position={cropData.position}
            style={{ borderRadius: "50%" }}
        />
    );
}

export default UserAvatar;