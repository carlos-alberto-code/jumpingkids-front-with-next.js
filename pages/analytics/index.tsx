import {
    Analytics as AnalyticsIcon,
    TrendingUp as TrendingUpIcon,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon,
    Timeline as TimelineIcon,
    Person as PersonIcon,
    FitnessCenter as ExerciseIcon,
    Timer as TimerIcon,
    CalendarMonth as CalendarIcon,
    EmojiEvents as AchievementIcon,
    Download as DownloadIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
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

// 📊 TIPOS PARA ANALYTICS
interface KidAnalytics {
    id: string;
    name: string;
    avatar: string;
    age: number;
    metrics: {
        consistency: number; // porcentaje
        totalRoutines: number;
        totalMinutes: number;
        averageSessionTime: number;
        longestStreak: number;
        currentStreak: number;
        improvement: number; // porcentaje vs mes anterior
    };
    exerciseDistribution: {
        cardio: number;
        strength: number;
        flexibility: number;
        core: number;
    };
    weeklyProgress: number[]; // 7 días
    monthlyProgress: number[]; // 4 semanas
    favoriteExercises: string[];
    strugglingAreas: string[];
    achievements: number;
}

interface OverallMetrics {
    totalKidsActive: number;
    averageConsistency: number;
    totalRoutinesCompleted: number;
    totalMinutesExercised: number;
    weeklyGrowth: number;
    mostPopularExercise: string;
    bestPerformingKid: string;
}

// 📈 DATOS MOCK PARA ANALYTICS
const MOCK_KIDS_ANALYTICS: KidAnalytics[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        avatar: '👧',
        age: 8,
        metrics: {
            consistency: 84,
            totalRoutines: 45,
            totalMinutes: 1125,
            averageSessionTime: 25,
            longestStreak: 12,
            currentStreak: 5,
            improvement: 15
        },
        exerciseDistribution: {
            cardio: 45,
            strength: 25,
            flexibility: 20,
            core: 10
        },
        weeklyProgress: [1, 1, 0, 1, 1, 1, 0], // L M X J V S D
        monthlyProgress: [85, 78, 92, 84], // 4 semanas
        favoriteExercises: ['Jumping Jacks', 'Lagartijas', 'Sentadillas'],
        strugglingAreas: ['Ejercicios de core', 'Rutinas largas'],
        achievements: 12
    },
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        avatar: '👦',
        age: 6,
        metrics: {
            consistency: 67,
            totalRoutines: 28,
            totalMinutes: 672,
            averageSessionTime: 24,
            longestStreak: 7,
            currentStreak: 2,
            improvement: 8
        },
        exerciseDistribution: {
            cardio: 60,
            strength: 30,
            flexibility: 5,
            core: 5
        },
        weeklyProgress: [0, 1, 1, 0, 1, 0, 1],
        monthlyProgress: [72, 65, 58, 67],
        favoriteExercises: ['Burpees', 'Correr en el lugar', 'Mountain climbers'],
        strugglingAreas: ['Ejercicios de flexibilidad', 'Consistencia diaria'],
        achievements: 8
    },
    {
        id: 'maria-003',
        name: 'María López',
        avatar: '👧',
        age: 10,
        metrics: {
            consistency: 96,
            totalRoutines: 58,
            totalMinutes: 1740,
            averageSessionTime: 30,
            longestStreak: 21,
            currentStreak: 14,
            improvement: 22
        },
        exerciseDistribution: {
            cardio: 30,
            strength: 40,
            flexibility: 20,
            core: 10
        },
        weeklyProgress: [1, 1, 1, 1, 1, 1, 1],
        monthlyProgress: [94, 96, 98, 96],
        favoriteExercises: ['Plancha isométrica', 'Yoga', 'Ejercicios de fuerza'],
        strugglingAreas: [], // ¡Ninguna!
        achievements: 18
    }
];

const MOCK_OVERALL_METRICS: OverallMetrics = {
    totalKidsActive: 3,
    averageConsistency: 82,
    totalRoutinesCompleted: 131,
    totalMinutesExercised: 3537,
    weeklyGrowth: 12,
    mostPopularExercise: 'Jumping Jacks',
    bestPerformingKid: 'María López'
};

