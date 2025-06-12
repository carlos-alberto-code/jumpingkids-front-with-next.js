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
  createdBy?: string; // ID del tutor que creó el ejercicio (opcional para ejercicios del sistema)
}

// Estado de la filtración de ejercicios
export interface FilterState {
  searchQuery: string;
  category: string | null;
  difficulty: Exercise['difficulty'] | null;
  favoriteFilter: 'all' | 'favorites' | 'non-favorites';
  myExercisesOnly: boolean; // Filtro para mostrar solo ejercicios creados por el tutor actual
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

// 🔄 Tipos para respuestas de API
export interface CreateExerciseResponse {
  success: boolean;
  exercise: Exercise;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 🎯 Estados de operaciones asíncronas
export interface AsyncOperationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}