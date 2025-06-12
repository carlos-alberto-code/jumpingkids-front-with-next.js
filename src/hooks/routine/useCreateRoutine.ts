import { useState } from 'react';
import { createRoutine as createRoutineService, validateCreateRoutineData } from '../../services/routine/RoutineService';
import { CreateRoutineForm, Routine } from '../../types/routines';
import { AppError, safeAsync } from '../../utils/errorHandling';

export interface UseCreateRoutineReturn {
    createRoutine: (formData: CreateRoutineForm) => Promise<Routine | null>;
    loading: boolean;
    error: AppError | null;
    clearError: () => void;
}

/**
 * Hook personalizado para crear rutinas con manejo robusto de errores
 * Maneja el estado de loading, error y la petición HTTP
 */
export const useCreateRoutine = (): UseCreateRoutineReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    const createRoutine = async (formData: CreateRoutineForm): Promise<Routine | null> => {
        setLoading(true);
        setError(null);

        const [result, createError] = await safeAsync(
            createRoutineService(
                validateCreateRoutineData(formData)
            ),
            'useCreateRoutine.createRoutine'
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
        createRoutine,
        loading,
        error,
        clearError
    };
};
