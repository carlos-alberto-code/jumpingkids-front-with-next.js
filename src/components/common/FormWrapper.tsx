import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from '@mui/material';
import React, { ReactNode } from 'react';

interface FormWrapperProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    actions: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
    open,
    title,
    onClose,
    children,
    actions,
    maxWidth = 'sm',
    fullWidth = true,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {children}
                </Stack>
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    );
};
