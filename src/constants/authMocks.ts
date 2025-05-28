import { User, UserSession } from '../types/auth';

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
 * Función helper para encontrar usuario por email
 */
export const findUserByEmail = (email: string): User | null => {
    return MOCK_USERS.find(user => user.email === email) || null;
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
