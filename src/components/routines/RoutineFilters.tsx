import { FilterList as FilterIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';

export interface RoutineFilters {
    search: string;
    difficulty: string;
    category: string;
    duration: string;
    creator: string;
}

export interface RoutineFiltersProps {
    filters: RoutineFilters;
    availableCategories: string[];
    isPremiumUser?: boolean;
    totalRoutines: number;
    filteredCount: number;
    onFilterChange: (filterKey: keyof RoutineFilters, value: string) => void;
    onClearFilters: () => void;
}

const DIFFICULTY_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];
const DURATION_OPTIONS = [
    { label: 'Corta (< 20 min)', value: 'short' },
    { label: 'Media (20-40 min)', value: 'medium' },
    { label: 'Larga (> 40 min)', value: 'long' }
];

export default function RoutineFilters({
    filters,
    availableCategories,
    isPremiumUser = false,
    totalRoutines,
    filteredCount,
    onFilterChange,
    onClearFilters
}: RoutineFiltersProps) {

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
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
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />

                    {/* Dificultad */}
                    <FormControl fullWidth size="small">
                        <InputLabel>Dificultad</InputLabel>
                        <Select
                            value={filters.difficulty}
                            label="Dificultad"
                            onChange={(e) => onFilterChange('difficulty', e.target.value)}
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
                            onChange={(e) => onFilterChange('category', e.target.value)}
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
                            onChange={(e) => onFilterChange('duration', e.target.value)}
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
                                onChange={(e) => onFilterChange('creator', e.target.value)}
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
                        onClick={onClearFilters}
                        size="small"
                        disabled={!hasActiveFilters}
                    >
                        Limpiar Filtros
                    </Button>
                </Stack>

                {/* Estadísticas de filtros */}
                <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Mostrando {filteredCount} de {totalRoutines} rutinas
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
