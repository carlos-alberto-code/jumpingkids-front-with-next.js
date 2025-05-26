import { useMemo, useState } from 'react';
import { DEFAULT_FILTERS } from '../constants';
import { Exercise, FilterState } from '../types';

export const useExerciseFilters = (exercises: Exercise[]) => {
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

    const availableCategories = useMemo(() => {
        const allCategories = exercises.flatMap(exercise => exercise.categories);
        return Array.from(new Set(allCategories)).sort();
    }, [exercises]);

    const filteredExercises = useMemo(() => {
        return exercises.filter(exercise => {
            // Filtro de búsqueda (por título y descripción)
            const searchQuery = filters.searchQuery.toLowerCase();
            const matchesSearch =
                exercise.title.toLowerCase().includes(searchQuery) ||
                exercise.description.toLowerCase().includes(searchQuery);

            // Filtro por categoría
            const matchesCategory = filters.category === null ||
                exercise.categories.includes(filters.category);

            // Filtro por dificultad
            const matchesDifficulty = filters.difficulty === null ||
                exercise.difficulty === filters.difficulty;

            // Filtro por favoritos
            const matchesFavorite = (() => {
                switch (filters.favoriteFilter) {
                    case 'favorites':
                        return exercise.isFavorite === true;
                    case 'non-favorites':
                        return exercise.isFavorite !== true;
                    case 'all':
                    default:
                        return true;
                }
            })();

            return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorite;
        });
    }, [exercises, filters]);

    const clearFilters = () => setFilters(DEFAULT_FILTERS);

    return {
        filters,
        setFilters,
        availableCategories,
        filteredExercises,
        clearFilters
    };
};
