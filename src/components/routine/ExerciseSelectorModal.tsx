import {
    Add as AddIcon,
    FilterList as FilterIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { DIFFICULTY_OPTIONS } from '../../constants/exercise';
import { Exercise } from '../../types/exercise';

interface ExerciseFilter {
    search: string;
    category: string;
    difficulty: string;
}

interface ExerciseSelectorModalProps {
    open: boolean;
    onClose: () => void;
    exercises: Exercise[];
    exerciseFilter: ExerciseFilter;
    onFilterChange: (filter: Partial<ExerciseFilter>) => void;
    onAddExercise: (exercise: Exercise) => void;
}

export const ExerciseSelectorModal: React.FC<ExerciseSelectorModalProps> = ({
    open,
    onClose,
    exercises,
    exerciseFilter,
    onFilterChange,
    onAddExercise
}) => {
    const theme = useTheme();

    const renderExerciseCard = (exercise: Exercise) => (
        <Card
            key={exercise.id}
            sx={{
                mb: 1,
                border: '1px solid',
                borderColor: theme.palette.divider,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover
                }
            }}
            onClick={() => onAddExercise(exercise)}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src={exercise.gifUrl}
                        alt={exercise.title}
                        sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 1,
                            flexShrink: 0
                        }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight="bold" noWrap>
                            {exercise.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {exercise.duration} min • {exercise.calories} cal • {exercise.difficulty}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                            {exercise.categories.slice(0, 2).map((cat, index) => (
                                <Chip
                                    key={index}
                                    label={cat}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.6rem', height: 20 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <IconButton color="primary" size="small">
                        <AddIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FilterIcon />
                    Seleccionar Ejercicios
                </Box>
            </DialogTitle>
            <DialogContent>
                {/* Filtros */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <TextField
                        placeholder="Buscar ejercicios..."
                        value={exerciseFilter.search}
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{ flex: 1 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={exerciseFilter.category}
                            label="Categoría"
                            onChange={(e) => onFilterChange({ category: e.target.value })}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="Cardio">Cardio</MenuItem>
                            <MenuItem value="Fuerza">Fuerza</MenuItem>
                            <MenuItem value="Flexibilidad">Flexibilidad</MenuItem>
                            <MenuItem value="Core">Core</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Dificultad</InputLabel>
                        <Select
                            value={exerciseFilter.difficulty}
                            label="Dificultad"
                            onChange={(e) => onFilterChange({ difficulty: e.target.value })}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            {DIFFICULTY_OPTIONS.map(diff => (
                                <MenuItem key={diff} value={diff}>{diff}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Lista de ejercicios */}
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {exercises.map(exercise => renderExerciseCard(exercise))}
                </Box>

                {exercises.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        No se encontraron ejercicios con los filtros aplicados
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
