import { CalendarMonth, EmojiEvents, Favorite, Timer } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { MetricCard } from '../analytics';

export interface ProgressData {
    thisWeek: {
        completed: number;
        total: number;
        streak: number;
    };
    thisMonth: {
        totalMinutes: number;
        favoriteExercise: string;
    };
}

export interface ProgressStatsProps {
    progressData: ProgressData;
}

export default function ProgressStats({ progressData }: ProgressStatsProps) {
    const { thisWeek, thisMonth } = progressData;
    const weeklyPercentage = Math.round((thisWeek.completed / thisWeek.total) * 100);
    const totalHours = Math.floor(thisMonth.totalMinutes / 60);
    const remainingMinutes = thisMonth.totalMinutes % 60;

    return (
        <Grid container spacing={3}>
            {/* Esta semana */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <MetricCard
                    icon={<CalendarMonth />}
                    title="Esta Semana"
                    value={`${thisWeek.completed}/${thisWeek.total}`}
                    subtitle={`${weeklyPercentage}% completado`}
                    color="primary.main"
                />
            </Grid>

            {/* Racha actual */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <MetricCard
                    icon={<EmojiEvents />}
                    title="Racha Actual"
                    value={thisWeek.streak}
                    subtitle="días seguidos"
                    color="warning.main"
                    trend={{
                        value: thisWeek.streak,
                        label: "¡Sigue así! 🔥",
                        positive: true
                    }}
                />
            </Grid>

            {/* Tiempo total */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <MetricCard
                    icon={<Timer />}
                    title="Tiempo Este Mes"
                    value={`${totalHours}h ${remainingMinutes}m`}
                    subtitle="total ejercitado"
                    color="info.main"
                />
            </Grid>

            {/* Ejercicio favorito */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <MetricCard
                    icon={<Favorite />}
                    title="Favorito"
                    value={thisMonth.favoriteExercise}
                    subtitle="ejercicio del mes"
                    color="error.main"
                />
            </Grid>
        </Grid>
    );
}
