import { Box, useMediaQuery } from '@mui/material';
import ChapterFooter from '../../components/user/chapter/ChapterFooter';
import ChapterNav from '../../components/user/chapter/ChapterNav';
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { api } from '../../services/api';
import useChapterImages from '../../hooks/useChapterImages';
import LogoLoader from '../../components/common/LogoLoader';
import { UserContext } from '../../context/UserContext';

function Chapter() {
    const {userToken}=useContext(UserContext)
    const param = useParams()
    const sm = useMediaQuery('(min-width:600px)');
    const mangaID = param.mangaID;
    const chapterNum = param.chapterID;
    const [open, setOpen] = useState(false)
    const { currentPage, loading, containerRef, chapterInfo, selectedLanguage } = useChapterImages({ baseUrl: `/Chapters/images?MangaId=${mangaID}&ChapterNo=${chapterNum}` });
    useEffect(() => {
        const navElem = document.querySelector('[navbar-name="chapter-nav"]');
        const footerElem = document.querySelector('[footer-name="chapter-footer"]');
        if (!loading) {
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
        }
    }, [open, sm, loading])
    useEffect(() => {
        const markAsRead = async () => {
            try {
                const { data } = await api.post('/ChapterView/MarkAsRead', {
                    mangaID: mangaID,
                    chapterID: chapterInfo.chapterId
                })
                console.log(data)
            } catch (error) {
                console.error("Failed to mark chapter as read", error);
            }
        }
        console.log(currentPage, " ", chapterInfo.totalPages)
        if (currentPage === chapterInfo.totalPages &&userToken) {
            markAsRead();
        }
    }, [currentPage])
    if (loading) {
        return <LogoLoader />;
    }
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
                <ChapterNav selectedLanguage={selectedLanguage} mangaName={chapterInfo.mangaName} chaptersCount={chapterInfo.chaptersCount} />
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
                    {chapterInfo.pages.map((image, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={image}
                            maxWidth="800px"
                            width="100%"
                            data-index={index}
                            loading="lazy"
                        />
                    ))}
                </Box>
                <ChapterFooter currentPage={currentPage} totalPages={chapterInfo.totalPages} />
            </Box>
        </>

    )
}

export default Chapter
