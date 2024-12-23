import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { APP_NAME } from '../Configs/Config';

export const AuthLayout = () => {
    return (
        <Box
            bgcolor="background.default"
            borderRadius="16px"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            m="auto"
            mt={{ xs: "40px", md: "80px" }}
            width={{ xs: "90%", sm: "80%", md: "55%" }}
            height={{ xs: "auto", md: "600px" }}
            overflow="hidden"
            display="flex"
            flexDirection="column"
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                height="100%"
                sx={{ flex: 1 }}
            >
                {/* Imagen de fondo */}
                <Box
                    width={{ xs: "100%", md: "50%" }}
                    height={{ xs: "200px", md: "100%" }}
                    sx={{
                        backgroundImage: `url('/images/protruding-squares.svg')`,
                        backgroundPosition: 'center',
                        // backgroundSize: 'cover',
                    }}
                >
                    <Box
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="rgba(0, 0, 0, 0.6)"
                    >
                        <Typography
                            variant={{ xs: "h5", md: "h4" }}
                            // fontWeight="bold"
                            color="white"
                            fontSize={{ xs: "30px", md: "40px" }}
                            textAlign="center"
                            px={2}
                        >
                            Bienvenido a <b>{APP_NAME}</b>
                        </Typography>
                    </Box>
                </Box>

                {/* Contenedor del formulario */}
                <Box
                    width={{ xs: "100%", md: "60%" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    px={{ xs: 4, md: 4 }}
                    py={{ xs: 3, md: 0 }}
                    bgcolor="background.paper"
                >
                    <Box width="100%">
                        <Outlet />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};
