import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../services/api.js';
import ReplieCard from './ReplieCard.jsx';
import useReplies from '../../../../hooks/useReplies.js';
import MessageInput from './MessageInput.jsx';

function RepliesList({ commentId, replies, setReplies, paginatedReplies, setPaginatedReplies,handleReplyClick }) {
    const { deleteReply, likeReply, editReply } = useReplies();
    const fetchNextPage = async () => {
        if (!paginatedReplies.hasNextPage) return;
        const nextPage = paginatedReplies.pageNumber + 1;
        try {
            const response = await api.get(`/comments/${commentId}/replies?PageNumber=${nextPage}&pageSize=20`);
            const data = response.data.data;
            const newReplies = data.data;
            console.log("Fetched replies:", newReplies);
            setReplies((prevReplies) => {
                if(!prevReplies) return newReplies;
                const existingReplyIds = new Set(prevReplies?.map((r) => r.id));
                const uniqueNewReplies = newReplies.filter(
                    (newReply) => !existingReplyIds.has(newReply.id)
                );
                return [...prevReplies, ...uniqueNewReplies];
            });
            setPaginatedReplies({
                pageNumber: nextPage,
                hasNextPage: data.hasNextPage,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (replies && replies.length > 0 && paginatedReplies.pageNumber === 0) return;
        if (!replies) fetchNextPage();
    }, []);


    if (!replies) return <Typography>Loading replies...</Typography>;
    return (
        <>
            {replies.map(r => (
                <Box key={r.id} mb={1} data-reply-id={r.id}>
                    <ReplieCard reply={r} deleteReply={deleteReply} likeReply={likeReply} editReply={editReply} commentId={commentId} handleReplyClick={handleReplyClick}/>
                </Box>
            ))}

            {paginatedReplies.hasNextPage && (
                <Button onClick={fetchNextPage} sx={{ mt: 1 }} >
                    Show more replies
                </Button>
            )}
        </>
    );
}

export default RepliesList;
