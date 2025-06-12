import { Exercise } from '../types/exercise';

// Datos mock más variados para testing
export const MOCK_EXERCISES: Exercise[] = [
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
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif',
    createdBy: 'tutor-premium-001' // Ejercicio creado por Carlos (tutor premium)
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
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif',
    createdBy: 'tutor-free-001' // Ejercicio creado por Ana (tutor free)
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
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif',
    createdBy: 'tutor-premium-001' // Ejercicio creado por Carlos (tutor premium)
  },
  {
    id: 10,
    title: 'Yoga Saludo al Sol - Variación 1',
    description: 'Secuencia de posturas de yoga que estira y fortalece todo el cuerpo mejorando la flexibilidad.',
    duration: 25,
    calories: 60,
    difficulty: 'Intermedio',
    isFavorite: true,
    categories: ['Flexibilidad', 'Movilidad', 'Bienestar'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  },
  {
    id: 11,
    title: 'Yoga Saludo al Sol - Variación 2',
    description: 'Secuencia de posturas de yoga que estira y fortalece todo el cuerpo mejorando la flexibilidad.',
    duration: 25,
    calories: 60,
    difficulty: 'Intermedio',
    isFavorite: true,
    categories: ['Flexibilidad', 'Movilidad', 'Bienestar'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif',
    createdBy: 'tutor-free-001' // Ejercicio creado por Ana (tutor free)
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
  },
  {
    id: 9,
    title: 'Correr en el Lugar',
    description: 'Ejercicio cardiovascular simple que se puede hacer en casa. Corre en el lugar levantando las rodillas.',
    duration: 30,
    calories: 100,
    difficulty: 'Principiante',
    isFavorite: false,
    categories: ['Cardio', 'Cuerpo Completo'],
    gifUrl: 'https://1.bp.blogspot.com/-_4R4WLvGHIw/X4dxNpQOh3I/AAAAAAAAZOY/9io_-OLTL8gQNFFuGkIlCUNLFniqyJrEACLcBGAsYHQ/s818/lagartijasweb.gif'
  }
];