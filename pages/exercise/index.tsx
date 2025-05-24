import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ExerciseCard from './ExerciseCard';

export default function ExercisePage() {
  return (
    <Box sx={{ p: 2 }}>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
      <ExerciseCard
        title="Levantamiento de Pesas"
        description="Un ejercicio de fuerza que implica levantar pesas para desarrollar la masa muscular y la fuerza."
        tags={['Fuerza', 'Yoga', 'Resistencia', 'Cardio']}
      ></ExerciseCard>
    </Box>
  );
}