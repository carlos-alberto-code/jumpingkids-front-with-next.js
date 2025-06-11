import { useMemo, useState } from 'react';
import { Exercise } from '../../types/exercise';
import { ExerciseFilter } from '../../types/routines';

export interface UseExerciseFilterReturn {
    exerciseFilter: ExerciseFilter;
    setExerciseFilter: React.Dispatch<React.SetStateAction<ExerciseFilter>>;
    filteredExercises: Exercise[];
    updateFilter: (filter: Partial<ExerciseFilter>) => void;
    clearFilters: () => void;
}

const DEFAULT_FILTER: ExerciseFilter = {
    search: '',
    category: '',
    difficulty: ''
};

/**
 * Hook para manejar el filtrado de ejercicios
 */
export const useExerciseFilter = (exercises: Exercise[]): UseExerciseFilterReturn => {
    const [exerciseFilter, setExerciseFilter] = useState<ExerciseFilter>(DEFAULT_FILTER);

    const filteredExercises = useMemo(() => {
        return exercises.filter(exercise => {
            const matchesSearch = exercise.title.toLowerCase().includes(exerciseFilter.search.toLowerCase()) ||
                exercise.description.toLowerCase().includes(exerciseFilter.search.toLowerCase());
            const matchesCategory = !exerciseFilter.category || exercise.categories.includes(exerciseFilter.category);
            const matchesDifficulty = !exerciseFilter.difficulty || exercise.difficulty === exerciseFilter.difficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [exercises, exerciseFilter]);

    const updateFilter = (filter: Partial<ExerciseFilter>) => {
        setExerciseFilter(prev => ({ ...prev, ...filter }));
    };

    const clearFilters = () => {
        setExerciseFilter(DEFAULT_FILTER);
    };

    return {
        exerciseFilter,
        setExerciseFilter,
        filteredExercises,
        updateFilter,
        clearFilters
    };
};
