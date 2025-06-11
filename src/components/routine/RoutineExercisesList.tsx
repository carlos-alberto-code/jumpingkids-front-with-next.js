import {
    Add as AddIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { Exercise } from '../../types/exercise';
import { CreateRoutineForm } from '../../types/routines';

interface RoutineExercisesListProps {
    formData: CreateRoutineForm;
    onRemoveExercise: (exerciseId: number) => void;
    onAddExercises: () => void;
}

export const RoutineExercisesList: React.FC<RoutineExercisesListProps> = ({
    formData,
    onRemoveExercise,
    onAddExercises
}) => {
    const theme = useTheme();

    const renderExerciseCard = (exercise: Exercise) => (
        <Card
            key={exercise.id}
            sx={{
                mb: 1,
                border: `2px solid ${theme.palette.primary.main}`,
                borderColor: theme.palette.primary.main,
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DragIcon sx={{ color: 'action.active', cursor: 'grab' }} />

                    <Box
                        component="img"
                        src={exercise.gifUrl}
                        alt={exercise.title}
                        sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 1,
                            flexShrink: 0
                        }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight="bold" noWrap>
                            {exercise.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {exercise.duration} min • {exercise.calories} cal • {exercise.difficulty}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                            {exercise.categories.slice(0, 2).map((cat, index) => (
                                <Chip
                                    key={index}
                                    label={cat}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.6rem', height: 20 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <IconButton
                        color="error"
                        onClick={() => onRemoveExercise(exercise.id)}
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                        🏃‍♀️ Ejercicios en la Rutina ({formData.exercises.length})
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={onAddExercises}
                        size="small"
                    >
                        Agregar
                    </Button>
                </Box>

                {formData.exercises.length === 0 ? (
                    <Box sx={{
                        textAlign: 'center',
                        py: 4,
                        border: `2px dashed ${theme.palette.grey[300]}`,
                        borderRadius: 2
                    }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            🎯 Agrega ejercicios aquí
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Haz clic en "Agregar" para seleccionar ejercicios
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={1}>
                        {formData.exercises.map((exercise, index) => (
                            <Box key={`${exercise.id}-${index}`}>
                                {renderExerciseCard(exercise)}
                                {index < formData.exercises.length - 1 && (
                                    <Box sx={{ textAlign: 'center', py: 1 }}>
                                        <Divider>
                                            <Chip label={`${formData.restTime}s descanso`} size="small" />
                                        </Divider>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};
