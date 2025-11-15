import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../services/api";

export default function useAllCategories({ baseUrl = "/Categories" }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [serverError, setServerError] = useState(null);
  const [statsCategories, setStatsCategories] = useState({
    totalCategories: 0,
    activeCategories: 0,
    inActiveCategories: 0,
  });
  const { i18n } = useTranslation();
  useEffect(() => {
    (async () => {
      setLoading(true);
      setServerError(null);
      try {
        const { data } = await api.get(baseUrl)
        setData(data.data);
        setStatsCategories(data.meta);
      } catch (error) {
        setServerError(error?.response?.data?.message || "Server error");
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [baseUrl, i18n.language]);

  useEffect(() => {
    if (!search) setFiltered(data);
    else {
      const lower = search.toLowerCase();
      setFiltered(
        data.filter(
          (cat) =>
            (cat.en && cat.en.toLowerCase().includes(lower)) ||
            (cat.ar && cat.ar.toLowerCase().includes(lower))
        )
      );
    }
  }, [data, search]);

  const handleSearchChange = (value) => setSearch(value);

  const handleAddCategory = (cat) => {
    setData((prev) => [...prev, cat])
  };
  const handleUpdateCategory = (cat) => {
    setStatsCategories((prev => ({ ...prev, activeCategories: cat.isActive ? prev.activeCategories + 1 : prev.activeCategories - 1, inActiveCategories: cat.isActive ? prev.inActiveCategories - 1 : prev.inActiveCategories + 1 })))
    setData((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
  }
  const handleDeleteCategory = (category) => {
    const totalCategories = statsCategories.totalCategories - 1
    const inActiveCategories = category.isActive ? statsCategories.inActiveCategories : statsCategories.inActiveCategories - 1
    const activeCategories = category.isActive ? statsCategories.activeCategories - 1 : statsCategories.activeCategories
    setStatsCategories({ totalCategories: totalCategories, inActiveCategories: inActiveCategories, activeCategories: activeCategories })
    setData((prev) => prev.filter((c) => c.id !== category.id));
  }

  return {
    data: filtered,
    loading,
    search,
    statsCategories,
    serverError,
    handleSearchChange,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    setStatsCategories,
    setSearch,
  };
}
