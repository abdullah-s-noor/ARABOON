import { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Chip,
    Menu,
    MenuItem,
    Divider,
    Box,
    Typography,
    ListItemIcon,
    IconButton,
    useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import usePhone from "../../hooks/usePhone";
import { UserContext } from "../../context/UserContext";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import AvatarEditor from "react-avatar-editor";

export default function ProfileMenu() {
    const theme = useTheme()
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null);
    const { isPhone } = usePhone()
    const { contextLoading, logout, userData } = useContext(UserContext)
    const profileImage = JSON.parse(userData.ProfileImage)
    console.log(profileImage.OriginalImage)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const CroppedAvatar = (originalImage, cropData, avatarSize, b = 0) => {
        console.log(originalImage)
        if (!originalImage) {
            return <Avatar sx={{ width: avatarSize, height: avatarSize }} />
        }

        return (
            <AvatarEditor
                image={originalImage}
                width={avatarSize}
                height={avatarSize}
                border={0}
                borderRadius={avatarSize / 2} // دائري
                scale={cropData.scale}
                rotate={cropData.rotate}
                position={cropData.position}
                style={{ border: `${b}px solid ${theme.palette.primary.main}`, borderRadius: "50%", }}
            />
        )

    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#222",
                    color: "#ccc",
                    borderRadius: "20px",
                    padding: "4px 8px",
                    cursor: "pointer",
                    width: "fit-content",
                    ...(isPhone
                        ? { "&:active": { backgroundColor: "#333" } }
                        : { "&:hover": { backgroundColor: "#333" } }),
                }}
                onClick={!contextLoading && handleClick}
            >
                {CroppedAvatar(profileImage.OriginalImage, profileImage.CropData, 24)}
                <Typography sx={{
                    flexGrow: 1,
                    marginRight: i18n.language === "en" ? 0 : 1,
                    marginLeft: i18n.language === "en" ? 1 : 0,
                }}>{userData.FirstName}</Typography>
                <IconButton sx={{ padding: 0 }}>
                    <ArrowDropDownIcon sx={{ color: "#ccc" }} />
                </IconButton>
            </Box>


            {/* Custom Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        width: 350,
                        borderRadius: 3,
                        boxShadow: 5,
                        p: 1,
                    },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {/* Profile Header */}
                <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    {CroppedAvatar(profileImage.OriginalImage, profileImage.CropData, 100,3)}

                    <Box sx={{
                        marginRight: i18n.language === "en" ? 0 : 2,
                        marginLeft: i18n.language === "en" ? 2 : 0,
                    }}>
                        <Typography fontWeight="bold">
                            {userData?.FirstName + " " + userData?.LastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{userData.UserName}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 1 }} />
                {/* Menu Items */}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => { handleClose(), logout() }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
