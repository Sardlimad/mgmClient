import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react';
import ClientTable from './Custom/ClientTable';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export const Clients = () => {

    return (
        <Box
            bgcolor={"#fff"}
            m="30px"
            p="20px"
            boxShadow={3}
            borderRadius="8px"
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        Consulta de Clientes
                    </Typography>
                </Grid>
                <Grid item xs />
                <Grid item>
                    <Button variant="contained" color="primary" sx={{ marginRight: 1 }} startIcon={<AddIcon />} href="/client/create">
                        Registrar
                    </Button>
                    <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />}>
                        Regresar
                    </Button>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <ClientTable />



        </Box>
    )
}
