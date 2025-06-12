import { API_CONFIG, buildApiUrl, getApiConfig } from '../../config/api';
import { MOCK_LOADING_DELAY_MS } from '../../constants/exercise';
import { MOCK_EXERCISES } from '../../constants/exerciseMocks';
import { CreateExerciseRequest, Exercise } from '../../types/exercise';
import { exerciseCache, generateCacheKey } from '../../utils/cacheUtils';
import { checkConnectivity, DEFAULT_RETRY_CONFIG, executeWithRetry, getAuthHeaders, handleHttpError } from '../../utils/httpUtils';


/**
 * Simula un delay de red para desarrollo
 */
const simulateDelay = (ms: number = MOCK_LOADING_DELAY_MS): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Crea un ejercicio mock para desarrollo
 */
const createMockExercise = (exerciseData: CreateExerciseRequest): Exercise => {
    return {
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
};

/**
 * Maneja errores de creación de ejercicios
 */
const handleCreateExerciseError = (error: unknown): string => {
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return 'No se pudo conectar con el servidor. Asegúrate de que el backend esté funcionando.';
    }

    if (error instanceof Error) {
        if (error.message.includes('NetworkError') || error.message.includes('ERR_NETWORK')) {
            return 'Error de red. Verifica tu conexión a internet.';
        }
        if (error.message.includes('ERR_CONNECTION_REFUSED')) {
            return 'El servidor no está disponible. Contacta al administrador.';
        }
        return error.message;
    }

    return 'Error desconocido al crear ejercicio';
};

// ============================================================================
// Core API Functions
// ============================================================================

/**
 * Obtiene todos los ejercicios
 * En el futuro, esto será una llamada real a la API
 */
export const getExercises = async (): Promise<Exercise[]> => {
    await simulateDelay();

    try {
        // Validar que no hay IDs duplicados
        const ids = MOCK_EXERCISES.map((ex: Exercise) => ex.id);
        const uniqueIds = new Set(ids);

        if (ids.length !== uniqueIds.size) {
            console.warn('Ejercicios con IDs duplicados detectados');
        }

        return MOCK_EXERCISES;
    } catch (err) {
        console.error('Error loading exercises:', err);
        throw new Error('Error al cargar ejercicios');
    }
};

/**
 * Crear un nuevo ejercicio con retry logic y verificación de conectividad
 */
export const createExercise = async (exerciseData: CreateExerciseRequest): Promise<Exercise> => {
    const config = getApiConfig();

    // Simular delay de red si está configurado
    if (config.SIMULATE_NETWORK_DELAY) {
        await simulateDelay(config.DELAY_MS);
    }

    try {
        if (config.USE_MOCK_DATA) {
            // Modo desarrollo: usar datos simulados
            if (config.ENABLE_API_LOGS) {
                console.log('🔧 [DEV] Simulando creación de ejercicio:', exerciseData);
            }

            const mockExercise = createMockExercise(exerciseData);
            return mockExercise;
        }

        // Verificar conectividad antes de intentar la petición
        const isConnected = await checkConnectivity();
        if (!isConnected) {
            throw new Error('No hay conexión a internet. Verifica tu conexión y vuelve a intentar.');
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
        invalidateExerciseCache();

        return newExercise;
    } catch (error) {
        const config = getApiConfig();
        if (config.ENABLE_API_LOGS) {
            console.error('❌ Error creating exercise:', error);
        }

        const errorMessage = handleCreateExerciseError(error);
        throw new Error(errorMessage);
    }
};

// ============================================================================
// Cache Management
// ============================================================================

/**
 * Invalidar cache de ejercicios después de mutaciones
 */
export const invalidateExerciseCache = (): void => {
    const cacheKeys = exerciseCache.getStats().keys;
    cacheKeys.forEach(key => {
        if (key.includes('exercises')) {
            exerciseCache.delete(key);
        }
    });
};

/**
 * Obtener ejercicios con cache
 */
export const getCachedExercises = async (): Promise<Exercise[]> => {
    const cacheKey = generateCacheKey('exercises');

    // Intentar obtener del cache primero
    const cachedData = exerciseCache.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // Si no está en cache, obtener y guardar
    const exercises = await getExercises();
    exerciseCache.set(cacheKey, exercises);

    return exercises;
};

// ============================================================================
// Local Storage Management
// ============================================================================

/**
 * Guarda los IDs de ejercicios favoritos en localStorage
 */
export const saveFavorites = (favoriteIds: number[]): void => {
    try {
        localStorage.setItem('exercise-favorites', JSON.stringify(favoriteIds));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

/**
 * Carga los IDs de ejercicios favoritos desde localStorage
 */
export const loadFavorites = (): number[] => {
    try {
        const saved = localStorage.getItem('exercise-favorites');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
    }
};

/**
 * Aplica los favoritos cargados a la lista de ejercicios
 */
export const applyFavorites = (exercises: Exercise[]): Exercise[] => {
    const favoriteIds = loadFavorites();
    return exercises.map(exercise => ({
        ...exercise,
        isFavorite: favoriteIds.includes(exercise.id)
    }));
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Valida que un ejercicio tenga todos los campos requeridos
 */
export const validateExercise = (exercise: Partial<Exercise>): exercise is Exercise => {
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
};

/**
 * Validar y transformar datos antes de enviar a la API
 */
export const validateCreateExerciseData = (data: any): CreateExerciseRequest => {
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
};

// ============================================================================
// Legacy Class Support (Deprecated)
// ============================================================================

/**
 * @deprecated Use individual functions instead
 * Mantener por compatibilidad hacia atrás
 */
export class ExerciseService {
    static async getExercises(): Promise<Exercise[]> {
        return getExercises();
    }

    static saveFavorites(favoriteIds: number[]): void {
        return saveFavorites(favoriteIds);
    }

    static loadFavorites(): number[] {
        return loadFavorites();
    }

    static applyFavorites(exercises: Exercise[]): Exercise[] {
        return applyFavorites(exercises);
    }

    static validateExercise(exercise: Partial<Exercise>): exercise is Exercise {
        return validateExercise(exercise);
    }

    static async createExercise(exerciseData: CreateExerciseRequest): Promise<Exercise> {
        return createExercise(exerciseData);
    }

    static invalidateExerciseCache(): void {
        return invalidateExerciseCache();
    }

    static async getCachedExercises(): Promise<Exercise[]> {
        return getCachedExercises();
    }

    static validateCreateExerciseData(data: any): CreateExerciseRequest {
        return validateCreateExerciseData(data);
    }
}
