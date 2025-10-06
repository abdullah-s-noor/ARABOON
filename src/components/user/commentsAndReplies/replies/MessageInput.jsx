// CommentInput.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../../../../context/UserContext';
import UserAvatar from '../UserAvatar';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../../../../services/api';

const MessageInput = ({ commentId, setReplies, replyingToUser, setReplyingToUser, setNewReplyCount, replyInput }) => {
    const { i18n, t } = useTranslation();
    const theme = useTheme();
    const { userData } = useContext(UserContext);
    const profileImage = JSON.parse(userData.ProfileImage);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const mangaId = params.mangaID;

    useEffect(() => {
        console.log("replyingToUser", replyingToUser);
    }, [replyingToUser]);

    const addReply = async () => {
        try {
            setLoading(true);
            const { data } = await api.post('/replies', {
                content: value,
                commentId,
                userId: replyingToUser.id
            })
            console.log(data.data)
            setReplies((prev) => ([...(prev || []), data.data]));
            setNewReplyCount((prevCount) => prevCount + 1);
        } catch (error) {
        } finally {
            setLoading(false);
            setValue('');
            setReplyingToUser(null);
        }
    };

    const handleCancelReply = () => {
        setValue('');
        setReplyingToUser(null);
    };
    const cropData = {
        scale: profileImage.CropData.Scale,
        rotate: profileImage.CropData.Rotate,
        position: { x: profileImage.CropData.Position.X, y: profileImage.CropData.Position.Y },
    }
    return (
        <Box sx={{ mb: 3, display: "flex", gap: { xs: .5, sm: 2 }, alignItems: "flex-start" }}>
            <UserAvatar originalImage={profileImage.OriginalImage} cropData={cropData} profileUsername={userData.ID} />

            <Box sx={{ flex: 1, display: { sm: "flex" }, gap: { xs: .5, sm: 1 }, alignItems: "center" }}>
                <TextField
                    reply-input-id={commentId}
                    inputRef={replyInput}
                    fullWidth
                    multiline
                    size="small"
                    placeholder={t("commentAndReply.replyPlaceholder")+` @${replyingToUser.name}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (!loading && e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            addReply();
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
                            mb: { xs: 1, sm: 0 },
                        },
                    }}
                />
                {replyingToUser && (
                    <Button onClick={handleCancelReply} variant="text" color="inherit" sx={{ alignSelf: "flex-start", textTransform: 'none' }}>
                        {t("commentAndReply.cancel")}
                    </Button>
                )}

                <Button
                    onClick={!loading && addReply}
                    disabled={!value.trim() || loading}
                    variant="contained"
                    color="primary"
                    sx={{
                        alignSelf: "flex-start",
                        ml: replyingToUser ? 0 : 1,
                        textTransform: 'none'
                    }}
                >
                    {t("commentAndReply.send")}
                </Button>
            </Box>
        </Box>
    );
};

export default MessageInput;





/*
  <IconButton onClick={handleCancelReply} color='inherit'>
                        <Close />
                    </IconButton>
                )}
                
                <IconButton
                    onClick={!loading && addReply}
                    disabled={!value.trim() || loading}
                    color="primary"
                    sx={{ alignSelf: "flex-start", transform: i18n.language === 'ar' && "rotate(180deg)" }}
                >
                    <Send />
                </IconButton>
*/