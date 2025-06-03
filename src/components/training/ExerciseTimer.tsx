// src/components/training/ExerciseTimer.tsx
import {
    Pause as PauseIcon,
    PlayArrow as PlayIcon,
    Stop as StopIcon
} from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, IconButton, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Exercise } from '../../types/exercise';
import { useThemeHelpers } from '../../utils/themeHelpers';
import { useTimer } from '@/hooks/training/useTrainig';

interface ExerciseTimerProps {
    exercise: Exercise;
    autoStart?: boolean;
    onComplete: (timeSpent: number) => void;
    onSkip: () => void;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({
    exercise,
    autoStart = true,
    onComplete,
    onSkip
}) => {
    const theme = useTheme();
    const { getDifficultyStyles } = useThemeHelpers(theme);
    const difficultyStyles = getDifficultyStyles(exercise.difficulty);

    const {
        time,
        isRunning,
        isPaused,
        formattedTime,
        start,
        pause,
        resume,
        stop,
        toggle
    } = useTimer(0, autoStart);

    // Progreso basado en duración estimada
    const estimatedSeconds = exercise.duration * 60;
    const progress = Math.min((time / estimatedSeconds) * 100, 100);

    const handleComplete = () => {
        stop();
        onComplete(time);
    };

    const handleSkip = () => {
        stop();
        onSkip();
    };

    return (
        <Card sx={{
            maxWidth: 600,
            mx: 'auto',
            boxShadow: theme.shadows[4],
            border: `2px solid ${theme.vars?.palette.primary.main || theme.palette.primary.main}`,
        }}>
            <CardContent sx={{ p: 3 }}>
                {/* Header con título y dificultad */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {exercise.title}
                    </Typography>
                    <Chip
                        label={exercise.difficulty}
                        sx={{
                            backgroundColor: difficultyStyles.backgroundColor,
                            color: difficultyStyles.color,
                            fontWeight: 600
                        }}
                    />
                </Box>

                {/* Timer principal */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                        variant="h2"
                        component="div"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            color: theme.vars?.palette.primary.main || theme.palette.primary.main,
                            mb: 1
                        }}
                    >
                        {formattedTime}
                    </Typography>

                    {/* Progreso visual */}
                    <Box sx={{ mb: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: theme.vars?.palette.grey[200] || theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    backgroundColor: time > estimatedSeconds
                                        ? theme.vars?.palette.warning.main || theme.palette.warning.main
                                        : theme.vars?.palette.success.main || theme.palette.success.main
                                }
                            }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            Tiempo estimado: {exercise.duration} min
                            {time > estimatedSeconds && ' (¡Tiempo extra!)'}
                        </Typography>
                    </Box>
                </Box>

                {/* GIF del ejercicio */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                        component="img"
                        src={exercise.gifUrl}
                        alt={exercise.title}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: 200,
                            borderRadius: theme.vars?.shape?.borderRadius || theme.shape.borderRadius,
                            boxShadow: theme.shadows[2]
                        }}
                    />
                </Box>

                {/* Controles */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                    {/* Botón principal play/pause */}
                    <IconButton
                        onClick={toggle}
                        size="large"
                        sx={{
                            bgcolor: theme.vars?.palette.primary.main || theme.palette.primary.main,
                            color: 'white',
                            width: 64,
                            height: 64,
                            '&:hover': {
                                bgcolor: theme.vars?.palette.primary.dark || theme.palette.primary.dark,
                            }
                        }}
                    >
                        {isRunning ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
                    </IconButton>

                    {/* Botón stop */}
                    <IconButton
                        onClick={stop}
                        size="large"
                        disabled={!isRunning && !isPaused}
                        sx={{
                            bgcolor: theme.vars?.palette.grey[300] || theme.palette.grey[300],
                            width: 56,
                            height: 56,
                        }}
                    >
                        <StopIcon />
                    </IconButton>
                </Stack>

                {/* Botones de acción */}
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        onClick={handleSkip}
                        color="secondary"
                    >
                        Saltar ejercicio
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleComplete}
                        color="primary"
                        disabled={time === 0}
                    >
                        ✅ Completado
                    </Button>
                </Stack>

                {/* Información adicional */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        {exercise.description}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExerciseTimer;