import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../helpers/AuthProvider';
import useApi from '../hooks/useAPI';
import { Spinner } from './Spinner';

export const InterestSelect = ({ value, setValue }) => {

    const { authData } = useAuth()
    const { request, loading } = useApi();

    const [interests, setInterests] = useState([]);

    const getInterests = async () => {
        try {
            const response = await request("Intereses/Listado", "GET");
            console.log("Intereses: ", response);
            setInterests(response);
        } catch (error) {
            console.error("Error fetching clients:", error);
            setInterests([]);
        }
    }

    useEffect(() => {
        getInterests();
    }, [])


    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Interés</InputLabel>
                <Select
                    labelId="select-label"
                    id="value-select"
                    value={value}
                    label="Interés"
                    onChange={handleChange}
                >
                    {loading ? <Spinner /> :
                        interests.map((item) =>
                            <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>
                        )}
                </Select>
            </FormControl>
        </Box>
    );
}
