import { DirectionsRun as RunIcon } from '@mui/icons-material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';


export default function TrainingPage() {

    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <RunIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Entrenamiento
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Tu rutina del día
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
                        👋 ¡Hola {user?.name}!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Aquí verás tu rutina diaria asignada por tu tutor.
                    </Typography>

                    <Box sx={{
                        p: 3,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            🏃‍♀️ Rutina del día
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Esta funcionalidad estará disponible en la siguiente fase
                        </Typography>

                        {isPremiumUser && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Cronómetro avanzado y animaciones disponibles para usuarios Premium
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
                            Ver rutina asignada para hoy
                        </Typography>
                        <Typography component="li" variant="body2">
                            Playlist de ejercicios secuencial
                        </Typography>
                        <Typography component="li" variant="body2">
                            Cronómetro automático por ejercicio
                        </Typography>
                        <Typography component="li" variant="body2">
                            Registro de tiempos en API
                        </Typography>
                        <Typography component="li" variant="body2">
                            Celebración al completar rutina
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}