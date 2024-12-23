import { Button, CircularProgress, Fade, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CAlert } from './Custom/CAlert';
import { validateEmail, validatePassword } from './helpers/Validator';
import useApi from './hooks/useAPI';

export const Register = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { request, loading } = useApi();

    //Campos
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);


    //Manejo de errores de validación
    const [errors, setErrors] = useState({ email: "", password: "" });

    const [openAlert, setOpenAlert] = useState(false)

    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const handleClose = () => {
        setOpenAlert(false)
        window.history.replaceState({}, '')
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = "Por favor, introduce un email válido.";
        }
        if (!validatePassword(password)) {
            newErrors.password =
                "La contraseña debe tener entre 8 y 20 caracteres, mayúscula, minúscula y número.";
        }

        // Mostrar errores si existen
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await request("Authenticate/register", "POST", { username, email, password });
            const { status, message } = response;
            setAlertData({ status: status === "Error" ? "error" : "success", message });
            setOpenAlert(true)

            if (status !== "Error") {
                navigate('/login', { state: { alertData: { status: "success", message } } });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true)
        }
    };

    return (
        <Fade in={true} style={{ transitionDelay: pathname === '/register' ? '200ms' : '0' }}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontSize={"40px"} alignContent="Center">Registrarse</Typography>
                {/* Campo Usuario */}
                <TextField type={"text"} id="user" label="Nombre Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />

                {/* Campo email */}
                <TextField type="email" id='email' label="Dirección de correo" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: false });
                }}
                    error={!!errors.email}
                    helperText={errors.email && errors.email}
                    required />

                {/* Campo Password */}
                <TextField type={"password"} id="password" label="Contraseña" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: false });
                }}
                    error={!!errors.password}
                    helperText={errors.password && errors.password}
                    required />
                <Button variant='contained' size='large' disabled={loading} onClick={handleRegister}>
                    <Stack gap={2} direction='row' alignItems={'center'}>
                        <Typography>Registrarme</Typography> {loading && <CircularProgress thickness={5} color='inherit' size={15} />}
                    </Stack>
                </Button>
                <Typography>¿Ya tienes una cuenta? <Link to="/login">Inicie Sesión</Link></Typography>
                <CAlert
                    status={alertData.status}
                    message={alertData.message}
                    open={openAlert}
                    handleClose={handleClose} />
            </Stack>
        </Fade>
    )
}
