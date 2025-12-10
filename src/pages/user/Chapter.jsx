import { Box, Fab, useMediaQuery, useTheme, Zoom } from '@mui/material';
import ChapterFooter from '../../components/user/chapter/ChapterFooter';
import ChapterNav from '../../components/user/chapter/ChapterNav';
import React, { use, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api';
import useChapterImages from '../../hooks/useChapterImages';
import LogoLoader from '../../components/common/LogoLoader';
import { UserContext } from '../../context/UserContext';
import ChapterPagesPreview from '../../components/user/chapter/ChapterPagesPreview';
import { green } from '@mui/material/colors';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import usePhone from '../../hooks/usePhone';
import { useTranslation } from 'react-i18next';

function Chapter() {
    const theme = useTheme()
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const {isPhone}=usePhone()
    const { userToken,userData } = useContext(UserContext)
    const param = useParams()
    const sm = useMediaQuery('(min-width:600px)');
    const mangaID = param.mangaID;
    const chapterNum = param.chapterID;
    const [open, setOpen] = useState(false)
    const { currentPage, loading, containerRef, chapterInfo, selectedLanguage, view, setView } = useChapterImages({ baseUrl: `/Chapters/images?MangaId=${mangaID}&ChapterNo=${chapterNum}` });
    console.log(chapterInfo)
    console.log(chapterNum)
    console.log(chapterNum===chapterInfo?.chaptersCount)
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
        if (userData?.Role!=="Admin"&&!loading && currentPage === chapterInfo?.totalPages) {
            handleLastPage();
        }
    }, [currentPage, chapterInfo])
    if (loading) {
        return <LogoLoader />;
    }

    const fabStyle = {
        position: "absolute",
        bottom: 90,
        ...(i18n.language==="ar"?{left: {xs:30,sm:40}}:{right: {xs:30,sm:40}}),
        color: "common.white",
        bgcolor: "primary.main",
        ...(isPhone?{
            "&:active": {
            bgcolor: "thirdly.main",
        },
        }:{
            "&:hover": {
            bgcolor: "thirdly.main",
        },
        })
        
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const scrollToTop = () => {
    if (containerRef.current) {
        containerRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
};
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100dvh",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <ChapterNav languageAvailable={chapterInfo.languageAvailable} selectedLanguage={selectedLanguage} mangaName={chapterInfo.mangaName} chaptersCount={chapterInfo.chaptersCount} />
                {/* Main Content Area */}
                <ChapterPagesPreview containerRef={containerRef} setOpen={setOpen} pages={chapterInfo.pages} />
                <ChapterFooter currentPage={currentPage} totalPages={chapterInfo.totalPages} isAdmin={userData?.Role==="Admin"} 
                onNextChapter={(chapterNum==chapterInfo.chaptersCount)?null:()=>{navigate(`/manga/${mangaID}/chapter/${parseInt(chapterNum) + 1}?lang=${selectedLanguage}`)}} 
                onPrevChapter={(parseInt(chapterNum)===1)?null:()=>{navigate(`/manga/${mangaID}/chapter/${parseInt(chapterNum) - 1}?lang=${selectedLanguage}`)}} 
                />
                <Zoom
                    in={open}
                    timeout={transitionDuration}
                    unmountOnExit
                >
                    <Fab sx={fabStyle} aria-label="scroll-top" color="success"onClick={scrollToTop}>
                        <UpIcon />
                    </Fab>
                </Zoom>
            </Box>
        </>

    )
}

export default Chapter
