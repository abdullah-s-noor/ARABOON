import { IconButton, Stack } from '@mui/material'
import React from 'react'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from "@mui/icons-material";
function DashboardChapterActions({ onDelete, chapterInfo, onEdit }) {
    return (
        <>
            <Stack
                direction={{xs:"column",sm:"row"}}
                gap={{xs:.4,sm:1}}
                justifyContent="center"
            >
                <IconButton
                    color="info"
                    onClick={(e) => { onEdit(chapterInfo); e.stopPropagation() }}
                    title="Edit"
                // disabled={secondaryLoading}
                >
                    <EditIcon  sx={{ fontSize: {xs:"1rem",sm:"1.5rem"}}}/>
                </IconButton>
                <IconButton
                    color="error"
                    onClick={(e) => { e.stopPropagation(); onDelete(chapterInfo); }}
                    title="Delete"
                // disabled={secondaryLoading}
                >
                    <DeleteIcon sx={{ fontSize: {xs:"1rem",sm:"1.5rem"} }}/>
                </IconButton>
            </Stack>
        </>
    )
}

export default DashboardChapterActions
