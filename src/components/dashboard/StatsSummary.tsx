import {
    CalendarMonth,
    EmojiEvents,
    NotificationsActive,
    SupervisorAccount,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { MetricCard } from '../analytics/MetricCard';

export interface DashboardStats {
    totalKids: number;
    averageCompletion: number;
    bestStreak: number;
    pendingTasks: number;
    isPremiumUser: boolean;
}

export interface StatsSummaryProps {
    stats: DashboardStats;
}

export default function StatsSummary({ stats }: StatsSummaryProps) {
    const { totalKids, averageCompletion, bestStreak, pendingTasks, isPremiumUser } = stats;

    const metricsData = [
        {
            title: `hijo${totalKids > 1 ? 's' : ''} supervisado${totalKids > 1 ? 's' : ''}`,
            value: totalKids,
            icon: <SupervisorAccount sx={{ fontSize: 40 }} />,
            color: 'primary.main',
            subtitle: !isPremiumUser && totalKids === 1 ? 'Upgrade para gestionar más' : '',
        },
        {
            title: 'completado esta semana',
            value: `${Math.round(averageCompletion)}%`,
            icon: <CalendarMonth sx={{ fontSize: 40 }} />,
            color: 'success.main',
            subtitle: '',
        },
        {
            title: 'mejor racha activa',
            value: bestStreak,
            icon: <EmojiEvents sx={{ fontSize: 40 }} />,
            color: 'warning.main',
            subtitle: '🔥 ¡Excelente consistencia!',
        },
        {
            title: 'tareas pendientes',
            value: pendingTasks,
            icon: <NotificationsActive sx={{ fontSize: 40 }} />,
            color: 'error.main',
            subtitle: pendingTasks > 0 ? 'Revisa la lista abajo ⬇️' : '',
        },
    ];

    return (
        <Grid container spacing={3}>
            {metricsData.map((metric, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <MetricCard
                        title={metric.title}
                        value={metric.value}
                        icon={metric.icon}
                        color={metric.color}
                        subtitle={metric.subtitle}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
