import { ListAlt as RoutinesIcon } from '@mui/icons-material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';


export default function RoutinesPage() {

    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <RoutinesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Catálogo de Rutinas
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Biblioteca de rutinas disponibles
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
                        📚 Explora el catálogo de rutinas
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Navega por las rutinas predefinidas del sistema{isPremiumUser ? ' y tus rutinas personalizadas' : ''}.
                    </Typography>

                    <Box sx={{
                        p: 3,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            📋 Biblioteca de rutinas
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Catálogo completo con filtros y vista previa estará disponible en la siguiente fase
                        </Typography>

                        {isPremiumUser ? (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Rutinas personalizadas, filtros avanzados y gestión completa disponibles
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Versión gratuita: acceso solo a rutinas predefinidas del sistema
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
                            Biblioteca de rutinas (predefinidas{isPremiumUser ? ' + propias' : ''})
                        </Typography>
                        <Typography component="li" variant="body2">
                            Filtros por categoría y dificultad
                        </Typography>
                        <Typography component="li" variant="body2">
                            Vista previa detallada
                        </Typography>
                        <Typography component="li" variant="body2">
                            {isPremiumUser ? 'Gestión de rutinas personales' : 'Solo visualización de rutinas'}
                        </Typography>
                        {isPremiumUser && (
                            <>
                                <Typography component="li" variant="body2" color="secondary.main">
                                    Edición y duplicación de rutinas
                                </Typography>
                                <Typography component="li" variant="body2" color="secondary.main">
                                    Compartir rutinas con otros tutores
                                </Typography>
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}