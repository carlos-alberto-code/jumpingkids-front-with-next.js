
/**
 * Tipos de errores específicos de la aplicación
 */
export enum ErrorType {
    NETWORK_ERROR = 'NETWORK_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Clase de error personalizada para la aplicación
 */
export class AppError extends Error {
    public type: ErrorType;
    public statusCode?: number;
    public originalError?: Error;

    constructor(
        message: string,
        type: ErrorType = ErrorType.UNKNOWN_ERROR,
        statusCode?: number,
        originalError?: Error
    ) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}

/**
 * Mapeo de códigos de estado HTTP a tipos de error
 */
const STATUS_CODE_TO_ERROR_TYPE: Record<number, ErrorType> = {
    400: ErrorType.VALIDATION_ERROR,
    401: ErrorType.AUTHENTICATION_ERROR,
    403: ErrorType.AUTHORIZATION_ERROR,
    404: ErrorType.VALIDATION_ERROR,
    422: ErrorType.VALIDATION_ERROR,
    500: ErrorType.SERVER_ERROR,
    502: ErrorType.NETWORK_ERROR,
    503: ErrorType.NETWORK_ERROR,
    504: ErrorType.NETWORK_ERROR
};

/**
 * Mensajes de error amigables para el usuario
 */
const ERROR_MESSAGES: Record<ErrorType, string> = {
    [ErrorType.NETWORK_ERROR]: 'Problema de conexión. Verifica tu internet y vuelve a intentar.',
    [ErrorType.VALIDATION_ERROR]: 'Los datos ingresados no son válidos. Revisa la información.',
    [ErrorType.AUTHENTICATION_ERROR]: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
    [ErrorType.AUTHORIZATION_ERROR]: 'No tienes permisos para realizar esta acción.',
    [ErrorType.SERVER_ERROR]: 'Error del servidor. Inténtalo más tarde.',
    [ErrorType.UNKNOWN_ERROR]: 'Ocurrió un error inesperado. Inténtalo nuevamente.'
};

/**
 * Convierte errores HTTP en errores tipados de la aplicación
 */
export const parseHttpError = (error: any): AppError => {
    // Error de red (fetch falló)
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return new AppError(
            ERROR_MESSAGES[ErrorType.NETWORK_ERROR],
            ErrorType.NETWORK_ERROR,
            undefined,
            error
        );
    }

    // Error con response HTTP
    if (error.response) {
        const statusCode = error.response.status;
        const errorType = STATUS_CODE_TO_ERROR_TYPE[statusCode] || ErrorType.UNKNOWN_ERROR;

        let message = ERROR_MESSAGES[errorType];

        // Intentar extraer mensaje específico del servidor
        if (error.response.data?.message) {
            message = error.response.data.message;
        } else if (error.response.statusText) {
            message = error.response.statusText;
        }

        return new AppError(message, errorType, statusCode, error);
    }

    // Error ya es un AppError
    if (error instanceof AppError) {
        return error;
    }

    // Error genérico
    const message = error instanceof Error ? error.message : String(error);
    return new AppError(
        message || ERROR_MESSAGES[ErrorType.UNKNOWN_ERROR],
        ErrorType.UNKNOWN_ERROR,
        undefined,
        error instanceof Error ? error : undefined
    );
};

/**
 * Logger de errores con diferentes niveles
 */
export class ErrorLogger {
    private static isDevelopment = process.env.NODE_ENV === 'development';

    static logError(error: AppError, context?: string): void {
        const timestamp = new Date().toISOString();
        const logData = {
            timestamp,
            context,
            type: error.type,
            message: error.message,
            statusCode: error.statusCode,
            stack: error.stack
        };

        if (this.isDevelopment) {
            console.error('🚨 Application Error:', logData);
            if (error.originalError) {
                console.error('Original Error:', error.originalError);
            }
        } else {
            // En producción, enviar a servicio de logging externo
            console.error('Error:', error.message);
        }
    }

    static logWarning(message: string, context?: string): void {
        const timestamp = new Date().toISOString();

        if (this.isDevelopment) {
            console.warn('⚠️ Warning:', { timestamp, context, message });
        }
    }

    static logInfo(message: string, context?: string): void {
        if (this.isDevelopment) {
            console.info('ℹ️ Info:', { context, message });
        }
    }
}

/**
 * Utilidad para manejar errores async/await
 */
export const safeAsync = async <T>(
    promise: Promise<T>,
    context?: string
): Promise<[T | null, AppError | null]> => {
    try {
        const result = await promise;
        return [result, null];
    } catch (error) {
        const appError = parseHttpError(error);
        if (context) {
            ErrorLogger.logError(appError, context);
        }
        return [null, appError];
    }
};

/**
 * Hook para manejo centralizado de errores
 */
export const useErrorHandler = () => {
    const handleError = (error: any, context?: string): AppError => {
        const appError = parseHttpError(error);
        ErrorLogger.logError(appError, context);
        return appError;
    };

    const isRetryableError = (error: AppError): boolean => {
        return [
            ErrorType.NETWORK_ERROR,
            ErrorType.SERVER_ERROR
        ].includes(error.type);
    };

    return {
        handleError,
        isRetryableError,
        ErrorType
    };
};
