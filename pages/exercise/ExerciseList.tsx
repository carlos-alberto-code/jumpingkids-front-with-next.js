import {
  FilterListOff as FilterListOffIcon,
  FitnessCenter as FitnessCenterIcon,
  SearchOff as SearchOffIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import ExerciseCard from './ExerciseCard';
import { Exercise, ExerciseListProps } from './types';

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  viewMode,
  loading = false,
  onToggleFavorite,
  onCardClick,
  onClearFilters
}) => {
  const theme = useTheme();

  // Determinar configuración de grid basado en viewMode y breakpoints
  const getGridSizeConfig = () => {
    if (viewMode === 'single') {
      return { xs: 12 }; // Siempre 1 columna
    }

    return {
      xs: 12,  // 1 columna en móvil
      sm: 6    // 2 columnas en tablet y desktop
    };
  };

  // Renderizar skeleton loader
  const renderSkeletons = () => {
    const skeletonCount = 6;
    const gridSizeConfig = getGridSizeConfig();

    return Array.from({ length: skeletonCount }).map((_, index) => (
      <Grid size={gridSizeConfig} key={`skeleton-${index}`}>
        <Box
          sx={{
            p: 2,
            borderRadius: theme.shape.borderRadius * 2.25, // 18px como en ExerciseCard
            border: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Skeleton para imagen */}
            <Skeleton
              variant="rectangular"
              width={96}
              height={96}
              sx={{
                borderRadius: theme.shape.borderRadius,
                mr: 2,
                flexShrink: 0
              }}
            />

            {/* Skeleton para contenido */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={70} height={20} />
                <Skeleton variant="rounded" width={90} height={20} />
              </Box>
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>

            {/* Skeleton para botón favorito */}
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{ ml: 2, flexShrink: 0 }}
            />
          </Box>
        </Box>
      </Grid>
    ));
  };

  // Renderizar estado vacío
  const renderEmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
        minHeight: 300
      }}
    >
      <SearchOffIcon
        sx={{
          fontSize: 64,
          color: theme.palette.grey[400],
          mb: 2
        }}
      />
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 1,
          color: theme.palette.text.secondary,
          fontWeight: 500
        }}
      >
        No se encontraron ejercicios
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: theme.palette.text.secondary,
          maxWidth: 400
        }}
      >
        Intenta ajustar tus filtros o términos de búsqueda para encontrar más ejercicios.
      </Typography>
      {onClearFilters && (
        <Button
          variant="outlined"
          startIcon={<FilterListOffIcon />}
          onClick={onClearFilters}
          sx={{ mt: 1 }}
        >
          Limpiar filtros
        </Button>
      )}
    </Box>
  );

  // Renderizar contador de resultados
  const renderResultsCounter = () => {
    if (loading || exercises.length === 0) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          gap: 1
        }}
      >
        <FitnessCenterIcon
          sx={{
            fontSize: 20,
            color: theme.palette.primary.main
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          {exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''} encontrado{exercises.length !== 1 ? 's' : ''}
        </Typography>
      </Box>
    );
  };

  // Renderizar lista de ejercicios
  const renderExercises = () => {
    const gridSizeConfig = getGridSizeConfig();

    return (
      <Grid container spacing={2}>
        {exercises.map((exercise: Exercise) => (
          <Grid size={gridSizeConfig} key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              onToggleFavorite={onToggleFavorite}
              onCardClick={onCardClick}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container
      maxWidth={viewMode === 'single' ? 'md' : 'lg'}
      sx={{
        px: { xs: 2, sm: 3 },
        width: '100%'
      }}
    >
      {/* Contador de resultados */}
      {renderResultsCounter()}

      {/* Contenido principal */}
      <Box sx={{ width: '100%' }}>
        {loading ? (
          <Grid container spacing={2}>
            {renderSkeletons()}
          </Grid>
        ) : exercises.length === 0 ? (
          renderEmptyState()
        ) : (
          renderExercises()
        )}
      </Box>
    </Container>
  );
};

export default ExerciseList;