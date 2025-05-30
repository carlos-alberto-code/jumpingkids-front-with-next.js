import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';


export default function AssignmentsPage() {
    
    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <CalendarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Asignaciones
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Calendario de rutinas programadas
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
                        📅 Tu calendario de entrenamientos
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Aquí verás todas las rutinas que tu tutor ha programado para ti.
                    </Typography>

                    <Box sx={{
                        p: 3,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            📋 Calendario de rutinas
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Vista de calendario interactivo estará disponible en la siguiente fase
                        </Typography>

                        {isPremiumUser && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Vista de calendario avanzada y detalles ampliados para usuarios Premium
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
                            Calendario interactivo con rutinas
                        </Typography>
                        <Typography component="li" variant="body2">
                            Vista semanal/mensual
                        </Typography>
                        <Typography component="li" variant="body2">
                            Estados: Programada/Completada/Perdida
                        </Typography>
                        <Typography component="li" variant="body2">
                            Detalles de rutina en modal
                        </Typography>
                        <Typography component="li" variant="body2">
                            Navegación entre fechas fluida
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}