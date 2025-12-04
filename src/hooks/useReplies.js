import React, { useEffect, useState } from 'react'
import { api } from '../services/api.js';
export default function useReplies() {
    const deleteReply = async (replyId,setNewReplyCount) => {
        console.log("Deleting reply with ID:", replyId);
        try {
            const { data } = await api.delete(`/replies/${replyId}`);
            const elem = document.querySelector(`[data-reply-id='${replyId}']`);
            setNewReplyCount(prev=>prev-1)
            if (elem) elem.remove();
        } catch (error) {
            console.log(error);
            console.log(error);
        }
    };

    const likeReply = async (tempReply, setTempReply, setLoading) => {
        setLoading(true);
        console.log("Liking reply with ID:", tempReply.id);
        console.log("Current like state:", tempReply?.isLiked);
        if (tempReply?.isLiked) {
            // Unlike
            try {
                const { data } = await api.delete(`/replies/${tempReply?.id}/like`);
                console.log(data);
                setTempReply((prev) => ({
                    ...prev,
                    isLiked: false,
                    likes: prev.likes - 1,
                }));
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setLoading(false);
            }
        } else {
            // Like
            try {
                const { data } = await api.post(`/replies/${tempReply?.id}/like`);
                console.log(data);
                setTempReply((prev) => ({
                    ...prev,
                    isLiked: true,
                    likes: prev.likes + 1,
                }));
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setLoading(false);
            }
        }
    };


    const editReply = async (
        replyId,
        newContent,
        setIsEditing,
        setTempReply,
        setLoading
    ) => {
        setLoading(true);
        console.log("Editing reply with ID:", replyId);

        try {
            const { data } = await api.patch(`/replies/${replyId}`, {
                content: newContent,
            });
            console.log("Edit response data:", data);

            if (setTempReply)
                setTempReply((prev) => ({
                    ...prev,
                    since: data.data.since,
                    content: data.data.content,
                }));

            setIsEditing(false);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteReply,
        likeReply,
        editReply,
    };
}