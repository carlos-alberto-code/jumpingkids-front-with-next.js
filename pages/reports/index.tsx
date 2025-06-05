import {
    Assessment as ReportsIcon,
    GetApp as ExportIcon,
    TrendingUp as TrendingUpIcon,
    Person as PersonIcon,
    CalendarMonth as CalendarIcon,
    FitnessCenter as ExerciseIcon,
    Timer as TimerIcon,
    EmojiEvents as AchievementIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// 📊 TIPOS PARA REPORTES
interface KidReport {
    id: string;
    name: string;
    avatar: string;
    age: number;
    thisWeek: {
        completed: number;
        assigned: number;
        totalMinutes: number;
        averageSession: number;
        streak: number;
    };
    thisMonth: {
        completed: number;
        assigned: number;
        totalMinutes: number;
        consistency: number; // porcentaje
        favoriteExercise: string;
        improvements: string[];
    };
    exerciseStats: {
        cardio: number;
        strength: number;
        flexibility: number;
        core: number;
    };
}

interface ExercisePopularity {
    name: string;
    completions: number;
    averageTime: number;
    difficulty: string;
}

// 📈 DATOS MOCK PARA REPORTES
const MOCK_KIDS_REPORTS: KidReport[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        avatar: '👧',
        age: 8,
        thisWeek: {
            completed: 5,
            assigned: 6,
            totalMinutes: 127,
            averageSession: 25,
            streak: 5
        },
        thisMonth: {
            completed: 18,
            assigned: 22,
            totalMinutes: 450,
            consistency: 82,
            favoriteExercise: 'Jumping Jacks',
            improvements: ['Mejor adherencia', 'Mayor duración promedio', 'Más ejercicios de fuerza']
        },
        exerciseStats: {
            cardio: 45,
            strength: 25,
            flexibility: 20,
            core: 10
        }
    },
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        avatar: '👦',
        age: 6,
        thisWeek: {
            completed: 3,
            assigned: 4,
            totalMinutes: 78,
            averageSession: 26,
            streak: 2
        },
        thisMonth: {
            completed: 12,
            assigned: 18,
            totalMinutes: 312,
            consistency: 67,
            favoriteExercise: 'Burpees',
            improvements: ['Rutinas más consistentes', 'Ejercicios de mayor intensidad']
        },
        exerciseStats: {
            cardio: 60,
            strength: 30,
            flexibility: 5,
            core: 5
        }
    },
    {
        id: 'maria-003',
        name: 'María López',
        avatar: '👧',
        age: 10,
        thisWeek: {
            completed: 6,
            assigned: 6,
            totalMinutes: 180,
            averageSession: 30,
            streak: 7
        },
        thisMonth: {
            completed: 25,
            assigned: 26,
            totalMinutes: 750,
            consistency: 96,
            favoriteExercise: 'Plancha Isométrica',
            improvements: ['Perfecta adherencia', 'Sesiones más largas', 'Ejercicios avanzados']
        },
        exerciseStats: {
            cardio: 30,
            strength: 40,
            flexibility: 15,
            core: 15
        }
    }
];

const MOCK_EXERCISE_POPULARITY: ExercisePopularity[] = [
    { name: 'Jumping Jacks', completions: 28, averageTime: 12, difficulty: 'Intermedio' },
    { name: 'Lagartijas Clásicas', completions: 22, averageTime: 10, difficulty: 'Principiante' },
    { name: 'Sentadillas', completions: 20, averageTime: 15, difficulty: 'Principiante' },
    { name: 'Plancha Isométrica', completions: 18, averageTime: 8, difficulty: 'Intermedio' },
    { name: 'Burpees', completions: 15, averageTime: 20, difficulty: 'Avanzado' },
    { name: 'Estiramiento de Gato', completions: 25, averageTime: 5, difficulty: 'Principiante' }
];

