import {
    Add as CreateIcon,
    WorkspacePremium as PremiumIcon,
    ListAlt as RoutinesIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    Typography
} from '@mui/material';

export interface RoutineCreatorProps {
    isPremiumUser?: boolean;
    onCreateRoutine?: () => void;
    onUpgradePremium?: () => void;
    totalRoutines?: number;
    filteredRoutines?: number;
}

export default function RoutineCreator({
    isPremiumUser = false,
    onCreateRoutine,
    onUpgradePremium,
    totalRoutines = 0,
    filteredRoutines = 0
}: RoutineCreatorProps) {

    return (
        <>
            {/* Header principal */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <RoutinesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Rutinas de Ejercicio
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Explora {filteredRoutines} rutinas disponibles
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isPremiumUser && (
                        <Chip
                            label="PREMIUM"
                            color="secondary"
                            size="small"
                        />
                    )}

                    {isPremiumUser ? (
                        <Button
                            startIcon={<CreateIcon />}
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={onCreateRoutine}
                        >
                            Crear Rutina
                        </Button>
                    ) : (
                        <Button
                            startIcon={<PremiumIcon />}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={onUpgradePremium}
                        >
                            Upgrade Premium
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Información del plan */}
            <Alert severity={isPremiumUser ? "success" : "info"} sx={{ mb: 3 }}>
                {isPremiumUser ? (
                    <>
                        🎉 <strong>Premium:</strong> Tienes acceso a todas las rutinas del sistema y rutinas personalizadas.
                        Puedes duplicar rutinas para crear versiones personalizadas.
                    </>
                ) : (
                    <>
                        ℹ️ <strong>Plan Gratuito:</strong> Acceso a rutinas predefinidas del sistema.
                        Actualiza a Premium para crear rutinas personalizadas y acceder a contenido exclusivo.
                    </>
                )}
            </Alert>
        </>
    );
}
