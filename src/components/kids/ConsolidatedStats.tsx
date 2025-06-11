import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import React from 'react';
import { Kid } from '../../types/kids';

interface ConsolidatedStatsProps {
    kids: Kid[];
    isPremiumUser: boolean;
}

export const ConsolidatedStats: React.FC<ConsolidatedStatsProps> = ({
    kids,
    isPremiumUser,
}) => {
    if (kids.length <= 1 || !isPremiumUser) {
        return null;
    }

    const totalCompletedThisWeek = kids.reduce((sum, kid) => sum + kid.stats.thisWeekCompleted, 0);
    const bestCurrentStreak = Math.max(...kids.map(kid => kid.stats.currentStreak));
    const totalHours = Math.floor(kids.reduce((sum, kid) => sum + kid.stats.totalMinutes, 0) / 60);

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    📊 Resumen Consolidado (Premium)
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="primary.main">
                                {totalCompletedThisWeek}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rutinas completadas esta semana
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="success.main">
                                {bestCurrentStreak}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mejor racha actual
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" color="info.main">
                                {totalHours}h
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tiempo total ejercitado
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