export default function ReportsPage() {
    const { session } = useAuthContext();
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);

    // Filtrar datos según suscripción
    const kidsData = isPremiumUser ? MOCK_KIDS_REPORTS : MOCK_KIDS_REPORTS.slice(0, 1);
    const totalKids = kidsData.length;

    // Estadísticas consolidadas
    const consolidatedStats = {
        totalCompleted: kidsData.reduce((sum, kid) => sum + kid.thisMonth.completed, 0),
        totalAssigned: kidsData.reduce((sum, kid) => sum + kid.thisMonth.assigned, 0),
        totalMinutes: kidsData.reduce((sum, kid) => sum + kid.thisMonth.totalMinutes, 0),
        averageConsistency: kidsData.reduce((sum, kid) => sum + kid.thisMonth.consistency, 0) / totalKids,
        bestStreak: Math.max(...kidsData.map(kid => kid.thisWeek.streak)),
        mostActiveKid: kidsData.reduce((best, kid) => 
            kid.thisMonth.completed > best.thisMonth.completed ? kid : best
        )
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleExportReport = () => {
        // Mock de exportación
        alert('📄 Reporte exportado exitosamente (funcionalidad simulada)');
    };

    const renderKidCard = (kid: KidReport) => (
        <Card key={kid.id} sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h3">{kid.avatar}</Typography>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {kid.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {kid.age} años
                        </Typography>
                    </Box>
                    <Chip 
                        label={`${kid.thisMonth.consistency}% adherencia`}
                        color={kid.thisMonth.consistency >= 80 ? 'success' : 
                               kid.thisMonth.consistency >= 60 ? 'warning' : 'error'}
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Estadísticas semanales */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            📅 Esta Semana
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Rutinas completadas: {kid.thisWeek.completed}/{kid.thisWeek.assigned}
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={(kid.thisWeek.completed / kid.thisWeek.assigned) * 100}
                                    sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">
                                    Tiempo total: <strong>{kid.thisWeek.totalMinutes} min</strong>
                                </Typography>
                                <Typography variant="body2">
                                    Racha: <strong>{kid.thisWeek.streak} días</strong>
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Estadísticas mensuales */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            📈 Este Mes
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2">
                                Ejercicio favorito: <strong>{kid.thisMonth.favoriteExercise}</strong>
                            </Typography>
                            <Typography variant="body2">
                                Total ejercitado: <strong>{Math.floor(kid.thisMonth.totalMinutes / 60)}h {kid.thisMonth.totalMinutes % 60}m</strong>
                            </Typography>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Mejoras observadas:
                                </Typography>
                                {kid.thisMonth.improvements.map((improvement, index) => (
                                    <Chip 
                                        key={index}
                                        label={improvement}
                                        size="small"
                                        variant="outlined"
                                        color="success"
                                        sx={{ ml: 0.5, mt: 0.5 }}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Distribución de ejercicios (solo premium) */}
                    {isPremiumUser && (
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                🎯 Distribución de Ejercicios
                            </Typography>
                            <Grid container spacing={2}>
                                {Object.entries(kid.exerciseStats).map(([type, percentage]) => (
                                    <Grid size={{ xs: 6, sm: 3 }} key={type}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h5" fontWeight="bold" color="primary.main">
                                                {percentage}%
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <PermissionGate
            permission="canManageKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad está disponible solo para tutores.
                    </Alert>
                </Container>
            }
        >
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 4
                }}>
                    <ReportsIcon sx={{ fontSize: 40, color: 'info.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Reportes de Progreso
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Análisis detallado del rendimiento de tu{totalKids > 1 ? 's' : ''} hijo{totalKids > 1 ? 's' : ''}
                        </Typography>
                    </Box>
                    {isPremiumUser && (
                        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
                            <Chip
                                label="PREMIUM"
                                color="secondary"
                                size="small"
                            />
                            <Button
                                variant="outlined"
                                startIcon={<ExportIcon />}
                                onClick={handleExportReport}
                                size="small"
                            >
                                Exportar PDF
                            </Button>
                        </Stack>
                    )}
                </Box>

                {/* Estadísticas consolidadas */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                    {totalKids}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    hijo{totalKids > 1 ? 's' : ''} supervisado{totalKids > 1 ? 's' : ''}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <ExerciseIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="success.main">
                                    {consolidatedStats.totalCompleted}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    rutinas completadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <TimerIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="info.main">
                                    {Math.floor(consolidatedStats.totalMinutes / 60)}h
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    tiempo total ejercitado
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="warning.main">
                                    {Math.round(consolidatedStats.averageConsistency)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    adherencia promedio
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Contenido principal con tabs */}
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab
                                icon={<PersonIcon />}
                                label={`Por Hijo (${totalKids})`}
                                iconPosition="start"
                            />
                            <Tab
                                icon={<ExerciseIcon />}
                                label="Ejercicios Populares"
                                iconPosition="start"
                            />
                            {isPremiumUser && (
                                <Tab
                                    icon={<TrendingUpIcon />}
                                    label="Comparativas"
                                    iconPosition="start"
                                />
                            )}
                        </Tabs>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        {/* Tab 1: Reportes por hijo */}
                        {currentTab === 0 && (
                            <Box>
                                {kidsData.map(kid => renderKidCard(kid))}
                                
                                {!isPremiumUser && (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        💎 Con Premium podrías ver reportes de hasta 3 hijos con análisis detallados y comparativas
                                    </Alert>
                                )}
                            </Box>
                        )}

                        {/* Tab 2: Ejercicios populares */}
                        {currentTab === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    📊 Ejercicios Más Realizados
                                </Typography>
                                <Grid container spacing={2}>
                                    {MOCK_EXERCISE_POPULARITY.slice(0, isPremiumUser ? 6 : 3).map((exercise, index) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={exercise.name}>
                                            <Paper sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {exercise.name}
                                                    </Typography>
                                                    <Chip 
                                                        label={`#${index + 1}`}
                                                        size="small"
                                                        color="primary"
                                                    />
                                                </Box>
                                                <Stack spacing={1}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Completado {exercise.completions} veces
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Duración promedio: {exercise.averageTime} min
                                                    </Typography>
                                                    <Chip 
                                                        label={exercise.difficulty}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                                {!isPremiumUser && (
                                    <Alert severity="info" sx={{ mt: 3 }}>
                                        Con Premium verías estadísticas completas de todos los ejercicios
                                    </Alert>
                                )}
                            </Box>
                        )}

                        {/* Tab 3: Comparativas (solo premium) */}
                        {currentTab === 2 && isPremiumUser && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    📈 Comparativa entre Hijos
                                </Typography>
                                
                                {totalKids > 1 ? (
                                    <Box>
                                        {/* Destacado del más activo */}
                                        <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.light', border: `2px solid ${theme.palette.success.main}` }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <AchievementIcon sx={{ fontSize: 40, color: 'success.main' }} />
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        🏆 Hijo Más Activo del Mes
                                                    </Typography>
                                                    <Typography variant="h5" color="success.main">
                                                        {consolidatedStats.mostActiveKid.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {consolidatedStats.mostActiveKid.thisMonth.completed} rutinas completadas
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>

                                        {/* Tabla comparativa */}
                                        <Grid container spacing={2}>
                                            {kidsData.map((kid, index) => (
                                                <Grid size={{ xs: 12, md: 4 }} key={kid.id}>
                                                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                                                        <Typography variant="h3" sx={{ mb: 1 }}>
                                                            {kid.avatar}
                                                        </Typography>
                                                        <Typography variant="h6" fontWeight="bold">
                                                            {kid.name}
                                                        </Typography>
                                                        <Divider sx={{ my: 2 }} />
                                                        <Stack spacing={1}>
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Adherencia
                                                                </Typography>
                                                                <Typography variant="h6" color="primary.main">
                                                                    {kid.thisMonth.consistency}%
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Tiempo total
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {Math.floor(kid.thisMonth.totalMinutes / 60)}h {kid.thisMonth.totalMinutes % 60}m
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Racha actual
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {kid.thisWeek.streak} días
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                ) : (
                                    <Alert severity="info">
                                        Las comparativas están disponibles cuando gestiones múltiples hijos
                                    </Alert>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}