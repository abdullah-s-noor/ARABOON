import { Box, Button, Stack, Switch, Typography, useTheme } from '@mui/material'
import ChapterCard from '../../user/mangaInformation/ChapterCard'
import AlertDialog from '../../user/dialog/AlertDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChapterDialog from './ChapterDialog'
import LanguageAvailable from './LanguageAvailable'

function DashboardChaptersPreview({ memoizedChapters, setChaptersData, selectedLanguage, langAvailable, setLangAvailable }) {
    const { i18n, t } = useTranslation()
    const theme = useTheme()
    const [selectedForDeletion, setSelectedForDeletion] = useState(null)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDeleteChapter = (chapter) => {
        setSelectedForDeletion(chapter)
        // setChaptersData(prev => prev.filter(ch => ch.chapterID !== chapter.chapterID));
    }

    const handleOpenEditDialog = (chapter) => {
        setSelectedChapter(chapter)
        setDialogOpen(true)
    }
    const handleSaveChapter = (form) => {
        if (selectedChapter) {
            setChaptersData(prev => prev.map(ch => ch.chapterID === selectedChapter.chapterID ? { ...form } : ch));
        } else {
            setChaptersData(prev => [{ ...form }, ...prev]);
        }
    }
    const handleOpenAddDialog = () => {
        setSelectedChapter(null)
        setDialogOpen(true)
    }
    return (
        <>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <LanguageAvailable langAvailable={langAvailable} setLangAvailable={setLangAvailable} selectedLanguage={selectedLanguage} />
                    <Button variant="outlined" onClick={() => { handleOpenAddDialog() }}
                        sx={{
                            borderRadius: "28px", px: { xs: 1, sm: 2.5 }, py: 0.6, fontWeight: 500, fontSize: { xs: 11, sm: 13 }, color: "primary.main", borderColor: "primary.main", backgroundColor: "transparent",
                            textTransform: "none", boxShadow: "0px 2px 8px 0px rgba(12,112,222,0.08)", transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#350000" : "#e6f1ff",
                                borderColor: theme.palette.mode === "dark" ? "#960908" : "#0951a8",
                                color: theme.palette.mode === "dark" ? "#960908" : "#0951a8",
                            }
                        }}
                    >
                        {t("add_chapter")}
                    </Button>
                </Box>

            </Box>
            {memoizedChapters.map((item, index) => (
                <ChapterCard
                    key={item.chapterID}
                    item={item}
                    index={index}
                    selectedLanguage={selectedLanguage}
                    onDelete={handleDeleteChapter}
                    onEdit={handleOpenEditDialog}
                />
            ))}
            <AlertDialog
                items={memoizedChapters} setItems={setChaptersData}
                selectedForDeletion={selectedForDeletion} setSelectedForDeletion={setSelectedForDeletion}
                removeTitle={i18n.language === "en" ? "Remove Chapter" : "حذف فصل"}
                removeContent={
                    selectedForDeletion
                        ? i18n.language === "en"
                            ? `Are you sure you want to remove "chapter${Number(selectedForDeletion.title.replace('#', ''))}: ${selectedForDeletion.chapterTitle}"? This action cannot be undone.`
                            : `هل أنت متأكد أنك تريد حذف "الفصل ${Number(selectedForDeletion.title.replace('#', ''))}: ${selectedForDeletion.chapterTitle}"؟ هذا الإجراء لا يمكن التراجع عنه.`
                        : ""
                }
                setLangAvailable={setLangAvailable}
                selectedLanguage={selectedLanguage}

            />
            <ChapterDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveChapter}
                chapter={selectedChapter}
                selectedLanguage={selectedLanguage}
                setLangAvailable={setLangAvailable}
            />
        </>
    )
}

export default DashboardChaptersPreview
