// Constantes para la aplicación de ejercicios

import { FilterState } from '../types/exercise';

// Valores por defecto para los filtros
export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: null,
  difficulty: null,
  favoriteFilter: 'all'
};

// Constantes para dificultades disponibles
export const DIFFICULTY_OPTIONS = [
  'Principiante',
  'Intermedio',
  'Avanzado'
] as const;

// Constantes para opciones de filtro de favoritos
export const FAVORITE_FILTER_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'favorites', label: 'Solo favoritos' },
  { value: 'non-favorites', label: 'No favoritos' }
] as const;

// Constantes para modos de vista
export const VIEW_MODE_OPTIONS = [
  { value: 'single', label: 'Una columna' },
  { value: 'double', label: 'Dos columnas' }
] as const;

// Configuración de debounce para búsqueda
export const SEARCH_DEBOUNCE_MS = 300;

// Configuración de simulación de carga (para desarrollo)
export const MOCK_LOADING_DELAY_MS = 1000;

// 📋 CATEGORÍAS DISPONIBLES PARA CREACIÓN
export const AVAILABLE_CATEGORIES = [
  'Cardio',
  'Fuerza',
  'Flexibilidad',
  'Core',
  'Piernas',
  'Brazos',
  'Cuerpo Completo',
  'Movilidad',
  'Equilibrio',
  'Coordinación',
  'Relajación',
  'Bienestar'
];

export const AVAILABLE_EQUIPMENT = [
  'Sin equipo',
  'Colchoneta',
  'Pelota pequeña',
  'Bandas elásticas',
  'Mancuernas ligeras',
  'Cojines',
  'Silla',
  'Pared',
  'Escalón'
];

export const TARGET_AUDIENCE_OPTIONS = [
  { value: 'kids' as const, label: 'Niños (5-12 años)', description: 'Ejercicios adaptados para niños' },
  { value: 'teens' as const, label: 'Adolescentes (13-17 años)', description: 'Ejercicios para teens activos' },
  { value: 'all' as const, label: 'Todas las edades', description: 'Ejercicios universales' }
];

// Valores por defecto para el formulario de crear ejercicio
export const DEFAULT_CREATE_EXERCISE_FORM = {
  title: '',
  description: '',
  duration: 10,
  calories: 50,
  difficulty: 'Principiante' as const,
  categories: [],
  gifUrl: '',
  instructions: [''],
  equipment: ['Sin equipo'],
  targetAudience: 'kids' as const,
  safetyNotes: [''],
  isPublic: false
};