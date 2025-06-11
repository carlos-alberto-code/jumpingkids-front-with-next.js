/**
 * Utilidades para manejar autenticación en las peticiones HTTP
 */

/**
 * Obtener token de autenticación
 * TODO: Implementar según el sistema de auth utilizado
 */
export const getAuthToken = (): string | null => {
    // Por ahora retorna null, se implementará con el sistema de auth
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken') || null;
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
