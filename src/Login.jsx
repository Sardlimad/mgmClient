import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, CircularProgress, Fade, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });

    //Show password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Rememberme
    const handleChangeRemember = (event) => {
        //Primero guardar en localStorage usando !remember porque el useState se actualiza de forma asíncrona.
        localStorage.setItem('remember', !remember);
        setRemember((remember) => !remember);
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedRemember = localStorage.getItem('remember') === 'true';

        if (savedUsername) {
            setUsername(savedUsername);
        }
        setRemember(savedRemember);
    }, [])


    useEffect(() => {
        if (location.state?.alertData) {
            const { status, message } = location.state.alertData;
            setAlertData({ status, message });
            setOpenAlert(true)
        }
    }, [location.state])

    const handleCloseAlert = () => {
        setOpenAlert(false)
        window.history.replaceState({}, '')
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await request("Authenticate/login", "POST", { username, password });
            login(response);

            if (remember) {
                localStorage.setItem('username', username); // Guardar el nombre de usuario si se recuerda
            } else {
                localStorage.removeItem('username'); // Eliminar el nombre de usuario si no se recuerda
            }

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
                    <TextField required type="text" id="user" label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                            value={password} onChange={(e) => {
                                setPassword(e.target.value);

                            }}
                            required
                        />
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember}
                                onChange={handleChangeRemember}
                                color="primary" // Puedes cambiar el color según tus preferencias
                            />
                        }
                        label="Recordar nombre de usuario"
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
