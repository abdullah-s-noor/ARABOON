import { Box, Dialog, DialogContent, IconButton, Typography, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import CommentsList from './comments/CommentsList';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function CommentsAndRepliesDialog({ open, setOpen,setCommentCount }) {
    const theme = useTheme();
    const {i18n,t}=useTranslation()
    const param =useParams()
    const mangaId=param.mangaID
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden !important';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open]);
    const style = {
        dialogPaper: {
            border: theme.palette.mode === 'dark' ? "1px solid rgba(183, 28, 28, 0.30)" : "1px solid rgba(12, 112, 122, 0.30)",
            borderRadius: 2,
            overflow: "hidden !important",
            height: "460px",
            maxWidth: "700px",
            width: '100%',
            m: 0,
            p: 0,
        },
    };
    const handleClose = async() => {
        try{
            const {data}=await api.get(`/Manga/${mangaId}/comments-count`)
            console.log("comment count: ",data);
            setCommentCount(data.data.commentsCount)
        }catch(error){
            console.log(error)
        }
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="comment-dialog-title"
            aria-describedby="comment-dialog-description"
            fullWidth
            PaperProps={{ sx: style.dialogPaper }}
        >
            <DialogContent id="scrollableDialog" sx={{
                p: 2, overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '15px',
                },
                '&::-webkit-scrollbar-track': {
                    borderRadius: '8px',
                    backgroundColor: 'background.default',
                    // @ts-ignore
                    border: `1px solid ${theme.palette.thirdly.main}`,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    backgroundColor: theme.palette.primary.main,
                },
            }}>
                <IconButton onClick={() => { handleClose()}} sx={{ position: 'absolute', top: 5, ...(i18n.language === 'en' ? { right: 10 } : { left: 10 }) }}>
                    <Close />
                </IconButton>
                <Typography variant="h5" >{t("commentAndReply.comments")}</Typography>
                <CommentsList open={open}/>
            </DialogContent>
        </Dialog>
    );
}

export default CommentsAndRepliesDialog;
