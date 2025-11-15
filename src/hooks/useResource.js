import React from 'react'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../services/api";

export default function useResource({
    baseUrl,
    resourceName = "item", // e.g. 'category' or 'banner'
    searchableFields = ["en", "ar"],
}) {
    // this hook for  category and banner dashboard management pages
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [serverError, setServerError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
    });
    const { i18n } = useTranslation();
    // Snackbar state for banner only
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    useEffect(() => {
        (async () => {
            setLoading(true);
            setServerError(null);
            try {
                const { data } = await api.get(baseUrl);
                console.log(data)
                setData(data.data);
                setStats({
                    total: data.meta[`total${resourceName === "category" ? "Categories" : "Swipers"}`] || 0,
                    active: data.meta[`active${resourceName === "category" ? "Categories" : "Swipers"}`] || 0,
                    inactive: data.meta[`inActive${resourceName === "category" ? "Categories" : "Swipers"}`] || 0,
                });
            } catch (error) {
                setServerError(error?.response?.data?.message || "Server error");
                setData([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [baseUrl, i18n.language]);

    useEffect(() => {
        if (!search) {
            setFiltered(data);
            return;
        }
        const lower = search.toLowerCase();
        setFiltered(
            data.filter((item) =>
                searchableFields.some(
                    (field) =>
                        item[field] && item[field].toLowerCase().includes(lower)
                )
            )
        );
    }, [data, search]);

    const handleSearchChange = (value) => setSearch(value);

    const handleAdd = (item, message) => {
        setData((prev) => [...prev, item]);
        setStats((prev) => ({ ...prev, inactive: prev.inactive + 1, total: prev.total + 1 }));
        setSnackbar({
            open: true,
            message: message || "",
            severity: "success",
        });
    };

    const handleUpdate = (item, message) => {
        setData((prev) =>
            prev.map((x) => {
                if (x.id === item.id) {
                    const wasActive = x.isActive;
                    const isActiveNow = item.isActive;
                    if (wasActive && !isActiveNow) {
                        setStats((prev) => ({
                            ...prev,
                            active: prev.active - 1,
                            inactive: prev.inactive + 1,
                        }));
                    }

                    return item;
                }
                return x;
            })
        );
        setSnackbar({
            open: true,
            message: message || "",
            severity: "success",
        });
    };
    const handleToggleActive = async (url, id, updated) => {//this is for banner active toggle
        try {
            const { data } = await api.patch(url)
            setSnackbar({
                open: true,
                message: data.message || `Banner has been ${updated ? "activated" : "deactivated"}.`,
                severity: "success",
            });
            setData((prev) =>
                prev.map((x) =>
                    x.id === id ? { ...x, isActive: updated } : x
                )
            );
            setStats((prev) => ({
                ...prev,
                active: updated ? prev.active + 1 : prev.active - 1,
                inactive: updated ? prev.inactive - 1 : prev.inactive + 1,
            }));

        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || "Server error",
                severity: "error",
            });
        }
    }

    const handleDelete = (item, message = "") => {
        setData((prev) => prev.filter((x) => x.id !== item.id));
        setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
            active: item.isActive ? prev.active - 1 : prev.active,
            inactive: item.isActive ? prev.inactive : prev.inactive - 1,
        }));
        setSnackbar({
            open: true,
            message: message,
            severity: "success",
        });
    };

    return {
        data: filtered,
        setData,
        loading,
        search,
        stats,
        serverError,
        handleSearchChange,
        handleAdd,
        handleUpdate,
        handleDelete,
        setStats,
        setSearch,
        handleToggleActive,
        snackbar,
        setSnackbar,

    };
}


