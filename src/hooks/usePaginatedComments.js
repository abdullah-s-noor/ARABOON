import { useContext, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { api } from '../services/api.js';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext.jsx';
import { useParams } from 'react-router-dom';
import CommentCard from '../components/user/commentsAndReplies/comments/CommentCard.jsx';
import { useTheme } from '@mui/material';


const usePaginatedComments = ({ baseUrl }) => {
  const theme = useTheme();
  const [comments, setComments] = useState([]);
  const [paginationLoading, setPaginationLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [count, setCount] = useState(0);
  const { i18n } = useTranslation();
  const [serverError, setServerError] = useState(null);
  const pageSize = isMobile ? 15 : isTablet ? 18 : 20;
  useEffect(() => {
    setPageNumber(1);
    setComments([]);
  }, [baseUrl, i18n.language]);

  const fetchComments = async (page = pageNumber) => {
    try {
      setServerError(null)
      setPaginationLoading(true);
      const urlWithPagination = `${baseUrl}&PageNumber=${page}&pageSize=${pageSize}`;
      console.log("Fetching from URL:", urlWithPagination);
      const response = await api.get(urlWithPagination);
      const data = response.data.data;
      console.log("Fetched data:", data);
      setCount(data.totalCount);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setComments(prev => (page === 1 ? data.data : [...prev, ...data.data]));
      setPageNumber(page);
    } catch (error) {
      if (error?.response?.data?.Message) {
        setServerError(error?.response?.data?.Message)
      }
    } finally {
      setPaginationLoading(false);
    }
  };
  useEffect(() => {
    fetchComments(pageNumber);
  }, [pageNumber]);

  const deleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    try {
      const { data } = await api.delete(`comments/${commentId}`)
      const elem = document.querySelector(`[data-id='${commentId}']`);
      console.log("Element to be removed:", elem);
      if (elem) elem.remove();
    } catch (error) {
      console.log(error)
    } finally {

    }
  }

  const likeComment = async (tempComment,setTempComment,setLoading) => {
    setLoading(true);
    console.log("Liking comment with ID:", tempComment.id);
    console.log("Current like state:", tempComment?.isLiked);
    if (tempComment?.isLiked) {
      try {
        const { data } = await api.delete(`/comments/${tempComment?.id}/like`)
        console.log(data)
        setTempComment(prev=>({...prev,isLiked:false,likes:prev.likes-1}))
      }
      catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }else{
      try {
        const { data } = await api.post(`/comments/${tempComment?.id}/like`)
        console.log(data)
        setTempComment(prev=>({...prev,isLiked:true,likes:prev.likes+1}))
      }catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
  }

  const editComment = async (commentId, newContent,setIsEditing,setTempComment,setLoading) => {
    setLoading(true)
    console.log("Editing comment with ID:", commentId);
    try {
      const { data } = await api.patch(`comments/${commentId}`, { content: newContent });
      console.log("Edit response data:", data);
      if(setTempComment) setTempComment((prev)=>({...prev,since:data.data.since,content:data.data.content}));
      setIsEditing(false);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  return {
    comments,
    setComments,
    paginationLoading,
    count,
    pageNumber,
    setPageNumber,
    hasNextPage,
    totalPages,
    fetchComments,
    pageSize,
    serverError,
    deleteComment,
    likeComment,
    editComment
  };
};

export default usePaginatedComments;