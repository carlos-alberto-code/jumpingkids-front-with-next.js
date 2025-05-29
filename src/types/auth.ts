
export type UserType = 'kid' | 'tutor';

export type SubscriptionType = 'free' | 'premium';

export type AuthenticationStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface User {
    id: string;
    name: string;
    email: string;
    userType: UserType;
    subscription: SubscriptionType;
    avatar?: string;
    // createdAt: string;
    // updatedAt?: string;
    // lastLogin?: string;
}

/**
 * Sesión de usuario activa
 */
export interface UserSession {
    user: User;
    token?: string; // Para futuro uso con JWT
    isAuthenticated: boolean;
    expiresAt?: string;
}

/**
 * Estado global de autenticación
 */
export interface AuthState {
    session: UserSession | null;
    loading: boolean;
    error: string | null;
}

/**
 * Credenciales para login
 */
export interface LoginCredentials {
    username: string;
    password: string;
}

/**
 * Datos para registro de usuario
 */
export interface SignUpData {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    userType: UserType;
    subscription?: SubscriptionType;
}

/**
 * Respuesta del servicio de autenticación
 */
export interface AuthResponse {
    success: boolean;
    session?: UserSession;
    error?: string;
    message?: string;
}

/**
 * Configuración de persistencia de sesión
 */
export interface SessionConfig {
    rememberMe: boolean;
    expirationDays: number;
}

/**
 * Estados de carga específicos para auth
 */
export interface AuthLoadingStates {
    signIn: boolean;
    signOut: boolean;
    register: boolean;
    checkSession: boolean;
    updateProfile: boolean;
}
