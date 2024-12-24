import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { Button, CircularProgress, Typography } from "@mui/material";

const ClientDelete = ({ IdClient, setOpenDialog }) => {

    const { request, loading } = useApi();
    const navigate = useNavigate();

    const handleDelete = async () => {

        try {
            const response = await request(`Cliente/Eliminar/${IdClient}`, "DELETE");

            const { status, message } = response;
            setOpenDialog(false);
            navigate('/client', { state: { alertData: { status, message } } });
        } catch (error) {
            const errorMessage = "Ocurrió un error inesperado.";
            setOpenDialog(false);
            navigate('/client', { state: { alertData: { status: "error", message: errorMessage } } });
        }
    };

    return (
        <Button onClick={handleDelete} autoFocus color='error'>
            <Typography>Eliminar</Typography> {loading && <CircularProgress thickness={5} color='inherit' size={15} />}
        </Button>
    );
};

export default ClientDelete;
