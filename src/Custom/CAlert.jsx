import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export const CAlert = ({ status, message, open, handleClose }) => {

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={status}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

