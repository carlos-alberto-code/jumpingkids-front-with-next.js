import {
    Schedule as ActiveIcon,
    EmojiEvents as ChallengeIcon,
    CheckCircle as CompletedIcon,
    FitnessCenter as ExerciseIcon,
    History as HistoryIcon,
    TrendingUp as ProgressIcon,
    Star as StarIcon,
    Timer as TimerIcon
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
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// 🎯 TIPOS PARA DESAFÍOS
interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'weekly' | 'daily' | 'special';
    difficulty: 'easy' | 'medium' | 'hard';
    icon: React.ReactNode;
    progress: number;
    target: number;
    unit: string;
    reward: {
        type: 'points' | 'badge' | 'achievement';
        value: string;
    };
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    isActive: boolean;
}

// 📊 DATOS MOCK DE DESAFÍOS
const MOCK_ACTIVE_CHALLENGES: Challenge[] = [
    {
        id: 'weekly-streak',
        title: 'Racha Semanal',
        description: 'Entrena todos los días de esta semana',
        type: 'weekly',
        difficulty: 'medium',
        icon: <TimerIcon sx={{ color: '#FF9800' }} />,
        progress: 4,
        target: 7,
        unit: 'días',
        reward: { type: 'points', value: '500 puntos' },
        startDate: '2024-06-03',
        endDate: '2024-06-09',
        isCompleted: false,
        isActive: true
    },
    {
        id: 'daily-cardio',
        title: 'Maestro del Cardio',
        description: 'Completa 3 ejercicios de cardio hoy',
        type: 'daily',
        difficulty: 'easy',
        icon: <ExerciseIcon sx={{ color: '#4CAF50' }} />,
        progress: 1,
        target: 3,
        unit: 'ejercicios',
        reward: { type: 'points', value: '150 puntos' },
        startDate: '2024-06-05',
        endDate: '2024-06-05',
        isCompleted: false,
        isActive: true
    },
    {
        id: 'time-champion',
        title: 'Campeón del Tiempo',
        description: 'Ejercítate por 45 minutos esta semana',
        type: 'weekly',
        difficulty: 'hard',
        icon: <ProgressIcon sx={{ color: '#E91E63' }} />,
        progress: 28,
        target: 45,
        unit: 'minutos',
        reward: { type: 'badge', value: 'Medalla de Resistencia' },
        startDate: '2024-06-03',
        endDate: '2024-06-09',
        isCompleted: false,
        isActive: true
    }
];

const MOCK_COMPLETED_CHALLENGES: Challenge[] = [
    {
        id: 'first-week',
        title: 'Primera Semana',
        description: 'Completa tu primera semana de entrenamientos',
        type: 'weekly',
        difficulty: 'easy',
        icon: <StarIcon sx={{ color: '#FFD700' }} />,
        progress: 5,
        target: 5,
        unit: 'días',
        reward: { type: 'achievement', value: 'Logro: Primer Guerrero' },
        startDate: '2024-05-27',
        endDate: '2024-06-02',
        isCompleted: true,
        isActive: false
    },
    {
        id: 'variety-explorer',
        title: 'Explorador de Variedad',
        description: 'Prueba 5 ejercicios diferentes',
        type: 'special',
        difficulty: 'medium',
        icon: <ExerciseIcon sx={{ color: '#9C27B0' }} />,
        progress: 5,
        target: 5,
        unit: 'ejercicios',
        reward: { type: 'points', value: '300 puntos' },
        startDate: '2024-05-20',
        endDate: '2024-06-02',
        isCompleted: true,
        isActive: false
    }
];

const DIFFICULTY_COLORS = {
    easy: '#4CAF50',
    medium: '#FF9800',
    hard: '#F44336'
};

const TYPE_LABELS = {
    daily: 'Diario',
    weekly: 'Semanal',
    special: 'Especial'
};

