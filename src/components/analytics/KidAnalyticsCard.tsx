import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import type { KidAnalytics } from '../../types/analytics';
import { ExerciseDistribution } from './ExerciseDistribution';
import { InsightsPanel } from './InsightsPanel';
import { KeyMetrics } from './KeyMetrics';
import { WeeklyProgressChart } from './WeeklyProgressChart';

interface KidAnalyticsCardProps {
    kid: KidAnalytics;
    showDetailed?: boolean;
}

export function KidAnalyticsCard({ kid, showDetailed = true }: KidAnalyticsCardProps) {
    const getConsistencyColor = (consistency: number) => {
        if (consistency >= 80) return 'success';
        if (consistency >= 60) return 'warning';
        return 'error';
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                {/* Header del niño */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h3">{kid.avatar}</Typography>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {kid.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {kid.age} años • {kid.achievements} logros
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                        <Chip
                            label={`${kid.metrics.consistency}% consistencia`}
                            color={getConsistencyColor(kid.metrics.consistency)}
                        />
                        {kid.metrics.improvement > 0 && (
                            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                                +{kid.metrics.improvement}% vs mes anterior
                            </Typography>
                        )}
                    </Box>
                </Box>

                {showDetailed && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <KeyMetrics metrics={kid.metrics} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ExerciseDistribution distribution={kid.exerciseDistribution} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <WeeklyProgressChart progress={kid.weeklyProgress} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <InsightsPanel
                                favoriteExercises={kid.favoriteExercises}
                                strugglingAreas={kid.strugglingAreas}
                            />
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
}
