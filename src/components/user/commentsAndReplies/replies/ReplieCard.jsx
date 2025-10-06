import { Box, Button, Typography, useTheme } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar';
import { Reply } from '@mui/icons-material';
import { UserContext } from '../../../../context/UserContext';
import CommentAndRepliesActions from '../CommentAndRepliesActions';
import { useTranslation } from 'react-i18next';
function ReplieCard({ reply, deleteReply, likeReply, editReply, handleReplyClick }) {
    const theme = useTheme();
    const {t}=useTranslation()
    const { userToken } = useContext(UserContext)
    const [tempReply, setTempReply] = useState(reply)
    // for case when update and canele the edit to restore the old content but in tempReply not in comment
    console.log(tempReply)
    return (
        <>
            <Box sx={{
                p: { xs: 1, sm: 2 }, borderRadius: 2, background: theme.palette.mode === "dark"
                    ? "linear-gradient(180deg, #2a2a2a 0%, #222222 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)",
            }}>
                {/* name, comment content,like,delete and edit  */}
                <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, }}>
                    {/* avatarUrl */}
                    <UserAvatar originalImage={reply.user.profileImage.originalImage} cropData={reply.user.profileImage.cropData} profileUsername={reply.user.userName} />
                    <CommentAndRepliesActions
                        item={tempReply}
                        tempItem={tempReply}
                        setTempItem={setTempReply}
                        onEdit={editReply}
                        onLike={likeReply}
                        onDelete={deleteReply}
                        isReply={true}
                    />

                </Box>
                {/** reply and since */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem" }}>
                        {tempReply?.since || 'just now'}
                    </Typography>
                    {userToken && <Button size="small" sx={{ color: theme.palette.mode === "dark" ? "#888" : "#666", fontSize: "0.75rem", minWidth: "auto", p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }} onClick={() => { handleReplyClick(reply.user) }}>
                        <Reply sx={{ fontSize: 16 }} /> {t("commentAndReply.reply")}
                    </Button>}
                </Box>
            </Box>
        </>
    )
}

export default ReplieCard
