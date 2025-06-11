import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import React from 'react';
import { AVATAR_OPTIONS } from '../../types/kids';

interface AvatarPickerProps {
    value: string;
    onChange: (avatar: string) => void;
    fullWidth?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
    value,
    onChange,
    fullWidth = true,
}) => {
    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel>Avatar</InputLabel>
            <Select
                value={value}
                label="Avatar"
                onChange={(e) => onChange(e.target.value)}
            >
                {AVATAR_OPTIONS.map((avatar) => (
                    <MenuItem key={avatar} value={avatar}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '1.5rem' }}>{avatar}</span>
                            <span>Avatar {AVATAR_OPTIONS.indexOf(avatar) + 1}</span>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
