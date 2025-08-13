// src/hooks/usePaginatedMangaList.js
import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { api } from '../services/api.js';
import { useTranslation } from 'react-i18next';

const usePaginatedMangaList = ({ baseUrl }) => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [count, setCount] = useState(0);
  const { i18n } = useTranslation();
  const pageSize = isMobile ? 15 : isTablet ? 18 : 20;

  useEffect(() => {
    setPageNumber(1);
    setMangas([]);
  }, [baseUrl, i18n.language]);

  const fetchMangas = async (page = pageNumber) => {
    try {
      setLoading(true);
      const urlWithPagination = `${baseUrl}&PageNumber=${page}&pageSize=${pageSize}`;
      console.log("Fetching from URL:", urlWithPagination);
      const response = await api.get(urlWithPagination);
      const data = response.data.data;
      setCount(data.totalCount);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setMangas(prev => (page === 1 ? data.data : [...prev, ...data.data]));
      setPageNumber(page); 
    } catch (error) {
      console.error(
        'Error fetching mangas:',
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangas(pageNumber);
  }, [pageNumber]);

  return {
    mangas,
    loading,
    count,
    pageNumber,
    setPageNumber,
    hasNextPage,
    totalPages,
    fetchMangas,
    pageSize,
  };
};

export default usePaginatedMangaList;
