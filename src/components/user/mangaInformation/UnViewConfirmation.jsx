import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Snackbar } from '@mui/material'
import { api } from '../../../services/api'
import { useParams } from 'react-router-dom'

function UnViewConfirmation({
  open,
  onCancel,
  onConfirm,
  snackbarOpen,
  onSnackbarClose,
  chapterID,
}) {
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const mangaID=useParams().mangaID
  const handleClick = async() => {
    try {
      setLoading(true)
      const { data } = await api.delete(`/ChapterView/MarkAsUnRead?mangaID=${mangaID}&chapterID=${chapterID}`)
      onConfirm()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Dialog open={open} onClose={onCancel} onClick={(e) => e.stopPropagation()}>
        <DialogTitle>
          {i18n.language === "en"
            ? "Mark as unviewed?"
            : "إزالة علامة تم المشاهدة؟"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {i18n.language === "en"
              ? "Do you want to mark this chapter as not viewed?"
              : "هل تريد إزالة علامة تم المشاهدة من هذا الفصل؟"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="inherit">
            {i18n.language === "en" ? "Cancel" : "إلغاء"}
          </Button>
          <Button onClick={handleClick} color="primary" variant="contained" loading={loading}>
            {i18n.language === "en" ? "Mark as Unviewed" : "إزالة العلامة"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={onSnackbarClose}
        message={
          i18n.language === "en"
            ? "Chapter marked as not viewed"
            : "تم إزالة العلامة عن الفصل"
        }
      />
    </>
  )
}

export default UnViewConfirmation
