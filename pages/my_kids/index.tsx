import { SupervisorAccount as KidsIcon } from '@mui/icons-material';
import { Alert, Box, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

export default function MyKidsPage() {

    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();

    return (
        <PermissionGate
            permission="canManageKids"
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
                    <KidsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Mis Hijos
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Gestión de perfiles y estadísticas
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
                            👶 Gestiona los perfiles de tus hijos
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Aquí puedes crear, editar y supervisar los perfiles de tu{canManageMultipleKids ? 's hijo' : ' hijo'}
                            {canManageMultipleKids ? 's' : ''}.
                        </Typography>

                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                👨‍👩‍👧‍👦 Perfiles de hijos
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {canManageMultipleKids
                                    ? 'Gestión de hasta 3 hijos estará disponible en la siguiente fase'
                                    : 'Gestión de 1 hijo estará disponible en la siguiente fase'
                                }
                            </Typography>

                            {isPremiumUser && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="caption" color="secondary.main">
                                        ✨ Múltiples hijos, estadísticas avanzadas y comparativas disponibles
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
                                Lista de hijos registrados
                            </Typography>
                            <Typography component="li" variant="body2">
                                Crear/editar perfiles de hijos
                            </Typography>
                            <Typography component="li" variant="body2">
                                Estadísticas individuales por hijo
                            </Typography>
                            <Typography component="li" variant="body2">
                                {canManageMultipleKids
                                    ? 'Selector de hijo activo (hasta 3 hijos)'
                                    : 'Perfil único de hijo'
                                }
                            </Typography>
                            {isPremiumUser && (
                                <Typography component="li" variant="body2" color="secondary.main">
                                    Comparativas entre hijos y métricas avanzadas
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}