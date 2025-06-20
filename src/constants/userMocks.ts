import { User, UserSession } from '../types/auth';

/**
 * 👨‍👩‍👧‍👦 USUARIOS MOCK PARA DESARROLLO
 * Incluye todos los tipos de usuarios y suscripciones
 */
export const MOCK_USERS: User[] = [
    // ========================
    // 👧 NIÑOS (KIDS)
    // ========================
    {
        id: 'kid-free-001',
        name: 'Sofia Martinez',
        email: 'sofia@test.com',
        userType: 'kid',
        subscription: 'free',
        avatar: '👧',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T08:30:00Z'
    },
    {
        id: 'kid-free-002',
        name: 'Diego González',
        email: 'diego@test.com',
        userType: 'kid',
        subscription: 'free',
        avatar: '👦',
        createdAt: '2024-02-10T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-18T16:45:00Z'
    },
    {
        id: 'kid-premium-001',
        name: 'Emma Rodriguez',
        email: 'emma@test.com',
        userType: 'kid',
        subscription: 'premium',
        avatar: '🧒',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T09:15:00Z'
    },
    {
        id: 'kid-premium-002',
        name: 'Lucas Fernández',
        email: 'lucas@test.com',
        userType: 'kid',
        subscription: 'premium',
        avatar: '👦',
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T07:20:00Z'
    },

    // ========================
    // 👩‍🏫 TUTORES (TUTORS)
    // ========================
    {
        id: 'tutor-free-001',
        name: 'Ana García',
        email: 'ana@test.com',
        userType: 'tutor',
        subscription: 'free',
        avatar: '👩‍🏫',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T06:45:00Z'
    },
    {
        id: 'tutor-free-002',
        name: 'Miguel Torres',
        email: 'miguel@test.com',
        userType: 'tutor',
        subscription: 'free',
        avatar: '👨‍🏫',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-18T20:30:00Z'
    },
    {
        id: 'tutor-premium-001',
        name: 'Carlos Mendoza',
        email: 'carlos@test.com',
        userType: 'tutor',
        subscription: 'premium',
        avatar: '👨‍💼',
        createdAt: '2024-01-05T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T06:00:00Z'
    },
    {
        id: 'tutor-premium-002',
        name: 'Patricia Ruiz',
        email: 'patricia@test.com',
        userType: 'tutor',
        subscription: 'premium',
        avatar: '👩‍💼',
        createdAt: '2024-01-25T10:00:00Z',
        updatedAt: '2024-06-19T10:00:00Z',
        lastLogin: '2024-06-19T05:15:00Z'
    }
];

/**
 * 🔐 CREDENCIALES MOCK PARA LOGIN
 * Usuario: email del usuario mock
 * Password: 123456 (para todos los usuarios en desarrollo)
 */
export const MOCK_CREDENTIALS = {
    // Niños
    'sofia@test.com': { password: '123456', user: MOCK_USERS[0] },
    'diego@test.com': { password: '123456', user: MOCK_USERS[1] },
    'emma@test.com': { password: '123456', user: MOCK_USERS[2] },
    'lucas@test.com': { password: '123456', user: MOCK_USERS[3] },

    // Tutores
    'ana@test.com': { password: '123456', user: MOCK_USERS[4] },
    'miguel@test.com': { password: '123456', user: MOCK_USERS[5] },
    'carlos@test.com': { password: '123456', user: MOCK_USERS[6] },
    'patricia@test.com': { password: '123456', user: MOCK_USERS[7] },
};

/**
 * 👨‍👩‍👧‍👦 RELACIONES TUTOR-HIJO MOCK
 */
export const MOCK_TUTOR_KIDS_RELATIONSHIPS = {
    'tutor-free-001': ['kid-free-001'], // Ana tiene a Sofia
    'tutor-free-002': ['kid-free-002'], // Miguel tiene a Diego
    'tutor-premium-001': ['kid-premium-001', 'kid-free-001'], // Carlos tiene a Emma y Sofia
    'tutor-premium-002': ['kid-premium-002', 'kid-premium-001'], // Patricia tiene a Lucas y Emma
};

/**
 * ✅ HELPER: Obtener usuario por email
 */
export function getMockUserByEmail(email: string): User | null {
    const credential = MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS];
    return credential ? credential.user : null;
}

/**
 * ✅ HELPER: Obtener usuario por ID
 */
export function getMockUserById(id: string): User | null {
    return MOCK_USERS.find(user => user.id === id) || null;
}

/**
 * ✅ HELPER: Obtener hijos de un tutor
 */
export function getMockKidsForTutor(tutorId: string): User[] {
    const kidIds = MOCK_TUTOR_KIDS_RELATIONSHIPS[tutorId as keyof typeof MOCK_TUTOR_KIDS_RELATIONSHIPS] || [];
    return kidIds.map(id => getMockUserById(id)).filter(Boolean) as User[];
}

/**
 * ✅ HELPER: Crear sesión mock
 */
export function createMockSession(user: User): UserSession {
    return {
        user,
        token: `mock-token-${user.id}-${Date.now()}`,
        isAuthenticated: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    };
}

/**
 * 🎭 HELPER: Validar credenciales mock
 */
export function validateMockCredentials(email: string, password: string): boolean {
    const credential = MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS];
    return credential ? credential.password === password : false;
}
