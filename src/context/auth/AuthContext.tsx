import React, { createContext, ReactNode, useContext } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';

/**
 * Tipo del contexto de autenticación
 * Utiliza el tipo de retorno completo del hook useAuth
 */
type AuthContextType = ReturnType<typeof useAuth>;

/**
 * Contexto de autenticación
 * Inicializado como null para detectar uso fuera del provider
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider del contexto de autenticación
 * Envuelve la aplicación para proveer estado global de auth
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const authData = useAuth();

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook para consumir el contexto de autenticación
 * Lanza error si se usa fuera del AuthProvider
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};
