import { API_CONFIG, buildApiUrl, getApiConfig } from '../../config/api';
import { MOCK_LOADING_DELAY_MS } from '../../constants/exercise';
import { MOCK_EXERCISES } from '../../constants/exerciseMocks';
import { CreateExerciseRequest, Exercise } from '../../types/exercise';
import { exerciseCache, generateCacheKey } from '../../utils/cacheUtils';
import { checkConnectivity, DEFAULT_RETRY_CONFIG, executeWithRetry, getAuthHeaders, handleHttpError } from '../../utils/httpUtils';

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

    /**
     * Crear un nuevo ejercicio con retry logic y verificación de conectividad
     */
    static async createExercise(exerciseData: CreateExerciseRequest): Promise<Exercise> {
        const config = getApiConfig();

        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    if (config.USE_MOCK_DATA) {
                        // Modo desarrollo: usar datos simulados
                        if (config.ENABLE_API_LOGS) {
                            console.log('🔧 [DEV] Simulando creación de ejercicio:', exerciseData);
                        }

                        const mockExercise: Exercise = {
                            id: Date.now(),
                            title: exerciseData.title,
                            description: exerciseData.description,
                            duration: exerciseData.duration,
                            calories: exerciseData.calories,
                            difficulty: exerciseData.difficulty,
                            categories: exerciseData.categories,
                            gifUrl: exerciseData.gifUrl,
                            isFavorite: false
                        };

                        resolve(mockExercise);
                        return;
                    }

                    // Verificar conectividad antes de intentar la petición
                    const isConnected = await checkConnectivity();
                    if (!isConnected) {
                        reject(new Error('No hay conexión a internet. Verifica tu conexión y vuelve a intentar.'));
                        return;
                    }

                    // Modo producción: llamada real a la API con retry logic
                    const apiUrl = buildApiUrl(API_CONFIG.ENDPOINTS.EXERCISES);

                    const requestFn = async () => {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: getAuthHeaders(),
                            body: JSON.stringify(exerciseData)
                        });

                        if (!response.ok) {
                            handleHttpError(response);
                        }

                        return await response.json();
                    };

                    const newExercise = await executeWithRetry(requestFn, {
                        ...DEFAULT_RETRY_CONFIG,
                        maxRetries: 2 // Reducir reintentos para operaciones de escritura
                    });

                    if (config.ENABLE_API_LOGS) {
                        console.log('✅ Ejercicio creado exitosamente:', newExercise);
                    }

                    // Invalidar cache después de crear
                    this.invalidateExerciseCache();

                    resolve(newExercise);
                } catch (error) {
                    const config = getApiConfig();
                    if (config.ENABLE_API_LOGS) {
                        console.error('❌ Error creating exercise:', error);
                    }

                    // Detectar diferentes tipos de errores
                    let errorMessage = 'Error desconocido al crear ejercicio';

                    if (error instanceof TypeError && error.message.includes('fetch')) {
                        errorMessage = 'No se pudo conectar con el servidor. Asegúrate de que el backend esté funcionando.';
                    } else if (error instanceof Error) {
                        if (error.message.includes('NetworkError') || error.message.includes('ERR_NETWORK')) {
                            errorMessage = 'Error de red. Verifica tu conexión a internet.';
                        } else if (error.message.includes('ERR_CONNECTION_REFUSED')) {
                            errorMessage = 'El servidor no está disponible. Contacta al administrador.';
                        } else {
                            errorMessage = error.message;
                        }
                    }

                    reject(new Error(errorMessage));
                }
            }, config.SIMULATE_NETWORK_DELAY ? config.DELAY_MS : 0);
        });
    }

    /**
     * Invalidar cache de ejercicios después de mutaciones
     */
    static invalidateExerciseCache(): void {
        const cacheKeys = exerciseCache.getStats().keys;
        cacheKeys.forEach(key => {
            if (key.includes('exercises')) {
                exerciseCache.delete(key);
            }
        });
    }

    /**
     * Obtener ejercicios con cache
     */
    static async getCachedExercises(): Promise<Exercise[]> {
        const cacheKey = generateCacheKey('exercises');

        // Intentar obtener del cache primero
        const cachedData = exerciseCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Si no está en cache, obtener y guardar
        const exercises = await this.getExercises();
        exerciseCache.set(cacheKey, exercises);

        return exercises;
    }

    /**
     * Validar y transformar datos antes de enviar a la API
     */
    static validateCreateExerciseData(data: any): CreateExerciseRequest {
        // Validar campos requeridos
        if (!data.title?.trim()) {
            throw new Error('El título es requerido');
        }

        if (!data.description?.trim()) {
            throw new Error('La descripción es requerida');
        }

        if (!data.categories || data.categories.length === 0) {
            throw new Error('Selecciona al menos una categoría');
        }

        if (!data.instructions || data.instructions.every((inst: string) => !inst.trim())) {
            throw new Error('Agrega al menos una instrucción');
        }

        // Transformar y limpiar datos
        return {
            title: data.title.trim(),
            description: data.description.trim(),
            duration: Number(data.duration) || 10,
            calories: Number(data.calories) || 50,
            difficulty: data.difficulty || 'Principiante',
            categories: data.categories.filter((cat: string) => cat.trim()),
            gifUrl: data.gifUrl?.trim() || '',
            instructions: data.instructions.filter((inst: string) => inst.trim()),
            equipment: data.equipment || ['Sin equipo'],
            targetAudience: data.targetAudience || 'kids',
            safetyNotes: data.safetyNotes?.filter((note: string) => note.trim()) || [],
            isPublic: Boolean(data.isPublic)
        };
    }
}
