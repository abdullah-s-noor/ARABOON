// CommentInput.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, IconButton, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import UserContextProvider, { UserContext } from '../../../../context/UserContext';
import UserAvatar from '../UserAvatar';
import { api } from '../../../../services/api';
import { createRoot } from 'react-dom/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MessageInput = ({ placeholder,commentId,setReplies,replyingToUser,setReplyingToUser }) => {
    const{i18n}=useTranslation()
    const theme = useTheme();
    const { userData } = useContext(UserContext)
    const profileImage = JSON.parse(userData.ProfileImage)
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams()
    const mangaId = params.mangaID
    useEffect(() => {
        console.log("replyingToUser",replyingToUser)
    }, [replyingToUser])    
    const addReply = async () => {
    }

    return (
        <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "flex-start" }}>
            <UserAvatar originalImage={profileImage.OriginalImage} cropData={profileImage.CropData} />
            <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
                <TextField
                    fullWidth
                    multiline
                    size="small"
                    placeholder={placeholder}
                    value={value} // 👈 اربط القيمة بالحالة المحلية
                    onChange={(e) => setValue(e.target.value)} // 👈 حدث الحالة المحلية
                    onKeyPress={(e) => {
                        if (!loading && e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            addReply();
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
                        },
                    }}
                />
                <IconButton
                    onClick={!loading && addReply}
                    disabled={!value.trim() || loading}
                    color="primary"
                    sx={{ alignSelf: "flex-start" ,transform: i18n.language==='ar'&&"rotate(180deg)" }}
                >
                    <Send />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageInput;