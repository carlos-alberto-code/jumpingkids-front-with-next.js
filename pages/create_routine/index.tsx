import {
    Add as AddIcon,
    Star as PremiumIcon,
    Save as SaveIcon,
    Preview as PreviewIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    RestartAlt as ResetIcon,
    PlaylistAdd as PlaylistAddIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { MOCK_EXERCISES } from '../../src/constants/exerciseMocks';
import { Exercise } from '../../src/types/exercise';
import { DIFFICULTY_OPTIONS } from '../../src/constants/exercise';

// 🏃‍♀️ TIPOS PARA CREAR RUTINA
interface CreateRoutineForm {
    title: string;
    description: string;
    exercises: Exercise[];
    totalDuration: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    categories: string[];
    isPublic: boolean;
    targetAge: string;
    restTime: number; // segundos entre ejercicios
}

interface ExerciseFilter {
    search: string;
    category: string;
    difficulty: string;
}

export default function CreateRoutinePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const theme = useTheme();
    const [showPreview, setShowPreview] = useState(false);
    const [showExerciseSelector, setShowExerciseSelector] = useState(false);
    
    const [formData, setFormData] = useState<CreateRoutineForm>({
        title: '',
        description: '',
        exercises: [],
        totalDuration: 0,
        difficulty: 'Principiante',
        categories: [],
        isPublic: false,
        targetAge: 'kids',
        restTime: 30
    });

    const [exerciseFilter, setExerciseFilter] = useState<ExerciseFilter>({
        search: '',
        category: '',
        difficulty: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Filtrar ejercicios disponibles
    const filteredExercises = MOCK_EXERCISES.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(exerciseFilter.search.toLowerCase()) ||
                            exercise.description.toLowerCase().includes(exerciseFilter.search.toLowerCase());
        const matchesCategory = !exerciseFilter.category || exercise.categories.includes(exerciseFilter.category);
        const matchesDifficulty = !exerciseFilter.difficulty || exercise.difficulty === exerciseFilter.difficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Calcular duración total y categorías automáticamente
    const updateCalculatedFields = (exercises: Exercise[]) => {
        const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const allCategories = [...new Set(exercises.flatMap(ex => ex.categories))];
        
        // Determinar dificultad automática basada en ejercicios
        const difficulties = exercises.map(ex => ex.difficulty);
        let autoDifficulty: 'Principiante' | 'Intermedio' | 'Avanzado' = 'Principiante';
        
        if (difficulties.includes('Avanzado')) {
            autoDifficulty = 'Avanzado';
        } else if (difficulties.includes('Intermedio')) {
            autoDifficulty = 'Intermedio';
        }

        setFormData(prev => ({
            ...prev,
            exercises,
            totalDuration,
            categories: allCategories,
            difficulty: autoDifficulty
        }));
    };

    // Handlers
    const handleInputChange = (field: keyof CreateRoutineForm, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleAddExercise = (exercise: Exercise) => {
        if (!formData.exercises.find(ex => ex.id === exercise.id)) {
            const newExercises = [...formData.exercises, exercise];
            updateCalculatedFields(newExercises);
        }
    };

    const handleRemoveExercise = (exerciseId: number) => {
        const newExercises = formData.exercises.filter(ex => ex.id !== exerciseId);
        updateCalculatedFields(newExercises);
    };

    const handleMoveExercise = (fromIndex: number, toIndex: number) => {
        const newExercises = [...formData.exercises];
        const [moved] = newExercises.splice(fromIndex, 1);
        newExercises.splice(toIndex, 0, moved);
        updateCalculatedFields(newExercises);
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = 'El título es requerido';
        if (!formData.description.trim()) errors.description = 'La descripción es requerida';
        if (formData.exercises.length === 0) errors.exercises = 'Agrega al menos un ejercicio';
        if (formData.exercises.length < 2) errors.exercises = 'Una rutina debe tener al menos 2 ejercicios';
        if (formData.totalDuration > 60) errors.duration = 'La rutina no debe superar 60 minutos';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        // Simular guardado
        console.log('Guardando rutina:', formData);
        alert('✅ Rutina creada exitosamente (funcionalidad simulada)');
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            exercises: [],
            totalDuration: 0,
            difficulty: 'Principiante',
            categories: [],
            isPublic: false,
            targetAge: 'kids',
            restTime: 30
        });
    };

    const handlePreview = () => {
        if (!validateForm()) return;
        setShowPreview(true);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            exercises: [],
            totalDuration: 0,
            difficulty: 'Principiante',
            categories: [],
            isPublic: false,
            targetAge: 'kids',
            restTime: 30
        });
        setFormErrors({});
    };

    const totalCalories = formData.exercises.reduce((sum, ex) => sum + ex.calories, 0);
    const totalTimeWithRest = formData.totalDuration + (formData.exercises.length - 1) * (formData.restTime / 60);

    const renderExerciseCard = (exercise: Exercise, isInRoutine = false) => (
        <Card 
            key={exercise.id}
            sx={{ 
                mb: 1,
                border: isInRoutine ? `2px solid ${theme.palette.primary.main}` : '1px solid',
                borderColor: isInRoutine ? theme.palette.primary.main : theme.palette.divider,
                cursor: !isInRoutine ? 'pointer' : 'default',
                '&:hover': !isInRoutine ? {
                    backgroundColor: theme.palette.action.hover
                } : {}
            }}
            onClick={!isInRoutine ? () => handleAddExercise(exercise) : undefined}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isInRoutine && (
                        <DragIcon sx={{ color: 'action.active', cursor: 'grab' }} />
                    )}
                    
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
                    
                    {isInRoutine ? (
                        <IconButton
                            color="error"
                            onClick={() => handleRemoveExercise(exercise.id)}
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="primary" size="small">
                            <AddIcon />
                        </IconButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <PermissionGate
            permission="canCreateExercisesForKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium y permisos de tutor.
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
                    <PlaylistAddIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Crear Rutina Personalizada
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Combina ejercicios para crear rutinas únicas
                        </Typography>
                    </Box>
                    <Chip
                        icon={<PremiumIcon />}
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Información básica */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    📝 Información de la Rutina
                                </Typography>
                                
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de la rutina"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        error={!!formErrors.title}
                                        helperText={formErrors.title || 'Ej: "Aventura Matutina" o "Entrenamiento Superhéroe"'}
                                        placeholder="Escribe un nombre atractivo"
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Descripción"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        error={!!formErrors.description}
                                        helperText={formErrors.description || 'Describe el objetivo y beneficios de la rutina'}
                                        placeholder="Explica qué conseguirán los niños con esta rutina..."
                                    />

                                    <FormControl component="fieldset">
                                        <Typography variant="subtitle2" gutterBottom>
                                            Edad objetivo:
                                        </Typography>
                                        <RadioGroup
                                            value={formData.targetAge}
                                            onChange={(e) => handleInputChange('targetAge', e.target.value)}
                                            row
                                        >
                                            <FormControlLabel value="kids" control={<Radio />} label="5-12 años" />
                                            <FormControlLabel value="teens" control={<Radio />} label="13-17 años" />
                                            <FormControlLabel value="all" control={<Radio />} label="Todas las edades" />
                                        </RadioGroup>
                                    </FormControl>

                                    <TextField
                                        type="number"
                                        label="Descanso entre ejercicios (segundos)"
                                        value={formData.restTime}
                                        onChange={(e) => handleInputChange('restTime', Number(e.target.value))}
                                        inputProps={{ min: 10, max: 120 }}
                                        helperText="Tiempo de descanso recomendado entre ejercicios"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={formData.isPublic}
                                                onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                                            />
                                        }
                                        label="Hacer pública (otros tutores podrán usar esta rutina)"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Resumen automático */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    📊 Resumen Automático
                                </Typography>
                                
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h4" fontWeight="bold" color="primary.main">
                                                {formData.exercises.length}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ejercicios
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h4" fontWeight="bold" color="secondary.main">
                                                {formData.totalDuration}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                minutos
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h4" fontWeight="bold" color="warning.main">
                                                {totalCalories}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                calorías
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h4" fontWeight="bold" color="info.main">
                                                {Math.round(totalTimeWithRest)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                min con descansos
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Dificultad automática: 
                                        <Chip 
                                            label={formData.difficulty}
                                            size="small"
                                            color="primary"
                                            sx={{ ml: 1 }}
                                        />
                                    </Typography>
                                    
                                    <Typography variant="subtitle2" gutterBottom>
                                        Categorías detectadas:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {formData.categories.map((category, index) => (
                                            <Chip
                                                key={index}
                                                label={category}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                {formErrors.exercises && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {formErrors.exercises}
                                    </Alert>
                                )}
                                
                                {formErrors.duration && (
                                    <Alert severity="warning" sx={{ mt: 2 }}>
                                        {formErrors.duration}
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Ejercicios en la rutina */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6">
                                        🏃‍♀️ Ejercicios en la Rutina ({formData.exercises.length})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => setShowExerciseSelector(true)}
                                        size="small"
                                    >
                                        Agregar
                                    </Button>
                                </Box>

                                {formData.exercises.length === 0 ? (
                                    <Box sx={{
                                        textAlign: 'center',
                                        py: 4,
                                        border: `2px dashed ${theme.palette.grey[300]}`,
                                        borderRadius: 2
                                    }}>
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                            🎯 Agrega ejercicios aquí
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Haz clic en "Agregar" para seleccionar ejercicios
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={1}>
                                        {formData.exercises.map((exercise, index) => (
                                            <Box key={`${exercise.id}-${index}`}>
                                                {renderExerciseCard(exercise, true)}
                                                {index < formData.exercises.length - 1 && (
                                                    <Box sx={{ textAlign: 'center', py: 1 }}>
                                                        <Divider>
                                                            <Chip label={`${formData.restTime}s descanso`} size="small" />
                                                        </Divider>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Acciones */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    🚀 Acciones
                                </Typography>
                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        fullWidth
                                        disabled={formData.exercises.length === 0}
                                    >
                                        Guardar Rutina
                                    </Button>
                                    
                                    <Button
                                        variant="outlined"
                                        startIcon={<PreviewIcon />}
                                        onClick={handlePreview}
                                        fullWidth
                                        disabled={formData.exercises.length === 0}
                                    >
                                        Vista Previa
                                    </Button>
                                    
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<ResetIcon />}
                                        onClick={handleReset}
                                        fullWidth
                                    >
                                        Limpiar Todo
                                    </Button>
                                </Stack>

                                <Alert severity="info" sx={{ mt: 2 }}>
                                    💡 <strong>Tip:</strong> Una buena rutina combina calentamiento, ejercicios principales y enfriamiento
                                </Alert>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Modal selector de ejercicios */}
                <Dialog
                    open={showExerciseSelector}
                    onClose={() => setShowExerciseSelector(false)}
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
                                onChange={(e) => setExerciseFilter(prev => ({ ...prev, search: e.target.value }))}
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
                                    onChange={(e) => setExerciseFilter(prev => ({ ...prev, category: e.target.value }))}
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
                                    onChange={(e) => setExerciseFilter(prev => ({ ...prev, difficulty: e.target.value }))}
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
                            {filteredExercises.map(exercise => renderExerciseCard(exercise, false))}
                        </Box>

                        {filteredExercises.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                No se encontraron ejercicios con los filtros aplicados
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowExerciseSelector(false)}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Modal de vista previa */}
                <Dialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Vista Previa de la Rutina
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {formData.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {formData.description}
                            </Typography>
                            
                            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                                <Chip label={`${formData.exercises.length} ejercicios`} color="primary" />
                                <Chip label={`${formData.totalDuration} min`} color="secondary" />
                                <Chip label={`${totalCalories} cal`} color="warning" />
                                <Chip label={formData.difficulty} color="default" />
                            </Stack>
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Secuencia de Ejercicios:
                        </Typography>
                        
                        <Stack spacing={2}>
                            {formData.exercises.map((exercise, index) => (
                                <Box key={`preview-${exercise.id}-${index}`}>
                                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h6" color="primary.main" sx={{ minWidth: 30 }}>
                                            {index + 1}.
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={exercise.gifUrl}
                                            alt={exercise.title}
                                            sx={{ width: 50, height: 50, borderRadius: 1 }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body1" fontWeight="bold">
                                                {exercise.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {exercise.duration} min • {exercise.calories} cal
                                            </Typography>
                                        </Box>
                                    </Paper>
                                    
                                    {index < formData.exercises.length - 1 && (
                                        <Box sx={{ textAlign: 'center', py: 1 }}>
                                            <Typography variant="caption" color="text.secondary">
                                                ⏱️ Descanso: {formData.restTime} segundos
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowPreview(false)}>
                            Cerrar
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Guardar Rutina
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PermissionGate>
    );
}