import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function AlertSnackbar({ snackbar, setSnackbar }) {
    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{direction:"ltr"}}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AlertSnackbar 
