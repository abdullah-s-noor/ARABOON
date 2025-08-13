import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, setOpen,selectedGenre,setSelectedGenre, genreOptions }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign:'center'}}>
                    Genres
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description" sx={{display:'flex',gap:2,flexWrap:'wrap',justifyContent:'center'}}>
                        {genreOptions.map((genre, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                disabled={genre.toLowerCase()===selectedGenre.toLowerCase()}
                                sx={{
                                    ":disabled":{
                                        color:'primary.main',
                                        borderColor:'primary.main'
                                    },
                                    color: 'text.primary',
                                    textTransform: 'none',
                                    p: '2px 10px',
                                    borderColor: 'text.primary',
                                    borderRadius: '15px',
                                }}
                                onClick={() => {
                                    setSelectedGenre(genre.toLowerCase());
                                    localStorage.setItem("genre",genre.toLowerCase())
                                    setOpen(false)
                                }}>
                                {genre}
                            </Button>
                        ))}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
