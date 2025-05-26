import { Box } from '@mui/material';
import { useState } from 'react';
import ExerciseFilter from './ExerciseFilter';
import ExerciseList from './ExerciseList';
import { useExerciseFilters } from './hooks/useExerciseFilters';
import { useExercises } from './hooks/useExercises';
import { Exercise, ViewMode } from './types';

export default function ExercisePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('double');

  // Custom hooks para separar responsabilidades
  const { exercises, loading, error, toggleFavorite } = useExercises();
  const {
    filters,
    setFilters,
    availableCategories,
    filteredExercises,
    clearFilters
  } = useExerciseFilters(exercises);

  // Handlers simplificados
  const handleCardClick = (exercise: Exercise) => {
    console.log('Clicked on exercise:', exercise.title);
    // Aquí podrías navegar a una página de detalle del ejercicio
    // o abrir la pantalla de asignaciones/workout con este ejercicio
  };

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        {error}
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      {/* Filtros */}
      <ExerciseFilter
        onFiltersChange={setFilters}
        onViewModeChange={setViewMode}
        currentFilters={filters}
        currentViewMode={viewMode}
        availableCategories={availableCategories}
      />

      {/* Lista de ejercicios */}
      <ExerciseList
        exercises={filteredExercises}
        viewMode={viewMode}
        loading={loading}
        onToggleFavorite={toggleFavorite}
        onCardClick={handleCardClick}
        onClearFilters={clearFilters}
      />
    </Box>
  );
}