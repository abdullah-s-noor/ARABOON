import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import React, { memo, useContext, useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar';
import { Delete, Edit, ExpandLess, ExpandMore, MoreHoriz, Reply, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../../context/UserContext';
import RepliesList from '../replies/RepliesList';

function CommentCard({ comment, deleteComment, likeComment, editComment }) {
    const theme = useTheme();
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null);
    console.log(comment.id)
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [isEditing, setIsEditing] = useState(false);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [showReplies, setShowReplies] = useState(false);
    const [tempComment, setTempComment] = useState(comment);
    const [newText, setNewText] = useState(tempComment.content);
    // for case when update and canele the edit to restore the old content but in tempComment not in comment
    useEffect(() => {
        setNewText(tempComment.content);
    }, [tempComment])
    const [loading, setLoading] = useState(false);
    useEffect(() => { console.log(loading) }, [loading])
    return (
        <>
            <Box sx={{ p: 2, backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5", borderRadius: 2 }}>
                {/* name, comment content,like,delete and edit  */}
                <Box sx={{ display: "flex", gap: 2, }}>
                    {/* avatarUrl */}
                    <UserAvatar originalImage={comment.user.profileImage.originalImage} cropData={comment.user.profileImage.cropData} />

                    {/* username and the content comment */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{comment.user.name}</Typography>
                        {isEditing ? (<>
                            <TextField fullWidth multiline size="small" value={newText} onChange={(e) => setNewText(e.target.value)} /*onKeyPress={(e) => e.key === "Enter" && editComment(tempComment.id, newText, setIsEditing,setTempComment)} */ />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => { setIsEditing(false); setNewText(tempComment.content); }}>Cancel</Button>
                                <Button disabled={newText.trim() === tempComment.content || loading} variant="contained" size="small" sx={{ mt: 1 }} onClick={() => { editComment(tempComment.id, newText, setIsEditing, setTempComment, setLoading); }}>Save</Button>
                            </Box>
                        </>
                        ) : (
                            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.4 }}>{tempComment.content}</Typography>)}
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
                            <MenuItem onClick={() => { handleMenuClose(); deleteComment(comment.id); }}>
                                <Delete sx={{ ...(i18n.language === 'en' ? { mr: 1 } : { ml: 1 }), fontSize: 16 }} />
                                Delete
                            </MenuItem>
                        </Menu>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <IconButton sx={{ color: tempComment?.isLiked ? theme.palette.primary.main : theme.palette.mode === "dark" ? "#888" : "#666", p: 0.5 }}
                                onClick={() => { !loading && likeComment(tempComment, setTempComment, setLoading) }}>
                                {tempComment?.isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                            </IconButton>
                            <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", fontWeight: 500 }}>
                                {tempComment?.likes?.toLocaleString() || 0}
                            </Typography>
                        </Box>

                        {/* reply and since */}
                    </Box>}
                </Box>
                {/** reply and since */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem" }}>
                        {tempComment?.since || 'just now'}
                    </Typography>

                    {<Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Reply sx={{ fontSize: 16 }} /> Reply
                    </Button>}

                    {comment?.replyCount > 0 && (
                        <Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}{`${comment.replyCount} ${comment.replyCount === 1 ? "Reply" : "Replies"}`}
                        </Button>
                    )}
                </Box>
                {showReplies && (<RepliesList commentId={comment.id} />)}
            </Box>

        </>
    )
}

export default memo(CommentCard)
