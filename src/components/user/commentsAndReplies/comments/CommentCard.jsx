import { Box, useTheme } from '@mui/material'
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { UserContext } from '../../../../context/UserContext';
import RepliesList from '../replies/RepliesList';
import MessageInput from '../replies/MessageInput';
import CommentActions from './CommentActions';

function CommentCard({ comment, deleteComment, likeComment, editComment }) {
    const theme = useTheme()
    const [replies, setReplies] = useState(null); // null = not loaded yet
    const [paginatedReplies, setPaginatedReplies] = useState({
        pageNumber: 0,
        hasNextPage: true,
    });
    const [newReplyCount, setNewReplyCount] = useState(0);
    const [replyingToUser, setReplyingToUser] = useState(null);

    const { userToken } = useContext(UserContext)

    const replyInputRef = useRef(null);

    // Function to handle reply click, scroll, and focus
    const [startScroll, setStartScroll] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    useEffect(() => {
        setShowReplies(replies && replies.length > 0);
    }, [replies])
    const handleReplyClick = (user) => {
        setReplyingToUser(user);
        setStartScroll(true);
    };
    useEffect(() => {
        if (startScroll && replyInputRef.current) {
            const elem = document.querySelector(`[data-id='${comment.id}']`);
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (replyInputRef.current) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            replyInputRef.current.focus();
                            observer.disconnect(); // وقف المراقبة بعد ما يركز
                            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                }, { threshold: .99 });

                observer.observe(replyInputRef.current);
            }
            setStartScroll(false);
        }
    }, [startScroll])


    const repliesBoxRef = useRef(null)
    const [initFetch, setInitFetch] = useState(0);

    useEffect(() => {
        if (!replies && showReplies) {
            console.log("need fetch");
            setInitFetch(prev => prev + 1); // always increments, always triggers useMemo
        }

        if (showReplies) {
            repliesBoxRef.current.style.display = "block";
        } else {
            repliesBoxRef.current.style.display = "none";
        }
    }, [showReplies]);
    const repliesBox = useMemo(() => {
        return (
            <RepliesList
                commentId={comment.id}
                replies={replies}
                setReplies={setReplies}
                paginatedReplies={paginatedReplies}
                setPaginatedReplies={setPaginatedReplies}
                handleReplyClick={handleReplyClick}
                showReplies={showReplies}
                repliesBoxRef={repliesBoxRef}
                initFetch={initFetch}
            />
        )
    }, [replies, initFetch])

    return (
        <>
            <Box sx={{ p: { xs: 1, sm: 2 }, backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5", borderRadius: 2 }}>
                <CommentActions
                    comment={comment}
                    editComment={editComment}
                    likeComment={likeComment}
                    deleteComment={deleteComment}
                    newReplyCount={newReplyCount}
                    handleReplyClick={handleReplyClick}
                    showReplies={showReplies}
                    setShowReplies={setShowReplies}
                />
                <Box mt={2} sx={{ pl: { xs: 1, sm: 4 }, borderLeft: '2px solid', borderColor: 'divider' }}>
                    {replyingToUser && userToken &&
                        <MessageInput
                            placeholder="Write a new comment..."
                            commentId={comment.id}
                            setReplies={setReplies}
                            replyingToUser={replyingToUser}
                            setReplyingToUser={setReplyingToUser}
                            setNewReplyCount={setNewReplyCount}
                            replyInput={replyInputRef}
                        />}
                    {<Box ref={repliesBoxRef}>
                        {repliesBox}
                    </Box>}
                </Box>
            </Box>

        </>
    )
}

export default CommentCard
