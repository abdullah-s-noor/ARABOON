import { UserContext } from '../../../../context/UserContext'
import React, { useContext, useEffect, useRef } from 'react'
import CommentInput from '../MessageInput'
import usePaginatedReplies from '../../../../hooks/usePaginatedReplies';
import { Box, Typography } from '@mui/material';
import MessageInput from '../MessageInput';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion, AnimatePresence } from "framer-motion";

function RepliesList({ commentId }) {
    const containerRef = useRef(null);
    const {
        replies,
        setReplies,
        paginationLoading,
        count,
        pageNumber,
        setPageNumber,
        hasNextPage,
        totalPages,
        fetchReplies,
        pageSize,
    } = usePaginatedReplies({ baseUrl: `/comments/${commentId}/replies?` });
    useEffect(() => { fetchReplies(1); }, [commentId])

    return (
        <>
            {paginationLoading && pageNumber === 1 ?
                <Typography variant="body1" sx={{ mt: 2 }}>Loading replies...</Typography>  
                :
                <Box mt={2} ref={containerRef}>
                    <AnimatePresence>
                        {replies.map((replie) => (
                            <motion.div
                                key={replie.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}   // بداية
                                animate={{ opacity: 1, y: 0 }}    // دخول
                                exit={{ opacity: 0, y: -20 }}     // خروج
                                transition={{ duration: 0.3 }}
                            >
                                <Box mb={2} data-id={replie.id}>
                                    hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>
                }
</>


)
}

export default RepliesList
