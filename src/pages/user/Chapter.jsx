import { Box, useMediaQuery } from '@mui/material';
import ChapterFooter from '../../components/user/chapter/ChapterFooter';
import ChapterNav from '../../components/user/chapter/ChapterNav';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

function Chapter() {
    const param = useParams()
    const md = useMediaQuery('(min-width:900px)');
    const sm = useMediaQuery('(min-width:600px)');
    const xs = useMediaQuery('(min-width:0px)');

    const mangaID = param.mangaID;
    const chapterID = param.chapterID;
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const totalPages = 15;
    useEffect(() => {
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
    }, []);
    useEffect(() => {
        console.log(mangaID, chapterID)
        const elem = document.querySelector('[navbar-name="main-nav"]');
        // @ts-ignore
        if (elem) elem.style.display = "none";
    }, [])
    useEffect(() => {
        const navElem = document.querySelector('[navbar-name="chapter-nav"]');
        const footerElem = document.querySelector('[footer-name="chapter-footer"]');
        if (open) {
            // @ts-ignore
            navElem.style.transform = "translateY(0px)";
            // @ts-ignore
            footerElem.style.transform = "translateY(0px)";

        } else {
            // @ts-ignore
            navElem.style.transform = `translateY(${sm ? "-122px" : "-90px"})`;
            // @ts-ignore
            footerElem.style.transform = `translateY(80px)`;

        }
    }, [open, sm])

    return (
        <>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <ChapterNav />
                {/* Main Content Area */}
                <Box
                    ref={containerRef}
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        overflowY: "auto",
                    }}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {[...Array(totalPages)].map((_, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={`/image/chapter-semester/${index + 1}.png`}
                            maxWidth="800px"
                            width="100%"
                            data-index={index}
                            loading="lazy"
                        />
                    ))}
                </Box>
                <ChapterFooter currentPage={currentPage} totalPages={totalPages} />
            </Box>
        </>

    )
}

export default Chapter
