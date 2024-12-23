import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../hooks/useAPI";
import { useAuth } from "../helpers/AuthProvider";
import { Button } from "@mui/material";

const ClientDelete = ({ IdClient }) => {

    const { request, loading } = useApi();
    const { authData } = useAuth();
    const navigate = useNavigate();

    //Manejo de alertas
    const [openAlert, setOpenAlert] = useState(false)
    const [alertData, setAlertData] = useState({ status: "", message: "" });

    const handleDelete = async () => {

        try {
            const response = await request(`Cliente/Eliminar/${IdClient}`, "DELETE");

            console.log("DELETE: ", response);
            const { status, message } = response;

            setAlertData({ status: status === "Error" ? "error" : "success", message });
            setTimeout(() => setAlertData(null), 3000);

            if (status !== "Error") {
                navigate("/client");
            }
        } catch (error) {
            console.error("Error al eliminar cliente:", error);

            const errorMessage = "Ocurrió un error inesperado.";
            setAlertData({ status: "error", message: errorMessage });
            setTimeout(() => setAlertData(null), 3000);
        }
    };

    return (
        <Button onClick={handleDelete} autoFocus color='error'>
            Eliminar
        </Button>
    );
};

export default ClientDelete;
