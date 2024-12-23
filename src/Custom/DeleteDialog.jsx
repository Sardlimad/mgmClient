import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ClientDelete from './ClientDelete';

export const DeleteDialog = ({ open, setOpen, hanleDelete, IdCliente }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-dialog"
        >
            <DialogTitle id="delete-dialog">
                {"¿Seguro de eliminar el cliente?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancelar
                </Button>
                <ClientDelete IdCliente={IdCliente} setOpenDialog={setOpen} />
            </DialogActions>
        </Dialog>
    );
}