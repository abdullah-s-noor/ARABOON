import { Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    Search,
    SearchOff
} from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
function CategoryRow({ category, handleOpenDialog, handleDeleteCategory, handleToggleActive }) {
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const style = {
        textAlign: {
            textAlign: i18n.language === "ar" ? "right" : "left"
        }
    };
    const handleFunction = async (type) => {
        try {
            setLoading(true);
            if (type === "delete") {
                await handleDeleteCategory(category);
            } else if (type === "toggle") {
                await handleToggleActive(category);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <TableRow key={category.id} hover sx={style.textAlign} row-id={category.id}>
                <TableCell sx={style.textAlign}>
                    <Typography fontWeight={500}>{category.en}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category.ar}
                    </Typography>
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Typography variant="body2" color="text.secondary">
                        {category.availableMangaCounts}
                    </Typography>
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Chip
                        sx={{ direction: "ltr" }}
                        label={category.isActive ? "Active" : "Inactive"}
                        color={category.isActive ? "success" : "default"}
                        size="small"
                        icon={category.isActive ? <ActiveIcon /> : <InactiveIcon />}
                    />
                </TableCell>
                <TableCell sx={style.textAlign}>
                    <Typography variant="body2" color="text.secondary">
                        {category.createdAt}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                    >
                        <Tooltip title={category.isActive ? "Deactivate Category" : "Activate Category"}>
                            <IconButton
                                size="small"
                                color={category.isActive ? "warning" : "success"}
                                onClick={() => handleFunction("toggle")}
                                disabled={loading}

                            >
                                {category.isActive ? <InactiveIcon /> : <ActiveIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Category">
                            <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleOpenDialog(category)}
                                disabled={loading}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Category">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleFunction("delete")}
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

export default CategoryRow
