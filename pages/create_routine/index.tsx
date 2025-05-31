import { Add as CreateIcon, Star as PremiumIcon } from '@mui/icons-material';
import { Alert, Box, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';


export default function CreateRoutinePage() {

    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <PermissionGate
            permission="canCreateExercisesForKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium y permisos de tutor.
                    </Alert>
                </Container>
            }
        >
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 4
                }}>
                    <CreateIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Crear Rutina
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Editor de rutinas personalizadas
                        </Typography>
                    </Box>
                    <Chip
                        icon={<PremiumIcon />}
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            ✏️ ¡Crea rutinas personalizadas para tus hijos!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Diseña rutinas únicas combinando ejercicios del catálogo. Arrastra, organiza y personaliza
                            cada rutina según las necesidades específicas de cada hijo.
                        </Typography>

                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                🎨 Editor de rutinas
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Interfaz drag & drop y builder visual estará disponible en la siguiente fase
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Editor avanzado con preview, estimación automática de duración y validaciones
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            📋 Funcionalidades planificadas:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2 }}>
                            <Typography component="li" variant="body2">
                                Editor drag & drop de rutinas
                            </Typography>
                            <Typography component="li" variant="body2">
                                Selector de ejercicios del catálogo
                            </Typography>
                            <Typography component="li" variant="body2">
                                Preview de rutina antes de guardar
                            </Typography>
                            <Typography component="li" variant="body2">
                                Estimación automática de duración
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Plantillas de rutina para reutilizar
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Validaciones inteligentes de secuencia
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}