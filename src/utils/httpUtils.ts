/**
 * Utilidades para manejar autenticación en las peticiones HTTP
 */

/**
 * Obtener token de autenticación desde la sesión guardada
 */
export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        try {
            const sessionData = localStorage.getItem('jumpingkids-session');
            if (sessionData) {
                const session = JSON.parse(sessionData);
                return session.token || null;
            }
        } catch (error) {
            console.warn('Error al obtener token de auth:', error);
        }
    }
    return null;
};

/**
 * Headers base para peticiones autenticadas
 */
export const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

/**
 * Manejar errores de respuesta HTTP
 */
export const handleHttpError = (response: Response): never => {
    if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
    }

    if (response.status === 403) {
        throw new Error('No tienes permisos para realizar esta acción.');
    }

    if (response.status === 404) {
        throw new Error('Recurso no encontrado.');
    }

    if (response.status >= 500) {
        throw new Error('Error interno del servidor. Intenta nuevamente más tarde.');
    }

    throw new Error(`Error ${response.status}: ${response.statusText}`);
};

/**
 * Configuración para reintentos de peticiones HTTP
 */
export interface RetryConfig {
    maxRetries: number;
    baseDelay: number; // en milisegundos
    maxDelay: number;
    retryableStatuses: number[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    retryableStatuses: [500, 502, 503, 504, 408, 429]
};

/**
 * Implementa exponential backoff para reintentos
 */
export const calculateRetryDelay = (attempt: number, config: RetryConfig): number => {
    const delay = config.baseDelay * Math.pow(2, attempt - 1);
    return Math.min(delay, config.maxDelay);
};

/**
 * Verifica si una respuesta HTTP es reintentable
 */
export const isRetryableError = (status?: number, config: RetryConfig = DEFAULT_RETRY_CONFIG): boolean => {
    if (!status) return true; // Network errors
    return config.retryableStatuses.includes(status);
};

/**
 * Ejecuta una petición HTTP con retry logic
 */
export const executeWithRetry = async <T>(
    requestFn: () => Promise<T>,
    config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> => {
    let lastError: Error = new Error('Request failed');

    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');

            // Si es el último intento, lanzar el error
            if (attempt > config.maxRetries) {
                break;
            }

            // Verificar si el error es reintentable
            const status = getErrorStatus(error);
            if (!isRetryableError(status, config)) {
                break;
            }

            // Esperar antes del siguiente intento
            const delay = calculateRetryDelay(attempt, config);
            console.warn(`Retry attempt ${attempt}/${config.maxRetries} after ${delay}ms delay`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
};

/**
 * Extrae el status code de un error HTTP
 */
const getErrorStatus = (error: any): number | undefined => {
    if (error?.response?.status) return error.response.status;
    if (error?.status) return error.status;
    return undefined;
};

/**
 * Verifica la conectividad básica del cliente
 */
export const checkConnectivity = async (): Promise<boolean> => {
    try {
        // Usar navigator.onLine como primera verificación
        if (!navigator.onLine) {
            return false;
        }

        // Intentar un request simple para verificar conectividad real
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch('/api/health', {
            method: 'HEAD',
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        return true;
    } catch {
        return false;
    }
};
