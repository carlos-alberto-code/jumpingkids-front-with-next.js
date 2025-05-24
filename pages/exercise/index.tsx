import * as React from 'react';
import Box from '@mui/material/Box';
import ExerciseCard from './ExerciseCard';

export default function ExercisePage() {
  return (
    <Box sx={{ 
      p: 1, 
      display: "container",
      flexWrap: 'wrap',
      // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 2 // Adds space between exercise cards
    }}>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: "Principiante",
            isFavorite: true,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Toggled favorite for exercise ${id}`)}
        onCardClick={(id) => console.log(`Clicked on exercise ${id}`)}
      ></ExerciseCard>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: 'Intermedio',
            isFavorite: false,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Toggled favorite for exercise ${id}`)}
        onCardClick={(id) => console.log(`Clicked on exercise ${id}`)}
      ></ExerciseCard>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: "Avanzado",
            isFavorite: false,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Agregado a favoritos ${id}`)}
        onCardClick={(id) => console.log(`Click en el ejercicio ${id}`)}
      ></ExerciseCard>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: 'Intermedio',
            isFavorite: false,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Toggled favorite for exercise ${id}`)}
        onCardClick={(id) => console.log(`Clicked on exercise ${id}`)}
      ></ExerciseCard>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: 'Intermedio',
            isFavorite: false,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Toggled favorite for exercise ${id}`)}
        onCardClick={(id) => console.log(`Clicked on exercise ${id}`)}
      ></ExerciseCard>
      <ExerciseCard
        exercise={
          {
            id: 1,
            title: 'Lagartijas',
            description: 'Un ejercicio clásico para fortalecer el pecho, hombros y tríceps. Realiza lagartijas con las manos a la altura de los hombros y el cuerpo recto.',
            duration: '10 min',
            calories: 50,
            difficulty: 'Intermedio',
            isFavorite: false,
            categories: ['Fuerza', 'Cuerpo Completo', 'Calistenia'],
            gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
          }
        }
        onToggleFavorite={(id) => console.log(`Toggled favorite for exercise ${id}`)}
        onCardClick={(id) => console.log(`Clicked on exercise ${id}`)}
      ></ExerciseCard>
      
    </Box>
  );
}