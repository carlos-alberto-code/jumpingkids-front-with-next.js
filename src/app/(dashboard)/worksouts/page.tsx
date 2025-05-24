// src/app/(dashboard)/workouts/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

// Datos de ejemplo (normalmente vendrían de una API)
const SAMPLE_EXERCISES = [
  {
    id: 1,
    title: 'Push-ups',
    category: 'Fuerza',
    duration: '2:00',
    calories: 15,
    gifUrl: '/api/placeholder/300/200',
    description: 'Ejercicio básico para fortalecer pecho, hombros y tríceps.',
    instructions: [
      'Colócate en posición de plancha',
      'Baja el cuerpo manteniendo la espalda recta',
      'Empuja hacia arriba hasta la posición inicial'
    ]
  },
  {
    id: 2,
    title: 'Squats',
    category: 'Piernas',
    duration: '1:30',
    calories: 12,
    gifUrl: '/api/placeholder/300/200',
    description: 'Ejercicio fundamental para fortalecer cuádriceps y glúteos.',
    instructions: [
      'De pie con pies separados al ancho de hombros',
      'Baja como si fueras a sentarte',
      'Regresa a la posición inicial'
    ]
  },
  {
    id: 3,
    title: 'Mountain Climbers',
    category: 'Cardio',
    duration: '1:00',
    calories: 20,
    gifUrl: '/api/placeholder/300/200',
    description: 'Ejercicio de alta intensidad para todo el cuerpo.',
    instructions: [
      'Posición de plancha alta',
      'Alterna llevando rodillas al pecho',
      'Mantén el ritmo constante'
    ]
  }
];

interface Exercise {
  id: number;
  title: string;
  category: string;
  duration: string;
  calories: number;
  gifUrl: string;
  description: string;
  instructions: string[];
}

export default function WorkoutsPage() {
  const theme = useTheme();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(SAMPLE_EXERCISES[0]);
  const [pendingExercises, setPendingExercises] = useState<Exercise[]>(SAMPLE_EXERCISES);
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState('2:00');

  const handleSelectExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
  };

  const handleCompleteExercise = () => {
    if (currentExercise) {
      // Remover de pendientes
      const newPending = pendingExercises.filter(ex => ex.id !== currentExercise.id);
      setPendingExercises(newPending);
      
      // Añadir a completados
      setCompletedExercises([...completedExercises, currentExercise]);
      
      // Seleccionar siguiente ejercicio si existe
      if (newPending.length > 0) {
        setCurrentExercise(newPending[0]);
      } else {
        setCurrentExercise(null);
      }
    }
  };

  const calculateProgress = () => {
    const total = SAMPLE_EXERCISES.length;
    const completed = completedExercises.length;
    return (completed / total) * 100;
  };

  const calculateBurnedCalories = () => {
    return completedExercises.reduce((total, ex) => total + ex.calories, 0);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Mis Ejercicios
      </Typography>

      <Grid container spacing={3}>
        {/* Área de Trabajo Principal - 65% */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              {currentExercise ? (
                <>
                  {/* Header del Ejercicio */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {currentExercise.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip 
                        label={currentExercise.category} 
                        color="primary" 
                        size="small"
                      />
                      <Chip 
                        label={`${currentExercise.duration} min`} 
                        variant="outlined" 
                        size="small"
                      />
                      <Chip 
                        label={`${currentExercise.calories} cal`} 
                        color="success" 
                        size="small"
                      />
                    </Stack>
                  </Box>

                  {/* Visualizador de GIF */}
                  <Box sx={{ 
                    mb: 3, 
                    textAlign: 'center',
                    bgcolor: theme.palette.grey[100],
                    borderRadius: theme.shape.borderRadius,
                    p: 4,
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      GIF del Ejercicio
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentExercise.title}
                    </Typography>
                  </Box>

                  {/* Descripción e Instrucciones */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" paragraph>
                      {currentExercise.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Instrucciones:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {currentExercise.instructions.map((instruction, index) => (
                        <Box component="li" key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2">{instruction}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Panel de Control */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: theme.palette.grey[50],
                    borderRadius: theme.shape.borderRadius,
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>
                        {currentTime}
                      </Typography>
                      <IconButton 
                        onClick={() => setTimerRunning(!timerRunning)}
                        color="primary"
                      >
                        {timerRunning ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={handleCompleteExercise}
                    >
                      Completar Ejercicio
                    </Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    ¡Felicitaciones! Has completado todos los ejercicios 🎉
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Panel Derecho - 35% */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Indicador de Progreso */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progreso General
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress()} 
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary">
                {completedExercises.length} de {SAMPLE_EXERCISES.length} ejercicios completados
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                🔥 {calculateBurnedCalories()} calorías quemadas
              </Typography>
            </CardContent>
          </Card>

          {/* Lista de Ejercicios */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ejercicios Pendientes
              </Typography>
              <Stack spacing={2}>
                {pendingExercises.map((exercise) => (
                  <Card 
                    key={exercise.id} 
                    variant="outlined"
                    sx={{ 
                      cursor: 'pointer',
                      border: currentExercise?.id === exercise.id ? 
                        `2px solid ${theme.palette.primary.main}` : undefined,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      transition: theme.transitions.create(['background-color', 'border'], {
                        duration: theme.transitions.duration.short,
                      }),
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            {exercise.title}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label={exercise.category} size="small" />
                            <Chip label={exercise.duration} variant="outlined" size="small" />
                          </Stack>
                        </Box>
                        <IconButton
                          color="primary"
                          onClick={() => handleSelectExercise(exercise)}
                          sx={{ ml: 1 }}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}