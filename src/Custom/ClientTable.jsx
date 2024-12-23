import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Paper, Grid, TextField, IconButton, Tooltip } from "@mui/material";
import useApi from "../hooks/useAPI";
import { useAuth } from "../helpers/AuthProvider";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Spinner } from "./Spinner";
import { useLocation, useParams } from "react-router-dom";
import { CAlert } from "./CAlert";
import { DeleteDialog } from "./DeleteDialog";


const ClientTable = () => {

    const { IdClient } = useParams();

    const { authData } = useAuth()
    const { request, loading } = useApi();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [clients, setClients] = useState([]);

    //Campos para filtrar
    const [searchName, setSearchName] = useState("");
    const [searchID, setSearchID] = useState("");

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);

    const location = useLocation();

    const getClients = async () => {
        try {
            const response = await request("Cliente/Listado", "POST", {
                usuarioId: authData.userid,
                nombre: searchName || "",
                identificacion: searchID || "",
            });
            setClients(response);

            const { status, message } = response;
            if (status === "Error") {
                setAlertData({ status: "error", message });
                setOpenAlert(true)
            }
        } catch (error) {
            const errorMessage = "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true)
            setClients([]);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await request(`Cliente/Eliminar/${IdClient}`, "DELETE", {
                usuarioId: authData.userid,
            });
            console.log("DELETE: ", response);
            const { status, message } = response;
            setAlertData({ status: status === "Error" ? "error" : "success", message });
            setOpenAlert(true)
        } catch (error) {
            const errorMessage = "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setOpenAlert(true)
        }
    }

    useEffect(() => {
        getClients();
    }, [])

    useEffect(() => {
        if (location.state?.alertData) {
            const { status, message } = location.state.alertData;
            setAlertData({ status, message });
            setOpenAlert(true)
        }
    }, [location.state])



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false)
        window.history.replaceState({}, '')
    }

    return (<>
        {/* Buscar */}
        <Grid container spacing={2} sx={{ mt: -2 }}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Nombre" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField fullWidth size="small" label="Identificación" variant="outlined" value={searchID} onChange={(e) => setSearchID(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                        height: "100%",
                        minWidth: "unset",
                        padding: 0,
                    }}
                    size="small"
                    onClick={() => getClients()}
                // disabled={searchName.trim() === "" && searchID.trim() === ""}
                ><SearchIcon />
                </Button>
            </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "15px" }}>
            <TableContainer>
                <Table aria-label="Client Table" sx={{ border: "none" }} size="small">
                    <TableHead>
                        <TableRow  >
                            <TableCell sx={{ width: "30%", fontWeight: "bold", }}>Identificación</TableCell>
                            <TableCell sx={{ width: "40%", fontWeight: "bold", }}>Nombre Completo</TableCell>
                            <TableCell sx={{ width: "20%", fontWeight: "bold", textAlign: "right" }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.length > 0 ? (
                            clients
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.identificacion}</TableCell>
                                        <TableCell>{`${client.nombre} ${client.apellidos}`}</TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            <Tooltip title="Editar">
                                                <IconButton color="primary" href={`client/${client.id}/update`} >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton color="error" onClick={() => { setOpenDeleteDlg(true) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    {loading ? <Spinner /> : "No se encontraron clientes."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CAlert
                status={alertData.status}
                message={alertData.message}
                open={openAlert}
                handleClose={handleCloseAlert}
            />
            <DeleteDialog open={openDeleteDlg} setOpen={setOpenDeleteDlg} handleDelete={handleDelete} IdClient={IdClient} />
        </Paper>
    </>
    );
};

export default ClientTable;
