import { CreateRoutineForm } from '../types/routines';

export const DEFAULT_CREATE_ROUTINE_FORM: CreateRoutineForm = {
    title: '',
    description: '',
    exercises: [],
    totalDuration: 0,
    difficulty: 'Principiante',
    categories: [],
    isPublic: false,
    targetAge: 'kids',
    restTime: 30
};

export const TARGET_AUDIENCE_OPTIONS = [
    {
        value: 'kids' as const,
        label: '5-12 años',
        description: 'Ejercicios adaptados para niños en edad escolar'
    },
    {
        value: 'teens' as const,
        label: '13-17 años',
        description: 'Ejercicios para adolescentes con mayor intensidad'
    },
    {
        value: 'all' as const,
        label: 'Todas las edades',
        description: 'Ejercicios aptos para cualquier edad'
    }
];

export const REST_TIME_OPTIONS = [
    { value: 10, label: '10 segundos', description: 'Descanso mínimo' },
    { value: 15, label: '15 segundos', description: 'Descanso corto' },
    { value: 30, label: '30 segundos', description: 'Descanso estándar' },
    { value: 45, label: '45 segundos', description: 'Descanso moderado' },
    { value: 60, label: '1 minuto', description: 'Descanso largo' },
    { value: 90, label: '1.5 minutos', description: 'Descanso extendido' },
    { value: 120, label: '2 minutos', description: 'Descanso máximo' }
];

export const ROUTINE_VALIDATION_RULES = {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 500,
    MIN_EXERCISES: 2,
    MAX_EXERCISES: 20,
    MAX_DURATION: 60, // minutos
    MIN_REST_TIME: 10, // segundos
    MAX_REST_TIME: 120 // segundos
};
