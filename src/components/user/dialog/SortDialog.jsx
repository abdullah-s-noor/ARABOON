import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function AlertDialog({ open, setOpen, selectedSort, setSelectedSort ,sortOptions}) {
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
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                    Sort
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>

                        <FormControl>
                            <RadioGroup
                                value={selectedSort.key}
                                onChange={(e) => {
                                    const key = e.target.value;
                                    const label = sortOptions[key];
                                    setSelectedSort({ key, value: label });
                                    localStorage.setItem("sort",key)
                                    setOpen(false);
                                }}
                                name="radio-buttons-group"
                            >
                                {Object.entries(sortOptions).map(([key, label]) => (
                                    <FormControlLabel
                                        key={key}
                                        value={key}
                                        control={<Radio />}
                                        label={label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
