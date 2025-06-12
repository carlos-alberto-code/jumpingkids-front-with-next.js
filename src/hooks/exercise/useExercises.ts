import { useCallback, useEffect, useState } from 'react';
import { applyFavorites, getCachedExercises, getExercises, saveFavorites } from '../../services/exercise/ExerciseService';
import { Exercise } from '../../types/exercise';
import { exerciseCache, generateCacheKey } from '../../utils/cacheUtils';

export interface UseExercisesReturn {
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
    refreshExercises: () => Promise<void>;
    clearError: () => void;
    toggleFavorite: (exerciseId: number) => void;
}

export const useExercises = (): UseExercisesReturn => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadExercises = useCallback(async (useCache = true) => {
        setLoading(true);
        setError(null);

        try {
            let exercisesData: Exercise[];

            if (useCache) {
                exercisesData = await getCachedExercises();
            } else {
                exercisesData = await getExercises();
                // Actualizar cache manualmente si se solicita sin cache
                const cacheKey = generateCacheKey('exercises');
                exerciseCache.set(cacheKey, exercisesData);
            }

            // Aplicar favoritos guardados
            const exercisesWithFavorites = applyFavorites(exercisesData);
            setExercises(exercisesWithFavorites);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar ejercicios';
            setError(errorMessage);
            console.error('Error loading exercises:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshExercises = useCallback(async () => {
        await loadExercises(false); // Forzar recarga sin cache
    }, [loadExercises]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        loadExercises();
    }, [loadExercises]);

    const toggleFavorite = useCallback((exerciseId: number) => {
        setExercises(prevExercises => {
            const updatedExercises = prevExercises.map(exercise =>
                exercise.id === exerciseId
                    ? { ...exercise, isFavorite: !exercise.isFavorite }
                    : exercise
            );

            // Guardar favoritos usando el servicio
            const favoriteIds = updatedExercises
                .filter(ex => ex.isFavorite)
                .map(ex => ex.id);
            saveFavorites(favoriteIds);

            return updatedExercises;
        });
    }, []);

    return {
        exercises,
        loading,
        error,
        refreshExercises,
        clearError,
        toggleFavorite
    };
};
