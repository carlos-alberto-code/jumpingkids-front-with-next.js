import {
    EmojiEvents as RewardsIcon,
    Star as StarIcon,
    LocalFireDepartment as FireIcon,
    FitnessCenter as ExerciseIcon,
    Timer as TimerIcon,
    CalendarMonth as CalendarIcon,
    WorkspacePremium as PremiumIcon,
    Lock as LockIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    LinearProgress,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// 🏆 TIPOS PARA LOGROS
interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: 'consistency' | 'exercises' | 'time' | 'special';
    isUnlocked: boolean;
    progress: number;
    maxProgress: number;
    isPremium: boolean;
    unlockedAt?: string;
}

// 🎯 DATOS MOCK DE LOGROS
const MOCK_ACHIEVEMENTS: Achievement[] = [
    // LOGROS BÁSICOS (FREE)
    {
        id: 'first-workout',
        title: '¡Primer Entrenamiento!',
        description: 'Completaste tu primera rutina',
        icon: <ExerciseIcon sx={{ color: '#4CAF50' }} />,
        category: 'exercises',
        isUnlocked: true,
        progress: 1,
        maxProgress: 1,
        isPremium: false,
        unlockedAt: '2024-06-01T10:00:00Z'
    },
    {
        id: 'streak-3',
        title: 'Racha de 3 días',
        description: 'Entrena 3 días seguidos',
        icon: <FireIcon sx={{ color: '#FF5722' }} />,
        category: 'consistency',
        isUnlocked: true,
        progress: 3,
        maxProgress: 3,
        isPremium: false,
        unlockedAt: '2024-06-03T15:30:00Z'
    },
    {
        id: 'streak-7',
        title: 'Racha de 1 semana',
        description: 'Entrena 7 días seguidos',
        icon: <FireIcon sx={{ color: '#FF9800' }} />,
        category: 'consistency',
        isUnlocked: false,
        progress: 3,
        maxProgress: 7,
        isPremium: false
    },
    {
        id: 'time-30min',
        title: '30 Minutos de Ejercicio',
        description: 'Acumula 30 minutos en una sesión',
        icon: <TimerIcon sx={{ color: '#2196F3' }} />,
        category: 'time',
        isUnlocked: true,
        progress: 30,
        maxProgress: 30,
        isPremium: false,
        unlockedAt: '2024-06-02T12:15:00Z'
    },
    {
        id: 'exercises-10',
        title: 'Explorador de Ejercicios',
        description: 'Completa 10 ejercicios diferentes',
        icon: <ExerciseIcon sx={{ color: '#9C27B0' }} />,
        category: 'exercises',
        isUnlocked: false,
        progress: 6,
        maxProgress: 10,
        isPremium: false
    },

    // LOGROS PREMIUM
    {
        id: 'streak-30',
        title: 'Guerrero del Mes',
        description: 'Entrena 30 días seguidos',
        icon: <PremiumIcon sx={{ color: '#FFD700' }} />,
        category: 'consistency',
        isUnlocked: false,
        progress: 3,
        maxProgress: 30,
        isPremium: true
    },
    {
        id: 'perfect-week',
        title: 'Semana Perfecta',
        description: 'Completa todas las rutinas de una semana',
        icon: <StarIcon sx={{ color: '#E91E63' }} />,
        category: 'special',
        isUnlocked: false,
        progress: 5,
        maxProgress: 7,
        isPremium: true
    },
    {
        id: 'time-master',
        title: 'Maestro del Tiempo',
        description: 'Acumula 5 horas de ejercicio total',
        icon: <TimerIcon sx={{ color: '#8BC34A' }} />,
        category: 'time',
        isUnlocked: false,
        progress: 180,
        maxProgress: 300,
        isPremium: true
    },
    {
        id: 'variety-champion',
        title: 'Campeón de Variedad',
        description: 'Completa 25 ejercicios diferentes',
        icon: <ExerciseIcon sx={{ color: '#FF6B6B' }} />,
        category: 'exercises',
        isUnlocked: false,
        progress: 6,
        maxProgress: 25,
        isPremium: true
    },
    {
        id: 'early-bird',
        title: 'Madrugador',
        description: 'Entrena antes de las 8 AM por 5 días',
        icon: <CalendarIcon sx={{ color: '#FFC107' }} />,
        category: 'special',
        isUnlocked: false,
        progress: 2,
        maxProgress: 5,
        isPremium: true
    }
];

const CATEGORY_NAMES = {
    consistency: 'Consistencia',
    exercises: 'Ejercicios',
    time: 'Tiempo',
    special: 'Especiales'
};

const CATEGORY_COLORS = {
    consistency: '#FF5722',
    exercises: '#4CAF50', 
    time: '#2196F3',
    special: '#9C27B0'
};

