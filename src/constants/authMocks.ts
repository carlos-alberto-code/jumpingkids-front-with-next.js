import { LoginCredentials, User, UserSession } from '../types/auth';

/**
 * Usuarios mock para desarrollo y testing
 * Cubre los 4 tipos de usuario principales del sistema
 */
export const MOCK_USERS: User[] = [
    // Niño FREE
    {
        id: '1',
        name: 'Sofia García',
        email: 'sofia@ejemplo.com',
        userType: 'kid',
        subscription: 'free',
        avatar: '👧',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        lastLogin: '2024-01-20T14:30:00Z'
    },
    // Niño PREMIUM
    {
        id: '2',
        name: 'Diego Martínez',
        email: 'diego@ejemplo.com',
        userType: 'kid',
        subscription: 'premium',
        avatar: '👦',
        createdAt: '2024-02-01T08:15:00Z',
        updatedAt: '2024-02-15T16:45:00Z',
        lastLogin: '2024-02-15T16:45:00Z'
    },
    // Tutor FREE
    {
        id: '3',
        name: 'Ana Rodriguez',
        email: 'ana@ejemplo.com',
        userType: 'tutor',
        subscription: 'free',
        avatar: '👩‍🏫',
        createdAt: '2024-01-10T09:30:00Z',
        updatedAt: '2024-01-25T11:20:00Z',
        lastLogin: '2024-01-25T11:20:00Z'
    },
    // Tutor PREMIUM
    {
        id: '4',
        name: 'Carlos López',
        email: 'carlos@ejemplo.com',
        userType: 'tutor',
        subscription: 'premium',
        avatar: '👨‍🏫',
        createdAt: '2024-01-05T07:45:00Z',
        updatedAt: '2024-02-10T13:15:00Z',
        lastLogin: '2024-02-10T13:15:00Z'
    }
];

/**
 * Credenciales mock para login rápido en desarrollo
 * Password siempre será '123456' para simplicidad
 */
export const MOCK_CREDENTIALS: LoginCredentials[] = [
    { email: 'sofia@ejemplo.com', password: '123456' },
    { email: 'diego@ejemplo.com', password: '123456' },
    { email: 'ana@ejemplo.com', password: '123456' },
    { email: 'carlos@ejemplo.com', password: '123456' }
];

/**
 * Sesiones mock pre-configuradas para testing
 */
export const MOCK_SESSIONS: Record<string, UserSession> = {
    kidFree: {
        user: MOCK_USERS[0],
        token: 'mock-jwt-token-kid-free',
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    },
    kidPremium: {
        user: MOCK_USERS[1],
        token: 'mock-jwt-token-kid-premium',
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    },
    tutorFree: {
        user: MOCK_USERS[2],
        token: 'mock-jwt-token-tutor-free',
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    },
    tutorPremium: {
        user: MOCK_USERS[3],
        token: 'mock-jwt-token-tutor-premium',
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    }
};

/**
 * Función helper para encontrar usuario por email
 */
export const findUserByEmail = (email: string): User | null => {
    return MOCK_USERS.find(user => user.email === email) || null;
};

/**
 * Función helper para validar credenciales mock
 */
export const validateMockCredentials = (email: string, password: string): boolean => {
    const validCredential = MOCK_CREDENTIALS.find(
        cred => cred.email === email && cred.password === password
    );
    return !!validCredential;
};

/**
 * Función helper para crear sesión mock basada en usuario
 */
export const createMockSession = (user: User): UserSession => {
    return {
        user,
        token: `mock-jwt-token-${user.id}`,
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    };
};

/**
 * Delays para simular latencia de red en desarrollo
 */
export const MOCK_DELAYS = {
    signIn: 1000,    // 1 segundo
    signOut: 500,    // 0.5 segundos
    register: 1500,  // 1.5 segundos
    checkSession: 300 // 0.3 segundos
};

/**
 * Configuración de testing rápido
 * Para desarrollo, permite login automático
 */
export const QUICK_LOGIN_USERS = {
    kidFree: MOCK_USERS[0],
    kidPremium: MOCK_USERS[1],
    tutorFree: MOCK_USERS[2],
    tutorPremium: MOCK_USERS[3]
} as const;
