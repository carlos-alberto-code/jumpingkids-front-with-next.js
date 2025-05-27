// Barrel exports para componentes de ejercicios
export {
    DEFAULT_FILTERS,
    DIFFICULTY_OPTIONS,
    FAVORITE_FILTER_OPTIONS
} from '../../constants/exercise';
export { MOCK_EXERCISES } from '../../constants/exerciseMocks';
export { ExerciseProvider, useExerciseContext } from '../../context/exercise/ExerciseContext';
export { useExerciseFilters } from '../../hooks/exercise/useExerciseFilters';
export { useExercises } from '../../hooks/exercise/useExercises';
export { ExerciseService } from '../../services/exercise/ExerciseService';
export type {
    Exercise, ExerciseDetailModalProps, ExerciseFilterProps,
    ExerciseListProps,
    ExercisePageState, FilterState,
    ViewMode
} from '../../types/exercise';
export { default as ExerciseCard } from './ExerciseCard';
export { default as ExerciseDetailModal } from './ExerciseDetailModal';
export { default as ExerciseFilter } from './ExerciseFilter';
export { default as ExerciseList } from './ExerciseList';

