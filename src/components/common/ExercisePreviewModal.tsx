import {
    Box,
    Button,
    Chip,
    CircularProgress,
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
    loading?: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const ExercisePreviewModal: React.FC<ExercisePreviewModalProps> = ({
    open,
    formData,
    loading = false,
    onClose,
    onSave
}) => {
    const handleSave = async () => {
        await onSave();
        // El modal se cerrará desde el componente padre después del éxito
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { maxHeight: '90vh' }
            }}
        >
            <DialogTitle>
                Vista Previa del Ejercicio
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {formData.title || 'Sin título'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {formData.description || 'Sin descripción'}
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                        <Chip label={`${formData.duration} min`} color="primary" />
                        <Chip label={`${formData.calories} cal`} color="secondary" />
                        <Chip label={formData.difficulty} color="default" />
                    </Stack>

                    {formData.categories && formData.categories.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Categorías:
                            </Typography>
                            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                                {formData.categories.map((category, index) => (
                                    <Chip
                                        key={index}
                                        label={category}
                                        size="small"
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {formData.gifUrl && (
                        <Box
                            component="img"
                            src={formData.gifUrl}
                            alt={formData.title}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 300,
                                borderRadius: 2,
                                mb: 2,
                                boxShadow: 2
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    )}

                    <Typography variant="h6" gutterBottom>
                        Instrucciones:
                    </Typography>
                    <Box sx={{ textAlign: 'left', maxWidth: 500, mx: 'auto' }}>
                        {formData.instructions.filter(i => i.trim()).map((instruction, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                <strong>{index + 1}.</strong> {instruction}
                            </Typography>
                        ))}
                    </Box>

                    {formData.equipment && formData.equipment.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Equipo necesario:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formData.equipment.join(', ')}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cerrar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : null}
                >
                    {loading ? 'Guardando...' : 'Guardar Ejercicio'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
