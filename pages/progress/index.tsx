import { TrendingUp as TrendingIcon, CalendarMonth, EmojiEvents, Timer, Favorite } from '@mui/icons-material';
import { 
    Alert, 
    Box, 
    Card, 
    CardContent, 
    Chip, 
    Container, 
    Typography,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Divider
} from '@mui/material';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { useAuthContext } from '../../src/context/auth/AuthContext';

// Mock data para estadísticas
const MOCK_PROGRESS_DATA = {
    thisWeek: {
        completed: 5,
        total: 7,
        streak: 3
    },
    thisMonth: {
        completed: 18,
        total: 30,
        totalMinutes: 450,
        favoriteExercise: 'Jumping Jacks'
    },
    allTime: {
        totalRoutines: 45,
        totalMinutes: 1200,
        longestStreak: 12,
        startDate: '2024-01-15'
    },
    recentRoutines: [
        { date: '2024-06-02', name: 'Rutina Matutina Energética', completed: true, duration: 25 },
        { date: '2024-06-01', name: 'Cardio Rápido', completed: true, duration: 15 },
        { date: '2024-05-31', name: 'Fuerza y Equilibrio', completed: true, duration: 30 },
        { date: '2024-05-30', name: 'Relajación y Estiramiento', completed: false, duration: 0 },
        { date: '2024-05-29', name: 'Rutina Matutina Energética', completed: true, duration: 28 }
    ]
};

// Generar calendario simple con días activos
const generateProgressCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 35; i++) {
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasActivity = isCurrentMonth && Math.random() > 0.6; // Simulación
        
        days.push({
            date: new Date(currentDate),
            dayNumber: currentDate.getDate(),
            isCurrentMonth,
            isToday,
            hasActivity
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
};

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

    const calendarDays = generateProgressCalendar();
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <TrendingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Mi Progreso
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ¡Mira qué tan bien lo estás haciendo, {session?.user?.name}! 📊
                    </Typography>
                </Box>
                {isPremiumUser && (
                    <Chip
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                    />
                )}
            </Box>

            {/* Estadísticas principales */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Esta semana */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CalendarMonth sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h4" fontWeight="bold" color="primary.main">
                                {MOCK_PROGRESS_DATA.thisWeek.completed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                de {MOCK_PROGRESS_DATA.thisWeek.total} esta semana
                            </Typography>
                            <LinearProgress 
                                variant="determinate" 
                                value={(MOCK_PROGRESS_DATA.thisWeek.completed / MOCK_PROGRESS_DATA.thisWeek.total) * 100}
                                sx={{ mt: 2, height: 6, borderRadius: 3 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Racha actual */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                            <Typography variant="h4" fontWeight="bold" color="warning.main">
                                {MOCK_PROGRESS_DATA.thisWeek.streak}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                días seguidos
                            </Typography>
                            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
                                ¡Sigue así! 🔥
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tiempo total */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Timer sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                            <Typography variant="h4" fontWeight="bold" color="info.main">
                                {Math.floor(MOCK_PROGRESS_DATA.thisMonth.totalMinutes / 60)}h
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {MOCK_PROGRESS_DATA.thisMonth.totalMinutes % 60}m este mes
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                ¡Increíble dedicación!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Ejercicio favorito */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Favorite sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                            <Typography variant="h6" fontWeight="bold" color="error.main" noWrap>
                                {MOCK_PROGRESS_DATA.thisMonth.favoriteExercise}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                tu favorito este mes
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                💪 ¡Te encanta!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Calendario de actividad */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                📅 Calendario de Actividad - {monthNames[new Date().getMonth()]}
                            </Typography>
                            
                            {/* Días de la semana */}
                            <Grid container sx={{ mb: 1 }}>
                                {dayNames.map((day, index) => (
                                    <Grid size={{ xs: 12/7 }} key={index}>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                display: 'block',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                color: 'text.secondary',
                                                py: 1
                                            }}
                                        >
                                            {day}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Días del calendario */}
                            <Grid container>
                                {calendarDays.map((day, index) => (
                                    <Grid size={{ xs: 12/7 }} key={index}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                height: 40,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: day.isCurrentMonth ? 1 : 0.3,
                                                backgroundColor: 
                                                    day.isToday ? 'primary.light' :
                                                    day.hasActivity ? 'success.light' : 
                                                    'transparent',
                                                border: day.isToday ? '2px solid' : '1px solid',
                                                borderColor: 
                                                    day.isToday ? 'primary.main' :
                                                    day.hasActivity ? 'success.main' :
                                                    'transparent',
                                                borderRadius: 1,
                                                m: 0.25
                                            }}
                                        >
                                            <Typography 
                                                variant="caption"
                                                sx={{
                                                    fontWeight: day.isToday ? 'bold' : 'normal',
                                                    color: 
                                                        day.isToday ? 'primary.main' :
                                                        day.hasActivity ? 'success.main' :
                                                        'inherit'
                                                }}
                                            >
                                                {day.dayNumber}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box sx={{ mt: 2, display: 'flex', gap: 3, justifyContent: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        backgroundColor: 'success.light',
                                        border: '1px solid',
                                        borderColor: 'success.main',
                                        borderRadius: 0.5
                                    }} />
                                    <Typography variant="caption">Rutina completada</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        backgroundColor: 'primary.light',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: 0.5
                                    }} />
                                    <Typography variant="caption">Hoy</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Historial reciente y estadísticas */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={3}>
                        {/* Historial reciente */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    📋 Rutinas Recientes
                                </Typography>
                                <Stack spacing={1.5}>
                                    {MOCK_PROGRESS_DATA.recentRoutines.slice(0, isPremiumUser ? 5 : 3).map((routine, index) => (
                                        <Box key={index}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="bold" noWrap>
                                                        {routine.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(routine.date).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                                <Chip 
                                                    label={routine.completed ? `${routine.duration}m` : 'Perdida'}
                                                    size="small"
                                                    color={routine.completed ? 'success' : 'error'}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            {index < MOCK_PROGRESS_DATA.recentRoutines.length - 1 && (
                                                <Divider sx={{ mt: 1.5 }} />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                                
                                {!isPremiumUser && (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        Con Premium verías historial completo
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>

                        {/* Estadísticas adicionales */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    🏆 Mis Logros
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total de rutinas completadas
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" color="primary.main">
                                            {MOCK_PROGRESS_DATA.allTime.totalRoutines}
                                        </Typography>
                                    </Box>
                                    
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Racha más larga
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" color="warning.main">
                                            {MOCK_PROGRESS_DATA.allTime.longestStreak} días
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Tiempo total ejercitándose
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" color="success.main">
                                            {Math.floor(MOCK_PROGRESS_DATA.allTime.totalMinutes / 60)}h {MOCK_PROGRESS_DATA.allTime.totalMinutes % 60}m
                                        </Typography>
                                    </Box>

                                    {isPremiumUser && (
                                        <Alert severity="success" sx={{ mt: 2 }}>
                                            ✨ Estadísticas detalladas disponibles
                                        </Alert>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}