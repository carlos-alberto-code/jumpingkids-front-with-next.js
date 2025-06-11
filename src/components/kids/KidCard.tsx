import {
    EmojiEvents as AchievementIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    TrendingUp as ProgressIcon,
    LocalFireDepartment as StreakIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import type { KidCardProps } from '../../types/kids';
import { DifficultyChip } from '../common';

export default function KidCard({
    kid,
    isPremiumUser,
    onEdit,
    onDelete,
    isOnlyKid = false
}: KidCardProps) {
    const weeklyProgress = Math.round((kid.stats.thisWeekCompleted / kid.stats.thisWeekAssigned) * 100) || 0;
    const totalHours = Math.floor(kid.stats.totalMinutes / 60);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
                {/* Header con avatar y nombre */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, fontSize: '2rem' }}>
                        {kid.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {kid.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {kid.age} años
                        </Typography>
                        <DifficultyChip
                            difficulty={kid.preferences.difficulty}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                {/* Estadísticas de la semana */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        📅 Esta Semana
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Rutinas: {kid.stats.thisWeekCompleted}/{kid.stats.thisWeekAssigned}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {weeklyProgress}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={weeklyProgress}
                        sx={{ height: 6, borderRadius: 3 }}
                    />
                </Box>

                {/* Estadísticas rápidas */}
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
                                {totalHours}h
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Preferencias */}
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        ⚙️ Configuración
                    </Typography>
                    <Stack spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                            Horario preferido: {kid.preferences.preferredTime}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Máx. ejercicios: {kid.preferences.maxDailyExercises}/día
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Categoría favorita: {kid.stats.favoriteCategory}
                        </Typography>
                        {kid.stats.lastActivity && (
                            <Typography variant="caption" color="success.main">
                                Última actividad: {new Date(kid.stats.lastActivity).toLocaleDateString()}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(kid)}
                    size="small"
                    disabled={!isPremiumUser && !isOnlyKid}
                >
                    Editar
                </Button>
                <IconButton
                    onClick={() => onDelete(kid)}
                    color="error"
                    size="small"
                    disabled={!isPremiumUser && isOnlyKid}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export { KidCard };
