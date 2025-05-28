import { useCallback, useEffect, useState } from 'react';
import {
    createMockSession,
    findUserByEmail,
    MOCK_DELAYS,
    validateMockCredentials
} from '../../constants/authMocks';
import {
    AuthResponse,
    AuthState,
    LoginCredentials,
    RegisterData,
    UserSession
} from '../../types/auth';

/**
 * Local storage keys para persistencia
 */
const STORAGE_KEYS = {
    SESSION: 'jumpingkids_session',
    REMEMBER_ME: 'jumpingkids_remember_me'
} as const;

/**
 * Hook principal para manejo de autenticación
 * Sigue el patrón de useExercises pero adaptado para auth
 */
export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        session: null,
        loading: false,
        error: null
    });

    /**
     * Función helper para simular delay de red
     */
    const simulateNetworkDelay = (delay: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, delay));
    };

    /**
     * Función helper para guardar sesión en localStorage
     */
    const saveSessionToStorage = useCallback((session: UserSession, rememberMe: boolean = false) => {
        try {
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
            localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
        } catch (error) {
            console.warn('No se pudo guardar la sesión en localStorage:', error);
        }
    }, []);

    /**
     * Función helper para cargar sesión desde localStorage
     */
    const loadSessionFromStorage = useCallback((): UserSession | null => {
        try {
            const sessionData = localStorage.getItem(STORAGE_KEYS.SESSION);
            const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';

            if (sessionData && rememberMe) {
                const session = JSON.parse(sessionData) as UserSession;

                // Verificar si la sesión no ha expirado
                if (session.expiresAt && new Date(session.expiresAt) > new Date()) {
                    return session;
                }
            }

            return null;
        } catch (error) {
            console.warn('Error al cargar sesión desde localStorage:', error);
            return null;
        }
    }, []);

    /**
     * Función helper para limpiar localStorage
     */
    const clearSessionFromStorage = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEYS.SESSION);
            localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        } catch (error) {
            console.warn('Error al limpiar localStorage:', error);
        }
    }, []);

    /**
     * Iniciar sesión con credenciales
     */
    const signIn = useCallback(async (
        credentials: LoginCredentials,
        rememberMe: boolean = false
    ): Promise<AuthResponse> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simular delay de red
            await simulateNetworkDelay(MOCK_DELAYS.signIn);

            // Validar credenciales con mocks
            if (!validateMockCredentials(credentials.email, credentials.password)) {
                throw new Error('Credenciales incorrectas');
            }

            // Buscar usuario
            const user = findUserByEmail(credentials.email);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Crear sesión
            const session = createMockSession(user);

            // Guardar en localStorage si se solicita
            if (rememberMe) {
                saveSessionToStorage(session, true);
            }

            // Actualizar estado
            setAuthState(prev => ({
                ...prev,
                session,
                loading: false,
                error: null
            }));

            console.log('✅ Login exitoso:', user.name, `(${user.type} ${user.subscription})`);

            return {
                success: true,
                session,
                message: `¡Bienvenido/a ${user.name}!`
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));

            console.error('❌ Error en login:', errorMessage);

            return {
                success: false,
                error: errorMessage
            };
        }
    }, [saveSessionToStorage]);

    /**
     * Cerrar sesión
     */
    const signOut = useCallback(async (): Promise<AuthResponse> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simular delay de red
            await simulateNetworkDelay(MOCK_DELAYS.signOut);

            // Limpiar localStorage
            clearSessionFromStorage();

            // Actualizar estado
            setAuthState(prev => ({
                ...prev,
                session: null,
                loading: false,
                error: null
            }));

            console.log('✅ Logout exitoso');

            return {
                success: true,
                message: '¡Hasta pronto!'
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al cerrar sesión';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));

            console.error('❌ Error en logout:', errorMessage);

            return {
                success: false,
                error: errorMessage
            };
        }
    }, [clearSessionFromStorage]);

    /**
     * Registrar nuevo usuario (mock)
     */
    const register = useCallback(async (data: RegisterData): Promise<AuthResponse> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simular delay de red
            await simulateNetworkDelay(MOCK_DELAYS.register);

            // En mock, simular que el registro siempre es exitoso
            // TODO: En producción, esto llamará a la API real
            console.log('📝 Registro mock exitoso para:', data.email);

            return {
                success: true,
                message: 'Registro exitoso. Por favor inicia sesión.'
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));

            return {
                success: false,
                error: errorMessage
            };
        }
    }, []);

    /**
     * Verificar sesión existente (al cargar la app)
     */
    const checkSession = useCallback(async (): Promise<void> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simular delay de red
            await simulateNetworkDelay(MOCK_DELAYS.checkSession);

            // Intentar cargar sesión desde localStorage
            const storedSession = loadSessionFromStorage();

            if (storedSession) {
                setAuthState(prev => ({
                    ...prev,
                    session: storedSession,
                    loading: false,
                    error: null
                }));

                console.log('✅ Sesión restaurada:', storedSession.user.name);
            } else {
                setAuthState(prev => ({
                    ...prev,
                    session: null,
                    loading: false,
                    error: null
                }));

                console.log('ℹ️ No hay sesión guardada');
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al verificar sesión';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));

            console.error('❌ Error al verificar sesión:', errorMessage);
        }
    }, [loadSessionFromStorage]);

    /**
     * Limpiar errores de autenticación
     */
    const clearError = useCallback(() => {
        setAuthState(prev => ({ ...prev, error: null }));
    }, []);

    /**
     * Verificar sesión al montar el componente
     */
    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return {
        // Estado
        ...authState,
        // Métodos principales
        signIn,
        signOut,
        register,
        checkSession,
        clearError,
        // Helpers
        isAuthenticated: !!authState.session?.isAuthenticated,
        user: authState.session?.user || null
    };
};
