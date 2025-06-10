import {
    Create as CreateIcon,
    TrendingUp as DifficultyIcon,
    FitnessCenter as ExerciseIcon,
    WorkspacePremium as PremiumIcon,
    Public as PublicIcon,
    Schedule as TimeIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { Routine } from '../../types/routines';

export interface RoutineCardProps {
    routine: Routine;
    isPremiumUser?: boolean;
    onPreview: (routine: Routine) => void;
    onDuplicate?: (routine: Routine) => void;
}

export default function RoutineCard({
    routine,
    isPremiumUser = false,
    onPreview,
    onDuplicate
}: RoutineCardProps) {

    const handlePreview = () => {
        onPreview(routine);
    };

    const handleDuplicate = () => {
        if (onDuplicate) {
            onDuplicate(routine);
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
                {/* Header con título y badges */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ flex: 1, mr: 1 }}>
                        {routine.title}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        {routine.isPublic ? (
                            <Chip
                                icon={<PublicIcon />}
                                label="Sistema"
                                size="small"
                                color="info"
                                variant="outlined"
                            />
                        ) : (
                            <Chip
                                icon={<PremiumIcon />}
                                label="Premium"
                                size="small"
                                color="secondary"
                            />
                        )}
                    </Stack>
                </Box>

                {/* Descripción */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {routine.description}
                </Typography>

                {/* Métricas */}
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 4 }}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <ExerciseIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                            <Typography variant="caption" display="block">
                                Ejercicios
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {routine.exercises.length}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <TimeIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                            <Typography variant="caption" display="block">
                                Duración
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {routine.totalDuration}m
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <DifficultyIcon sx={{
                                color: routine.difficulty === 'Principiante' ? 'success.main' :
                                    routine.difficulty === 'Intermedio' ? 'warning.main' : 'error.main',
                                fontSize: 20
                            }} />
                            <Typography variant="caption" display="block">
                                Nivel
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {routine.difficulty}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Categorías */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                        Categorías:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {routine.categories.slice(0, 3).map((category, index) => (
                            <Chip
                                key={index}
                                label={category}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                            />
                        ))}
                        {routine.categories.length > 3 && (
                            <Chip
                                label={`+${routine.categories.length - 3}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Ejercicios incluidos (preview) */}
                <Box>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                        Ejercicios incluidos:
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                        {routine.exercises.slice(0, 3).map((exercise, index) => (
                            <Typography key={index} variant="caption" sx={{ pl: 1 }}>
                                • {exercise.title} ({exercise.duration}min)
                            </Typography>
                        ))}
                        {routine.exercises.length > 3 && (
                            <Typography variant="caption" color="primary.main" sx={{ pl: 1 }}>
                                ... y {routine.exercises.length - 3} ejercicios más
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                <Button
                    startIcon={<ViewIcon />}
                    onClick={handlePreview}
                    size="small"
                >
                    Ver Detalles
                </Button>
                {isPremiumUser && !routine.isPublic && (
                    <Button
                        startIcon={<CreateIcon />}
                        onClick={handleDuplicate}
                        size="small"
                        color="secondary"
                    >
                        Duplicar
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
