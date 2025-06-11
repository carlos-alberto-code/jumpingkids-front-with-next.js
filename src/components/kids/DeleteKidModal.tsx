import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';
import React from 'react';
import { Kid } from '../../types/kids';

interface DeleteKidModalProps {
    open: boolean;
    kid: Kid | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteKidModal: React.FC<DeleteKidModalProps> = ({
    open,
    kid,
    onClose,
    onConfirm,
}) => {
    if (!kid) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>⚠️ Confirmar Eliminación</DialogTitle>
            <DialogContent>
                <Typography>
                    ¿Estás seguro de que deseas eliminar el perfil de{' '}
                    <strong>{kid.name}</strong>?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Esta acción no se puede deshacer y se perderán todas las estadísticas.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
