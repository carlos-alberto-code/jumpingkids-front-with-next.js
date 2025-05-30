import { User, UserSession } from '../types/auth';

/**
 * 🎯 USUARIOS HARDCODEADOS PARA TESTING RÁPIDO
 * Todos usan password: "demo123"
 */
export const MOCK_USERS: User[] = [
    // 👧 NIÑO FREE
    {
        id: 'kid-free-001',
        name: 'Sofia García',
        email: 'sofia@ejemplo.com',
        userType: 'kid',
        subscription: 'free',
        avatar: '👧',
    },
    
    // 👦 NIÑO PREMIUM  
    {
        id: 'kid-premium-001',
        name: 'Diego Martínez',
        email: 'diego@ejemplo.com',
        userType: 'kid',
        subscription: 'premium',
        avatar: '👦',
    },
    
    // 👩‍🏫 TUTOR FREE
    {
        id: 'tutor-free-001',
        name: 'Ana Rodriguez',
        email: 'ana@ejemplo.com',
        userType: 'tutor',
        subscription: 'free',
        avatar: '👩‍🏫',
    },
    
    // 👨‍🏫 TUTOR PREMIUM
    {
        id: 'tutor-premium-001',
        name: 'Carlos López',
        email: 'carlos@ejemplo.com',
        userType: 'tutor',
        subscription: 'premium',
        avatar: '👨‍🏫',
    }
];

/**
 * 🚀 ACCESOS RÁPIDOS PARA TESTING
 */
export const QUICK_ACCESS_USERS = {
    'kid-free': {
        email: 'sofia@ejemplo.com',
        password: 'demo123',
        description: '👧 Niño FREE - Sofia (funciones básicas)'
    },
    'kid-premium': {
        email: 'diego@ejemplo.com', 
        password: 'demo123',
        description: '👦 Niño PREMIUM - Diego (tema personalizado + extras)'
    },
    'tutor-free': {
        email: 'ana@ejemplo.com',
        password: 'demo123', 
        description: '👩‍🏫 Tutor FREE - Ana (gestión básica)'
    },
    'tutor-premium': {
        email: 'carlos@ejemplo.com',
        password: 'demo123',
        description: '👨‍🏫 Tutor PREMIUM - Carlos (crear contenido + analytics)'
    }
} as const;

/**
 * Función helper para encontrar usuario por email
 */
export const findUserByEmail = (email: string): User | null => {
    const user = MOCK_USERS.find(user => user.email === email);
    console.log(`Buscando usuario por email ${email}:`, user); // Debug
    return user || null;
};

/**
 * Función helper para crear sesión mock basada en usuario
 */
export const createMockSession = (user: User): UserSession => {
    const session = {
        user,
        token: `mock-jwt-token-${user.id}`,
        isAuthenticated: true,
        expiresAt: '2024-12-31T23:59:59Z'
    };
    
    console.log('Creando sesión mock:', session); // Debug
    return session;
};

/**
 * 🎯 HELPER PARA OBTENER USUARIO POR TIPO
 */
export const getUserByType = (userType: 'kid' | 'tutor', subscription: 'free' | 'premium'): User | null => {
    return MOCK_USERS.find(user => 
        user.userType === userType && user.subscription === subscription
    ) || null;
};

/**
 * 📋 LISTA DE TODOS LOS ACCESOS PARA DOCUMENTACIÓN
 */
export const getTestingCredentials = () => {
    return Object.entries(QUICK_ACCESS_USERS).map(([key, user]) => ({
        key,
        email: user.email,
        password: user.password,
        description: user.description
    }));
};