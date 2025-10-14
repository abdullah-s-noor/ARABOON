import { useState, useRef, useEffect } from "react";
import { api } from "../services/api";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";


const useChapterImages = ({ baseUrl }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedLanguage = searchParams.get("lang") || "en"
    const [chapterInfo, setChapterInfo] = useState({
        totalPages: 0,
        pages: [],
        mangaName: "",
        chaptersCount: 0,
        chapterId:-1,
    });

    useEffect(() => {
        if (loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible) {
                    const index = Number(visible.target.getAttribute('data-index'));
                    setCurrentPage(index + 1);
                    return;
                }
            },
            {
                root: containerRef.current,
                threshold: 0,
                rootMargin: "-50% 0px -50% 0px",
            }
        );

        const images = containerRef.current?.querySelectorAll('[data-index]');
        images?.forEach((img) => observer.observe(img));

        return () => observer.disconnect();
    }, [loading]);
    useEffect(() => {
        setSearchParams({ lang: selectedLanguage })
        const elem = document.querySelector('[navbar-name="main-nav"]');
        // @ts-ignore
        if (elem) elem.style.display = "none";
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`${baseUrl}&Language=${selectedLanguage}`);
                console.log(data)
                setChapterInfo({ pages: data.data.images, totalPages: data.meta.imagesCount, chaptersCount: data.meta.chaptersCount, mangaName: data.meta.mangaName,chapterId:data.data.chapterId });

            } catch (error) {
                if (error?.response?.status === 404) {
                    navigate('/not-found')
                }
            } finally {
                setLoading(false)
            }

        }
        fetchData();
        return () => {
            // @ts-ignore
            if (elem) elem.style.display = "flex";
        }
    }, [searchParams,useParams().chapterID]);
    return { currentPage, chapterInfo, loading, containerRef, selectedLanguage };

}
export default useChapterImages