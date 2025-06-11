import { Alert } from '@mui/material';
import React from 'react';

interface PlanInfoAlertProps {
    isPremiumUser: boolean;
}

export const PlanInfoAlert: React.FC<PlanInfoAlertProps> = ({ isPremiumUser }) => {
    return (
        <Alert
            severity={isPremiumUser ? "success" : "info"}
            sx={{ mb: 3 }}
        >
            {isPremiumUser ? (
                <>
                    🎉 <strong>Plan Premium:</strong> Puedes gestionar hasta 3 hijos con configuraciones individuales y estadísticas avanzadas.
                </>
            ) : (
                <>
                    ℹ️ <strong>Plan Gratuito:</strong> Puedes gestionar 1 hijo. Actualiza a Premium para gestionar hasta 3 hijos con funciones avanzadas.
                </>
            )}
        </Alert>
    );
};
