import { Button, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutBtn = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <>
            <Tooltip title="Cerrar sesión" arrow>
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleOpenDialog}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <LogoutIcon />
                </Button>
            </Tooltip>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="confirm-logout-title"
                aria-describedby="confirm-logout-description"
            >
                <DialogTitle id="confirm-logout-title">Confirmar cierre de sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-logout-description">
                        ¿Estás seguro de que deseas cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleLogout} color="secondary" autoFocus>
                        Cerrar sesión
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LogoutBtn;
