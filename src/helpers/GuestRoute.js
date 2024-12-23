import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const GuestRoute = () => {
  const { authData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (authData && authData.token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
