import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";

const useMangaListFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State to hold the available genre options.
    const [genreOptions, setGenreOptions] = useState([]);

    // State to manage the loading status.
    const [isLoading, setIsLoading] = useState(true);

    // Static filter options
    const statusOptions = ["ongoing", "completed", "one shot"];
    const sortOptions = {
        az: "a to z",
        za: "z to a",
        popularityscore: "popularity score",
    };

    // Initialize all filter states with default values.
    const [selectedStatus, setSelectedStatus] = useState("ongoing");
    const [selectedGenre, setSelectedGenre] = useState({ en: "all", ar: 'الكل' });
    const [selectedSort, setSelectedSort] = useState({ key: "az", value: "A to Z" });

    // This effect handles initial data fetching and state synchronization.
    useEffect(() => {
        const fetchAndInitFilters = async () => {
            try {
                // Fetch available genre options from the API.
                const { data } = await api.get('/Categories/GetCategories');
                const fetchedGenres = data.data || [];
                const allGenres = [{ en: "all", ar: "الكل" }, ...fetchedGenres];
                const enGenres = allGenres.map(g => g.en)
                // Update the genre options state.
                setGenreOptions(allGenres);

                // Get filter values from URL and localStorage.
                const statusFromURL = searchParams.get("status")?.toLowerCase();
                const genreFromURL = searchParams.get("genre")?.toLowerCase();
                const sortFromURL = searchParams.get("sort")?.toLowerCase();

                const statusFromStore = localStorage.getItem("status")?.toLowerCase();
                const genreFromStore = localStorage.getItem("genre")?.toLowerCase();
                const sortFromStore = localStorage.getItem("sort")?.toLowerCase();

                // Determine and set the final state based on priority: URL > localStorage > default.
                const finalStatus = statusFromURL && statusOptions.includes(statusFromURL) ? statusFromURL : statusFromStore && statusOptions.includes(statusFromStore) ? statusFromStore : "ongoing";
                const finalGenre =
                    genreFromURL && enGenres.includes(genreFromURL)
                        ? allGenres.find((g) => g.en === genreFromURL)
                        : genreFromStore && enGenres.includes(genreFromStore)
                            ? allGenres.find((g) => g.en === genreFromStore)
                            : allGenres.find((g) => g.en === "all");

                const finalSortKey = sortFromURL && sortOptions[sortFromURL] ? sortFromURL : sortFromStore && sortOptions[sortFromStore] ? sortFromStore : "az";

                setSelectedStatus(finalStatus);
                setSelectedGenre(finalGenre);
                setSelectedSort({ key: finalSortKey, value: sortOptions[finalSortKey] });

                // Update localStorage with the final determined values.
                localStorage.setItem("status", finalStatus);
                localStorage.setItem("genre", finalGenre.en);
                localStorage.setItem("sort", finalSortKey);

            } catch (error) {
                console.error("Failed to fetch genres:", error);
            } finally {
                // Set loading to false once the process is complete (success or fail).
                setIsLoading(false);
            }
        };

        fetchAndInitFilters();

    }, [searchParams]);

    // This effect syncs the state changes back to the URL.
    useEffect(() => {
        // Only update the URL if not in a loading state.
        if (!isLoading) {
            const params = {
                status: selectedStatus,
                genre: selectedGenre.en,
                sort: selectedSort.key,
            };
            setSearchParams(params);
        }
    }, [selectedStatus, selectedGenre, selectedSort, isLoading, setSearchParams]);

    return {
        isLoading, // Return the loading state for conditional rendering
        selectedStatus,
        setSelectedStatus,
        statusOptions,
        selectedGenre,
        setSelectedGenre,
        genreOptions,
        selectedSort,
        setSelectedSort,
        sortOptions
    };
};

export default useMangaListFilter;