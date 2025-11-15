import { useContext, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
  Typography,
  ListItemIcon,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import AvatarEditor from "react-avatar-editor";
import { useLocation, useNavigate } from "react-router-dom";
import usePhone from "../../hooks/usePhone";
import { UserContext } from "../../context/UserContext";

// Subcomponent for cropped avatar rendering
function CroppedAvatar({ originalImage, cropData, size = 24, borderSize = 0, ...props }) {
  const theme = useTheme();
  if (!originalImage || !cropData) {
    return <Avatar sx={{ width: size, height: size }} {...props} />;
  }
  const position = {
    x: cropData.Position.X,
    y: cropData.Position.Y,
  };
  console.log(position)
  return (
    <AvatarEditor
      image={originalImage}
      width={size}
      height={size}
      border={0}
      borderRadius={size / 2}
      scale={cropData.Scale}
      rotate={cropData.Rotate}
      position={position}
      style={{
        border: `${borderSize}px solid ${theme.palette.primary.main}`,
        borderRadius: "50%",
        pointerEvents: "none",
        background: theme.palette.background.paper,
      }}
      {...props}
    />
  );
}

export default function ProfileMenu() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isPhone } = usePhone();
  const { contextLoading, logout, userData } = useContext(UserContext);
  const isAdmin = useLocation().pathname.startsWith('/dashboard')
  // Defensive checks in case userData is missing
  if (!userData) return null;
  let profileImage = {};
  try {
    profileImage = JSON.parse(userData.ProfileImage);
  } catch {
    profileImage = {};
  }

  // Event handlers
  const handleClick = (event) => {
    if (!contextLoading) setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  console.log(profileImage)
  // Accessibility: ARIA labels and keys for keyboard nav
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: (isAdmin && isMobile) ?  "primary.main" : "#222",
          color: "#ccc",
          borderRadius: "20px",
          padding: "4px 8px",
          cursor: contextLoading ? "not-allowed" : "pointer",
          width: "fit-content",
          opacity: contextLoading ? 0.6 : 1,
          ...(isPhone
            ? { "&:active": { backgroundColor: (isAdmin && isMobile) ? "thirdly.main" : "#333" } }
            : { "&:hover": { backgroundColor:(isAdmin && isMobile) ? "thirdly.main": "#333" } }),
        }}
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls={anchorEl ? "profile-menu" : undefined}
        aria-expanded={Boolean(anchorEl)}
        tabIndex={0}
        role="button"
      >
        <CroppedAvatar
          originalImage={profileImage.OriginalImage}
          cropData={profileImage.CropData}
          size={24}
        />
        <Typography
          sx={{
            flexGrow: 1,
            marginRight: i18n.language === "en" ? 0 : 1,
            marginLeft: i18n.language === "en" ? 1 : 0,
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          {userData.FirstName}
        </Typography>
        <IconButton
          sx={{ ml: 0.5, p: 0, color: "#ccc" }}
          aria-label="Open profile menu"
          tabIndex={-1}
          disableRipple
          disableFocusRipple
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Menu
        id="profile-menu"
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
        MenuListProps={{ "aria-labelledby": "profile-menu" }}
      >
        {/* Profile Header */}
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <CroppedAvatar
            originalImage={profileImage.OriginalImage}
            cropData={profileImage.CropData}
            size={100}
            borderSize={3}
          />
          <Box
            sx={{
              marginRight: i18n.language === "en" ? 0 : 2,
              marginLeft: i18n.language === "en" ? 2 : 0,
            }}
          >
            <Typography fontWeight="bold" fontSize={18} sx={{ wordBreak: "break-word" }}>
              {`${userData.FirstName} ${userData.LastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{userData.UserName}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />

        {/* Menu Items */}
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/${userData.UserName}`);
          }}
          aria-label={t('profile.profile')}
        >
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          {t('profile.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
          aria-label={t('logout')}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </>
  );
}
