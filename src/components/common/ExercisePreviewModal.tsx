import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from '@mui/material';
import { CreateExerciseForm } from '../../types/exercise';

interface ExercisePreviewModalProps {
    open: boolean;
    formData: CreateExerciseForm;
    onClose: () => void;
    onSave: () => void;
}

export const ExercisePreviewModal: React.FC<ExercisePreviewModalProps> = ({
    open,
    formData,
    onClose,
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
                Vista Previa del Ejercicio
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {formData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {formData.description}
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                        <Chip label={`${formData.duration} min`} color="primary" />
                        <Chip label={`${formData.calories} cal`} color="secondary" />
                        <Chip label={formData.difficulty} color="default" />
                    </Stack>

                    {formData.gifUrl && (
                        <Box
                            component="img"
                            src={formData.gifUrl}
                            alt={formData.title}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 300,
                                borderRadius: 2,
                                mb: 2
                            }}
                        />
                    )}

                    <Typography variant="h6" gutterBottom>
                        Instrucciones:
                    </Typography>
                    <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
                        {formData.instructions.filter(i => i.trim()).map((instruction, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                {index + 1}. {instruction}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="contained" onClick={onSave}>
                    Guardar Ejercicio
                </Button>
            </DialogActions>
        </Dialog>
    );
};