export default function AnalyticsPage() {
    const { session } = useAuthContext();
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedKid, setSelectedKid] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<string>('month');

    // Filtrar datos según suscripción
    const kidsData = isPremiumUser ? MOCK_KIDS_ANALYTICS : MOCK_KIDS_ANALYTICS.slice(0, 1);
    const selectedKidData = selectedKid === 'all' ? null : kidsData.find(k => k.id === selectedKid);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleExportData = () => {
        alert('📊 Datos exportados exitosamente (funcionalidad simulada)');
    };

    const renderOverviewCards = () => (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold" color="primary.main">
                            {MOCK_OVERALL_METRICS.totalKidsActive}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            niños activos
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold" color="success.main">
                            {MOCK_OVERALL_METRICS.averageConsistency}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            consistencia promedio
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <ExerciseIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold" color="secondary.main">
                            {MOCK_OVERALL_METRICS.totalRoutinesCompleted}
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
                        <TimerIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold" color="warning.main">
                            {Math.floor(MOCK_OVERALL_METRICS.totalMinutesExercised / 60)}h
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            tiempo total ejercitado
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const renderKidAnalytics = (kid: KidAnalytics) => (
        <Card key={kid.id} sx={{ mb: 3 }}>
            <CardContent>
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
                            color={kid.metrics.consistency >= 80 ? 'success' : 
                                   kid.metrics.consistency >= 60 ? 'warning' : 'error'}
                        />
                        {kid.metrics.improvement > 0 && (
                            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                                +{kid.metrics.improvement}% vs mes anterior
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {/* Métricas principales */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            📊 Métricas Clave
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2">Rutinas completadas</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {kid.metrics.totalRoutines}
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2">Tiempo total</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {Math.floor(kid.metrics.totalMinutes / 60)}h {kid.metrics.totalMinutes % 60}m
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2">Promedio por sesión</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {kid.metrics.averageSessionTime} min
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2">Racha más larga</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {kid.metrics.longestStreak} días
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2">Racha actual</Typography>
                                    <Typography variant="body2" fontWeight="bold" color="success.main">
                                        {kid.metrics.currentStreak} días
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Distribución de ejercicios */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            🎯 Distribución de Ejercicios
                        </Typography>
                        <Grid container spacing={1}>
                            {Object.entries(kid.exerciseDistribution).map(([type, percentage]) => (
                                <Grid size={{ xs: 6 }} key={type}>
                                    <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="bold" color="primary.main">
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

                    {/* Progreso semanal */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            📅 Esta Semana
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                                <Box
                                    key={day}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: kid.weeklyProgress[index] 
                                            ? theme.palette.success.main 
                                            : theme.palette.grey[300],
                                        color: kid.weeklyProgress[index] ? 'white' : theme.palette.grey[600],
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {day}
                                </Box>
                            ))}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Verde = rutina completada
                        </Typography>
                    </Grid>

                    {/* Áreas de mejora */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            🎯 Insights
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Ejercicios favoritos:
                            </Typography>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                {kid.favoriteExercises.map((exercise, index) => (
                                    <Chip 
                                        key={index}
                                        label={exercise}
                                        size="small"
                                        color="success"
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {kid.strugglingAreas.length > 0 ? (
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Áreas de mejora:
                                </Typography>
                                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                    {kid.strugglingAreas.map((area, index) => (
                                        <Chip 
                                            key={index}
                                            label={area}
                                            size="small"
                                            color="warning"
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        ) : (
                            <Alert severity="success" sx={{ p: 1 }}>
                                🎉 ¡Excelente en todas las áreas!
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <PermissionGate
            permission="canAccessAnalytics"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium.
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
                    <AnalyticsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Analytics Avanzados
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Análisis profundo del progreso y tendencias
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
                        <Chip
                            label="PREMIUM"
                            color="secondary"
                            size="small"
                        />
                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={handleExportData}
                            size="small"
                        >
                            Exportar
                        </Button>
                    </Stack>
                </Box>

                {/* Filtros */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FilterIcon color="action" />
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Niño</InputLabel>
                                <Select
                                    value={selectedKid}
                                    label="Niño"
                                    onChange={(e) => setSelectedKid(e.target.value)}
                                >
                                    <MenuItem value="all">Todos los niños</MenuItem>
                                    {kidsData.map((kid) => (
                                        <MenuItem key={kid.id} value={kid.id}>
                                            {kid.avatar} {kid.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Período</InputLabel>
                                <Select
                                    value={timeRange}
                                    label="Período"
                                    onChange={(e) => setTimeRange(e.target.value)}
                                >
                                    <MenuItem value="week">Esta semana</MenuItem>
                                    <MenuItem value="month">Este mes</MenuItem>
                                    <MenuItem value="quarter">Últimos 3 meses</MenuItem>
                                    <MenuItem value="year">Este año</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Overview Cards */}
                {renderOverviewCards()}

                {/* Contenido principal con tabs */}
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab
                                icon={<PersonIcon />}
                                label={`Análisis Individual (${kidsData.length})`}
                                iconPosition="start"
                            />
                            <Tab
                                icon={<BarChartIcon />}
                                label="Comparativas"
                                iconPosition="start"
                            />
                            <Tab
                                icon={<TimelineIcon />}
                                label="Tendencias"
                                iconPosition="start"
                            />
                        </Tabs>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        {/* Tab 1: Análisis Individual */}
                        {currentTab === 0 && (
                            <Box>
                                {selectedKidData ? (
                                    renderKidAnalytics(selectedKidData)
                                ) : (
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            📊 Análisis Detallado por Niño
                                        </Typography>
                                        {kidsData.map(kid => renderKidAnalytics(kid))}
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Tab 2: Comparativas */}
                        {currentTab === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    📈 Comparativas entre Niños
                                </Typography>
                                
                                {kidsData.length > 1 ? (
                                    <Grid container spacing={3}>
                                        {/* Ranking de consistencia */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    🏆 Ranking de Consistencia
                                                </Typography>
                                                <Stack spacing={2}>
                                                    {[...kidsData]
                                                        .sort((a, b) => b.metrics.consistency - a.metrics.consistency)
                                                        .map((kid, index) => (
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
                                        </Grid>

                                        {/* Tiempo total */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    ⏱️ Tiempo Total Ejercitado
                                                </Typography>
                                                <Stack spacing={2}>
                                                    {[...kidsData]
                                                        .sort((a, b) => b.metrics.totalMinutes - a.metrics.totalMinutes)
                                                        .map((kid, index) => (
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
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Alert severity="info">
                                        Las comparativas están disponibles cuando gestiones múltiples niños
                                    </Alert>
                                )}
                            </Box>
                        )}

                        {/* Tab 3: Tendencias */}
                        {currentTab === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    📈 Análisis de Tendencias
                                </Typography>
                                
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                📊 Progreso Mensual Promedio
                                            </Typography>
                                            <Stack spacing={2}>
                                                {['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'].map((week, index) => {
                                                    const avgProgress = kidsData.reduce((sum, kid) => 
                                                        sum + kid.monthlyProgress[index], 0) / kidsData.length;
                                                    return (
                                                        <Box key={week}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                                <Typography variant="body2">{week}</Typography>
                                                                <Typography variant="body2" fontWeight="bold">
                                                                    {Math.round(avgProgress)}%
                                                                </Typography>
                                                            </Box>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={avgProgress}
                                                                sx={{ height: 8, borderRadius: 4 }}
                                                            />
                                                        </Box>
                                                    );
                                                })}
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                🎯 Insights Clave
                                            </Typography>
                                            <Stack spacing={2}>
                                                <Alert severity="success">
                                                    📈 Crecimiento semanal del {MOCK_OVERALL_METRICS.weeklyGrowth}%
                                                </Alert>
                                                <Alert severity="info">
                                                    🏆 {MOCK_OVERALL_METRICS.bestPerformingKid} lidera en consistencia
                                                </Alert>
                                                <Alert severity="warning">
                                                    💪 {MOCK_OVERALL_METRICS.mostPopularExercise} es el ejercicio más popular
                                                </Alert>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </PermissionGate>
    );
}