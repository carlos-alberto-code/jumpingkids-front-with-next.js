import { MOCK_LOADING_DELAY_MS } from '../../constants/exercise';
import { MOCK_EXERCISES } from '../../constants/exerciseMocks';
import { Exercise } from '../../types/exercise';

export class ExerciseService {
    /**
     * Obtiene todos los ejercicios
     * En el futuro, esto será una llamada real a la API
     */
    static async getExercises(): Promise<Exercise[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Validar que no hay IDs duplicados
                    const ids = MOCK_EXERCISES.map((ex: Exercise) => ex.id);
                    const uniqueIds = new Set(ids);

                    if (ids.length !== uniqueIds.size) {
                        console.warn('Ejercicios con IDs duplicados detectados');
                    }

                    resolve(MOCK_EXERCISES);
                } catch (err) {
                    console.error('Error loading exercises:', err);
                    reject(new Error('Error al cargar ejercicios'));
                }
            }, MOCK_LOADING_DELAY_MS);
        });
    }

    /**
     * Guarda los IDs de ejercicios favoritos en localStorage
     */
    static saveFavorites(favoriteIds: number[]): void {
        try {
            localStorage.setItem('exercise-favorites', JSON.stringify(favoriteIds));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    /**
     * Carga los IDs de ejercicios favoritos desde localStorage
     */
    static loadFavorites(): number[] {
        try {
            const saved = localStorage.getItem('exercise-favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    /**
     * Aplica los favoritos cargados a la lista de ejercicios
     */
    static applyFavorites(exercises: Exercise[]): Exercise[] {
        const favoriteIds = this.loadFavorites();
        return exercises.map(exercise => ({
            ...exercise,
            isFavorite: favoriteIds.includes(exercise.id)
        }));
    }

    /**
     * Valida que un ejercicio tenga todos los campos requeridos
     */
    static validateExercise(exercise: Partial<Exercise>): exercise is Exercise {
        return !!(
            exercise.id &&
            exercise.title &&
            exercise.categories &&
            exercise.difficulty &&
            exercise.duration &&
            exercise.calories &&
            exercise.gifUrl &&
            exercise.description &&
            typeof exercise.isFavorite === 'boolean'
        );
    }
}
