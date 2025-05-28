
/**
 * Tipos de usuario en la aplicación Jumpingkids
 */
export type UserType = 'kid' | 'tutor';

/**
 * Tipos de suscripción disponibles
 */
export type SubscriptionType = 'free' | 'premium';

/**
 * Estados de autenticación de la aplicación
 */
export type AuthenticationStatus = 'authenticated' | 'unauthenticated' | 'loading';

/**
 * Interface principal del usuario
 */
export interface User {
    id: string;
    name: string;
    email: string;
    userType: UserType; // Cambiado de 'type' a 'userType' para consistencia
    subscription: SubscriptionType;
    avatar?: string;
    createdAt: string;
    updatedAt?: string;
    lastLogin?: string;
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
    email: string;
    password: string;
}

/**
 * Datos para registro de usuario
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string; // Para validación en frontend
    userType: UserType; // Usando userType para consistencia con componentes
    subscription?: SubscriptionType; // Default será 'free'
}

/**
 * Configuración de permisos por combinación de tipo y suscripción
 */
export interface UserPermissions {
    // Ejercicios
    canAccessPremiumExercises: boolean;
    canCreateCustomExercises: boolean;
    maxExercisesPerDay?: number; // undefined = ilimitado

    // Rutinas
    canCreatePersonalRoutines: boolean;
    canAccessPremiumRoutines: boolean;
    canShareRoutines: boolean;
    maxRoutinesStored?: number; // undefined = ilimitado

    // Entrenamiento y seguimiento
    canTrackProgress: boolean;
    canAccessAdvancedMetrics: boolean;
    canExportData: boolean;

    // Gestión (específico para tutores)
    canManageMultipleKids: boolean;
    canAccessAnalytics: boolean;
    canCreateExercisesForKids: boolean;

    // Suscripción
    canUpgradeSubscription: boolean;
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
