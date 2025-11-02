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
  const [serverError, setServerError] = useState(null);
  const pageSize = isMobile ? 15 : isTablet ? 18 : 20;

  useEffect(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
    setMangas([]);
    setPageNumber(1);
  }, [baseUrl, i18n.language]);

  const fetchMangas = async (url=baseUrl,page = pageNumber) => {
    if (typeof url === "number") {
    page = url;
    url = baseUrl;
  }
    try {
      setServerError(null)
      setLoading(true);
      const urlWithPagination = `${url}&PageNumber=${page}&pageSize=${pageSize}`;
      console.log("Fetching from URL:", urlWithPagination);
      const response = await api.get(urlWithPagination);
      const data = response.data.data;
      console.log("Fetched data:", data);
      setCount(data.totalCount);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setMangas(prev => (page === 1 ? data.data : [...prev, ...data.data]));
      setPageNumber(page);
    } catch (error) {
      if(error?.response?.data?.message){
        setServerError(error?.response?.data?.message)
      }
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (pageNumber > 1) {
    fetchMangas(baseUrl, pageNumber);
  }
}, [pageNumber]);


  return {
    mangas,
    setMangas,
    loading,
    count,
    pageNumber,
    setPageNumber,
    hasNextPage,
    totalPages,
    fetchMangas,
    pageSize,
    serverError
  };
};

export default usePaginatedMangaList;
