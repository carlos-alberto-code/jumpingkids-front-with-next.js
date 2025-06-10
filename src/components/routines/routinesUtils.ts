import { Routine } from '../../types/routines';

export interface RoutineFilters {
    search: string;
    difficulty: string;
    category: string;
    duration: string;
    creator: string;
}

export const DEFAULT_FILTERS: RoutineFilters = {
    search: '',
    difficulty: '',
    category: '',
    duration: '',
    creator: ''
};

export const DIFFICULTY_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];

export const DURATION_OPTIONS = [
    { label: 'Corta (< 20 min)', value: 'short', max: 20 },
    { label: 'Media (20-40 min)', value: 'medium', min: 20, max: 40 },
    { label: 'Larga (> 40 min)', value: 'long', min: 40 }
];

export function filterRoutines(routines: Routine[], filters: RoutineFilters): Routine[] {
    return routines.filter(routine => {
        // Filtro de búsqueda
        if (filters.search &&
            !routine.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !routine.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Filtro de dificultad
        if (filters.difficulty && routine.difficulty !== filters.difficulty) {
            return false;
        }

        // Filtro de categoría
        if (filters.category && !routine.categories.includes(filters.category)) {
            return false;
        }

        // Filtro de duración
        if (filters.duration) {
            const durationFilter = DURATION_OPTIONS.find(d => d.value === filters.duration);
            if (durationFilter) {
                if (durationFilter.min && routine.totalDuration < durationFilter.min) return false;
                if (durationFilter.max && routine.totalDuration > durationFilter.max) return false;
            }
        }

        // Filtro de creador
        if (filters.creator) {
            if (filters.creator === 'system' && routine.createdBy !== 'system') return false;
            if (filters.creator === 'custom' && routine.createdBy === 'system') return false;
        }

        return true;
    });
}

export function getAvailableCategories(routines: Routine[]): string[] {
    return Array.from(new Set(routines.flatMap(r => r.categories))).sort();
}

// 🔧 Función helper para generar rutinas personalizadas (solo premium)
export function generateCustomRoutines(): Routine[] {
    return [
        {
            id: 'custom-001',
            title: 'Mi Rutina Personalizada 1',
            description: 'Rutina creada especialmente para Sofia con ejercicios adaptados a sus preferencias.',
            exercises: [
                {
                    id: 101,
                    title: 'Saltos de Tijera Modificados',
                    description: 'Versión adaptada de jumping jacks para principiantes',
                    duration: 8,
                    calories: 40,
                    difficulty: 'Principiante',
                    isFavorite: false,
                    categories: ['Cardio'],
                    gifUrl: 'https://example.com/custom-exercise.gif'
                }
            ],
            totalDuration: 25,
            difficulty: 'Principiante',
            categories: ['Cardio', 'Personalizada'],
            createdBy: 'tutor-premium-001',
            isPublic: false,
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-01T10:00:00Z'
        },
        {
            id: 'custom-002',
            title: 'Rutina Familiar Intensiva',
            description: 'Rutina premium diseñada para múltiples niveles de dificultad.',
            exercises: [
                {
                    id: 102,
                    title: 'Circuito Familiar',
                    description: 'Ejercicio diseñado para hacer en familia',
                    duration: 15,
                    calories: 80,
                    difficulty: 'Intermedio',
                    isFavorite: false,
                    categories: ['Fuerza', 'Familiar'],
                    gifUrl: 'https://example.com/family-circuit.gif'
                }
            ],
            totalDuration: 35,
            difficulty: 'Intermedio',
            categories: ['Fuerza', 'Familiar', 'Premium'],
            createdBy: 'tutor-premium-001',
            isPublic: false,
            createdAt: '2024-06-02T14:00:00Z',
            updatedAt: '2024-06-02T14:00:00Z'
        }
    ];
}
