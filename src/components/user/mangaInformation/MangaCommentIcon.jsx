import { Badge } from '@mui/material'
import React, { useState } from 'react'
import CommentsAndRepliesDialog from '../commentsAndReplies/CommentsAndRepliesDialog';
import { Comment } from '@mui/icons-material';

function MangaCommentIcon({count}) {
    const [commentCount, setCommentCount] = useState(count)
    const [openCommentDaialog, setOpenCommentDaialog] = useState(false)

    return (

        <>
            <CommentsAndRepliesDialog open={openCommentDaialog} setOpen={setOpenCommentDaialog} setCommentCount={setCommentCount} />
            <Badge badgeContent={commentCount} color="primary" sx={{ mt: .5 }}>
                <Comment onClick={() => { setOpenCommentDaialog(true) }} />
            </Badge>
        </>
    )
}

export default MangaCommentIcon