export default function RewardsPage() {
    const { session } = useAuthContext();
    const { isPremiumUser, isKid } = usePermissionCheck();
    const theme = useTheme();

    // ✅ VERIFICACIÓN: Solo niños pueden acceder
    if (!isKid) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Esta página es solo para niños.
                </Alert>
            </Container>
        );
    }

    // Filtrar logros según suscripción
    const availableAchievements = MOCK_ACHIEVEMENTS.filter(achievement => 
        !achievement.isPremium || isPremiumUser
    );

    const unlockedCount = availableAchievements.filter(a => a.isUnlocked).length;
    const totalCount = availableAchievements.length;
    const completionPercentage = (unlockedCount / totalCount) * 100;

    // Agrupar por categoría
    const achievementsByCategory = Object.keys(CATEGORY_NAMES).map(categoryKey => {
        const category = categoryKey as keyof typeof CATEGORY_NAMES;
        const categoryAchievements = availableAchievements.filter(a => a.category === category);
        return {
            key: category,
            name: CATEGORY_NAMES[category],
            color: CATEGORY_COLORS[category],
            achievements: categoryAchievements
        };
    }).filter(category => category.achievements.length > 0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <RewardsIcon sx={{ fontSize: 40, color: 'warning.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Mis Logros
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ¡Colecciona logros entrenando, {session?.user?.name}! 🏆
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

            {/* Progreso general */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h3" fontWeight="bold" color="warning.main">
                            {unlockedCount}/{totalCount}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Logros Desbloqueados
                        </Typography>
                    </Box>
                    
                    <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            mb: 2,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: theme.palette.warning.main,
                                borderRadius: 6
                            }
                        }}
                    />
                    
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                        ¡Has completado el {Math.round(completionPercentage)}% de todos los logros disponibles!
                    </Typography>

                    {!isPremiumUser && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            💎 Con Premium desbloquearías {MOCK_ACHIEVEMENTS.filter(a => a.isPremium).length} logros adicionales
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Logros por categoría */}
            <Stack spacing={3}>
                {achievementsByCategory.map((category) => (
                    <Card key={category.key}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: category.color
                                    }}
                                />
                                <Typography variant="h6" fontWeight="bold">
                                    {category.name}
                                </Typography>
                                <Chip
                                    label={`${category.achievements.filter(a => a.isUnlocked).length}/${category.achievements.length}`}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>

                            <Grid container spacing={2}>
                                {category.achievements.map((achievement) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={achievement.id}>
                                        <Card
                                            elevation={achievement.isUnlocked ? 3 : 1}
                                            sx={{
                                                position: 'relative',
                                                opacity: achievement.isUnlocked ? 1 : 0.7,
                                                border: achievement.isUnlocked 
                                                    ? `2px solid ${category.color}` 
                                                    : `1px solid ${theme.palette.grey[300]}`,
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {/* Badge premium */}
                                            {achievement.isPremium && (
                                                <Chip
                                                    icon={achievement.isUnlocked || isPremiumUser ? <PremiumIcon /> : <LockIcon />}
                                                    label="PREMIUM"
                                                    size="small"
                                                    color={achievement.isUnlocked || isPremiumUser ? "secondary" : "default"}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        zIndex: 1,
                                                        fontSize: '0.7rem',
                                                        height: 20
                                                    }}
                                                />
                                            )}

                                            <CardContent sx={{ textAlign: 'center', pb: 2 }}>
                                                {/* Ícono del logro */}
                                                <Box sx={{
                                                    fontSize: 48,
                                                    mb: 2,
                                                    opacity: achievement.isUnlocked ? 1 : 0.5,
                                                    filter: achievement.isUnlocked ? 'none' : 'grayscale(100%)'
                                                }}>
                                                    {achievement.icon}
                                                </Box>

                                                {/* Título y descripción */}
                                                <Typography 
                                                    variant="h6" 
                                                    fontWeight="bold" 
                                                    sx={{ 
                                                        fontSize: '1rem',
                                                        mb: 1,
                                                        color: achievement.isUnlocked ? 'text.primary' : 'text.secondary'
                                                    }}
                                                >
                                                    {achievement.title}
                                                </Typography>
                                                
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ mb: 2, minHeight: 40 }}
                                                >
                                                    {achievement.description}
                                                </Typography>

                                                {/* Progreso */}
                                                {!achievement.isUnlocked && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {achievement.progress}/{achievement.maxProgress}
                                                        </Typography>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={(achievement.progress / achievement.maxProgress) * 100}
                                                            sx={{
                                                                height: 6,
                                                                borderRadius: 3,
                                                                mt: 0.5,
                                                                backgroundColor: theme.palette.grey[200],
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: category.color,
                                                                    borderRadius: 3
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                )}

                                                {/* Fecha de desbloqueo */}
                                                {achievement.isUnlocked && achievement.unlockedAt && (
                                                    <Typography variant="caption" color="success.main">
                                                        ✅ Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}