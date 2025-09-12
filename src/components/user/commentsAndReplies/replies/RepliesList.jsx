import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../services/api.js';
import ReplieCard from './ReplieCard.jsx';
import useReplies from '../../../../hooks/useReplies.js';
import MessageInput from './MessageInput.jsx';

function RepliesList({ commentId, replies, setReplies, paginatedReplies, setPaginatedReplies,replyingToUser, setReplyingToUser }) {
    const { deleteReply, likeReply, editReply } = useReplies();
    const fetchNextPage = async () => {
        if (!paginatedReplies.hasNextPage) return;

        const nextPage = paginatedReplies.pageNumber + 1;
        try {
            const response = await api.get(`/comments/${commentId}/replies?PageNumber=${nextPage}&pageSize=20`);
            const data = response.data.data;

            setReplies(prev => prev ? [...prev, ...data.data] : data.data);

            setPaginatedReplies({
                pageNumber: nextPage,
                hasNextPage: data.hasNextPage,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!replies) fetchNextPage();
    }, []);

    if (!replies) return <Typography>Loading replies...</Typography>;
    return (
        <Box mt={2} sx={{ pl: 4, borderLeft: '2px solid', borderColor: 'divider' }}>
            <MessageInput
                placeholder="Write a new comment..."
                commentId={commentId}
                setReplies={setReplies}
                replyingToUser={replyingToUser}
                setReplyingToUser={setReplyingToUser}
            />
            {replies.map(r => (
                <Box key={r.id} mb={1} data-reply-id={r.id}>
                    <ReplieCard replie={r} deleteReply={deleteReply} likeReply={likeReply} editReply={editReply} />
                </Box>
            ))}

            {paginatedReplies.hasNextPage && (
                <Button onClick={fetchNextPage} sx={{ mt: 1 }} >
                    Show more replies
                </Button>
            )}
        </Box>
    );
}

export default RepliesList;
