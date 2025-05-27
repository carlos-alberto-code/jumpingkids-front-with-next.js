import {
  AccessTime,
  Close as CloseIcon,
  Favorite,
  FavoriteBorder,
  FitnessCenter,
  LocalFireDepartment
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import type { Exercise, ExerciseDetailModalProps } from '../../types/exercise';

// ✨ Styled component para personalizar el Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  open,
  exercise,
  onClose,
  onToggleFavorite
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!exercise) return null;

  const handleToggleFavorite = () => {
    onToggleFavorite(exercise.id);
  };

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'Principiante': return 'success';
      case 'Intermedio': return 'warning';
      case 'Avanzado': return 'error';
      default: return 'default';
    }
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="exercise-detail-title"
      aria-describedby="exercise-detail-description"
      open={open}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      {/* Header */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="exercise-detail-title">
        {exercise.title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      {/* Content */}
      <DialogContent dividers id="exercise-detail-description">
        {/* GIF grande centrado */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src={exercise.gifUrl}
            alt={exercise.title}
            sx={{
              maxWidth: '100%',
              maxHeight: 300,
              width: 'auto',
              height: 'auto',
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[4],
            }}
          />
        </Box>

        {/* Descripción completa */}
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
          {exercise.description}
        </Typography>

        {/* Información en grid */}
        <Grid container spacing={3}>
          {/* Categorías */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Categorías
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {exercise.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Métricas */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Información del ejercicio
            </Typography>
            <Grid container spacing={2}>
              {/* Duración */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Duración
                    </Typography>
                    <Typography variant="h6">
                      {exercise.duration} min
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Calorías */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalFireDepartment sx={{ color: theme.palette.warning.main }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Calorías
                    </Typography>
                    <Typography variant="h6">
                      {exercise.calories} cal
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Dificultad */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FitnessCenter color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Dificultad
                    </Typography>
                    <Chip
                      label={exercise.difficulty}
                      color={getDifficultyColor(exercise.difficulty)}
                      size="small"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button
          onClick={handleToggleFavorite}
          startIcon={exercise.isFavorite ? <Favorite /> : <FavoriteBorder />}
          color={exercise.isFavorite ? 'error' : 'primary'}
          variant={exercise.isFavorite ? 'contained' : 'outlined'}
        >
          {exercise.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default React.memo(ExerciseDetailModal);
