import { Button, Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from "@mui/icons-material";
import UserAvatar from '../../user/commentsAndReplies/UserAvatar';
import ActionsCell from './ActionsCell';
import { api } from '../../../services/api';
function UserRow({ banner, handleDeleteBanner, handleToggleActive, handleOpenEditDialog, setPreviewImage }) {
    const theme = useTheme()
    const { i18n, t } = useTranslation()
    const style = {
        textAlign: {
            textAlign: i18n.language === "ar" ? "right" : "left"
        }
    };
    const status = banner.isActive ? 'active' : 'inactive';
    const [loading, setLoading] = useState(false);
    const handleStatusChange = async (newStatus) => {
        try {
            setLoading(true);
            await handleToggleActive(`/swipers/${banner.id}/active-toggle`, banner.id, newStatus);
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = async (banner) => {
        try {
            setLoading(true);
            const { data } = await api.delete(`/swipers/${banner.id}`)
            handleDeleteBanner(banner, data.message);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <TableRow key={banner.id} hover sx={style.textAlign} row-id={banner.id}>
                <TableCell sx={style.textAlign}>
                    <Typography fontWeight={500}>{banner.noteEn}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {banner.noteAr}
                    </Typography>
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Typography variant="body2" color="text.secondary">
                        {banner.link.replace(/^https?:\/\//, '')}
                    </Typography>

                </TableCell>
                <TableCell sx={style.textAlign}>
                    {banner.url ? (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setPreviewImage(banner.url)}
                        >
                            {i18n.language === "ar" ? "عرض" : "View"}
                        </Button>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {i18n.language === "ar" ? "لا توجد صورة" : "No Image"}
                        </Typography>
                    )}
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Chip
                        sx={{ direction: "ltr" }}
                        label={banner.isActive ? "Active" : "Inactive"}
                        color={banner.isActive ? "success" : "default"}
                        size="small"
                        icon={banner.isActive ? <ActiveIcon /> : <InactiveIcon />}
                    />
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Typography variant="body2" color="text.secondary">
                        {banner.createdAt}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                    >
                        <Tooltip title={banner.isActive ? "Deactivate User" : "Activate User"}>
                            <IconButton
                                size="small"
                                color={banner.isActive ? "warning" : "success"}
                                onClick={() => handleStatusChange(!banner.isActive)}
                                disabled={loading}
                            >
                                {banner.isActive ? <InactiveIcon sx={{}} /> : <ActiveIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Banner">
                            <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleOpenEditDialog(banner)}
                                disabled={loading}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Banner">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(banner)}
                                disabled={loading}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    )
}

export default React.memo(UserRow, (prevProps, nextProps) => {
    return (
        prevProps.banner === nextProps.banner
    );
});