import { Box, useMediaQuery } from '@mui/material';
import ChapterFooter from '../../components/user/chapter/ChapterFooter';
import ChapterNav from '../../components/user/chapter/ChapterNav';
import React, { use, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { api } from '../../services/api';
import useChapterImages from '../../hooks/useChapterImages';
import LogoLoader from '../../components/common/LogoLoader';
import { UserContext } from '../../context/UserContext';
import ChapterPagesPreview from '../../components/user/chapter/ChapterPagesPreview';

function Chapter() {
    const { userToken } = useContext(UserContext)
    const param = useParams()
    const sm = useMediaQuery('(min-width:600px)');
    const mangaID = param.mangaID;
    const chapterNum = param.chapterID;
    const [open, setOpen] = useState(false)
    const { currentPage, loading, containerRef, chapterInfo, selectedLanguage, view, setView } = useChapterImages({ baseUrl: `/Chapters/images?MangaId=${mangaID}&ChapterNo=${chapterNum}` });
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
        const handleLastPage = async () => {
            const [icreaseView, markAsRead] = await Promise.all([
                (!view.isView ? api.post(`/Chapters/read`, { chapterId: chapterInfo.chapterId }) : null),
                ((!view.markAsRead && userToken) ? api.post('/ChapterView/MarkAsRead', {
                    mangaID: mangaID,
                    chapterID: chapterInfo.chapterId
                }) : null)
            ]);
            console.log(icreaseView)
            console.log(markAsRead)
            if (markAsRead || icreaseView) {
                setView({ markAsRead: true, isView: true })
            }
        }
        console.log(currentPage, " ", chapterInfo?.totalPages)
        if (!loading && currentPage === chapterInfo?.totalPages) {
            handleLastPage();
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
                <ChapterNav languageAvailable={chapterInfo.languageAvailable} selectedLanguage={selectedLanguage} mangaName={chapterInfo.mangaName} chaptersCount={chapterInfo.chaptersCount} />
                {/* Main Content Area */}
                <ChapterPagesPreview containerRef={containerRef} setOpen={setOpen} pages={chapterInfo.pages}/>
                <ChapterFooter currentPage={currentPage} totalPages={chapterInfo.totalPages} />
            </Box>
        </>

    )
}

export default Chapter
