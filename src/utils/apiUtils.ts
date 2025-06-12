// src/utils/apiUtils.ts
/**
 * Utilidades para APIs - Funciones faltantes y de soporte
 */

// ============================================================================
// Retry Logic
// ============================================================================

export interface RetryConfig {
    maxRetries: number;
    delayMs: number;
    backoffFactor?: number;
    retryableErrors?: string[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    delayMs: 1000,
    backoffFactor: 2,
    retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_REFUSED']
};

/**
 * Ejecuta una función con retry logic
 */
export const executeWithRetry = async <T>(
    fn: () => Promise<T>,
    config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> => {
    let lastError: Error = new Error('Unknown error');

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
        try {
            const result = await fn();
            if (attempt > 0) {
                console.log(`✅ Exitoso después de ${attempt} reintentos`);
            }
            return result;

        } catch (error) {
            lastError = error as Error;

            console.warn(`❌ Intento ${attempt + 1}/${config.maxRetries + 1} falló:`, {
                error: lastError.message,
                attempt: attempt + 1
            });

            // Si es el último intento, lanzar error
            if (attempt === config.maxRetries) {
                break;
            }

            // Verificar si el error es reintentable
            if (config.retryableErrors && !config.retryableErrors.some(err =>
                lastError.message.includes(err)
            )) {
                console.log('❌ Error no reintentable, abortando');
                break;
            }

            // Delay con backoff exponencial
            const delay = config.delayMs * Math.pow(config.backoffFactor || 2, attempt);
            console.log(`⏳ Esperando ${delay}ms antes del siguiente intento...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
};

// ============================================================================
// Connectivity Check
// ============================================================================

/**
 * Verifica conectividad básica
 */
export const checkConnectivity = async (): Promise<boolean> => {
    try {
        // Verificar si tenemos conexión a internet
        if (!navigator.onLine) {
            return false;
        }

        // Verificar conexión con nuestro backend usando AbortController para timeout
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(`${apiUrl}/health`, {
                method: 'HEAD',
                cache: 'no-cache',
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response.ok;
        } catch {
            clearTimeout(timeoutId);
            throw new Error('Backend not reachable');
        }
    } catch {
        // Si falla la conexión al backend, intentar con un servicio externo
        try {
            await fetch('https://8.8.8.8', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            });
            return true;
        } catch {
            return false;
        }
    }
};

// ============================================================================
// HTTP Utils
// ============================================================================

/**
 * Headers por defecto para requests
 */
export const getDefaultHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    // Agregar token de autenticación si existe
    if (typeof window !== 'undefined') {
        try {
            const sessionData = localStorage.getItem('jumpingkids-session');
            if (sessionData) {
                const session = JSON.parse(sessionData);
                if (session.token) {
                    headers['Authorization'] = `Bearer ${session.token}`;
                }
            }
        } catch (error) {
            console.warn('❌ Error obteniendo token de auth:', error);
        }
    }

    return headers;
};

/**
 * Manejo de errores HTTP estandarizado
 */
export const handleHttpError = (error: any): Error => {
    // Error de red
    if (!error.response && (error.code === 'ECONNREFUSED' || !navigator.onLine)) {
        return new Error('Error de conexión - verifica que el servidor esté ejecutándose');
    }

    // Error con respuesta del servidor
    if (error.response?.data?.message) {
        return new Error(error.response.data.message);
    }

    // Errores HTTP estándar
    if (error.response?.status) {
        const statusMessages: Record<number, string> = {
            400: 'Datos inválidos',
            401: 'No autorizado',
            403: 'Acceso denegado',
            404: 'Recurso no encontrado',
            409: 'Conflicto - el recurso ya existe',
            422: 'Datos de validación incorrectos',
            500: 'Error interno del servidor',
            503: 'Servicio no disponible'
        };

        return new Error(statusMessages[error.response.status] || 'Error del servidor');
    }

    return new Error(error.message || 'Error desconocido');
};

// ============================================================================
// Environment Utils
// ============================================================================

/**
 * Obtiene configuración del entorno actual
 */
export const getEnvironmentConfig = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
    const debugMode = process.env.NEXT_PUBLIC_DEBUG === 'true';

    return {
        isDevelopment,
        isProduction,
        useMock,
        debugMode,
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
    };
};
