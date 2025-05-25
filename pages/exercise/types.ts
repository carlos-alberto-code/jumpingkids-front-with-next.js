interface Exercise {
  id: number;
  title: string;
  categories: string[]; // Múltiples categorías por ejercicio
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: number; // En minutos
  calories: number;
  gifUrl: string;
  description: string;
  isFavorite?: boolean;
}

// Estado de la filtración de ejercicios
interface FilterState {
  searchQuery: string;
  category: string | null; // Filtra ejercicios que contengan esta categoría
  difficulty: Exercise['difficulty'] | null;
  favoriteFilter: 'all' | 'favorites' | 'non-favorites';
}

// Modo de vista
type ViewMode = 'single' | 'double';

// Props para ExerciseFilter
interface ExerciseFilterProps {
  onFiltersChange: (filters: FilterState) => void;
  onViewModeChange: (mode: ViewMode) => void;
  currentFilters: FilterState;
  currentViewMode: ViewMode;
  availableCategories: string[];     // Categorías únicas extraídas de todos los ejercicios
}

// Props para ExerciseList
interface ExerciseListProps {
  exercises: Exercise[];
  viewMode: ViewMode;
  loading?: boolean;
}

// Estado de la aplicación (para index.tsx)
interface ExercisePageState {
  exercises: Exercise[];
  filteredExercises: Exercise[];
  filters: FilterState;
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
}

// Valores por defecto
const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: null,
  difficulty: null,
  favoriteFilter: 'all'
};