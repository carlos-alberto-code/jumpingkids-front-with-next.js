import { useState } from 'react';
import { ExerciseService } from '../../services/exercise/ExerciseService';
import { CreateExerciseForm, Exercise } from '../../types/exercise';
import { AppError, safeAsync } from '../../utils/errorHandling';

export interface UseCreateExerciseReturn {
    createExercise: (formData: CreateExerciseForm) => Promise<Exercise | null>;
    loading: boolean;
    error: AppError | null;
    clearError: () => void;
}

/**
 * Hook personalizado para crear ejercicios con manejo robusto de errores
 * Maneja el estado de loading, error y la petición HTTP
 */
export const useCreateExercise = (): UseCreateExerciseReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    const createExercise = async (formData: CreateExerciseForm): Promise<Exercise | null> => {
        setLoading(true);
        setError(null);

        const [result, createError] = await safeAsync(
            ExerciseService.createExercise(
                ExerciseService.validateCreateExerciseData(formData)
            ),
            'useCreateExercise.createExercise'
        );

        setLoading(false);

        if (createError) {
            setError(createError);
            return null;
        }

        return result;
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
