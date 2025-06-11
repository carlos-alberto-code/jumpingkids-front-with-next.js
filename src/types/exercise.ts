export interface Exercise {
  id: number;
  title: string;
  categories: string[]; // Múltiples categorías por ejercicio
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: number; // En minutos
  calories: number;
  gifUrl: string;
  description: string;
  isFavorite: boolean;
}

// Estado de la filtración de ejercicios
export interface FilterState {
  searchQuery: string;
  category: string | null;
  difficulty: Exercise['difficulty'] | null;
  favoriteFilter: 'all' | 'favorites' | 'non-favorites';
}

// Modo de vista
export type ViewMode = 'single' | 'double';

// Props para ExerciseFilter
export interface ExerciseFilterProps {
  onFiltersChange: (filters: FilterState) => void;
  onViewModeChange: (mode: ViewMode) => void;
  currentFilters: FilterState;
  currentViewMode: ViewMode;
  availableCategories: string[];     // Categorías únicas extraídas de todos los ejercicios
}

export interface ExerciseListProps {
  exercises: Exercise[];
  viewMode: ViewMode;
  loading?: boolean;
  onToggleFavorite: (exerciseId: number) => void;
  onCardClick?: (exercise: Exercise) => void;
  onClearFilters?: () => void;
}

// Estado de la aplicación (para index.tsx)
export interface ExercisePageState {
  exercises: Exercise[];
  filteredExercises: Exercise[];
  filters: FilterState;
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
}

// ✨ Modal de detalle de ejercicios
export interface ExerciseDetailModalProps {
  open: boolean;
  exercise: Exercise | null;
  onClose: () => void;
  onToggleFavorite: (exerciseId: number) => void;
}

// 🏋️ TIPOS PARA CREAR EJERCICIO
export interface CreateExerciseForm {
  title: string;
  description: string;
  duration: number;
  calories: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  categories: string[];
  gifUrl: string;
  instructions: string[];
  equipment: string[];
  targetAudience: 'kids' | 'teens' | 'all';
  safetyNotes: string[];
  isPublic: boolean;
}

export interface CreateExerciseRequest {
  title: string;
  description: string;
  duration: number;
  calories: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  categories: string[];
  gifUrl: string;
  instructions: string[];
  equipment: string[];
  targetAudience: 'kids' | 'teens' | 'all';
  safetyNotes: string[];
  isPublic: boolean;
}

export interface TargetAudienceOption {
  value: 'kids' | 'teens' | 'all';
  label: string;
  description: string;
}