// src/components/training/RoutineProgress.tsx
import {
    CheckCircle as CheckIcon,
    FitnessCenter as ExerciseIcon,
    RadioButtonUnchecked as PendingIcon,
    SkipNext as SkipIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    LinearProgress,
    Stack,
    Step,
    StepContent,
    StepIcon,
    StepLabel,
    Stepper,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import { Exercise } from '../exercise';
import { useTimer } from '@/hooks/training/useTrainig';
import { TrainingSession } from '@/types/routines';

interface RoutineProgressProps {
    session: TrainingSession;
}

const RoutineProgress: React.FC<RoutineProgressProps> = ({ session }) => {
    const theme = useTheme();
    const { routine, currentExerciseIndex, exerciseResults } = session;

    // Calcular progreso general
    const totalExercises = routine.exercises.length;
    const completedExercises = exerciseResults.length;
    const progressPercentage = (completedExercises / totalExercises) * 100;

    // Función para obtener el estado de un ejercicio
    const getExerciseStatus = (index: number): 'completed' | 'skipped' | 'current' | 'pending' => {
        const result = exerciseResults.find(r =>
            r.exerciseId === routine.exercises[index].id
        );

        if (result) {
            return result.skipped ? 'skipped' : 'completed';
        }

        if (index === currentExerciseIndex) {
            return 'current';
        }

        return 'pending';
    };

    // Función para obtener el ícono según el estado
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckIcon sx={{ color: theme.vars?.palette.success.main || theme.palette.success.main }} />;
            case 'skipped':
                return <SkipIcon sx={{ color: theme.vars?.palette.warning.main || theme.palette.warning.main }} />;
            case 'current':
                return <ExerciseIcon sx={{ color: theme.vars?.palette.primary.main || theme.palette.primary.main }} />;
            default:
                return <PendingIcon sx={{ color: theme.vars?.palette.grey[400] || theme.palette.grey[400] }} />;
        }
    };

    // Formatear tiempo
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                {/* Header con progreso general */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {routine.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Progreso: {completedExercises} de {totalExercises} ejercicios
                        </Typography>
                        <Chip
                            label={`${Math.round(progressPercentage)}%`}
                            size="small"
                            color="primary"
                        />
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={progressPercentage}
                        sx={{ height: 8, borderRadius: 4 }}
                    />
                </Box>

                {/* Lista de ejercicios */}
                <Stepper orientation="vertical" activeStep={currentExerciseIndex}>
                    {routine.exercises.map((exercise, index) => {
                        const status = getExerciseStatus(index);
                        const result = exerciseResults.find(r => r.exerciseId === exercise.id);

                        return (
                            <Step key={exercise.id} completed={status === 'completed' || status === 'skipped'}>
                                <StepLabel
                                    StepIconComponent={() => getStatusIcon(status)}
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            fontWeight: status === 'current' ? 600 : 400,
                                            color: status === 'current'
                                                ? theme.vars?.palette.primary.main || theme.palette.primary.main
                                                : 'inherit'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body1">
                                            {exercise.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            ({exercise.duration} min)
                                        </Typography>
                                    </Box>
                                </StepLabel>

                                {status !== 'pending' && (
                                    <StepContent>
                                        <Box sx={{ pb: 1 }}>
                                            {result && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {result.skipped
                                                        ? '⏭️ Saltado'
                                                        : `✅ Completado en ${formatTime(result.timeSpent)}`
                                                    }
                                                </Typography>
                                            )}
                                        </Box>
                                    </StepContent>
                                )}
                            </Step>
                        );
                    })}
                </Stepper>
            </CardContent>
        </Card>
    );
};

export default RoutineProgress;