import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
function AlertProfileImage({handleDelete,type, open,setOpen }) {
    const dialogText = {
        en: {
            removeTitle: "Remove Profile Image",
            removeContent: `Are you sure you want to remove your ${type==="cover_image"?"cover":"profile"}  image? This action cannot be undone.`,
            cancel: "Cancel",
            remove: "Remove",
            removing: "Removing...",
        },
        ar: {
            removeTitle: "حذف المرجع",
            removeContent: `هل أنت متأكد أنك تريد حذف صورة ${type==="cover_image"?"صورة الغلاف":"الملف الشخصي"} ؟ هذا الإجراء لا يمكن التراجع عنه.`,
            cancel: "إلغاء",
            remove: "حذف",
            removing: "جارٍ الحذف...",
        }
    }
    const { i18n } = useTranslation()
    const lang = i18n.language
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false)
    };

    return (
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
                    {dialogText[lang].removeContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>{dialogText[lang].cancel}</Button>
                <Button onClick={()=>{handleDelete()}} autoFocus disabled={loading}>
                    {loading ? dialogText[lang].removing : dialogText[lang].remove}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertProfileImage
