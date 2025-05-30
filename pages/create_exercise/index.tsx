import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { FitnessCenter as ExerciseIcon, Star as PremiumIcon } from '@mui/icons-material';
import { Box, Container, Typography, Card, CardContent, Chip, Alert } from '@mui/material';


export default function CreateExercisePage() {

    const { user, isPremiumUser } = usePermissionCheck();

    return (
        <PermissionGate
            permission="canCreateCustomExercises"
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
                    <ExerciseIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Crear Ejercicio
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Formulario de creación de ejercicios personalizados
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
                            💪 ¡Diseña ejercicios únicos para tus hijos!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Crea ejercicios personalizados adaptados a las necesidades específicas de cada hijo.
                            Define movimientos, duraciones y niveles de dificultad únicos.
                        </Typography>

                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                📝 Formulario de ejercicios
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Editor completo de ejercicios con upload de media estará disponible en la siguiente fase
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="secondary.main">
                                    ✨ Upload de GIF/imágenes, categorización avanzada y preview en tiempo real
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
                                Formulario completo de ejercicio
                            </Typography>
                            <Typography component="li" variant="body2">
                                Upload de GIF/imagen (mock)
                            </Typography>
                            <Typography component="li" variant="body2">
                                Categorización y metadatos
                            </Typography>
                            <Typography component="li" variant="body2">
                                Validaciones y preview
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Biblioteca personal de ejercicios
                            </Typography>
                            <Typography component="li" variant="body2" color="secondary.main">
                                Duplicar y modificar ejercicios existentes
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}