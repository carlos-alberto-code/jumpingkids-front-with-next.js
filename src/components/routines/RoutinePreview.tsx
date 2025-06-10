import {
    Create as CreateIcon,
    FitnessCenter as ExerciseIcon,
    WorkspacePremium as PremiumIcon,
    PlayArrow as PreviewIcon,
    Public as PublicIcon,
    Star as StarIcon,
    Schedule as TimeIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { Routine } from '../../types/routines';
import { DifficultyChip, TimeDisplay } from '../common';

export interface RoutinePreviewProps {
    routine: Routine | null;
    open: boolean;
    isPremiumUser?: boolean;
    onClose: () => void;
    onDuplicate?: (routine: Routine) => void;
    onUseInAssignment?: (routine: Routine) => void;
}

export default function RoutinePreview({
    routine,
    open,
    isPremiumUser = false,
    onClose,
    onDuplicate,
    onUseInAssignment
}: RoutinePreviewProps) {

    if (!routine) return null;

    const handleDuplicate = () => {
        if (onDuplicate) {
            onDuplicate(routine);
        }
    };

    const handleUseInAssignment = () => {
        if (onUseInAssignment) {
            onUseInAssignment(routine);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { maxHeight: '90vh' }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                        {routine.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <DifficultyChip difficulty={routine.difficulty} />
                        {routine.isPublic ? (
                            <Chip icon={<PublicIcon />} label="Sistema" color="info" variant="outlined" />
                        ) : (
                            <Chip icon={<PremiumIcon />} label="Premium" color="secondary" />
                        )}
                    </Stack>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    {/* Descripción */}
                    <Typography variant="body1">
                        {routine.description}
                    </Typography>

                    {/* Métricas principales */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 4 }}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <ExerciseIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h5" fontWeight="bold">
                                    {routine.exercises.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ejercicios
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <TimeIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                                <Typography variant="h5" fontWeight="bold">
                                    {routine.totalDuration}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Minutos
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <StarIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                <Typography variant="h5" fontWeight="bold">
                                    {routine.categories.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Categorías
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Categorías */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            📂 Categorías
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {routine.categories.map((category, index) => (
                                <Chip
                                    key={index}
                                    label={category}
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Lista completa de ejercicios */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            🏃‍♀️ Ejercicios Incluidos
                        </Typography>
                        <Stack spacing={1}>
                            {routine.exercises.map((exercise, index) => (
                                <Paper key={index} sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold">
                                                {index + 1}. {exercise.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {exercise.description}
                                            </Typography>
                                        </Box>
                                        <Stack direction="row" spacing={1}>
                                            <TimeDisplay
                                                duration={exercise.duration}
                                                size="small"
                                                color="secondary"
                                            />
                                            <Chip
                                                label={`${exercise.calories} cal`}
                                                size="small"
                                                color="warning"
                                            />
                                            <DifficultyChip
                                                difficulty={exercise.difficulty}
                                                size="small"
                                                variant="outlined"
                                                showIcon={false}
                                            />
                                        </Stack>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
                {isPremiumUser && !routine.isPublic && (
                    <Button
                        startIcon={<CreateIcon />}
                        variant="outlined"
                        color="secondary"
                        onClick={handleDuplicate}
                    >
                        Duplicar Rutina
                    </Button>
                )}
                <Button
                    startIcon={<PreviewIcon />}
                    variant="contained"
                    color="primary"
                    onClick={handleUseInAssignment}
                >
                    Usar en Asignación
                </Button>
            </DialogActions>
        </Dialog>
    );
}
