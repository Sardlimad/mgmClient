import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Divider, Grid, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useApi from './hooks/useAPI';
import { useAuth } from './helpers/AuthProvider';
import { PhotoCamera } from '@mui/icons-material';
import { InterestSelect } from './Custom/InterestSelect';
import { useNavigate, useParams } from 'react-router-dom';
import { CAlert } from './Custom/CAlert';
import { useFormik } from 'formik';
import { clientValidation } from './helpers/ValidationSchema';

const ClienteForm = () => {

    //Obtener parámetro de url
    const { IdClient } = useParams();

    const { request, loading } = useApi();
    const { authData } = useAuth();
    const navigate = useNavigate();


    //Campos
    const [base64Image, setBase64Image] = useState("");

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const formik = useFormik({
        initialValues: {
            identification: '',
            name: '',
            lastname: '',
            gender: '',
            birthday: '',
            afiliation: '',
            cellphone: '',
            otherphone: '',
            interest: '',
            address: '',
            review: '',
            // image: '',
        },
        validationSchema: clientValidation,
        onSubmit: () => {
            handleSave();
        },
    });

    const getDataClient = async () => {
        try {
            const response = await request(`Cliente/Obtener/${IdClient}`, "GET");
            formik.setValues({
                identification: response.identificacion,
                name: response.nombre,
                lastname: response.apellidos,
                gender: response.sexo, //Para conflictos con los Select del resto de personas haciendo el test
                birthday: formatDate(response.fNacimiento),
                afiliation: formatDate(response.fAfiliacion),
                cellphone: response.telefonoCelular,
                otherphone: response.otroTelefono,
                interest: response.interesesId,
                address: response.direccion,
                review: response.resenaPersonal,
                // image: response.imagen,
            })

            setBase64Image(response.imagen);

            const { status, message } = response;
            if (status === "Error") {
                setAlertData({ status: "error", message });
                setOpenAlert(true)
            }

        } catch (error) {
            const errorMessage = "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true);
        }
    }

    useEffect(() => {
        if (IdClient) {
            getDataClient();
        }
    }, [])


    const handleSave = async () => {
        const endpoint = IdClient ? 'Cliente/Actualizar' : 'Cliente/Crear';

        const payload = {
            ...(IdClient && { id: IdClient }), // Solo incluye "id" si es Actualizar
            nombre: formik.values.name,
            apellidos: formik.values.lastname,
            identificacion: formik.values.identification,
            celular: formik.values.cellphone,
            otroTelefono: formik.values.otherphone,
            direccion: formik.values.address,
            fNacimiento: new Date(formik.values.birthday).toISOString(),
            fAfiliacion: new Date(formik.values.afiliation).toISOString(),
            sexo: formik.values.gender,
            resennaPersonal: formik.values.review,
            // imagen: formik.values.image,
            imagen: base64Image,
            interesFK: formik.values.interest,
            usuarioId: authData.userid,
        };

        try {
            const response = await request(endpoint, 'POST', payload);

            const { status, message } = response;
            const alertMessage = message ?? "¡Se guardaron los datos satisfactoriamente!";
            setAlertData({ status: status === "Error" ? "error" : "success", message: alertMessage });
            setOpenAlert(true);

            if (status !== "Error") {
                navigate('/client', { state: { alertData: { status: "success", message: alertMessage } } });
            }

        } catch (error) {
            setAlertData({ status: "error", message: "Ocurrió un error al guardar el cliente." });
            setOpenAlert(true);
        }
    };

    const formatDate = (isoDate) => {
        return isoDate.split("T")[0];
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
        window.history.replaceState({}, '')
    }

    return (
        <Box
            bgcolor={"#fff"}
            m="30px"
            p="20px"
            boxShadow={3}
            borderRadius="8px"
        >
            {loading && (<Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,

                }}
            >
                <CircularProgress />
            </Box>)}
            <form onSubmit={formik.handleSubmit}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <IconButton sx={{ position: "relative", width: 80, height: 80, }} component="label">
                            <Avatar src={base64Image} sx={{ width: 80, height: 80, bgcolor: "gray", }} />
                            <PhotoCamera sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                fontSize: 24,
                                backgroundColor: "white",
                                borderRadius: "50%",
                            }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                hidden
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight="bold">
                            Mantenimiento de Cliente
                        </Typography>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }} startIcon={<SaveIcon />} type="submit" disabled={loading}>
                            Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />} onClick={() => navigate(-1)}>
                            Regresar
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="identification"
                            name="identification"
                            label="Identificación"
                            value={formik.values.identification}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.identification && Boolean(formik.errors.identification)}
                            helperText={formik.touched.identification && formik.errors.identification}
                            disabled={loading}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="name"
                            name="name"
                            label="Nombre"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            disabled={loading}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="lastname"
                            name="lastname"
                            label="Apellidos"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                            disabled={loading}
                            required
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Género</InputLabel>
                                <Select
                                    id="gender"
                                    name="gender"
                                    label="Género"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                    disabled={loading}
                                    required
                                >
                                    <MenuItem key="F" value="F">Femenino</MenuItem>
                                    <MenuItem key="M" value="M">Masculino</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="birthday"
                            name="birthday"
                            type="date"
                            label="Fecha de Nacimiento"
                            value={formik.values.birthday}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                            helperText={formik.touched.birthday && formik.errors.birthday}
                            disabled={loading}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="afiliation"
                            name="afiliation"
                            type="date"
                            label="Fecha de Afiliación"
                            value={formik.values.afiliation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.afiliation && Boolean(formik.errors.afiliation)}
                            helperText={formik.touched.afiliation && formik.errors.afiliation}
                            disabled={loading}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="cellphone"
                            name="cellphone"
                            type="tel"
                            label="Teléfono Celular"
                            value={formik.values.cellphone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
                            helperText={formik.touched.cellphone && formik.errors.cellphone}
                            disabled={loading}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="otherphone"
                            name="otherphone"
                            type="tel"
                            label="Teléfono Otro"
                            value={formik.values.otherphone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.otherphone && Boolean(formik.errors.otherphone)}
                            helperText={formik.touched.otherphone && formik.errors.otherphone}
                            disabled={loading}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InterestSelect
                            id="interest"
                            name="interest"
                            label="Interés"
                            value={formik.values.interest}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.interest && Boolean(formik.errors.interest)}
                            helperText={formik.touched.interest && formik.errors.interest}
                            disabled={loading}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            id="address"
                            name="address"
                            label="Dirección"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            disabled={loading}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            id="review"
                            name="review"
                            label="Reseña"
                            value={formik.values.review}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.review && Boolean(formik.errors.review)}
                            helperText={formik.touched.review && formik.errors.review}
                            disabled={loading}
                            required
                        />
                    </Grid>
                </Grid>
            </form>
            <CAlert
                status={alertData.status}
                message={alertData.message}
                open={openAlert}
                handleClose={handleCloseAlert}
            />
        </Box >
    );
};

export default ClienteForm;
