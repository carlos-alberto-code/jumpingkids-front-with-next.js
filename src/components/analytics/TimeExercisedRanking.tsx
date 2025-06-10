import { Box, Paper, Stack, Typography } from '@mui/material';
import type { KidAnalytics } from '../../types/analytics';

interface TimeExercisedRankingProps {
    kidsData: KidAnalytics[];
    title?: string;
}

export function TimeExercisedRanking({
    kidsData,
    title = "⏱️ Tiempo Total Ejercitado"
}: TimeExercisedRankingProps) {
    const sortedKids = [...kidsData].sort((a, b) => b.metrics.totalMinutes - a.metrics.totalMinutes);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Stack spacing={2}>
                {sortedKids.map((kid) => (
                    <Box key={kid.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6">{kid.avatar}</Typography>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {kid.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {Math.floor(kid.metrics.totalMinutes / 60)}h {kid.metrics.totalMinutes % 60}m
                            </Typography>
                        </Box>
                        <Typography variant="h6" color="primary.main">
                            {kid.metrics.totalRoutines}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}
