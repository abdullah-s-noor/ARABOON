import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useMangaListFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const statusOptions = ["ongoing", "completed", "one shot"];
    const genreOptions = ["all", "action", "adventure", "fantasy", "supernatural"]
    const sortOptions = {
        az: "A to Z",
        za: "Z to A",
        popularityscore: "Popularity Score",
    };

    const [selectedStatus, setSelectedStatus] = useState(() => {
        const store = localStorage.getItem("status")?.toLowerCase();
        return statusOptions.includes(store) ? store : "ongoing";
    });

    const [selectedGenre, setSelectedGenre] = useState(() => {
        const store = localStorage.getItem("genre")?.toLowerCase();
        return genreOptions.includes(store) ? store : "all";
    });

    const sortKey = (() => {
        const store = localStorage.getItem("sort")?.toLowerCase();
        return sortOptions[store] ? store : "az";
    })();
    const [selectedSort, setSelectedSort] = useState({ key: sortKey, value: sortOptions[sortKey] });

    useEffect(() => {
        let status = searchParams.get("status")?.toLowerCase()
        let genre = searchParams.get("genre")?.toLowerCase()
        let sort = searchParams.get("sort")?.toLowerCase()
        if (!status || !statusOptions.includes(status)) {
            status = selectedStatus
        } else {
            setSelectedStatus(status)
            localStorage.setItem("status", status)
        }
        if (!genre || !genreOptions.includes(genre)) {
            genre = selectedGenre
        } else {
            setSelectedGenre(genre)
            localStorage.setItem("genre", genre)

        }
        if (!sort || !sortOptions[sort]) {
            sort = selectedSort.key
            localStorage.setItem('sort', sort)
        } else {
            setSelectedSort({ key: sort, value: sortOptions[sort] })
        }


        const fetchMangaList = async () => {

            const params = {
                status,
                genre,
                sort,
            }
            setSearchParams(params)

        };
        fetchMangaList();
    }, [searchParams])
    useEffect(() => {
        const fetchMangaList = async () => {

            const params = {
                status: selectedStatus,
                genre: selectedGenre,
                sort: selectedSort.key,
            }
            setSearchParams(params)

        };
        fetchMangaList();
    }, [selectedStatus, selectedGenre, selectedSort])
    useEffect(() => {//delete the local storage when close the tab
        const handleTabClose = () => {
            localStorage.removeItem("status");
            localStorage.removeItem("genre");
            localStorage.removeItem("sort");
        };
        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);

    return {
        selectedStatus,
        setSelectedStatus,
        statusOptions,
        selectedGenre,
        setSelectedGenre,
        genreOptions,
        selectedSort,
        setSelectedSort,
        sortOptions
    }

}
export default useMangaListFilter;