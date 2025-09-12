import { UserContext } from '../../../../context/UserContext'
import React, { useContext, useEffect, useRef } from 'react'
import CommentInput from './MessageInput'
import usePaginatedComments from '../../../../hooks/usePaginatedComments';
import { Box, Typography } from '@mui/material';
import SkeletonMessage from './SkeletonMessage';
import MessageInput from './MessageInput';
import CommentCard from './CommentCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion, AnimatePresence } from "framer-motion";

function CommentsList({ open }) {
    const { userToken, userData } = useContext(UserContext)
    const containerRef = useRef(null);
    const {
        comments,
        setComments,
        paginationLoading,
        pageNumber,
        setPageNumber,
        hasNextPage,
        fetchComments,
        serverError,
        deleteComment,
        likeComment,
        editComment,
    } = usePaginatedComments({ baseUrl: "/Manga/1/comments?" });

    return (
        <>
            {(paginationLoading && pageNumber === 1) ?
                [1, 2, 3].map(() => (<Box mt={2}><SkeletonMessage /></Box>))
                :
                <>
                    {userToken &&
                        <MessageInput
                            placeholder="Write a new comment..."
                            containerRef={containerRef}
                            deleteComment={deleteComment}
                            likeComment={likeComment}
                            editComment={editComment}
                        />
                    }
                    {
                        comments.length === 0 ?
                            <Typography variant="body1" sx={{ mt: 2 }}>No comments yet. Be the first to comment!</Typography>
                            :
                            <InfiniteScroll
                                dataLength={comments.length}
                                next={() => setPageNumber(prev => prev + 1)}
                                hasMore={hasNextPage}
                                loader={<SkeletonMessage />}
                                scrollableTarget="scrollableDialog"
                                scrollThreshold={.98}
                            >
                                <Box mt={2} ref={containerRef}>
                                    <AnimatePresence>

                                        {comments.map((comment) => (
                                            <motion.div
                                                key={comment.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}   // بداية
                                                animate={{ opacity: 1, y: 0 }}    // دخول
                                                exit={{ opacity: 0, y: -20 }}     // خروج
                                                transition={{ duration: 0.3 }}
                                            >

                                                <Box  mb={2} data-id={comment.id}>
                                                    <CommentCard comment={comment} deleteComment={deleteComment} likeComment={likeComment} editComment={editComment} />
                                                </Box>
                                            </motion.div>

                                        ))}
                                    </AnimatePresence>
                                </Box>
                            </InfiniteScroll>
                    }

                </>
            }
        </>
    )
}

export default CommentsList
