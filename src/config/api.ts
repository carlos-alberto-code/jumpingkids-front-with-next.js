/**
 * Configuración de API para diferentes entornos
 */

export const API_CONFIG = {
    // URL base de la API
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',

    // Endpoints específicos
    ENDPOINTS: {
        EXERCISES: '/exercises',
        AUTH: '/auth',
        USERS: '/users'
    },

    // Configuración de desarrollo
    DEV: {
        // Simular delay de red en desarrollo
        SIMULATE_NETWORK_DELAY: true,
        DELAY_MS: 1000,

        // Logs de desarrollo
        ENABLE_API_LOGS: true,

        // Modo mock (usar datos simulados)
        USE_MOCK_DATA: process.env.NODE_ENV === 'development'
    },

    // Configuración de producción
    PROD: {
        SIMULATE_NETWORK_DELAY: false,
        DELAY_MS: 0,
        ENABLE_API_LOGS: false,
        USE_MOCK_DATA: false
    }
};

/**
 * Obtener configuración actual basada en el entorno
 */
export const getApiConfig = () => {
    const isProd = process.env.NODE_ENV === 'production';
    return isProd ? API_CONFIG.PROD : API_CONFIG.DEV;
};

/**
 * Construir URL completa de endpoint
 */
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};
