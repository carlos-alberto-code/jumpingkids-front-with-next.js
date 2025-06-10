import {
    Container,
    Grid2 as Grid
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import {
    RoutineCreator,
    RoutineFilters,
    RoutinePreview,
    RoutinesGrid,
    DEFAULT_FILTERS,
    filterRoutines,
    getAvailableCategories,
    generateCustomRoutines,
    type RoutineFilters as IRoutineFilters
} from '../../src/components/routines';
import { MOCK_ROUTINES } from '../../src/constants/routinesMocks';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Routine } from '../../src/types/routines';

const DEFAULT_FILTERS: RoutineFilters = {
    search: '',
    difficulty: '',
    category: '',
    duration: '',
    creator: ''
};

const DIFFICULTY_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];
const DURATION_OPTIONS = [
    { label: 'Corta (< 20 min)', value: 'short', max: 20 },
    { label: 'Media (20-40 min)', value: 'medium', min: 20, max: 40 },
    { label: 'Larga (> 40 min)', value: 'long', min: 40 }
];

export default function RoutinesPage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const theme = useTheme();
    const [filters, setFilters] = useState<RoutineFilters>(DEFAULT_FILTERS);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);

    // Filtrar rutinas según suscripción
    const allRoutines = isPremiumUser ? 
        [...MOCK_ROUTINES, ...generateCustomRoutines()] : 
        MOCK_ROUTINES.filter(r => r.isPublic);

    // Aplicar filtros
    const filteredRoutines = allRoutines.filter(routine => {
        // Filtro de búsqueda
        if (filters.search && !routine.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !routine.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Filtro de dificultad
        if (filters.difficulty && routine.difficulty !== filters.difficulty) {
            return false;
        }

        // Filtro de categoría
        if (filters.category && !routine.categories.includes(filters.category)) {
            return false;
        }

        // Filtro de duración
        if (filters.duration) {
            const durationFilter = DURATION_OPTIONS.find(d => d.value === filters.duration);
            if (durationFilter) {
                if (durationFilter.min && routine.totalDuration < durationFilter.min) return false;
                if (durationFilter.max && routine.totalDuration > durationFilter.max) return false;
            }
        }

        // Filtro de creador
        if (filters.creator) {
            if (filters.creator === 'system' && routine.createdBy !== 'system') return false;
            if (filters.creator === 'custom' && routine.createdBy === 'system') return false;
        }

        return true;
    });

    // Obtener categorías únicas
    const availableCategories = Array.from(new Set(allRoutines.flatMap(r => r.categories))).sort();

    // Handlers
    const handleFilterChange = (filterKey: keyof RoutineFilters, value: string) => {
        setFilters(prev => ({ ...prev, [filterKey]: value }));
    };

    const handleClearFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const handlePreviewRoutine = (routine: Routine) => {
        setSelectedRoutine(routine);
        setPreviewModalOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewModalOpen(false);
        setSelectedRoutine(null);
    };

    // Renderizar card de rutina
    const renderRoutineCard = (routine: Routine) => (
        <Card key={routine.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <Grid size={4}>
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
                    <Grid size={4}>
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
                    <Grid size={4}>
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
                    onClick={() => handlePreviewRoutine(routine)}
                    size="small"
                >
                    Ver Detalles
                </Button>
                {isPremiumUser && !routine.isPublic && (
                    <Button
                        startIcon={<CreateIcon />}
                        size="small"
                        color="secondary"
                    >
                        Duplicar
                    </Button>
                )}
            </CardActions>
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <RoutinesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Catálogo de Rutinas
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Explora {filteredRoutines.length} rutinas disponibles
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

            {/* Información del plan */}
            <Alert severity={isPremiumUser ? "success" : "info"} sx={{ mb: 3 }}>
                {isPremiumUser ? (
                    <>
                        🎉 <strong>Premium:</strong> Tienes acceso a todas las rutinas del sistema y rutinas personalizadas.
                        Puedes duplicar rutinas para crear versiones personalizadas.
                    </>
                ) : (
                    <>
                        ℹ️ <strong>Plan Gratuito:</strong> Acceso a rutinas predefinidas del sistema.
                        Actualiza a Premium para crear rutinas personalizadas y acceder a contenido exclusivo.
                    </>
                )}
            </Alert>

            <Grid container spacing={3}>
                {/* Panel de filtros */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ position: 'sticky', top: 20 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <FilterIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">
                                    Filtros
                                </Typography>
                            </Box>

                            <Stack spacing={2}>
                                {/* Búsqueda */}
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Buscar rutinas..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />

                                {/* Dificultad */}
                                <FormControl fullWidth size="small">
                                    <InputLabel>Dificultad</InputLabel>
                                    <Select
                                        value={filters.difficulty}
                                        label="Dificultad"
                                        onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                                    >
                                        <MenuItem value=""><em>Todas</em></MenuItem>
                                        {DIFFICULTY_OPTIONS.map((difficulty) => (
                                            <MenuItem key={difficulty} value={difficulty}>
                                                {difficulty}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Categoría */}
                                <FormControl fullWidth size="small">
                                    <InputLabel>Categoría</InputLabel>
                                    <Select
                                        value={filters.category}
                                        label="Categoría"
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                    >
                                        <MenuItem value=""><em>Todas</em></MenuItem>
                                        {availableCategories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Duración */}
                                <FormControl fullWidth size="small">
                                    <InputLabel>Duración</InputLabel>
                                    <Select
                                        value={filters.duration}
                                        label="Duración"
                                        onChange={(e) => handleFilterChange('duration', e.target.value)}
                                    >
                                        <MenuItem value=""><em>Cualquiera</em></MenuItem>
                                        {DURATION_OPTIONS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Creador (solo premium) */}
                                {isPremiumUser && (
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Creador</InputLabel>
                                        <Select
                                            value={filters.creator}
                                            label="Creador"
                                            onChange={(e) => handleFilterChange('creator', e.target.value)}
                                        >
                                            <MenuItem value=""><em>Todos</em></MenuItem>
                                            <MenuItem value="system">Sistema</MenuItem>
                                            <MenuItem value="custom">Personalizadas</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}

                                {/* Botón limpiar filtros */}
                                <Button
                                    variant="outlined"
                                    onClick={handleClearFilters}
                                    size="small"
                                    disabled={Object.values(filters).every(value => !value)}
                                >
                                    Limpiar Filtros
                                </Button>
                            </Stack>

                            {/* Estadísticas de filtros */}
                            <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Mostrando {filteredRoutines.length} de {allRoutines.length} rutinas
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lista de rutinas */}
                <Grid size={{ xs: 12, md: 9 }}>
                    {filteredRoutines.length > 0 ? (
                        <Grid container spacing={3}>
                            {filteredRoutines.map(routine => (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={routine.id}>
                                    {renderRoutineCard(routine)}
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Card sx={{ textAlign: 'center', py: 6 }}>
                            <CardContent>
                                <RoutinesIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No se encontraron rutinas
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Intenta ajustar tus filtros para encontrar más rutinas.
                                </Typography>
                                <Button variant="outlined" onClick={handleClearFilters}>
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>

            {/* Modal de vista previa */}
            <Dialog 
                open={previewModalOpen} 
                onClose={handleClosePreview} 
                maxWidth="md" 
                fullWidth
                scroll="paper"
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="bold">
                            {selectedRoutine?.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip 
                                label={selectedRoutine?.difficulty}
                                color={selectedRoutine?.difficulty === 'Principiante' ? 'success' :
                                       selectedRoutine?.difficulty === 'Intermedio' ? 'warning' : 'error'}
                            />
                            {selectedRoutine?.isPublic ? (
                                <Chip icon={<PublicIcon />} label="Sistema" color="info" variant="outlined" />
                            ) : (
                                <Chip icon={<PremiumIcon />} label="Premium" color="secondary" />
                            )}
                        </Stack>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    {selectedRoutine && (
                        <Stack spacing={3}>
                            {/* Descripción */}
                            <Typography variant="body1">
                                {selectedRoutine.description}
                            </Typography>

                            {/* Métricas principales */}
                            <Grid container spacing={3}>
                                <Grid size={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                                        <ExerciseIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            {selectedRoutine.exercises.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ejercicios
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                                        <TimeIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            {selectedRoutine.totalDuration}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Minutos
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                                        <StarIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                        <Typography variant="h5" fontWeight="bold">
                                            {selectedRoutine.categories.length}
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
                                    {selectedRoutine.categories.map((category, index) => (
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
                                    {selectedRoutine.exercises.map((exercise, index) => (
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
                                                    <Chip 
                                                        label={`${exercise.duration} min`}
                                                        size="small"
                                                        color="secondary"
                                                    />
                                                    <Chip 
                                                        label={`${exercise.calories} cal`}
                                                        size="small"
                                                        color="warning"
                                                    />
                                                    <Chip 
                                                        label={exercise.difficulty}
                                                        size="small"
                                                        color="info"
                                                    />
                                                </Stack>
                                            </Box>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClosePreview}>
                        Cerrar
                    </Button>
                    {isPremiumUser && selectedRoutine && !selectedRoutine.isPublic && (
                        <Button startIcon={<CreateIcon />} variant="outlined" color="secondary">
                            Duplicar Rutina
                        </Button>
                    )}
                    <Button startIcon={<PreviewIcon />} variant="contained" color="primary">
                        Usar en Asignación
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

// 🔧 Función helper para generar rutinas personalizadas (solo premium)
function generateCustomRoutines(): Routine[] {
    return [
        {
            id: 'custom-001',
            title: 'Mi Rutina Personalizada 1',
            description: 'Rutina creada especialmente para Sofia con ejercicios adaptados a sus preferencias.',
            exercises: [
                {
                    id: 101,
                    title: 'Saltos de Tijera Modificados',
                    description: 'Versión adaptada de jumping jacks para principiantes',
                    duration: 8,
                    calories: 40,
                    difficulty: 'Principiante',
                    isFavorite: false,
                    categories: ['Cardio'],
                    gifUrl: 'https://example.com/custom-exercise.gif'
                }
            ],
            totalDuration: 25,
            difficulty: 'Principiante',
            categories: ['Cardio', 'Personalizada'],
            createdBy: 'tutor-premium-001',
            isPublic: false,
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-01T10:00:00Z'
        },
        {
            id: 'custom-002', 
            title: 'Rutina Familiar Intensiva',
            description: 'Rutina premium diseñada para múltiples niveles de dificultad.',
            exercises: [
                {
                    id: 102,
                    title: 'Circuito Familiar',
                    description: 'Ejercicio diseñado para hacer en familia',
                    duration: 15,
                    calories: 80,
                    difficulty: 'Intermedio',
                    isFavorite: false,
                    categories: ['Fuerza', 'Familiar'],
                    gifUrl: 'https://example.com/family-circuit.gif'
                }
            ],
            totalDuration: 35,
            difficulty: 'Intermedio',
            categories: ['Fuerza', 'Familiar', 'Premium'],
            createdBy: 'tutor-premium-001',
            isPublic: false,
            createdAt: '2024-06-02T14:00:00Z',
            updatedAt: '2024-06-02T14:00:00Z'
        }
    ];
}