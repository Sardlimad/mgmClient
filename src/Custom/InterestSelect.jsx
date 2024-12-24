import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../helpers/AuthProvider';
import useApi from '../hooks/useAPI';
import { Spinner } from './Spinner';

export const InterestSelect = ({ id, name, label, value, onChange, onBlur, error, helperText, disabled }) => {

    const { request, loading } = useApi();

    const [interests, setInterests] = useState([]);

    const getInterests = async () => {
        try {
            const response = await request("Intereses/Listado", "GET");
            setInterests(response);
        } catch (error) {
            console.error("Error fetching clients:", error);
            setInterests([]);
        }
    }

    useEffect(() => {
        getInterests();
    }, [])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Interés</InputLabel>
                <Select
                    id={id}
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    helperText={helperText}
                    disabled={disabled}
                    required
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
