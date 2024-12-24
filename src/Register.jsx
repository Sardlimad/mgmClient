import { Button, CircularProgress, Fade, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CAlert } from './Custom/CAlert';
import { registerValidation } from './helpers/ValidationSchema';
import useApi from './hooks/useAPI';

export const Register = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { request, loading } = useApi();

    const formik = useFormik({
        initialValues: {
            user: '',
            email: '',
            password: '',
        },
        validationSchema: registerValidation,
        onSubmit: (values) => {
            handleRegister();
        },
    });

    const [openAlert, setOpenAlert] = useState(false)

    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const handleClose = () => {
        setOpenAlert(false)
        window.history.replaceState({}, '')
    }

    const handleRegister = async () => {

        const payload = {
            username: formik.values.user,
            email: formik.values.email,
            password: formik.values.password,
        }

        try {
            const response = await request("Authenticate/register", "POST", payload);
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
            <form onSubmit={formik.handleSubmit}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={"40px"} alignContent="Center">Registrarse</Typography>
                    <TextField fullWidth
                        id="user"
                        name="user"
                        label="Usuario"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.user && Boolean(formik.errors.user)}
                        helperText={formik.touched.user && formik.errors.user}
                    />

                    <TextField fullWidth
                        id="email"
                        name="email"
                        label="Correo"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField fullWidth
                        id="password"
                        name='password'
                        label="Contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button variant='contained' size='large' disabled={loading} type="submit">
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
            </form>
        </Fade>
    )
}
