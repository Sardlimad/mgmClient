import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
    const navigate = useNavigate();

    return (
        <Box
            m="auto"
            p={4}
            maxWidth="480px"
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <img
                src="/images/404.svg"
                alt="Página no encontrada"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '16px',
                }}
            />
            <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
                Oops... Página no encontrada
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Lo sentimos, no pudimos encontrar la página que buscas. Verifica la URL o regresa a la página de inicio.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 'medium',
                }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};
