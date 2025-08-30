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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import usePhone from "../../hooks/usePhone";
import { UserContext } from "../../context/UserContext";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProfileMenu() {
    const {i18n}=useTranslation()
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
      onClick={handleClick}
    >
      <Avatar
        src="/static/images/avatar/1.jpg"
        sx={{
             width: 24, height: 24,
          marginRight: i18n.language === "en" ? 1 : 0,
          marginLeft: i18n.language === "en" ? 0 : 1,
        }}
      />
      <Typography sx={{ flexGrow: 1 }}>{userData.FirstName}</Typography>
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
