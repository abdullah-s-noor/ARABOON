import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, setOpen,selectedGenre,setSelectedGenre }) {
    const handleClose = () => {
        setOpen(false);
    };
    const genres = ["all","drama", "activity", "action", "sex", "ass", "dick"]
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
                        {genres.map((genre, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                disabled={genre===selectedGenre}
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
                                    setSelectedGenre(genre)
                                    localStorage.setItem("genre",genre)
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
