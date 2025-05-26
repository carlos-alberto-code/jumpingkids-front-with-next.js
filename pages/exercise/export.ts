// Barrel exports para facilitar imports
export * from './constants';
export { ExerciseProvider, useExerciseContext } from './context/ExerciseContext';
export { default as ExerciseCard } from './ExerciseCard';
export { default as ExerciseFilter } from './ExerciseFilter';
export { default as ExerciseList } from './ExerciseList';
export { useExerciseFilters } from './hooks/useExerciseFilters';
export { useExercises } from './hooks/useExercises';
export { MOCK_EXERCISES } from './mocks';
export { ExerciseService } from './services/ExerciseService';
export * from './types';

