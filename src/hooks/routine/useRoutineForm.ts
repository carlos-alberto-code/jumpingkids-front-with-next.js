import { useState } from 'react';
import { DEFAULT_CREATE_ROUTINE_FORM, ROUTINE_VALIDATION_RULES } from '../../constants/routine';
import { Exercise } from '../../types/exercise';
import { CreateRoutineForm } from '../../types/routines';

export interface UseRoutineFormReturn {
    formData: CreateRoutineForm;
    formErrors: Record<string, string>;
    handleInputChange: (field: keyof CreateRoutineForm, value: any) => void;
    handleAddExercise: (exercise: Exercise) => void;
    handleRemoveExercise: (exerciseId: number) => void;
    updateCalculatedFields: (exercises: Exercise[]) => void;
    validateForm: () => boolean;
    resetForm: () => void;
    totalCalories: number;
    totalTimeWithRest: number;
}

/**
 * Hook personalizado para manejar el formulario de crear rutinas
 * Separa la lógica del formulario del componente de presentación
 */
export const useRoutineForm = (): UseRoutineFormReturn => {
    const [formData, setFormData] = useState<CreateRoutineForm>(DEFAULT_CREATE_ROUTINE_FORM);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof CreateRoutineForm, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo si existe
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Calcular duración total y categorías automáticamente
    const updateCalculatedFields = (exercises: Exercise[]) => {
        const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const allCategories = [...new Set(exercises.flatMap(ex => ex.categories))];

        // Determinar dificultad automática basada en ejercicios
        const difficulties = exercises.map(ex => ex.difficulty);
        let autoDifficulty: 'Principiante' | 'Intermedio' | 'Avanzado' = 'Principiante';

        if (difficulties.includes('Avanzado')) {
            autoDifficulty = 'Avanzado';
        } else if (difficulties.includes('Intermedio')) {
            autoDifficulty = 'Intermedio';
        }

        setFormData(prev => ({
            ...prev,
            exercises,
            totalDuration,
            categories: allCategories,
            difficulty: autoDifficulty
        }));
    };

    const handleAddExercise = (exercise: Exercise) => {
        if (!formData.exercises.find(ex => ex.id === exercise.id)) {
            const newExercises = [...formData.exercises, exercise];
            updateCalculatedFields(newExercises);
        }
    };

    const handleRemoveExercise = (exerciseId: number) => {
        const newExercises = formData.exercises.filter(ex => ex.id !== exerciseId);
        updateCalculatedFields(newExercises);
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Validación del título
        if (!formData.title.trim()) {
            errors.title = 'El título es requerido';
        } else if (formData.title.trim().length < ROUTINE_VALIDATION_RULES.TITLE_MIN_LENGTH) {
            errors.title = `El título debe tener al menos ${ROUTINE_VALIDATION_RULES.TITLE_MIN_LENGTH} caracteres`;
        } else if (formData.title.trim().length > ROUTINE_VALIDATION_RULES.TITLE_MAX_LENGTH) {
            errors.title = `El título no puede superar ${ROUTINE_VALIDATION_RULES.TITLE_MAX_LENGTH} caracteres`;
        }

        // Validación de la descripción
        if (!formData.description.trim()) {
            errors.description = 'La descripción es requerida';
        } else if (formData.description.trim().length < ROUTINE_VALIDATION_RULES.DESCRIPTION_MIN_LENGTH) {
            errors.description = `La descripción debe tener al menos ${ROUTINE_VALIDATION_RULES.DESCRIPTION_MIN_LENGTH} caracteres`;
        } else if (formData.description.trim().length > ROUTINE_VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
            errors.description = `La descripción no puede superar ${ROUTINE_VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} caracteres`;
        }

        // Validación de ejercicios
        if (formData.exercises.length === 0) {
            errors.exercises = 'Agrega al menos un ejercicio';
        } else if (formData.exercises.length < ROUTINE_VALIDATION_RULES.MIN_EXERCISES) {
            errors.exercises = `Una rutina debe tener al menos ${ROUTINE_VALIDATION_RULES.MIN_EXERCISES} ejercicios`;
        } else if (formData.exercises.length > ROUTINE_VALIDATION_RULES.MAX_EXERCISES) {
            errors.exercises = `Una rutina no puede tener más de ${ROUTINE_VALIDATION_RULES.MAX_EXERCISES} ejercicios`;
        }

        // Validación de duración
        if (formData.totalDuration > ROUTINE_VALIDATION_RULES.MAX_DURATION) {
            errors.duration = `La rutina no debe superar ${ROUTINE_VALIDATION_RULES.MAX_DURATION} minutos`;
        }

        // Validación del tiempo de descanso
        if (formData.restTime < ROUTINE_VALIDATION_RULES.MIN_REST_TIME || formData.restTime > ROUTINE_VALIDATION_RULES.MAX_REST_TIME) {
            errors.restTime = `El tiempo de descanso debe ser entre ${ROUTINE_VALIDATION_RULES.MIN_REST_TIME} y ${ROUTINE_VALIDATION_RULES.MAX_REST_TIME} segundos`;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setFormData(DEFAULT_CREATE_ROUTINE_FORM);
        setFormErrors({});
    };

    // Cálculos derivados
    const totalCalories = formData.exercises.reduce((sum, ex) => sum + ex.calories, 0);
    const totalTimeWithRest = formData.totalDuration + (formData.exercises.length - 1) * (formData.restTime / 60);

    return {
        formData,
        formErrors,
        handleInputChange,
        handleAddExercise,
        handleRemoveExercise,
        updateCalculatedFields,
        validateForm,
        resetForm,
        totalCalories,
        totalTimeWithRest
    };
};
