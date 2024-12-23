import { Box, Button, CircularProgress, Fade, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CAlert } from './Custom/CAlert';
import { useAuth } from './helpers/AuthProvider';
import useApi from './hooks/useAPI';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();

    const { request, loading } = useApi();
    const { login } = useAuth();

    //Campos Login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });


    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await request("Authenticate/login", "POST", { username, password });
            login(response);
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
            const { status, message } = response;
            setAlertData({ status: status === "Error" ? "error" : "success", message });
            setOpenAlert(true)
        } catch (error) {
            const errorMessage = error.response?.data?.title === 'Unauthorized' ? "Usuario o contraseña incorrecta" : "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true)
        }
    };

    return (
        <Fade in={true} style={{ transitionDelay: pathname === '/login' ? '200ms' : '0' }}>
            <Box>
                <Stack direction={"column"} spacing={2} >
                    <Typography fontSize={"40px"} alignContent="Center">Iniciar Sesión</Typography>
                    <Typography>¡Bienvenido! Por favor inicie sesión en su cuenta.</Typography>
                    <TextField required type="text" label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField required type="password" label="Contraseña" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <Button variant='contained' size='large' disabled={loading} onClick={handleLogin}>
                        <Stack gap={2} direction='row' alignItems={'center'}>
                            <Typography>Iniciar Sesión</Typography> {loading && <CircularProgress thickness={5} color='inherit' size={15} />}
                        </Stack>
                    </Button>
                    <Typography>¿No tienes una cuenta? <Link to="/register">Regístrese</Link></Typography>
                </Stack>
                <CAlert
                    status={alertData.status}
                    message={alertData.message}
                    open={openAlert}
                    handleClose={handleCloseAlert} />
            </Box>
        </Fade >
    )
}
