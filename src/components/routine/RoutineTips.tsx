import { Close as CloseIcon, Help as HelpIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Fab,
    IconButton,
    Modal,
    Stack,
    Typography,
    Zoom
} from '@mui/material';
import { useEffect, useState } from 'react';

interface RoutineTipsProps {
    showInitially?: boolean;
    showHelpButton?: boolean;
}

export const RoutineTips: React.FC<RoutineTipsProps> = ({
    showInitially = true,
    showHelpButton = true
}) => {
    const [showTips, setShowTips] = useState(showInitially);
    const [showFab, setShowFab] = useState(showHelpButton && !showInitially);
    const [showPulse, setShowPulse] = useState(false);

    // Mostrar animación de pulso cuando aparece el FAB
    useEffect(() => {
        if (showFab) {
            setShowPulse(true);
            const timer = setTimeout(() => {
                setShowPulse(false);
            }, 6000); // Pulsar por 6 segundos
            return () => clearTimeout(timer);
        }
    }, [showFab]);

    const handleCloseTips = () => {
        setShowTips(false);
        if (showHelpButton) {
            setShowFab(true);
        }
    };

    const handleOpenTips = () => {
        setShowTips(true);
        setShowFab(false);
    };

    const tips = [
        {
            type: 'info' as const,
            message: 'Comienza con un calentamiento ligero y termina con ejercicios de relajación o estiramiento'
        },
        {
            type: 'success' as const,
            message: 'Alterna entre ejercicios de alta y baja intensidad para mantener el interés de los niños'
        },
        {
            type: 'warning' as const,
            message: 'No incluyas más de 3-4 ejercicios de alta intensidad consecutivos para evitar el agotamiento'
        },
        {
            type: 'info' as const,
            message: 'Usa nombres temáticos para las rutinas: "Aventura en la Selva", "Entrenamiento de Superhéroes", etc.'
        },
        {
            type: 'success' as const,
            message: 'Los descansos de 30-45 segundos son ideales para que los niños se recuperen sin perder el ritmo'
        }
    ];

    return (
        <>
            {/* Modal de Tips */}
            <Modal
                open={showTips}
                onClose={handleCloseTips}
                aria-labelledby="routine-tips-modal-title"
                closeAfterTransition
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 },
                        maxHeight: '80vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                        outline: 'none',
                        overflowY: 'auto'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="routine-tips-modal-title" variant="h6" component="h2" fontWeight="bold">
                            🎯 Tips para Crear Rutinas
                        </Typography>
                        <IconButton onClick={handleCloseTips} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Stack spacing={2}>
                        {tips.map((tip, index) => (
                            <Alert
                                key={index}
                                severity={tip.type}
                                sx={{
                                    '& .MuiAlert-message': {
                                        fontSize: '0.875rem'
                                    }
                                }}
                            >
                                {tip.message}
                            </Alert>
                        ))}

                        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                🏃‍♀️ <strong>Recordatorio:</strong> Una buena rutina debe ser divertida, segura y progresiva.
                                Ajusta la intensidad según la edad y nivel de los niños.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Modal>

            {/* Botón flotante para mostrar tips */}
            {showHelpButton && (
                <Zoom in={showFab}>
                    <Fab
                        color="secondary"
                        aria-label="mostrar tips de rutinas"
                        onClick={handleOpenTips}
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            zIndex: 1000,
                            animation: showPulse ? 'pulse 2s infinite' : 'none',
                            '@keyframes pulse': {
                                '0%': {
                                    transform: 'scale(1)',
                                    boxShadow: '0 0 0 0 rgba(156, 39, 176, 0.7)'
                                },
                                '70%': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 0 0 10px rgba(156, 39, 176, 0)'
                                },
                                '100%': {
                                    transform: 'scale(1)',
                                    boxShadow: '0 0 0 0 rgba(156, 39, 176, 0)'
                                }
                            }
                        }}
                    >
                        <HelpIcon />
                    </Fab>
                </Zoom>
            )}
        </>
    );
};
