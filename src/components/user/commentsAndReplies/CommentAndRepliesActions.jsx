import { Delete, Edit, MoreHoriz, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { UserContext } from '../../../context/UserContext';
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function CommentAndRepliesActions({ item, onLike, onDelete, onEdit, tempItem, setTempItem, isReply = false }) {
    //tempItem,setTempReply  it is come from reply card because there is a since also changed when use api
    const navigate = useNavigate();
    const theme = useTheme();
    const {t, i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // for case when update and canele the edit to restore the old content but in tempItem not in comment
    const [loading, setLoading] = useState(false);
    const { userToken,userData } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(tempItem.content);
    return (
        <>
            {/* to edit and write a new content either comment or reply */}
            <Box sx={{ flex: 1 }}>
                <Typography onClick={() => { navigate(`/${tempItem.user.userName}`) }} variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, cursor: "pointer" }}>{tempItem.user.name}</Typography>
                {isEditing ? (<>
                    <TextField fullWidth multiline size="small" value={newText} onChange={(e) => setNewText(e.target.value)} /*onKeyPress={(e) => e.key === "Enter" && editComment(tempItem.id, newText, setIsEditing,setTempReply)} */ />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => { setIsEditing(false); setNewText(tempItem.content); }}>Cancel</Button>
                        <Button disabled={newText.trim() === tempItem.content || loading || newText.trim() === ''} variant="contained" size="small" sx={{ mt: 1 }} onClick={() => { onEdit(tempItem.id, newText, setIsEditing, setTempItem, setLoading); }}>Save</Button>
                    </Box>
                </>
                ) : (
                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.4, }}>
                        {isReply && <Chip color='primary' sx={{ height: "20px", fontSize: "10px", cursor: 'pointer',...(i18n.language==="en"?{mr:.5}:{ml:.5}) }} label={tempItem?.replyToUser.name} onClick={() => { navigate(`/${tempItem?.replyToUser.userName}`) }} />}
                        {tempItem.content}
                    </Typography>)}
            </Box>
            {/* this is menu for enable edit or delete also for put link or unlike */}
            {userToken &&<Box sx={{ display: "flex", flexDirection: 'column', gap: 0.5 }}>
                {userData.ID===item.user.id&&<IconButton onClick={handleMenuClick} sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", p: 0.5 }}>
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
                        {t("commentAndReply.edit")}
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); onDelete(tempItem.id); }}>
                        <Delete sx={{ ...(i18n.language === 'en' ? { mr: 1 } : { ml: 1 }), fontSize: 16 }} />
                        {t("commentAndReply.delete")}
                    </MenuItem>
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <IconButton sx={{ color: tempItem?.isLiked ? theme.palette.primary.main : theme.palette.mode === "dark" ? "#888" : "#666", p: 0.5 }}
                        onClick={() => { !loading && onLike(tempItem, setTempItem, setLoading) }}
                    >
                        {tempItem?.isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                    </IconButton>
                    <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", fontWeight: 500 }}>
                        {tempItem?.likes?.toLocaleString() || 0}
                    </Typography>
                </Box>

                {/* reply and since */}
            </Box>}
        </>
    )

}

export default CommentAndRepliesActions
