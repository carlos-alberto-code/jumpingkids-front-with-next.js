import { Box, Container, Typography, Card, CardContent, Chip, Alert } from '@mui/material';
import { Analytics as AnalyticsIcon, Star as PremiumIcon } from '@mui/icons-material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import PermissionGate from '../../src/components/auth/PermissionGate';

export default function AnalyticsPage() {
    
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();

    return (
        <PermissionGate
            permission="canAccessAnalytics"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium.
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
                    <AnalyticsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Analytics
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Métricas avanzadas y análisis detallado
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
                            📊 Dashboard de análisis avanzado
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Obtén insights profundos sobre el progreso de tu{canManageMultipleKids ? 's hijo' : ' hijo'}
                            {canManageMultipleKids ? 's' : ''} con métricas detalladas, tendencias y comparativas.
                        </Typography>

                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                📈 Dashboard de métricas
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Gráficos avanzados, reportes y exportación estarán disponibles en la siguiente fase
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Gráficos interactivos, tendencias predictivas y reportes personalizados
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
                                Dashboard con gráficos avanzados (recharts)
                            </Typography>
                            <Typography component="li" variant="body2">
                                Tendencias de progreso por hijo
                            </Typography>
                            {canManageMultipleKids && (
                                <Typography component="li" variant="body2">
                                    Comparativas entre hijos
                                </Typography>
                            )}
                            <Typography component="li" variant="body2">
                                Exportación de reportes (PDF mock)
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Métricas de consistencia y mejora
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Insights automáticos y recomendaciones
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}