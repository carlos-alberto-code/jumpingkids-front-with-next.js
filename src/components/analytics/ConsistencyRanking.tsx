import { Box, Chip, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import type { KidAnalytics } from '../../types/analytics';

interface ConsistencyRankingProps {
    kidsData: KidAnalytics[];
    title?: string;
}

export function ConsistencyRanking({
    kidsData,
    title = "🏆 Ranking de Consistencia"
}: ConsistencyRankingProps) {
    const sortedKids = [...kidsData].sort((a, b) => b.metrics.consistency - a.metrics.consistency);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Stack spacing={2}>
                {sortedKids.map((kid, index) => (
                    <Box key={kid.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                            label={index + 1}
                            size="small"
                            color={index === 0 ? 'warning' : 'default'}
                        />
                        <Typography variant="h6">{kid.avatar}</Typography>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {kid.name}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={kid.metrics.consistency}
                                sx={{ height: 6, borderRadius: 3 }}
                            />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                            {kid.metrics.consistency}%
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}
