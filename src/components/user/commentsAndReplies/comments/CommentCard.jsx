import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import UserAvatar from '../UserAvatar';
import { Delete, Edit, ExpandLess, ExpandMore, MoreHoriz, Reply, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../../context/UserContext';
import RepliesList from '../replies/RepliesList';
import MessageInput from '../replies/MessageInput';
import { useNavigate } from 'react-router-dom';

function CommentCard({ comment, deleteComment, likeComment, editComment }) {
    const navigate=useNavigate()
    const theme = useTheme();
    const { i18n } = useTranslation()
    const {userToken}=useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [isEditing, setIsEditing] = useState(false);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [tempComment, setTempComment] = useState(comment);
    const [newText, setNewText] = useState(tempComment.content);
    // for case when update and canele the edit to restore the old content but in tempComment not in comment
    useEffect(() => {
        setNewText(tempComment.content);
    }, [tempComment])
    const [loading, setLoading] = useState(false);
    //this is for replies
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState(null); // null = not loaded yet
    const [paginatedReplies, setPaginatedReplies] = useState({
        pageNumber: 0,
        hasNextPage: true,
    });
    const [replyingToUser, setReplyingToUser] = useState(null);
    useEffect(() => {
        setShowReplies(replies && replies.length > 0);
    }, [replies])
    const [newReplyCount, setNewReplyCount] = useState(0);

    // for smooth scroll to the reply field when click on reply button for reply
    const replyInputRef = useRef(null);

    // Function to handle reply click, scroll, and focus
    const [startScroll, setStartScroll] = useState(false);
    const handleReplyClick = (user) => {
        setReplyingToUser(user);
        setStartScroll(true);
    };
    useEffect(() => {
        if (startScroll && replyInputRef.current) {
             const elem = document.querySelector(`[data-id='${comment.id}']`);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (replyInputRef.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        replyInputRef.current.focus();
                        observer.disconnect(); // وقف المراقبة بعد ما يركز
                        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }, { threshold: .99 });

            observer.observe(replyInputRef.current);
        }
            setStartScroll(false);
        }
    }, [startScroll])

    return (
        <>
            <Box sx={{ p: {xs:1,sm:2}, backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5", borderRadius: 2 }}>
                {/* name, comment content,like,delete and edit  */}
                <Box sx={{ display: "flex", gap: 2, }}>
                    {/* avatarUrl */}
                    <UserAvatar originalImage={comment.user.profileImage.originalImage} cropData={comment.user.profileImage.cropData} />

                    {/* username and the content comment */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5,cursor:'pointer' }} onClick={()=>{navigate(`/${comment.user.userName}`)}}>{comment.user.name}</Typography>
                        {isEditing ? (<>
                            <TextField fullWidth multiline size="small" value={newText} onChange={(e) => setNewText(e.target.value)} /*onKeyPress={(e) => e.key === "Enter" && editComment(tempComment.id, newText, setIsEditing,setTempComment)} */ />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => { setIsEditing(false); setNewText(tempComment.content); }}>Cancel</Button>
                                <Button disabled={newText.trim() === tempComment.content || loading||newText.trim()===''} variant="contained" size="small" sx={{ mt: 1 }} onClick={() => { editComment(tempComment.id, newText, setIsEditing, setTempComment, setLoading); }}>Save</Button>
                            </Box>
                        </>
                        ) : (
                            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.4 }}>{tempComment.content}</Typography>)}
                    </Box>


                    {/* actions like edit delete and lik on the right side*/}
                    {userToken&&<Box sx={{ display: "flex", flexDirection: 'column', gap: 0.5 }}>
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

                    {userToken&&<Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                        onClick={() => { handleReplyClick(comment.user) }}>
                        <Reply sx={{ fontSize: 16 }} /> Reply
                    </Button>}

                    {(comment?.replyCount + newReplyCount) > 0 && (
                        <Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}{`${comment.replyCount + newReplyCount} ${comment.replyCount + newReplyCount === 1 ? "Reply" : "Replies"}`}
                        </Button>
                    )}
                </Box>
                <Box mt={2} sx={{ pl: {xs:1,sm:4}, borderLeft: '2px solid', borderColor: 'divider' }}>
                    {replyingToUser &&userToken&&
                        <MessageInput
                            placeholder="Write a new comment..."
                            commentId={comment.id}
                            setReplies={setReplies}
                            replyingToUser={replyingToUser}
                            setReplyingToUser={setReplyingToUser}
                            setNewReplyCount={setNewReplyCount}
                            replyInput={replyInputRef}
                        />}
                    {showReplies && (
                        <RepliesList
                            commentId={comment.id}
                            replies={replies}
                            setReplies={setReplies}
                            paginatedReplies={paginatedReplies}
                            setPaginatedReplies={setPaginatedReplies}
                            handleReplyClick={handleReplyClick}
                        />
                    )}
                </Box>
            </Box>

        </>
    )
}

export default memo(CommentCard)
