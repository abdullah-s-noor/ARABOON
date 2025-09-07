import React from "react"
import AvatarEditor from "react-avatar-editor"
import { Avatar, useMediaQuery, useTheme } from "@mui/material"

function CroppedAvatar({ originalImage, cropData }) {
    const theme=useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only("xs"))
    const isSm = useMediaQuery(theme.breakpoints.only("sm"))
    const isMd = useMediaQuery(theme.breakpoints.only("md"))
    let avatarSize = 180
    if (isXs) avatarSize = 120
    if (isSm) avatarSize = 120
    if (isMd) avatarSize = 180
    console.log(originalImage)
    if (!originalImage) {
        return <Avatar sx={{ width: avatarSize , height: avatarSize  }} />
    }

    return (
        <AvatarEditor
            image={originalImage}
            width={avatarSize }
            height={avatarSize }
            border={0}
            borderRadius={avatarSize / 2} // دائري
            scale={cropData.scale}
            rotate={cropData.rotate}
            position={cropData.position}
            style={{ border: `5px solid ${theme.palette.primary.main}`, borderRadius: "50%", }}
        />
    )
}

export default CroppedAvatar
