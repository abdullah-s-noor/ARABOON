import { useEffect, useState, useRef } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { api } from '../services/api.js';
import { useTranslation } from 'react-i18next';

const usePaginatedUsers = ({ baseUrl }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [count, setCount] = useState(0);
    const { i18n } = useTranslation();
    const [serverError, setServerError] = useState(null);
    const [pageSize, setPageSize] = useState(isMobile ? 15 : isTablet ? 18 : 5);
    const [statsUsers, setStatsUsers] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inActiveUsers: 0,
    });
    const [search, setSearch] = useState("");
    const cacheRef = useRef({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const buildCacheKey = (page) => {
        return `${page}-${pageSize}-${search}-${i18n.language}`;
    };

    const fetchUsers = async (pageNumber) => {
        const page = pageNumber===0?1: pageNumber;
        const cacheKey = buildCacheKey(page);

        //Check cache first
        if (cacheRef.current[cacheKey]) {
            console.log(" Loaded from cache:", cacheKey);
            const cached = cacheRef.current[cacheKey];
            setUsers(cached.users);
            setTotalPages(cached.totalPages);
            setHasNextPage(cached.hasNextPage);
            setCount(cached.count);
            setLoading(false);
            setPageNumber(page);
            return;
        }

        try {
            setServerError(null);
            setLoading(true);
            const url = `${baseUrl}?search=${search}&PageNumber=${page}&pageSize=${pageSize}`;
            console.log(" Fetching from server:", url);

            const response = await api.get(url);

            const meta = response.data.meta;
            const data = response.data.data;

            setStatsUsers(meta);
            setCount(data.totalCount);
            setTotalPages(data.totalPages);
            setHasNextPage(data.hasNextPage);

            const newUsers = data.data;
            setUsers(newUsers);

            //  Save to cache
            cacheRef.current[cacheKey] = {
                users: newUsers,
                totalPages: data.totalPages,
                hasNextPage: data.hasNextPage,
                count: data.totalCount,
                statsUsers: meta,
            };

            setPageNumber(page);
        } catch (error) {
            if (error?.response?.data?.message) {
                setUsers([]);
                setServerError(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch on changes
    useEffect(() => {
        if (pageNumber !== 0) {
            setUsers([])
            fetchUsers(1);
        }
    }, [search, i18n.language, pageSize]);

    useEffect(() => {
        fetchUsers(pageNumber);
    }, [pageNumber]);

    const handleSearch = (value) => {
        console.log("Search value:", value);
        setSearch(value);
        setPageNumber(1);
        cacheRef.current = {};
    };
    const updateUserLocally = async(userId, updates,type) => {
        // 1) Update visible UI
        const apiUrl=type === "status"?`/users/${userId}/active-toggle`:`/users/${userId}/role-toggle`
        console.log("Updating user locally:", userId, updates,apiUrl);
        try {
            const {data}=await api.patch(apiUrl,updates);
            console.log(data)
            setSnackbar({
                open: true,
                message: data.message || "User updated successfully",
                severity: "success",
            });
            setUsers(prev =>
                prev.map(u => u.id === userId ? { ...u, ...updates } : u)
            );
            if (type==="status"){
            setStatsUsers(prevStats => {
                let { activeUsers, inActiveUsers } = prevStats;
                    if (updates.isActive) {
                        activeUsers += 1;
                        inActiveUsers -= 1;
                    } else {
                        activeUsers -= 1;
                        inActiveUsers += 1;
                    }
                return { ...prevStats, activeUsers, inActiveUsers };
            });
        }

            // 2) Update ALL cache pages that contain that user
            Object.keys(cacheRef.current).forEach(key => {
                const pageData = cacheRef.current[key];
                if (pageData && Array.isArray(pageData.users)) {
                    pageData.users = pageData.users.map(u =>
                        u.id === userId ? { ...u, ...updates } : u
                    );
                }
            });
        } catch (err) {
            console.log(err.response.data.message)
            console.error("Error updating user locally:", err);
            setSnackbar({
                open: true,
                message: err.response.data.message || "something went wrong",
                severity: "error",
            });
        }
    };


    return {
        users,
        loading,
        count,
        pageNumber,
        setPageNumber,
        hasNextPage,
        totalPages,
        fetchUsers,
        pageSize,
        setPageSize,
        serverError,
        statsUsers,
        search,
        setSearch,
        handleSearch,
        updateUserLocally,
        snackbar,
        setSnackbar,
    };
};

export default usePaginatedUsers;
