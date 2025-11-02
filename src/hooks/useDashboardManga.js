import React, { useState } from 'react'
import { api } from '../services/api.js';
export default function useDashboardManga() {
    const deleteManga = async (mangaId) => {
        console.log("Deleting reply with ID:", mangaId);
        try {
            // const { data } = await api.delete(`/replies/${mangaId}`);
            const elem = document.querySelector(`[manga-id='${mangaId}']`);
            console.log(elem)
            if (elem) elem.remove();
        } catch (error) {
            console.log(error);
        }
    };
    const updateManga= (manga,setManga)=>{
        console.log(manga)
    }

    // const activateManga = async (form, setForm, setLoading) => {
    //     setLoading(true);
    //     console.log("Liking reply with ID:", tempReply.id);
    //     console.log("Current like state:", tempReply?.isLiked);
    //     if (tempReply?.isLiked) {
    //         // Unlike
    //         try {
    //             const { data } = await api.delete(`/replies/${tempReply?.id}/like`);
    //             console.log(data);
    //             setTempReply((prev) => ({
    //                 ...prev,
    //                 isLiked: false,
    //                 likes: prev.likes - 1,
    //             }));
    //             return data;
    //         } catch (error) {
    //             console.log(error);
    //             throw error;
    //         } finally {
    //             setLoading(false);
    //         }
    //     } else {
    //         // Like
    //         try {
    //             const { data } = await api.post(`/replies/${tempReply?.id}/like`);
    //             console.log(data);
    //             setTempReply((prev) => ({
    //                 ...prev,
    //                 isLiked: true,
    //                 likes: prev.likes + 1,
    //             }));
    //             return data;
    //         } catch (error) {
    //             console.log(error);
    //             throw error;
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // };


    // const editReply = async (
    //     replyId,
    //     newContent,
    //     setIsEditing,
    //     setTempReply,
    //     setLoading
    // ) => {
    //     setLoading(true);
    //     console.log("Editing reply with ID:", replyId);

    //     try {
    //         const { data } = await api.patch(`/replies/${replyId}`, {
    //             content: newContent,
    //         });
    //         console.log("Edit response data:", data);

    //         if (setTempReply)
    //             setTempReply((prev) => ({
    //                 ...prev,
    //                 since: data.data.since,
    //                 content: data.data.content,
    //             }));

    //         setIsEditing(false);
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return {
        deleteManga,
        updateManga,
    };
}