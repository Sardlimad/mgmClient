import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export const Page404 = () => {
    return (
        <Box m="auto" width="600px" textAlign={'center'}>
            <img src='/images/404.svg' alt="page-not-found" width="100%" />
            <Typography>Página no encontrada.</Typography>
            <Button href='/'>Inicio</Button>
        </Box>
    )
}
