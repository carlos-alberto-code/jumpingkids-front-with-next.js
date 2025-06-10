import { Grid, Paper, Typography } from '@mui/material';

interface ExerciseDistributionProps {
    distribution: Record<string, number>;
    title?: string;
}

const exerciseTypeMap: Record<string, string> = {
    cardio: 'Cardio',
    strength: 'Fuerza',
    flexibility: 'Flexibilidad',
    core: 'Core'
};

export function ExerciseDistribution({
    distribution,
    title = "🎯 Distribución de Ejercicios"
}: ExerciseDistributionProps) {
    return (
        <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={1}>
                {Object.entries(distribution).map(([type, percentage]) => (
                    <Grid size={{ xs: 6 }} key={type}>
                        <Paper
                            sx={{
                                p: 1.5,
                                textAlign: 'center',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                }
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {percentage}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {exerciseTypeMap[type] || type.charAt(0).toUpperCase() + type.slice(1)}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
