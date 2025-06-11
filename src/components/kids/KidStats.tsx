import {
    EmojiEvents as AchievementIcon,
    TrendingUp as ProgressIcon,
    LocalFireDepartment as StreakIcon
} from '@mui/icons-material';
import {
    Grid,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
import { Kid } from '../../types/kids';

interface KidStatsProps {
    kid: Kid;
}

export const KidStats: React.FC<KidStatsProps> = ({ kid }) => {
    return (
        <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid size={4}>
                <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <StreakIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="caption" display="block">
                        Racha
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        {kid.stats.currentStreak}
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={4}>
                <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <AchievementIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography variant="caption" display="block">
                        Total
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        {kid.stats.totalRoutines}
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={4}>
                <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <ProgressIcon sx={{ color: 'info.main', fontSize: 20 }} />
                    <Typography variant="caption" display="block">
                        Horas
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        {Math.floor(kid.stats.totalMinutes / 60)}h
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};
