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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import usePhone from "../../hooks/usePhone";
import { UserContext } from "../../context/UserContext";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";

export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isPhone } = usePhone()
    const { logout, userData } = useContext(UserContext)
    useEffect(() => {
        console.log(userData)
    }, [userData])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Chip with Avatar + Name + Arrow */}
            <Chip
                avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                label={userData.FirstName}
                onClick={handleClick}
                deleteIcon={<ArrowDropDownIcon sx={{color: "#ccc !important", }} />}
                onDelete={handleClick}
                sx={{
                    color: "#ccc",
                    borderRadius: "20px",
                    paddingRight: "8px",
                    backgroundColor: "#222",
                    cursor: "pointer",
                    ...(isPhone ? {
                        "&:active": {
                            backgroundColor: "#333",
                        },
                    } : {
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    })
                }}

            />

            {/* Custom Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        width: 280,
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
                    <Avatar
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
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
                <MenuItem onClick={() => { logout() }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>


            </Menu>
        </>
    );
}
