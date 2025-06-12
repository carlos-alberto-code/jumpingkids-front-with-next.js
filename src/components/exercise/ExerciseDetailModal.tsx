// src/components/exercise/ExerciseDetailModal.tsx
import {
  AccessTime,
  Close as CloseIcon,
  Favorite,
  FavoriteBorder,
  FitnessCenter,
  LocalFireDepartment
} from '@mui/icons-material';
import {
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
import type { ExerciseDetailModalProps } from '../../types/exercise';

// ✨ Styled component para personalizar el Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: 0, // We'll handle padding in the component
    overflow: 'hidden auto',
  },
  '& .MuiDialogActions-root': {
    padding: 0, // We'll handle padding in the component
  },
  '& .MuiDialog-paper': {
    backgroundImage: 'none',
  },
}));

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  open,
  exercise,
  onClose,
  onToggleFavorite
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); // Changed from 'md' to 'sm' for better mobile experience

  // 🔧 Helper function para obtener color de dificultad de manera segura
  const getDifficultyStyles = (difficulty: string) => {
    // Intentar acceder a colores personalizados, si no existen usar fallbacks
    const customColors = (theme.palette as any).exerciseDifficulty;

    if (customColors) {
      const colorMap: Record<string, { backgroundColor: string; color: string }> = {
        'Principiante': {
          backgroundColor: customColors.beginner,
          color: '#FFFFFF'
        },
        'Intermedio': {
          backgroundColor: customColors.intermediate,
          color: '#FFFFFF'
        },
        'Avanzado': {
          backgroundColor: customColors.advanced,
          color: '#FFFFFF'
        },
      };
      return colorMap[difficulty];
    }

    // Fallbacks seguros usando colores estándar de MUI
    const fallbackMap: Record<string, { backgroundColor: string; color: string }> = {
      'Principiante': {
        backgroundColor: theme.vars?.palette.success.main || theme.palette.success.main,
        color: theme.vars?.palette.success.contrastText || theme.palette.success.contrastText,
      },
      'Intermedio': {
        backgroundColor: theme.vars?.palette.warning.main || theme.palette.warning.main,
        color: theme.vars?.palette.warning.contrastText || theme.palette.warning.contrastText,
      },
      'Avanzado': {
        backgroundColor: theme.vars?.palette.error.main || theme.palette.error.main,
        color: theme.vars?.palette.error.contrastText || theme.palette.error.contrastText,
      },
    };

    return fallbackMap[difficulty] || {
      backgroundColor: theme.vars?.palette.grey[500] || theme.palette.grey[500],
      color: '#FFFFFF'
    };
  };

  if (!exercise) return null;

  const handleToggleFavorite = () => {
    onToggleFavorite(exercise.id);
  };

  const difficultyStyles = getDifficultyStyles(exercise.difficulty);

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="exercise-detail-title"
      aria-describedby="exercise-detail-description"
      open={open}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          borderRadius: fullScreen ? 0 : 2,
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          pr: 6,
          background: `linear-gradient(135deg, ${theme.vars?.palette.primary.main || theme.palette.primary.main}15, ${theme.vars?.palette.secondary.main || theme.palette.secondary.main}10)`,
          borderBottom: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
        }}
        id="exercise-detail-title"
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {exercise.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {exercise.description}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
          color: theme.vars?.palette.grey[500] || theme.palette.grey[500],
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Content */}
      <DialogContent
        dividers
        id="exercise-detail-description"
        sx={{
          p: { xs: 2, sm: 3 },
          overflow: 'auto',
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column - Media and Basic Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* GIF grande centrado */}
            <Box sx={{
              textAlign: 'center',
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'background.default',
              border: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
            }}>
              {exercise.gifUrl ? (
                <Box
                  component="img"
                  src={exercise.gifUrl}
                  alt={exercise.title}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: { xs: 250, sm: 300 },
                    width: 'auto',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: theme.shadows[4],
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: { xs: 250, sm: 300 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'action.hover',
                    borderRadius: 2,
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body1">Imagen no disponible</Typography>
                </Box>
              )}
            </Box>

            {/* Categorías */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                📂 Categorías
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exercise.categories && exercise.categories.length > 0 ? (
                  exercise.categories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      variant="outlined"
                      sx={{
                        borderColor: theme.vars?.palette.primary.main || theme.palette.primary.main,
                        color: theme.vars?.palette.primary.main || theme.palette.primary.main,
                        backgroundColor: `color-mix(in srgb, ${theme.vars?.palette.primary.main || theme.palette.primary.main} 8%, transparent)`,
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: `color-mix(in srgb, ${theme.vars?.palette.primary.main || theme.palette.primary.main} 15%, transparent)`,
                        }
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Sin categorías asignadas
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Metrics and Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Métricas principales */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                📊 Información del ejercicio
              </Typography>
              <Grid container spacing={2}>
                {/* Duración */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                    border: `1px solid ${theme.vars?.palette.primary.main || theme.palette.primary.main}30`,
                  }}>
                    <AccessTime
                      sx={{
                        color: theme.vars?.palette.primary.main || theme.palette.primary.main,
                        fontSize: 28
                      }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Duración
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {exercise.duration} min
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Calorías */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                    border: `1px solid ${theme.vars?.palette.warning.main || theme.palette.warning.main}30`,
                  }}>
                    <LocalFireDepartment
                      sx={{
                        color: theme.vars?.palette.warning.main || theme.palette.warning.main,
                        fontSize: 28
                      }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Calorías
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {exercise.calories} cal
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Dificultad */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                    border: `1px solid ${difficultyStyles.backgroundColor}50`,
                  }}>
                    <FitnessCenter
                      sx={{
                        color: difficultyStyles.backgroundColor,
                        fontSize: 28
                      }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Dificultad
                      </Typography>
                      <Chip
                        label={exercise.difficulty}
                        sx={{
                          borderRadius: '8px',
                          backgroundColor: difficultyStyles.backgroundColor,
                          color: difficultyStyles.color,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          height: 32,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Información adicional */}
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.default',
              border: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                💡 Descripción detallada
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                {exercise.description || 'Descripción del ejercicio no disponible.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          borderTop: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
          backgroundColor: 'background.default',
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: 120,
            borderRadius: 2,
          }}
        >
          Cerrar
        </Button>
        <Button
          onClick={handleToggleFavorite}
          startIcon={exercise.isFavorite ? <Favorite /> : <FavoriteBorder />}
          color={exercise.isFavorite ? 'error' : 'primary'}
          variant="contained"
          sx={{
            minWidth: 200,
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[6],
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {exercise.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default React.memo(ExerciseDetailModal);