import { useMemo, useState } from 'react';
import { DEFAULT_FILTERS } from '../../constants/exercise';
import { useAuthContext } from '../../context/auth/AuthContext'; // Usar contexto de autenticación
import { Exercise, FilterState } from '../../types/exercise';

export const useExerciseFilters = (exercises: Exercise[]) => {
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const { session } = useAuthContext(); // Obtener sesión actual

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

            // Filtro por ejercicios creados por mí
            const matchesMyExercises = !filters.myExercisesOnly ||
                (exercise.createdBy && session?.user?.id && exercise.createdBy === session.user.id);

            return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorite && matchesMyExercises;
        });
    }, [exercises, filters, session?.user?.id]);

    const clearFilters = () => setFilters(DEFAULT_FILTERS);

    return {
        filters,
        setFilters,
        availableCategories,
        filteredExercises,
        clearFilters
    };
};
