import { Badge } from '@mui/material'
import React, { useState } from 'react'
import CommentsAndRepliesDialog from '../commentsAndReplies/CommentsAndRepliesDialog';
import { Comment } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function MangaCommentIcon({ count }) {
    const [commentCount, setCommentCount] = useState(count)
    const [openCommentDaialog, setOpenCommentDaialog] = useState(false)
    const {i18n}=useTranslation()
    return (

        <>
            <CommentsAndRepliesDialog open={openCommentDaialog} setOpen={setOpenCommentDaialog} setCommentCount={setCommentCount} />
            <Badge badgeContent={commentCount} color="primary" sx={{ mt: .5 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal:i18n.language==="ar"?'left':'right',
                }}
            >
                <Comment onClick={() => { setOpenCommentDaialog(true) }}
                    sx={{ transform:i18n.language==="ar"&&'scaleX(-1)', cursor: 'pointer' }}
                />
            </Badge>
        </>
    )
}

export default MangaCommentIcon
