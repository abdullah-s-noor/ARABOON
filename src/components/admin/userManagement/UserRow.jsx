import { Chip, IconButton, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import {
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from "@mui/icons-material";
import UserAvatar from '../../user/commentsAndReplies/UserAvatar';
import ActionsCell from './ActionsCell';
function UserRow({ user, updateUserLocally }) {
    const theme = useTheme()
    const { i18n, t } = useTranslation()
    console.log(user)
    const style = {
        textAlign: {
            textAlign: i18n.language === "ar" ? "right" : "left"
        }
    };
    const status = user.isActive ? 'active' : 'inactive';
    const role = user.role;
    const [loading, setLoading] = useState(false);
    const handleStatusChange = async (newStatus) => {
        try {
            setLoading(true);
            await updateUserLocally(user.id, { isActive: newStatus === 'active' }, "status");
        } finally {
            setLoading(false);
        }
    }
    const handleRoleChange = async (newRole) => {
        try {
            setLoading(true);
            await updateUserLocally(user.id, { role: newRole }, "role");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <TableRow key={user.id}>
                {/* Profile Image */}
                <TableCell sx={style.textAlign}>
                    <UserAvatar originalImage={user.profileImage.originalImage} cropData={user.profileImage.cropData} profileUsername={user.username} />

                </TableCell>

                {/* Name */}
                <TableCell sx={style.textAlign}>{user.displayName}</TableCell>

                {/* Username */}
                <TableCell sx={style.textAlign}>{user.username}</TableCell>

                {/* Email */}
                <TableCell sx={style.textAlign}>{user.email}</TableCell>

                {/* Role */}
                <TableCell sx={style.textAlign}>
                    <Chip
                        label={role}
                        color={role === "Admin" ? "primary" : "default"}
                        sx={{
                        }}
                        size="small"
                    />
                </TableCell>

                {/* Status */}
                <TableCell sx={style.textAlign}>
                    <Chip
                        sx={{ direction: "ltr" }}
                        label={status === "active" ? "Active" : "Inactive"}
                        color={status === "active" ? "success" : "error"}
                        size="small"
                        icon={status === "active" ? <ActiveIcon /> : <InactiveIcon />}
                    />
                </TableCell>

                {/* Created At */}
                <TableCell sx={style.textAlign}>
                    {user.createdAt}
                </TableCell>

                {/* Last Login */}
                <TableCell sx={style.textAlign}>
                    {user.lastLogin !== "N/A"
                        ? user.lastLogin
                        : (i18n.language === "ar" ? "لم يسجل بعد" : "Never logged")}
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                    <ActionsCell
                        status={status}
                        onStatusChange={handleStatusChange}
                        role={role}
                        onRoleChange={handleRoleChange}
                        loading={loading}
                    />
                </TableCell>
            </TableRow>
        </>
    )
}

export default React.memo(UserRow, (prevProps, nextProps) => {
    return (
        prevProps.user === nextProps.user
    );
});