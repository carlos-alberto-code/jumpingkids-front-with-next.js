import { TrendingUp as TrendingIcon } from '@mui/icons-material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';


export default function ProgressPage() {
    
    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <TrendingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Mi Progreso
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Estadísticas personales y tendencias
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
                        📊 Tu evolución en el tiempo
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Aquí podrás ver tu progreso, estadísticas y evolución a lo largo del tiempo.
                    </Typography>

                    <Box sx={{
                        p: 3,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            📈 Dashboard de progreso
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Gráficos y métricas personales estarán disponibles en la siguiente fase
                        </Typography>

                        {isPremiumUser ? (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Gráficos avanzados, tendencias detalladas y exportación de datos disponibles
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Versión gratuita: estadísticas básicas y calendario simple
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
                            Dashboard de progreso personal
                        </Typography>
                        <Typography component="li" variant="body2">
                            Calendario con días activos
                        </Typography>
                        <Typography component="li" variant="body2">
                            {isPremiumUser ? 'Gráficos avanzados de progreso' : 'Gráficos básicos de progreso'}
                        </Typography>
                        <Typography component="li" variant="body2">
                            Historial de rutinas completadas
                        </Typography>
                        <Typography component="li" variant="body2">
                            Tiempos por ejercicio y tendencias
                        </Typography>
                        {isPremiumUser && (
                            <Typography component="li" variant="body2" color="secondary.main">
                                Métricas de consistencia y exportación de datos
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}