import { useEffect, useState } from 'react';
import { ExerciseService } from '../services/ExerciseService';
import { Exercise } from '../types';

export const useExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadExercises = async () => {
            setLoading(true);
            setError(null);

            try {
                // Usar el servicio para cargar ejercicios
                const exercisesData = await ExerciseService.getExercises();

                // Aplicar favoritos guardados
                const exercisesWithFavorites = ExerciseService.applyFavorites(exercisesData);

                setExercises(exercisesWithFavorites);
            } catch (err) {
                setError('Error al cargar ejercicios');
                console.error('Error loading exercises:', err);
            } finally {
                setLoading(false);
            }
        };

        loadExercises();
    }, []);

    const toggleFavorite = (exerciseId: number) => {
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
            ExerciseService.saveFavorites(favoriteIds);

            return updatedExercises;
        });
    };

    return {
        exercises,
        loading,
        error,
        toggleFavorite
    };
};
