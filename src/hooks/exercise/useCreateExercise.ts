import { useState } from 'react';
import { ExerciseService } from '../../services/exercise/ExerciseService';
import { CreateExerciseForm, Exercise } from '../../types/exercise';

export interface UseCreateExerciseReturn {
    createExercise: (formData: CreateExerciseForm) => Promise<Exercise | null>;
    loading: boolean;
    error: string | null;
    clearError: () => void;
}

/**
 * Hook personalizado para crear ejercicios
 * Maneja el estado de loading, error y la petición HTTP
 */
export const useCreateExercise = (): UseCreateExerciseReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createExercise = async (formData: CreateExerciseForm): Promise<Exercise | null> => {
        setLoading(true);
        setError(null);

        try {
            // Validar y transformar datos usando el servicio
            const validatedData = ExerciseService.validateCreateExerciseData(formData);

            // Crear el ejercicio
            const newExercise = await ExerciseService.createExercise(validatedData);

            return newExercise;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al crear el ejercicio';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        createExercise,
        loading,
        error,
        clearError
    };
};
