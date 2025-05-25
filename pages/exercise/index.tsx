import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import ExerciseFilter from './ExerciseFilter';
import ExerciseList from './ExerciseList';

// Datos mock más variados para testing
const MOCK_EXERCISES: Exercise[] = [
  {
    id: 1,
    title: 'Lagartijas Clásicas',
    description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
    duration: 10,
    calories: 50,
    difficulty: 'Principiante',
    isFavorite: true,
    categories: ['Fuerza', 'Cuerpo Completo'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 2,
    title: 'Sentadillas',
    description: 'Ejercicio fundamental para fortalecer las piernas y glúteos. Mantén la espalda recta y baja hasta que los muslos estén paralelos al suelo.',
    duration: 15,
    calories: 75,
    difficulty: 'Principiante',
    isFavorite: false,
    categories: ['Fuerza', 'Piernas'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 3,
    title: 'Plancha Isométrica',
    description: 'Ejercicio de core que fortalece el abdomen, espalda y hombros. Mantén el cuerpo recto como una tabla.',
    duration: 8,
    calories: 40,
    difficulty: 'Intermedio',
    isFavorite: true,
    categories: ['Core', 'Fuerza'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 4,
    title: 'Jumping Jacks',
    description: 'Ejercicio cardiovascular que activa todo el cuerpo. Salta abriendo piernas y brazos simultáneamente.',
    duration: 12,
    calories: 80,
    difficulty: 'Intermedio',
    isFavorite: false,
    categories: ['Cardio', 'Cuerpo Completo'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 5,
    title: 'Burpees',
    description: 'Ejercicio de cuerpo completo de alta intensidad. Combina sentadilla, plancha, lagartija y salto.',
    duration: 20,
    calories: 150,
    difficulty: 'Avanzado',
    isFavorite: true,
    categories: ['Cardio', 'Fuerza', 'Cuerpo Completo'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 6,
    title: 'Estiramiento de Gato',
    description: 'Ejercicio de flexibilidad para la columna vertebral. Alterna entre arquear y redondear la espalda.',
    duration: 5,
    calories: 15,
    difficulty: 'Principiante',
    isFavorite: false,
    categories: ['Flexibilidad', 'Movilidad'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 7,
    title: 'Mountain Climbers',
    description: 'Ejercicio cardiovascular de alta intensidad que trabaja core, brazos y piernas alternadamente.',
    duration: 18,
    calories: 120,
    difficulty: 'Avanzado',
    isFavorite: false,
    categories: ['Cardio', 'Core'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 8,
    title: 'Yoga Saludo al Sol',
    description: 'Secuencia de posturas de yoga que estira y fortalece todo el cuerpo mejorando la flexibilidad.',
    duration: 25,
    calories: 60,
    difficulty: 'Intermedio',
    isFavorite: true,
    categories: ['Flexibilidad', 'Movilidad', 'Bienestar'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  }
];

export default function ExercisePage() {
  // Estado principal de la página
  const [exercises, setExercises] = useState<Exercise[]>(MOCK_EXERCISES);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>('double');
  const [loading, setLoading] = useState(false);

  // Simulación de carga inicial (preparación para futura API)
  useEffect(() => {
    setLoading(true);
    // Simular delay de API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Cálculo de categorías únicas disponibles
  const availableCategories = useMemo(() => {
    const allCategories = exercises.flatMap(exercise => exercise.categories);
    return Array.from(new Set(allCategories)).sort();
  }, [exercises]);

  // Lógica de filtrado
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      // Filtro de búsqueda (por título)
      const matchesSearch = exercise.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

      // Filtro por categoría
      const matchesCategory = filters.category === null || 
        exercise.categories.includes(filters.category);

      // Filtro por dificultad
      const matchesDifficulty = filters.difficulty === null || 
        exercise.difficulty === filters.difficulty;

      // Filtro por favoritos
      const matchesFavorite = (() => {
        switch (filters.favoriteFilter) {
          case 'favorites':
            return exercise.isFavorite === true;
          case 'non-favorites':
            return exercise.isFavorite !== true;
          case 'all':
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorite;
    });
  }, [exercises, filters]);

  // Handlers
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewModeChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode);
  };

  const handleToggleFavorite = (exerciseId: number) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, isFavorite: !exercise.isFavorite }
          : exercise
      )
    );
  };

  const handleCardClick = (exercise: Exercise) => {
    console.log('Clicked on exercise:', exercise.title);
    // Aquí podrías navegar a una página de detalle del ejercicio
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      {/* Filtros */}
      <ExerciseFilter
        onFiltersChange={handleFiltersChange}
        onViewModeChange={handleViewModeChange}
        currentFilters={filters}
        currentViewMode={viewMode}
        availableCategories={availableCategories}
      />

      {/* Lista de ejercicios */}
      <ExerciseList
        exercises={filteredExercises}
        viewMode={viewMode}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
        onCardClick={handleCardClick}
        onClearFilters={handleClearFilters}
      />
    </Box>
  );
}