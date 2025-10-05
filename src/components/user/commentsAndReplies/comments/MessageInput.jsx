// CommentInput.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, IconButton, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import UserContextProvider, { UserContext } from '../../../../context/UserContext';
import UserAvatar from '../UserAvatar';
import { api } from '../../../../services/api';
import CommentCard from './CommentCard';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MessageInput = ({ placeholder, containerRef, deleteComment,likeComment,editComment }) => {
    const{i18n}=useTranslation()
    const theme = useTheme();
    const { userData } = useContext(UserContext)
    const profileImage = JSON.parse(userData.ProfileImage)
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams()
    const mangaId = params.mangaID
    const addCommentDirectly = async () => {

        try {
            setLoading(true);
            if (!value.trim()) return;
            const { data } = await api.post('comments', { mangaId, content: value });
            const newComment = data.data;

            // 2. أنشئ div فارغ
            const div = document.createElement('div');

            // 3. استخدم ReactDOM.createRoot لعمل render للـ CommentCard داخل div
            const root = createRoot(div);
            root.render(
                <BrowserRouter>
                <UserContextProvider>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ mb: 2 }} data-id={newComment.id} >
                            <CommentCard comment={newComment} deleteComment={deleteComment} likeComment={likeComment} editComment={editComment}/>
                        </Box>
                    </ThemeProvider>
                </UserContextProvider>
                </BrowserRouter>
            );

            // 5. prepend الـ div مباشرة للحاوية => O(1)
            containerRef.current.prepend(div);
            setValue('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                            addCommentDirectly();
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
                        },
                    }}
                />
                <IconButton
                    onClick={!loading && addCommentDirectly}
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