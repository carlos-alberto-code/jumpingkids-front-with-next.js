import { useCallback, useEffect, useState } from 'react';
import { AuthService } from '../../services/auth/AuthService';
import {
    AuthState,
    RegisterData
} from '../../types/auth';

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
     * Verificar sesión al cargar la aplicación
     */
    const checkSession = useCallback(() => {
        const savedSession = AuthService.getCurrentSession();
        if (savedSession) {
            setAuthState({
                session: savedSession,
                loading: false,
                error: null
            });
        } else {
            setAuthState(prev => ({ ...prev, loading: false }));
        }
    }, []);

    /**
     * Iniciar sesión con credenciales
     */
    const signIn = useCallback(async (
        email: string,
        password: string
    ): Promise<void> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const session = await AuthService.signIn(email, password);
            setAuthState({
                session,
                loading: false,
                error: null
            });
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            }));
            throw error;
        }
    }, []);

    /**
     * Registrar nuevo usuario
     */
    const signUp = useCallback(async (userData: RegisterData): Promise<void> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const session = await AuthService.signUp(userData);
            setAuthState({
                session,
                loading: false,
                error: null
            });
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            }));
            throw error;
        }
    }, []);

    /**
     * Cerrar sesión
     */
    const signOut = useCallback(async (): Promise<void> => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            await AuthService.signOut();
            setAuthState({
                session: null,
                loading: false,
                error: null
            });
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Error al cerrar sesión'
            }));
        }
    }, []);

    /**
     * Limpiar errores
     */
    const clearError = useCallback(() => {
        setAuthState(prev => ({ ...prev, error: null }));
    }, []);

    /**
     * Verificar sesión al montar el componente
     */
    useEffect(() => {
        setAuthState(prev => ({ ...prev, loading: true }));
        checkSession();
    }, [checkSession]);

    return {
        // Estado
        session: authState.session,
        loading: authState.loading,
        error: authState.error,
        isAuthenticated: authState.session?.isAuthenticated || false,

        // Acciones
        signIn,
        signUp,
        signOut,
        checkSession,
        clearError
    };
};
