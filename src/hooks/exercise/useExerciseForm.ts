import { useState } from 'react';
import { DEFAULT_CREATE_EXERCISE_FORM } from '../../constants/exercise';
import { CreateExerciseForm } from '../../types/exercise';

export interface UseExerciseFormReturn {
    formData: CreateExerciseForm;
    formErrors: Record<string, string>;
    handleInputChange: (field: keyof CreateExerciseForm, value: any) => void;
    handleCategoryToggle: (category: string) => void;
    handleEquipmentToggle: (equipment: string) => void;
    handleArrayFieldChange: (field: 'instructions' | 'safetyNotes', index: number, value: string) => void;
    addArrayField: (field: 'instructions' | 'safetyNotes') => void;
    removeArrayField: (field: 'instructions' | 'safetyNotes', index: number) => void;
    validateForm: () => boolean;
    resetForm: () => void;
    estimatedCalories: number;
}

/**
 * Hook personalizado para manejar el formulario de crear ejercicios
 * Separa la lógica del formulario del componente de presentación
 */
export const useExerciseForm = (): UseExerciseFormReturn => {
    const [formData, setFormData] = useState<CreateExerciseForm>(DEFAULT_CREATE_EXERCISE_FORM);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof CreateExerciseForm, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo si existe
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleCategoryToggle = (category: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleEquipmentToggle = (equipment: string) => {
        setFormData(prev => ({
            ...prev,
            equipment: prev.equipment.includes(equipment)
                ? prev.equipment.filter(e => e !== equipment)
                : [...prev.equipment, equipment]
        }));
    };

    const handleArrayFieldChange = (field: 'instructions' | 'safetyNotes', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayField = (field: 'instructions' | 'safetyNotes') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayField = (field: 'instructions' | 'safetyNotes', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = 'El título es requerido';
        if (!formData.description.trim()) errors.description = 'La descripción es requerida';
        if (formData.duration < 1) errors.duration = 'La duración debe ser mayor a 0';
        if (formData.calories < 1) errors.calories = 'Las calorías deben ser mayores a 0';
        if (formData.categories.length === 0) errors.categories = 'Selecciona al menos una categoría';
        if (!formData.gifUrl.trim()) errors.gifUrl = 'La URL del GIF es requerida';
        if (formData.instructions.every(inst => !inst.trim())) errors.instructions = 'Agrega al menos una instrucción';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setFormData(DEFAULT_CREATE_EXERCISE_FORM);
        setFormErrors({});
    };

    // Cálculo de calorías estimadas
    const estimatedCalories = Math.round(
        formData.duration * 5 +
        (formData.difficulty === 'Avanzado' ? 10 : formData.difficulty === 'Intermedio' ? 5 : 0)
    );

    return {
        formData,
        formErrors,
        handleInputChange,
        handleCategoryToggle,
        handleEquipmentToggle,
        handleArrayFieldChange,
        addArrayField,
        removeArrayField,
        validateForm,
        resetForm,
        estimatedCalories
    };
};
