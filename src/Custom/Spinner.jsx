import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const Spinner = () => {
    return (
        <Box textAlign={"center"}>
            <CircularProgress />
        </Box>
    )
}
