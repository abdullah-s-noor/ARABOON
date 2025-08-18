import { Fragment, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { api } from '../../../services/api';
import { useTranslation } from 'react-i18next';

export default function AlertDialog({ open, setOpen, selectedGenre, setSelectedGenre, genreOptions }) {
    const handleClose = () => {
        setOpen(false);
    };
    console.log(genreOptions)
    const {t,i18n}=useTranslation()
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                    {t("genres")}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {genreOptions.map((genre, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                disabled={genre.en === selectedGenre.en.toLowerCase()}
                                sx={{
                                    ":disabled": {
                                        color: 'primary.main',
                                        borderColor: 'primary.main'
                                    },
                                    color: 'text.primary',
                                    textTransform: 'none',
                                    p: '2px 10px',
                                    borderColor: 'text.primary',
                                    borderRadius: '15px',
                                }}
                                onClick={() => {
                                    setSelectedGenre(genre);
                                    
                                    localStorage.setItem("genre", genre.en)
                                    setOpen(false)
                                }}>
                                {i18n.language==='en'?genre.en:genre.ar}
                            </Button>
                        ))}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
