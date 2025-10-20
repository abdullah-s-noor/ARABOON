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

const dialogText = {
    en: {
        removeTitle: "Remove Bookmark",
        removeContent: (title) => `Are you sure you want to remove "${title}" from your library? This action cannot be undone.`,
        cancel: "Cancel",
        remove: "Remove",
        removing: "Removing...",
    },
    ar: {
        removeTitle: "حذف المرجع",
        removeContent: (title) => `هل أنت متأكد أنك تريد حذف "${title}" من مكتبتك؟ هذا الإجراء لا يمكن التراجع عنه.`,
        cancel: "إلغاء",
        remove: "حذف",
        removing: "جارٍ الحذف...",
    }
}

export default function AlertDialog({ selectedForDeletion, setSelectedForDeletion, mangas, setMangas }) {
    const location = useLocation()
    const pathname = (location.pathname?.split('/')[2])?.split('-')?.join('')
    const { i18n } = useTranslation()
    const lang = i18n.language
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log(22222222222222)
        setOpen(selectedForDeletion ? true : false)
    }, [selectedForDeletion])

    const handleClose = () => {
        setSelectedForDeletion(null)
    };

    const handleDelete = async () => {
        try {
            setLoading(true)
            const {data} = await api.delete(`/${pathname}/RemoveFrom${pathname}/${selectedForDeletion.mangaID}`)
            setMangas(mangas.filter((manga) => (manga.mangaID !== selectedForDeletion.mangaID)))
            console.log(data)
            toast.success(data.message)
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
                    {dialogText[lang].removeTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText[lang].removeContent(selectedForDeletion?.mangaName)}
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
