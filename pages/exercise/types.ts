interface Exercise {
  id: number;
  title: string;
  categories: string[];
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: number; // En minutos
  calories: number;
  gifUrl: string;
  description: string;
  isFavorite?: boolean;
}