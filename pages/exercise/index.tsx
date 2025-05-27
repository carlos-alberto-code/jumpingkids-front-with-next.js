import { Box } from '@mui/material';
import { useState } from 'react';
import {
  ExerciseDetailModal,
  ExerciseFilter,
  ExerciseList,
  useExerciseFilters,
  useExercises,
  type Exercise,
  type ViewMode
} from '../../src/components/exercise';

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

  // Estado para el modal de detalle
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Handlers
  const handleCardClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExercise(null);
  };

  const handleModalToggleFavorite = (exerciseId: number) => {
    toggleFavorite(exerciseId);
    // Sincronizar ejercicio seleccionado
    if (selectedExercise?.id === exerciseId) {
      setSelectedExercise((prev: Exercise | null) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
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

      {/* Modal de detalle */}
      <ExerciseDetailModal
        open={modalOpen}
        exercise={selectedExercise}
        onClose={handleCloseModal}
        onToggleFavorite={handleModalToggleFavorite}
      />
    </Box>
  );
}