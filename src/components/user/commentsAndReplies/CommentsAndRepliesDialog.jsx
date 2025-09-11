import { Dialog, DialogContent,Typography, useTheme } from '@mui/material';
import  { useEffect, useRef } from 'react';
import CommentsList from './comments/CommentsList';

function CommentsAndRepliesDialog({ open, setOpen }) {
    const theme = useTheme();
   
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
            width:'100%',
            m: 0,
            p: 0,
        },
    };
    const handleClose = () => {
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
            <DialogContent id="scrollableDialog" sx={{ p: 2, overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '15px',
                },
                '&::-webkit-scrollbar-track': {
                    borderRadius: '8px',
                    backgroundColor: 'background.default',
                    // @ts-ignore
                    border: `1px solid ${theme.palette.thirdly.main}` ,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    backgroundColor: theme.palette.primary.main,
                },
             }}>
                <Typography variant="h5" >Comments</Typography>
                <CommentsList open={open}/>
            </DialogContent>
        </Dialog>
    );
}

export default CommentsAndRepliesDialog;
