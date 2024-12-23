import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Divider, Grid, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress, useMediaQuery, Dialog } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useApi from './hooks/useAPI';
import { useAuth } from './helpers/AuthProvider';
import { PhotoCamera } from '@mui/icons-material';
import { InterestSelect } from './Custom/InterestSelect';
import { useNavigate, useParams } from 'react-router-dom';
import { CAlert } from './Custom/CAlert';

const ClienteForm = () => {

    //Obtener parámetro de url
    const { IdClient } = useParams();

    const { request, loading } = useApi();
    const { authData } = useAuth();
    const navigate = useNavigate();


    //Campos
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [identification, setIdentification] = useState("");
    const [gender, setGender] = useState("M");
    const [cellphone, setCellphone] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [afiliation, setAfiliation] = useState("");
    const [interest, setInterest] = useState("");
    const [review, setReview] = useState("");
    const [avatar, setAvatar] = useState("");
    const [base64Image, setBase64Image] = useState("");

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const [clientData, setClientData] = useState({});

    const getDataClient = async () => {
        try {
            const response = await request(`Cliente/Obtener/${IdClient}`, "GET", {

            });
            console.log("Cliente: ", response);

            setName(response.nombre);
            setLastname(response.apellidos);
            setIdentification(response.identificacion);
            setGender(response.sexo === "F" || response.sexo === "M" ? response.sexo : ""); //Para conflictos con los Select del resto de personas haciendo el test
            setCellphone(response.telefonoCelular);
            setOtherPhone(response.otroTelefono);
            setAddress(response.direccion);
            setBirthday(formatDate(response.fNacimiento));
            setAfiliation(formatDate(response.fAfiliacion));
            setInterest(response.interesesId);
            setReview(response.resenaPersonal);
            setBase64Image(response.imagen);
            setAvatar(response.imagen)

            const { status, message } = response;
            if (status === "Error") {
                setAlertData({ status: "error", message });
                setOpenAlert(true)
            }

        } catch (error) {
            const errorMessage = "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true);
            setClientData({});
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
            nombre: name,
            apellidos: lastname,
            identificacion: identification,
            celular: cellphone,
            otroTelefono: otherPhone,
            direccion: address,
            fNacimiento: birthday,
            fAfiliacion: afiliation,
            sexo: gender,
            resennaPersonal: review,
            imagen: base64Image,
            interesFK: interest,
            usuarioId: authData.userid,
        };

        if (birthday) {
            payload.fNacimiento = new Date(birthday).toISOString();
        }
        if (afiliation) {
            payload.fAfiliacion = new Date(afiliation).toISOString();
        }

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
                setAvatar(URL.createObjectURL(file));
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
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton
                        sx={{
                            position: "relative",
                            width: 80,
                            height: 80,
                        }}
                        component="label"
                    >
                        <Avatar
                            src={avatar || ""}
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: "gray",
                            }}
                        />
                        <PhotoCamera
                            sx={{
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
                            hidden
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        Mantenimiento de Cliente
                    </Typography>
                </Grid>
                <Grid item xs />
                <Grid item>
                    <Button variant="contained" color="primary" sx={{ marginRight: 1 }} startIcon={<SaveIcon />} onClick={handleSave} disabled={loading}>
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
                    <TextField fullWidth label="Identificación" variant="outlined" required value={identification} onChange={(e) => setIdentification(e.target.value)} disabled={loading} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Nombre" variant="outlined" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Apellidos" variant="outlined" required value={lastname} onChange={(e) => setLastname(e.target.value)} disabled={loading} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Género</InputLabel>
                            <Select
                                labelId="select-label"
                                id="value-select"
                                value={gender}
                                label="Género"
                                onChange={(e) => setGender(e.target.value)}
                                disabled={loading}
                            >
                                <MenuItem key="F" value="F">Femenino</MenuItem>
                                <MenuItem key="M" value="M">Masculino</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Fecha de Nacimiento" variant="outlined" type="date" required value={birthday} onChange={(e) => setBirthday(e.target.value)} disabled={loading} InputLabelProps={{
                        shrink: true,
                    }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Fecha de Afiliación" variant="outlined" type="date" required value={afiliation} onChange={(e) => setAfiliation(e.target.value)} disabled={loading} InputLabelProps={{
                        shrink: true,
                    }} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Teléfono Celular" variant="outlined" required value={cellphone} onChange={(e) => setCellphone(e.target.value)} type="tel" disabled={loading} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Teléfono Otro" variant="outlined" required value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} type="tel" disabled={loading} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InterestSelect value={interest} setValue={setInterest} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Dirección" variant="outlined" required value={address} onChange={(e) => setAddress(e.target.value)} type="text" disabled={loading} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Reseña" variant="outlined" required value={review} onChange={(e) => setReview(e.target.value)} type="text" disabled={loading} />
                </Grid>
            </Grid>
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
