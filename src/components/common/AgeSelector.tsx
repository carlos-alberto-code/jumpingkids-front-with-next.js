import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import React from 'react';

interface AgeSelectorProps {
    value: number;
    onChange: (age: number) => void;
    variant?: 'select' | 'input';
    fullWidth?: boolean;
}

export const AgeSelector: React.FC<AgeSelectorProps> = ({
    value,
    onChange,
    variant = 'input',
    fullWidth = true,
}) => {
    if (variant === 'select') {
        return (
            <FormControl fullWidth={fullWidth}>
                <InputLabel>Edad</InputLabel>
                <Select
                    value={value}
                    label="Edad"
                    onChange={(e) => onChange(Number(e.target.value))}
                >
                    {Array.from({ length: 14 }, (_, i) => i + 3).map((age) => (
                        <MenuItem key={age} value={age}>
                            {age} año{age > 1 ? 's' : ''}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    return (
        <TextField
            fullWidth={fullWidth}
            label="Edad"
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            inputProps={{ min: 3, max: 16 }}
        />
    );
};
