import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { api } from '../services/api.js';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
const usePaginatedManga = (baseUrl) => {
    const { i18n } = useTranslation();

    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [count, setCount] = useState(0);
    const pageSize = isMobile || isTablet ? 15 : 20; // Adjust page size based on device type
    const fetchMangas = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}&PageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Accept-Language": Cookies.get("i18next") || "en",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const data = result.data;

            setCount(data.totalCount);
            setTotalPages(data.totalPages);
            setHasNextPage(data.hasNextPage);
            setMangas(prev => pageNumber === 1 ? data.data : [...prev, ...data.data]);

            console.log("Fetched mangas:", 1111111111111);
        } catch (error) {
            console.error("Error fetching mangas:", error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchMangas();
    }, [pageNumber]);
    useEffect(() => {
        setLoading(true);
        setPageNumber(1);
        setMangas([]);
    }, [i18n.language]);
    return {
        mangas,
        loading,
        count,
        pageNumber,
        setPageNumber,
        hasNextPage,
        fetchMangas,
        pageSize,
    };
};

export default usePaginatedManga;
