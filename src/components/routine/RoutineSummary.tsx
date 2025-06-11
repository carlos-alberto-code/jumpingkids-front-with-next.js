import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { CreateRoutineForm } from '../../types/routines';

interface RoutineSummaryProps {
    formData: CreateRoutineForm;
    formErrors: Record<string, string>;
    totalCalories: number;
    totalTimeWithRest: number;
}

export const RoutineSummary: React.FC<RoutineSummaryProps> = ({
    formData,
    formErrors,
    totalCalories,
    totalTimeWithRest
}) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📊 Resumen Automático
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="primary.main">
                                {formData.exercises.length}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                ejercicios
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="secondary.main">
                                {formData.totalDuration}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                minutos
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="warning.main">
                                {totalCalories}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                calorías
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="info.main">
                                {Math.round(totalTimeWithRest)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                min con descansos
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Dificultad automática:
                        <Chip
                            label={formData.difficulty}
                            size="small"
                            color="primary"
                            sx={{ ml: 1 }}
                        />
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                        Categorías detectadas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {formData.categories.map((category, index) => (
                            <Chip
                                key={index}
                                label={category}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </Box>

                {formErrors.exercises && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {formErrors.exercises}
                    </Alert>
                )}

                {formErrors.duration && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        {formErrors.duration}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};
