import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import React, { memo, useContext, useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar';
import { Delete, Edit, ExpandLess, ExpandMore, MoreHoriz, Reply, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../../context/UserContext';
function ReplieCard({ replie, deleteReply, likeReply, editReply }) {
    const theme = useTheme();
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null);
    console.log(replie.id)
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [isEditing, setIsEditing] = useState(false);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [tempReply, setTempReply] = useState(replie);
    const [newText, setNewText] = useState(tempReply.content);
    // for case when update and canele the edit to restore the old content but in tempReply not in comment
    useEffect(() => {
        setNewText(tempReply.content);
    }, [tempReply])
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Box sx={{
                p: 2, borderRadius: 2, background: theme.palette.mode === "dark"
                    ? "linear-gradient(180deg, #2a2a2a 0%, #222222 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)",
            }}>
                {/* name, comment content,like,delete and edit  */}
                <Box sx={{ display: "flex", gap: 2, }}>
                    {/* avatarUrl */}
                    <UserAvatar originalImage={replie.user.profileImage.originalImage} cropData={replie.user.profileImage.cropData} />

                    {/* username and the content comment */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{replie.user.name}</Typography>
                        {isEditing ? (<>
                            <TextField fullWidth multiline size="small" value={newText} onChange={(e) => setNewText(e.target.value)} /*onKeyPress={(e) => e.key === "Enter" && editComment(tempReply.id, newText, setIsEditing,setTempReply)} */ />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => { setIsEditing(false); setNewText(tempReply.content); }}>Cancel</Button>
                                <Button disabled={newText.trim() === tempReply.content || loading} variant="contained" size="small" sx={{ mt: 1 }} onClick={() => { editReply(tempReply.id, newText, setIsEditing, setTempReply, setLoading); }}>Save</Button>
                            </Box>
                        </>
                        ) : (
                            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.4 }}>{tempReply.content}</Typography>)}
                    </Box>
                    {/* actions like edit delete and like on the right side*/}
                    {<Box sx={{ display: "flex", flexDirection: 'column', gap: 0.5 }}>
                        {<IconButton onClick={handleMenuClick} sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", p: 0.5 }}>
                            <MoreHoriz />
                        </IconButton>}
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: i18n.language === 'en' ? "right" : "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: i18n.language === 'en' ? "right" : "left",
                            }}
                            sx={{ textAlign: "start" }}
                        >
                            <MenuItem onClick={() => { setIsEditing(true); handleMenuClose(); }}>
                                <Edit sx={{ ...(i18n.language === 'en' ? { mr: 1 } : { ml: 1 }), fontSize: 16 }} />
                                Edit
                            </MenuItem>
                            <MenuItem onClick={() => { handleMenuClose();deleteReply(tempReply.id); }}>
                                <Delete sx={{ ...(i18n.language === 'en' ? { mr: 1 } : { ml: 1 }), fontSize: 16 }} />
                                Delete
                            </MenuItem>
                        </Menu>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <IconButton sx={{ color: tempReply?.isLiked ? theme.palette.primary.main : theme.palette.mode === "dark" ? "#888" : "#666", p: 0.5 }}
                                onClick={() => { !loading && likeReply(tempReply, setTempReply, setLoading) }}
                            >
                                {tempReply?.isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                            </IconButton>
                            <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", fontWeight: 500 }}>
                                {tempReply?.likes?.toLocaleString() || 0}
                            </Typography>
                        </Box>

                        {/* reply and since */}
                    </Box>}


                </Box>
                {/** reply and since */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem" }}>
                        {tempReply?.since || 'just now'}
                    </Typography>

                    {<Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Reply sx={{ fontSize: 16 }} /> Reply
                    </Button>}
                </Box>
            </Box>
        </>
    )
}

export default ReplieCard
