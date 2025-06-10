import { TrendingUp as TrendingIcon } from '@mui/icons-material';
import {
    Alert,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Stack
} from '@mui/material';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// Importar componentes refactorizados
import { PageHeader } from '../../src/components/analytics';
import {
    AchievementsList,
    generateProgressCalendar,
    getMonthNames,
    ProgressCalendar,
    ProgressStats,
    RecentRoutinesList,
    type Achievement,
    type ProgressData,
    type RecentRoutine
} from '../../src/components/progress';

// 📊 DATOS MOCK PARA PROGRESS
const MOCK_PROGRESS_DATA: ProgressData = {
    thisWeek: {
        completed: 5,
        total: 7,
        streak: 3
    },
    thisMonth: {
        totalMinutes: 450,
        favoriteExercise: 'Jumping Jacks'
    }
};

const MOCK_RECENT_ROUTINES: RecentRoutine[] = [
    { date: '2024-06-02', name: 'Rutina Matutina Energética', completed: true, duration: 25 },
    { date: '2024-06-01', name: 'Cardio Rápido', completed: true, duration: 15 },
    { date: '2024-05-31', name: 'Fuerza y Equilibrio', completed: true, duration: 30 },
    { date: '2024-05-30', name: 'Relajación y Estiramiento', completed: false, duration: 0 },
    { date: '2024-05-29', name: 'Rutina Matutina Energética', completed: true, duration: 28 }
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        label: 'Total de rutinas completadas',
        value: 45,
        color: 'primary'
    },
    {
        label: 'Racha más larga',
        value: '12 días',
        color: 'warning'
    },
    {
        label: 'Tiempo total ejercitándose',
        value: '20h 0m',
        color: 'success'
    }
];

export default function ProgressPage() {
    const { session } = useAuthContext();
    const { isPremiumUser, isKid } = usePermissionCheck();

    // Solo niños pueden acceder a esta página
    if (!isKid) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Esta página está disponible solo para niños.
                </Alert>
            </Container>
        );
    }

    // Datos para componentes
    const calendarDays = generateProgressCalendar();
    const monthNames = getMonthNames();
    const currentMonth = monthNames[new Date().getMonth()];
    const recentRoutines = isPremiumUser ? MOCK_RECENT_ROUTINES : MOCK_RECENT_ROUTINES.slice(0, 3);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header reutilizable */}
            <PageHeader
                title="Mi Progreso"
                subtitle={`¡Mira qué tan bien lo estás haciendo, ${session?.user?.name}! 📊`}
                icon={<TrendingIcon />}
                actions={
                    isPremiumUser ? (
                        <Chip
                            label="PREMIUM"
                            color="secondary"
                            size="small"
                        />
                    ) : undefined
                }
            />

            {/* Estadísticas principales usando componente refactorizado */}
            <ProgressStats progressData={MOCK_PROGRESS_DATA} />

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* Calendario de actividad */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <ProgressCalendar
                                calendarDays={calendarDays}
                                monthName={currentMonth}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Historial reciente y estadísticas */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={3}>
                        {/* Historial reciente */}
                        <Card>
                            <CardContent>
                                <RecentRoutinesList
                                    routines={recentRoutines}
                                    maxItems={isPremiumUser ? 5 : 3}
                                    isPremiumUser={isPremiumUser}
                                />
                            </CardContent>
                        </Card>

                        {/* Estadísticas adicionales */}
                        <Card>
                            <CardContent>
                                <AchievementsList
                                    achievements={MOCK_ACHIEVEMENTS}
                                    isPremiumUser={isPremiumUser}
                                />
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}