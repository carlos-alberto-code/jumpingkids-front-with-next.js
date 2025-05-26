// Constantes para la aplicación de ejercicios

// import { FilterState } from './types';

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