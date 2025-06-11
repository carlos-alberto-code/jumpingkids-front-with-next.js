import {
    Preview as PreviewIcon,
    RestartAlt as ResetIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography
} from '@mui/material';
import { CreateExerciseForm } from '../../types/exercise';

interface ExerciseSidebarProps {
    formData: CreateExerciseForm;
    loading?: boolean;
    error?: string | null;
    onSave: () => void;
    onPreview: () => void;
    onReset: () => void;
}

export const ExerciseSidebar: React.FC<ExerciseSidebarProps> = ({
    formData,
    loading = false,
    error,
    onSave,
    onPreview,
    onReset
}) => {
    return (
        <Stack spacing={3}>
            {/* Acciones */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        🚀 Acciones
                    </Typography>
                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? 'Guardando...' : 'Guardar Ejercicio'}
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<PreviewIcon />}
                            onClick={onPreview}
                            fullWidth
                        >
                            Vista Previa
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ResetIcon />}
                            onClick={onReset}
                            fullWidth
                        >
                            Limpiar Todo
                        </Button>
                    </Stack>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Resumen */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        📊 Resumen
                    </Typography>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Duración:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {formData.duration} min
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Calorías:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {formData.calories} cal
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Dificultad:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {formData.difficulty}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Categorías:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {formData.categories.length}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Instrucciones:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {formData.instructions.filter(i => i.trim()).length}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            {/* Tips */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        💡 Tips para Crear Ejercicios
                    </Typography>
                    <Stack spacing={1}>
                        <Alert severity="info" sx={{ p: 1 }}>
                            <Typography variant="caption">
                                Usa nombres divertidos que atraigan a los niños
                            </Typography>
                        </Alert>
                        <Alert severity="success" sx={{ p: 1 }}>
                            <Typography variant="caption">
                                Las instrucciones claras mejoran la seguridad
                            </Typography>
                        </Alert>
                        <Alert severity="warning" sx={{ p: 1 }}>
                            <Typography variant="caption">
                                Considera la edad del niño al establecer la dificultad
                            </Typography>
                        </Alert>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
