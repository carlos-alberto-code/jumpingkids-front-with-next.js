import { Assignment as AssignIcon } from '@mui/icons-material';
import { Alert, Box, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';


export default function AssignRoutinePage() {

    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <PermissionGate
            permission="canManageMultipleKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad está disponible solo para tutores.
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
                    <AssignIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Asignar Rutinas
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Calendario de asignación para tus hijos
                        </Typography>
                    </Box>
                    {isPremiumUser && (
                        <Chip
                            label="PREMIUM"
                            color="secondary"
                            size="small"
                            sx={{ ml: 'auto' }}
                        />
                    )}
                </Box>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            📅 Planifica las rutinas de tus hijos
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Selecciona fechas en el calendario y asigna rutinas específicas a cada hijo.
                            Recuerda: solo 1 rutina por día por hijo.
                        </Typography>

                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                🗓️ Calendario de asignación
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Interfaz de calendario y selección de rutinas estará disponible en la siguiente fase
                            </Typography>

                            {isPremiumUser && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="caption" color="secondary.main">
                                        ✨ Programación avanzada y rutinas personalizadas disponibles
                                    </Typography>
                                </Box>
                            )}
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
                                Calendario de asignación por hijo
                            </Typography>
                            <Typography component="li" variant="body2">
                                Catálogo de rutinas disponibles
                            </Typography>
                            <Typography component="li" variant="body2">
                                Validación: 1 rutina por día por hijo
                            </Typography>
                            <Typography component="li" variant="body2">
                                Programación de rutinas futuras
                            </Typography>
                            {isPremiumUser && (
                                <Typography component="li" variant="body2" color="secondary.main">
                                    Asignación masiva y rutinas personalizadas
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}