export default function ChallengesPage() {
    const { session } = useAuthContext();
    const { isPremiumUser, isKid } = usePermissionCheck();
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);

    // ✅ VERIFICACIÓN: Solo niños premium pueden acceder
    if (!isKid) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Esta página es solo para niños.
                </Alert>
            </Container>
        );
    }

    const activeCount = MOCK_ACTIVE_CHALLENGES.length;
    const completedCount = MOCK_COMPLETED_CHALLENGES.length;
    const totalPoints = 950; // Mock de puntos acumulados

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderChallengeCard = (challenge: Challenge) => (
        <Card
            key={challenge.id}
            sx={{
                position: 'relative',
                border: challenge.isCompleted
                    ? `2px solid ${theme.palette.success.main}`
                    : `1px solid ${theme.palette.divider}`,
                opacity: challenge.isCompleted ? 0.9 : 1
            }}
        >
            {/* Badges de tipo y dificultad */}
            <Box sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                gap: 1,
                zIndex: 1
            }}>
                <Chip
                    label={TYPE_LABELS[challenge.type]}
                    size="small"
                    variant="outlined"
                />
                <Chip
                    label={challenge.difficulty}
                    size="small"
                    sx={{
                        backgroundColor: DIFFICULTY_COLORS[challenge.difficulty],
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                />
            </Box>

            <CardContent sx={{ pt: 6 }}>
                {/* Ícono y título */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ fontSize: 40 }}>
                        {challenge.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {challenge.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {challenge.description}
                        </Typography>
                    </Box>
                    {challenge.isCompleted && (
                        <CompletedIcon sx={{ color: theme.palette.success.main, fontSize: 32 }} />
                    )}
                </Box>

                {/* Progreso */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Progreso
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {challenge.progress}/{challenge.target} {challenge.unit}
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(challenge.progress / challenge.target) * 100}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: challenge.isCompleted
                                    ? theme.palette.success.main
                                    : theme.palette.primary.main,
                                borderRadius: 4
                            }
                        }}
                    />
                </Box>

                {/* Recompensa */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: challenge.isCompleted
                        ? theme.palette.success.light + '20'
                        : theme.palette.primary.light + '20'
                }}>
                    <Typography variant="caption" color="text.secondary">
                        Recompensa:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                        {challenge.reward.value}
                    </Typography>
                </Box>

                {/* Fechas */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    {challenge.type === 'daily'
                        ? `Hoy: ${new Date(challenge.startDate).toLocaleDateString()}`
                        : `${new Date(challenge.startDate).toLocaleDateString()} - ${new Date(challenge.endDate).toLocaleDateString()}`
                    }
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <PermissionGate
            permission="canAccessChallenges"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Los desafíos están disponibles solo para suscriptores Premium.
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
                    <ChallengeIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Desafíos Semanales
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            ¡Acepta desafíos y gana recompensas, {session?.user?.name}! 🏆
                        </Typography>
                    </Box>
                    <Chip
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                {/* Estadísticas rápidas */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <ActiveIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                    {activeCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Desafíos activos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <CompletedIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="success.main">
                                    {completedCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Desafíos completados
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StarIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                <Typography variant="h4" fontWeight="bold" color="warning.main">
                                    {totalPoints}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Puntos ganados
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Tabs para desafíos activos vs completados */}
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab
                                icon={<ActiveIcon />}
                                label={`Activos (${activeCount})`}
                                iconPosition="start"
                            />
                            <Tab
                                icon={<HistoryIcon />}
                                label={`Completados (${completedCount})`}
                                iconPosition="start"
                            />
                        </Tabs>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        {/* Tab panel - Desafíos Activos */}
                        {currentTab === 0 && (
                            <Box>
                                {MOCK_ACTIVE_CHALLENGES.length > 0 ? (
                                    <Grid container spacing={3}>
                                        {MOCK_ACTIVE_CHALLENGES.map((challenge) => (
                                            <Grid size={{ xs: 12, md: 6 }} key={challenge.id}>
                                                {renderChallengeCard(challenge)}
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 6 }}>
                                        <ActiveIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary">
                                            No tienes desafíos activos
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ¡Nuevos desafíos se actualizan cada semana!
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Tab panel - Desafíos Completados */}
                        {currentTab === 1 && (
                            <Box>
                                {MOCK_COMPLETED_CHALLENGES.length > 0 ? (
                                    <Grid container spacing={3}>
                                        {MOCK_COMPLETED_CHALLENGES.map((challenge) => (
                                            <Grid size={{ xs: 12, md: 6 }} key={challenge.id}>
                                                {renderChallengeCard(challenge)}
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 6 }}>
                                        <HistoryIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary">
                                            Aún no has completado desafíos
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ¡Completa tus primeros desafíos para verlos aquí!
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Card>

                {/* Información adicional */}
                <Alert severity="info" sx={{ mt: 3 }}>
                    💡 <strong>¿Cómo funcionan los desafíos?</strong> Cada semana recibes nuevos desafíos personalizados.
                    Completa tus rutinas diarias para avanzar automáticamente. ¡Las recompensas se agregan a tu perfil!
                </Alert>
            </Container>
        </PermissionGate>
    );
}