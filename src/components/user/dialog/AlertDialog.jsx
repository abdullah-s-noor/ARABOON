import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { api } from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AlertDialog({ selectedForDeletion, setSelectedForDeletion, items, setItems, removeTitle, removeContent, setLangAvailable = null,selectedLanguage=null}) {
    const location = useLocation()
    const isMangaDashboard = location.pathname.startsWith("dashboard/manga-management")
    const isChapterDashboard = location.pathname.startsWith("/dashboard/manga/")
    const dialogText = {
        en: {
            cancel: "Cancel",
            remove: "Remove",
            removing: "Removing...",
        },
        ar: {
            cancel: "إلغاء",
            remove: "حذف",
            removing: "جارٍ الحذف...",
        }
    }
    const pathname = (location.pathname?.split('/')[2])?.split('-')?.join('')
    const { i18n } = useTranslation()
    const lang = i18n.language
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setOpen(selectedForDeletion ? true : false)
    }, [selectedForDeletion])

    const handleClose = () => {
        setSelectedForDeletion(null)
    };

    const handleDelete = async () => {
        try {
            setLoading(true)
            if (isChapterDashboard) {
                const { data } = await api.delete(`/Chapters/${selectedForDeletion?.chapterID}`)
                setLangAvailable(prev => ({ ...prev, [selectedLanguage]: data.meta[selectedLanguage === "en" ? "isEnglishAvailable" : "isArabicAvailable"] }))
                setItems(prev => prev.filter(ch => ch.chapterID !== selectedForDeletion.chapterID));
                toast.success(data.message)
            } else {
                const { data } = await api.delete(isMangaDashboard ? `/Manga/${selectedForDeletion.mangaID}` : `/${pathname}/RemoveFrom${pathname}/${selectedForDeletion.mangaID}`)
                setItems(items.filter((manga) => (manga.mangaID !== selectedForDeletion.mangaID)))
                toast.success(data.message)
            }
            handleClose()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {removeTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {removeContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{dialogText[lang].cancel}</Button>
                    <Button onClick={handleDelete} autoFocus disabled={loading}>
                        {loading ? dialogText[lang].removing : dialogText[lang].remove}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

}
