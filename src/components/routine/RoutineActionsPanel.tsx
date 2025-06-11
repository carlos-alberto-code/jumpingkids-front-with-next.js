import {
    Preview as PreviewIcon,
    Refresh as ResetIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import {
    Alert,
    Button,
    Card,
    CardContent,
    Stack,
    Typography
} from '@mui/material';

interface RoutineActionsPanelProps {
    hasExercises: boolean;
    loading?: boolean;
    onSave: () => void;
    onPreview: () => void;
    onReset: () => void;
}

export const RoutineActionsPanel: React.FC<RoutineActionsPanelProps> = ({
    hasExercises,
    loading = false,
    onSave,
    onPreview,
    onReset
}) => {
    return (
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
                        fullWidth
                        disabled={!hasExercises || loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar Rutina'}
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<PreviewIcon />}
                        onClick={onPreview}
                        fullWidth
                        disabled={!hasExercises}
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

                <Alert severity="info" sx={{ mt: 2 }}>
                    💡 <strong>Tip:</strong> Una buena rutina combina calentamiento, ejercicios principales y enfriamiento
                </Alert>
            </CardContent>
        </Card>
    );
};
