import React from "react"
import AvatarEditor from "react-avatar-editor"
import { Avatar, useTheme } from "@mui/material"

function CroppedAvatar({ originalImage, cropData, size = 100 }) {
    const theme=useTheme()
    if (!originalImage) {
        return <Avatar sx={{ width: size, height: size, transform: "translateY(-40px) translatex(20px)" }} />
    }

    return (
        <AvatarEditor
            image={originalImage}
            width={size}
            height={size}
            border={0}
            borderRadius={size /2} // دائري
            scale={cropData.scale}
            rotate={cropData.rotate}
            position={cropData.position}
            style={{  border:`5px solid ${theme.palette.primary.main}`, borderRadius: "50%",  }}
        />
    )
}

export default CroppedAvatar
