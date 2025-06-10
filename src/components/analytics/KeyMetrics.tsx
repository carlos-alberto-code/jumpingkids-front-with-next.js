import { Box, Stack, Typography } from '@mui/material';
import type { KidAnalytics } from '../../types/analytics';

interface KeyMetricsProps {
    metrics: KidAnalytics['metrics'];
    title?: string;
}

export function KeyMetrics({
    metrics,
    title = "📊 Métricas Clave"
}: KeyMetricsProps) {
    const metricsData = [
        {
            label: 'Rutinas completadas',
            value: metrics.totalRoutines.toString()
        },
        {
            label: 'Tiempo total',
            value: `${Math.floor(metrics.totalMinutes / 60)}h ${metrics.totalMinutes % 60}m`
        },
        {
            label: 'Promedio por sesión',
            value: `${metrics.averageSessionTime} min`
        },
        {
            label: 'Racha más larga',
            value: `${metrics.longestStreak} días`
        },
        {
            label: 'Racha actual',
            value: `${metrics.currentStreak} días`,
            special: true
        }
    ];

    return (
        <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Stack spacing={2}>
                {metricsData.map((metric, index) => (
                    <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2">
                                {metric.label}
                            </Typography>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={metric.special ? 'success.main' : 'inherit'}
                            >
                                {metric.value}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </div>
    );
}
