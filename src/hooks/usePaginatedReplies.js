import {  useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { api } from '../services/api.js';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';


const usePaginatedReplies = ({ baseUrl }) => {
  const theme = useTheme();
  const [replies, setReplies] = useState([]);
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
    setReplies([]);
  }, [baseUrl, i18n.language]);

  const fetchReplies = async (page = pageNumber) => {
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
      setReplies(prev => (page === 1 ? data.data : [...prev, ...data.data]));
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
    fetchReplies(pageNumber);
  }, [pageNumber]);

  return {
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
    serverError,
  };
};

export default usePaginatedReplies;