// Reemplazar el contenido completo de pages/training/index.tsx

import {
    Celebration as CelebrationIcon,
    DirectionsRun as RunIcon,
    RestaurantMenu as RestIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import ExerciseTimer from '../../src/components/training/ExerciseTimer';
import RoutineProgress from '../../src/components/training/RoutineProgress';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { useTraining } from '@/hooks/training/useTrainig';

export default function TrainingPage() {
    const { session } = useAuthContext();
    const { isPremiumUser } = usePermissionCheck();
    
    const {
        todayRoutine,
        currentSession,
        loading,
        error,
        hasRoutineToday,
        isTraining,
        currentExercise,
        progress,
        startTraining,
        completeExercise,
        completeRoutine,
        cancelTraining,
        clearError
    } = useTraining(session?.user?.id || '');

    const [showCelebration, setShowCelebration] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    // Handlers
    const handleStartTraining = async () => {
        if (!todayRoutine) return;
        
        try {
            await startTraining(todayRoutine.id);
        } catch (error) {
            console.error('Error iniciando entrenamiento:', error);
        }
    };

    const handleCompleteExercise = async (timeSpent: number) => {
        if (!currentExercise) return;

        try {
            const updatedSession = await completeExercise(currentExercise.id, timeSpent);
            
            // Si completamos todos los ejercicios, mostrar celebración
            if (updatedSession.isCompleted) {
                setShowCelebration(true);
            }
        } catch (error) {
            console.error('Error completando ejercicio:', error);
        }
    };

    const handleSkipExercise = async () => {
        if (!currentExercise) return;

        try {
            const updatedSession = await completeExercise(currentExercise.id, 0, true);
            
            if (updatedSession.isCompleted) {
                setShowCelebration(true);
            }
        } catch (error) {
            console.error('Error saltando ejercicio:', error);
        }
    };

    const handleFinishRoutine = async () => {
        try {
            await completeRoutine();
            setShowCelebration(false);
        } catch (error) {
            console.error('Error finalizando rutina:', error);
        }
    };

    const handleCancelTraining = () => {
        setShowCancelDialog(false);
        cancelTraining();
    };

    // Renderizado del estado de carga
    if (loading && !todayRoutine && !currentSession) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography>Cargando tu rutina del día...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <RunIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Mi Entrenamiento
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ¡Hora de ejercitarse, {session?.user?.name}! 💪
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

            {/* Error handling */}
            {error && (
                <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
                    onClose={clearError}
                >
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Panel izquierdo - Progreso (solo si hay sesión activa) */}
                {currentSession && (
                    <Grid size={{ xs: 12, md: 4 }}>
                        <RoutineProgress session={currentSession} />
                        
                        {/* Controles adicionales */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Controles
                                </Typography>
                                <Stack spacing={2}>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => setShowCancelDialog(true)}
                                        fullWidth
                                    >
                                        Pausar entrenamiento
                                    </Button>
                                    
                                    {isPremiumUser && (
                                        <Typography variant="caption" color="secondary.main">
                                            ✨ Estadísticas detalladas disponibles al finalizar
                                        </Typography>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* Panel principal */}
                <Grid size={{ xs: 12, md: currentSession ? 8 : 12 }}>
                    {/* No hay rutina para hoy */}
                    {!hasRoutineToday && !isTraining && (
                        <Card sx={{ textAlign: 'center', py: 6 }}>
                            <CardContent>
                                <RestIcon sx={{ 
                                    fontSize: 80, 
                                    color: 'primary.main',
                                    mb: 2 
                                }} />
                                <Typography variant="h5" gutterBottom>
                                    ¡Hoy descansas! 🎉
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    No tienes rutina asignada para hoy. ¡Disfruta tu día libre!
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tu tutor puede asignarte una rutina para mañana.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* Rutina disponible pero no iniciada */}
                    {hasRoutineToday && !isTraining && (
                        <Card>
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    ¡Tu rutina de hoy está lista! 💪
                                </Typography>
                                
                                <Box sx={{ my: 3 }}>
                                    <Typography variant="h6" color="primary.main">
                                        {todayRoutine?.routine.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {todayRoutine?.routine.description}
                                    </Typography>
                                    
                                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                                        <Chip 
                                            label={`${todayRoutine?.routine.exercises.length} ejercicios`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <Chip 
                                            label={`~${todayRoutine?.routine.totalDuration} min`}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                        <Chip 
                                            label={todayRoutine?.routine.difficulty}
                                            color="default"
                                            variant="outlined"
                                        />
                                    </Stack>
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleStartTraining}
                                    disabled={loading}
                                    sx={{ minWidth: 200, py: 1.5 }}
                                >
                                    {loading ? 'Iniciando...' : '🚀 Comenzar Entrenamiento'}
                                </Button>

                                {isPremiumUser && (
                                    <Typography variant="caption" color="secondary.main" sx={{ display: 'block', mt: 2 }}>
                                        ✨ Cronómetro avanzado y seguimiento detallado activados
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Entrenamiento en curso */}
                    {isTraining && currentExercise && (
                        <Box>
                            {/* Progreso compacto en móvil */}
                            {currentSession && (
                                <Card sx={{ mb: 3, display: { xs: 'block', md: 'none' } }}>
                                    <CardContent sx={{ py: 2 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Ejercicio {progress?.current} de {progress?.total}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6">
                                                    {currentSession.routine.title}
                                                </Typography>
                                            </Box>
                                            <Chip 
                                                label={`${progress?.percentage}%`}
                                                size="small"
                                                color="primary"
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Timer del ejercicio actual */}
                            <ExerciseTimer
                                exercise={currentExercise}
                                autoStart={true}
                                onComplete={handleCompleteExercise}
                                onSkip={handleSkipExercise}
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>

            {/* Dialog de cancelación */}
            <Dialog
                open={showCancelDialog}
                onClose={() => setShowCancelDialog(false)}
            >
                <DialogTitle>¿Pausar entrenamiento?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Tu progreso se guardará y podrás continuar más tarde.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCancelDialog(false)}>
                        Continuar
                    </Button>
                    <Button onClick={handleCancelTraining} color="warning" variant="contained">
                        Pausar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de celebración */}
            <Dialog
                open={showCelebration}
                onClose={() => setShowCelebration(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                    <CelebrationIcon sx={{ 
                        fontSize: 80, 
                        color: 'success.main',
                        mb: 2 
                    }} />
                    <Typography variant="h4" gutterBottom>
                        ¡Felicidades! 🎉
                    </Typography>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                        ¡Completaste tu rutina de hoy!
                    </Typography>
                    
                    {currentSession && (
                        <Box sx={{ my: 3 }}>
                            <Typography variant="body1" paragraph>
                                <strong>{currentSession.routine.title}</strong>
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Chip 
                                    label={`${currentSession.exerciseResults.length} ejercicios`}
                                    color="success"
                                />
                                <Chip 
                                    label={`${Math.floor(currentSession.exerciseResults.reduce((total, result) => total + result.timeSpent, 0) / 60)} min`}
                                    color="primary"
                                />
                            </Stack>
                        </Box>
                    )}
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                        ¡Excelente trabajo! Has completado todos los ejercicios.
                        Tu progreso ha sido guardado automáticamente.
                    </Typography>

                    {isPremiumUser && (
                        <Typography variant="body2" color="secondary.main" sx={{ mb: 2 }}>
                            ✨ Tus estadísticas detalladas han sido registradas
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFinishRoutine}
                        size="large"
                        sx={{ minWidth: 150 }}
                    >
                        ✅ Finalizar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}