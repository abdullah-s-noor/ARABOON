import React from "react";
import TablePagination from "@mui/material/TablePagination";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";


export default function TablePaginationWithAPI() {
//   const {
//     data,
//     count,
//     page,
//     rowsPerPage,
//     loading,
//     error,
//     handleChangePage,
//     handleChangeRowsPerPage,
//   } = usePaginatedAPI({ endpoint: "/Categories", defaultPageSize: 1 });


  const {
    data,
    count,
    page,
    rowsPerPage,
    loading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginatedCategories({ baseUrl:"/Categories?" });

  return (
    <div style={{ margin: "2rem" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}

      <TablePagination
        rowsPerPageOptions={[1, 2, 3, 4]}
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}




// Generic reusable paginated data hook
 function usePaginatedAPI({ endpoint = "/Categories", defaultPageSize = 1 }) {
  const [data, setData] = useState([]);
  const [cache, setCache] = useState({});
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch function with caching
  const fetchData = async (pageNumber = page, size = rowsPerPage) => {
    // Use cached data if available
    if (cache[pageNumber]) {
      setData(cache[pageNumber]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(endpoint, {
        params: { search: "", pageNumber: pageNumber + 1, pageSize: size },
      });

      const body = response.data.data;
      const items = body?.data ?? [];
      const totalCount = body?.totalCount ?? 0;

      setData(items);
      setCount(totalCount);
      setCache((prev) => ({ ...prev, [pageNumber]: items }));
    } catch (err) {
      console.error("Error fetching API paginated data:", err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch data on dependency change
  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  // Handle pagination events
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setCache({});
  };

  return {
    data,
    count,
    page,
    rowsPerPage,
    loading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}









function usePaginatedCategories({baseUrl}) {
  // Core pagination data
  const [cache, setCache] = useState({});
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0); // (0-based for MUI)
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [loading, setLoading] = useState(false);

  // Extended state from your original hook
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [statsCategories, setStatsCategories] = useState({
    totalCategories: 0,
    activeCategories: 0,
    inActiveCategories: 0,
  });

  const { i18n } = useTranslation();

  // Reset when language or baseUrl changes
  useEffect(() => {
    setPage(0);
    setCache({});
    setData([]);
  }, [baseUrl, i18n.language]);

  // Shared fetch logic with caching and pagination
  const fetchCategories = async (pageNum = page) => {
    if (cache[pageNum]) {
      setData(cache[pageNum]);
      return;
    }

    try {
      setServerError(null);
      if (!searchLoading) setLoading(true);

      const finalUrl = `${baseUrl}search=${search}&PageNumber=${
        pageNum + 1
      }&pageSize=${rowsPerPage}`;

      console.log("Fetching:", finalUrl);
      const response = await api.get(finalUrl);
      const responseBody = response.data?.data || {};
      console.log("Fetched data:", responseBody);

      const items = responseBody.data || [];
      const totalCount = responseBody.totalCount ?? 0;

      setStatsCategories(response.data?.meta || statsCategories);

      // Cache fetched data
      setCache((prev) => ({ ...prev, [pageNum]: items }));
      setData(items);
      setCount(totalCount);
    } catch (error) {
      console.error("API fetch failed:", error);
      setServerError(error?.response?.data?.message || "Server error");
      setData([]);
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };

  // Auto-fetch on dependency changes
  useEffect(() => {
    fetchCategories(page);
  }, [page, rowsPerPage, i18n.language, search]);

  // Search handler (debounced externally or through caller)
  const handleSearchChange = (value) => {
    setSearchLoading(true);
    setSearch(value);
    setPage(0);
    setCache({});
  };

  // Pagination controls
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setCache({});
    setPage(0);
  };

  return {
    data,
    setData,
    count,
    page,
    rowsPerPage,
    loading,
    search,
    statsCategories,
    setStatsCategories,
    serverError,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
  };
}
