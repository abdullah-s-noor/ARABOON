import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { Reply, ExpandLess, ExpandMore } from '@mui/icons-material'
import UserAvatar from '../UserAvatar'
import CommentAndRepliesActions from '../CommentAndRepliesActions'
import { UserContext } from '../../../../context/UserContext'
import { useTranslation } from 'react-i18next'

function CommentActions({
    comment,
    editComment,
    likeComment,
    deleteComment,
    newReplyCount,
    handleReplyClick,
    showReplies,
    setShowReplies
}) {
    const {t}=useTranslation()
    const theme = useTheme()
    const [tempComment, setTempComment] = useState(comment)
    const { userToken } = useContext(UserContext)
    // for smooth scroll to the reply field when click on reply button for reply
    
    return (
        <>
            <Box sx={{ display: "flex", gap: 2, }}>
                {/* avatarUrl */}
                <UserAvatar originalImage={comment.user.profileImage.originalImage} cropData={comment.user.profileImage.cropData} profileUsername={comment.user.userName}/>
                {/* like unlike delete and edit the comment */}
                <CommentAndRepliesActions
                    item={comment}
                    tempItem={tempComment}
                    setTempItem={setTempComment}
                    onEdit={editComment}
                    onLike={likeComment}
                    onDelete={deleteComment}
                />
            </Box>
            {/** reply and since */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem" }}>
                    {tempComment?.since || 'just now'}
                </Typography>

                {userToken && <Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                    onClick={() => { handleReplyClick(comment.user) }}>
                    <Reply sx={{ fontSize: 16 }} /> {t("commentAndReply.reply")}
                </Button>}

                {(comment?.replyCount + newReplyCount) > 0 && (
                    <Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                        onClick={() => setShowReplies(!showReplies)}
                    >
                        {showReplies ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}{`${comment.replyCount + newReplyCount} ${comment.replyCount + newReplyCount === 1 ? t("commentAndReply.reply") : t("commentAndReply.replies")}`}
                    </Button>
                )}
            </Box>
        </>
    )
}

export default CommentActions
