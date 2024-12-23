import { Box, Typography, Button } from "@mui/material";
import React from "react";

export const Home = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={3}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
        sx={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)" }}
      >
        ¡Bienvenido!
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
        sx={{ maxWidth: "600px" }}
      >
        Esta es la página principal de nuestra aplicación. Navega por el menú para explorar las diferentes secciones y funciones.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        href="/about"
        sx={{
          textTransform: "none",
          fontWeight: "medium",
          px: 4,
          py: 1.5,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        Saber más
      </Button>
    </Box>
  );
};
