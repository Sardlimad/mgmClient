import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Custom/NavBar'

export const MainLayout = () => {
    return (
        <Box>
            <NavBar />
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}
