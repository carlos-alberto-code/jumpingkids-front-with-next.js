import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { CreateRoutineForm } from '../../types/routines';

interface RoutinePreviewModalProps {
    open: boolean;
    onClose: () => void;
    formData: CreateRoutineForm;
    totalCalories: number;
    onSave: () => void;
}

export const RoutinePreviewModal: React.FC<RoutinePreviewModalProps> = ({
    open,
    onClose,
    formData,
    totalCalories,
    onSave
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                Vista Previa de la Rutina
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {formData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {formData.description}
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                        <Chip label={`${formData.exercises.length} ejercicios`} color="primary" />
                        <Chip label={`${formData.totalDuration} min`} color="secondary" />
                        <Chip label={`${totalCalories} cal`} color="warning" />
                        <Chip label={formData.difficulty} color="default" />
                    </Stack>
                </Box>

                <Typography variant="h6" gutterBottom>
                    Secuencia de Ejercicios:
                </Typography>

                <Stack spacing={2}>
                    {formData.exercises.map((exercise, index) => (
                        <Box key={`preview-${exercise.id}-${index}`}>
                            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h6" color="primary.main" sx={{ minWidth: 30 }}>
                                    {index + 1}.
                                </Typography>
                                <Box
                                    component="img"
                                    src={exercise.gifUrl}
                                    alt={exercise.title}
                                    sx={{ width: 50, height: 50, borderRadius: 1 }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {exercise.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {exercise.duration} min • {exercise.calories} cal
                                    </Typography>
                                </Box>
                            </Paper>

                            {index < formData.exercises.length - 1 && (
                                <Box sx={{ textAlign: 'center', py: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        ⏱️ Descanso: {formData.restTime} segundos
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="contained" onClick={onSave}>
                    Guardar Rutina
                </Button>
            </DialogActions>
        </Dialog>
    );
};
