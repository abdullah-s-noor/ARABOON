import {
    TableCell, IconButton, Menu, MenuItem, Stack, Tooltip, Chip
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    Search,
    SearchOff
} from "@mui/icons-material";

export default function ActionsCell({ status, onStatusChange, role, onRoleChange, loading }) {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const openMenu = Boolean(menuAnchor);

    const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                {/* Role Menu */}
                <Tooltip title="Change Role">
                    <IconButton onClick={handleMenuOpen} disabled={loading}>
                        {role === "Admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                    </IconButton>
                </Tooltip>

                <Menu anchorEl={menuAnchor} open={openMenu} onClose={handleMenuClose}>
                    <MenuItem
                        selected={role === "User"}
                        onClick={() => { role!=="User"&&onRoleChange("User"); handleMenuClose(); }}
                    >
                        <PersonIcon fontSize="small" sx={{ mr: 1 }} /> User
                    </MenuItem>
                    <MenuItem
                        selected={role === "Admin"}
                        onClick={() => {role!=="Admin"&&onRoleChange("Admin"); handleMenuClose(); }}
                    >
                        <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} /> Admin
                    </MenuItem>
                </Menu>
                {/* Status Toggle */}

                <Tooltip title={status === "active" ? "Deactivate User" : "Activate User"}>
                    <IconButton
                        size="small"
                        color={status === "active" ? "warning" : "success"}
                        aria-label={status === "active" ? "Deactivate User" : "Activate User"}
                        disabled={loading}
                        onClick={() => {
                            const newStatus = status === "active" ? "inactive" : "active";
                            !loading && onStatusChange(newStatus);
                        }}
                    >
                        {status === "active" ? <InactiveIcon /> : <ActiveIcon />}
                    </IconButton>
                </Tooltip>


            </Stack>
        </>
    );
}
