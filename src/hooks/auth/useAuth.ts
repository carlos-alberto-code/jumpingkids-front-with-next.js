import { useCallback, useEffect, useState } from 'react';
import { AuthService } from '../../services/auth/AuthService';
import {
    AuthState,
    SignUpData
} from '../../types/auth';

/**
 * Hook principal para manejo de autenticación
 * ✅ Versión corregida con mejor persistencia
 */
export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        session: null,
        loading: true, // ✅ Empezar con loading true
        error: null
    });

    /**
     * Verificar sesión al cargar la aplicación
     */
    const checkSession = useCallback(() => {
        console.log('🔍 Verificando sesión existente...');

        try {
            const savedSession = AuthService.getCurrentSession();

            if (savedSession) {
                console.log('✅ Sesión encontrada:', savedSession);
                setAuthState({
                    session: savedSession,
                    loading: false,
                    error: null
                });
            } else {
                console.log('❌ No hay sesión guardada');
                setAuthState(prev => ({
                    ...prev,
                    session: null,
                    loading: false
                }));
            }
        } catch (error) {
            console.error('❌ Error al verificar sesión:', error);
            setAuthState(prev => ({
                ...prev,
                session: null,
                loading: false,
                error: 'Error al verificar sesión'
            }));
        }
    }, []);

    /**
     * Iniciar sesión con credenciales
     */
    const signIn = useCallback(async (
        email: string,
        password: string
    ): Promise<void> => {
        console.log('🚀 Iniciando login para:', email);
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const session = await AuthService.signIn(email, password);
            console.log('✅ Login exitoso:', session);

            setAuthState({
                session,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('❌ Error en login:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, []);

    /**
     * Registrar nuevo usuario
     */
    const signUp = useCallback(async (userData: SignUpData): Promise<void> => {
        console.log('🚀 Iniciando registro para:', userData.username);
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const session = await AuthService.signUp(userData);
            console.log('✅ Registro exitoso:', session);

            setAuthState({
                session,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('❌ Error en registro:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, []);

    /**
     * Cerrar sesión
     */
    const signOut = useCallback(async (): Promise<void> => {
        console.log('🚪 Cerrando sesión...');
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        try {
            await AuthService.signOut();
            console.log('✅ Sesión cerrada');

            setAuthState({
                session: null,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('❌ Error al cerrar sesión:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error al cerrar sesión';

            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
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
     * ✅ Verificar sesión al montar el componente
     * Solo se ejecuta una vez al montar
     */
    useEffect(() => {
        console.log('🏗️ Montando useAuth, verificando sesión...');
        checkSession();
    }, []); // ✅ Sin dependencias para que solo se ejecute una vez

    // ✅ Debug: Log cuando cambia el estado
    useEffect(() => {
        console.log('📊 Estado de auth actualizado:', {
            hasSession: !!authState.session,
            isAuthenticated: authState.session?.isAuthenticated,
            loading: authState.loading,
            error: authState.error,
            user: authState.session?.user?.name
        });
    }, [authState]);

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