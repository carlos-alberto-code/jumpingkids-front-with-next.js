import { Person as PersonIcon } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';

interface AddKidButtonProps {
    maxKids: number;
    onAdd: () => void;
}

export const AddKidButton: React.FC<AddKidButtonProps> = ({
    maxKids,
    onAdd,
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px dashed ${theme.palette.grey[300]}`,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderColor: theme.palette.primary.main
                }
            }}
            onClick={onAdd}
        >
            <CardContent sx={{ textAlign: 'center' }}>
                <PersonIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="primary.main">
                    Agregar Hijo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hasta {maxKids} hijo{maxKids > 1 ? 's' : ''}
                </Typography>
            </CardContent>
        </Card>
    );
};
