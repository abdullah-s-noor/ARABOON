import React from "react"
import AvatarEditor from "react-avatar-editor"
import { Avatar } from "@mui/material"

function CroppedAvatar({ originalImage, cropData, size = 100 }) {
    if (!originalImage) {
        return <Avatar sx={{ width: size, height: size,transform: "translateY(-40px) translatex(20px)" }} />
    }

    return (
        <AvatarEditor
            image={originalImage}
            width={size}
            height={size}
            border={0}
            borderRadius={size / 2} // دائري
            scale={cropData.scale}
            rotate={cropData.rotate}
            position={cropData.position}
            style={{ border: "3px solid #1976d2", borderRadius: "50%" ,transform: "translateY(-40px) translatex(20px)"}}
        />
    )
}

export default CroppedAvatar
