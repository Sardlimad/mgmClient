import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthProvider';

import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutBtn = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return <Button color='inherit' onClick={handleLogout}><LogoutIcon /></Button>
};

export default LogoutBtn;