import { Alert, Box, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import type { KidAnalytics, OverallMetrics } from '../../types/analytics';

interface MonthlyTrendsProps {
    kidsData: KidAnalytics[];
    overallMetrics: OverallMetrics;
}

export function MonthlyTrends({ kidsData, overallMetrics }: MonthlyTrendsProps) {
    const weeklyLabels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

    const avgProgressByWeek = weeklyLabels.map((_, index) => {
        const avgProgress = kidsData.reduce((sum, kid) =>
            sum + kid.monthlyProgress[index], 0) / kidsData.length;
        return Math.round(avgProgress);
    });

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                📈 Análisis de Tendencias
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            📊 Progreso Mensual Promedio
                        </Typography>
                        <Stack spacing={2}>
                            {weeklyLabels.map((week, index) => {
                                const avgProgress = avgProgressByWeek[index];
                                return (
                                    <Box key={week}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2">{week}</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {avgProgress}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={avgProgress}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            🎯 Insights Clave
                        </Typography>
                        <Stack spacing={2}>
                            <Alert severity="success">
                                📈 Crecimiento semanal del {overallMetrics.weeklyGrowth}%
                            </Alert>
                            <Alert severity="info">
                                🏆 {overallMetrics.bestPerformingKid} lidera en consistencia
                            </Alert>
                            <Alert severity="warning">
                                💪 {overallMetrics.mostPopularExercise} es el ejercicio más popular
                            </Alert>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    🎯 Insights Clave
                </Typography>
                <Stack spacing={2}>
                    <Alert severity="success">
                        📈 Crecimiento semanal del {overallMetrics.weeklyGrowth}%
                    </Alert>
                    <Alert severity="info">
                        🏆 {overallMetrics.bestPerformingKid} lidera en consistencia
                    </Alert>
                    <Alert severity="warning">
                        💪 {overallMetrics.mostPopularExercise} es el ejercicio más popular
                    </Alert>
                </Stack>
            </Paper>
        </Box>
    );
}
