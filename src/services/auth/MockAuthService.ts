import {
    createMockSession,
    getMockUserByEmail,
    MOCK_CREDENTIALS,
    validateMockCredentials
} from '../../constants/userMocks';
import { SignUpData, User, UserSession } from '../../types/auth';

/**
 * 🎭 SERVICIO DE AUTENTICACIÓN MOCK PARA DESARROLLO
 * Simula las respuestas de la API con datos locales
 */
export class MockAuthService {
    private static readonly STORAGE_KEY = 'jumpingkids-session-mock';
    private static readonly DELAY_MS = 800; // Simular latencia de red

    /**
     * Simular delay de red
     */
    private static delay(ms: number = this.DELAY_MS): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Login mock con credenciales predefinidas
     */
    static async signIn(username: string, password: string): Promise<UserSession> {
        console.log('🎭 MockAuthService.signIn:', { username });

        await this.delay(); // Simular latencia

        // Validar credenciales mock
        if (!validateMockCredentials(username, password)) {
            throw new Error('Credenciales inválidas. Usuarios disponibles: sofia@test.com, diego@test.com, emma@test.com, lucas@test.com, ana@test.com, miguel@test.com, carlos@test.com, patricia@test.com (password: 123456)');
        }

        const user = getMockUserByEmail(username);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Crear sesión mock
        const session = createMockSession(user);
        this.saveSession(session);

        console.log('✅ Login mock exitoso para:', user.name);
        return session;
    }

    /**
     * Registro mock (simplificado)
     */
    static async signUp(userData: SignUpData): Promise<UserSession> {
        console.log('🎭 MockAuthService.signUp:', { username: userData.username, userType: userData.userType });

        await this.delay(); // Simular latencia

        // Verificar si el usuario ya existe
        if (getMockUserByEmail(userData.username)) {
            throw new Error('El usuario ya existe. Usa un email diferente o prueba con los usuarios mock existentes.');
        }

        // Crear nuevo usuario mock
        const newUser: User = {
            id: `${userData.userType}-${Date.now()}`,
            name: userData.name,
            email: userData.username,
            userType: userData.userType,
            subscription: userData.subscription || 'free',
            avatar: userData.userType === 'kid' ? '🧒' : '👨‍🏫',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        // Crear sesión mock
        const session = createMockSession(newUser);
        this.saveSession(session);

        console.log('✅ Registro mock exitoso para:', newUser.name);
        return session;
    }

    /**
     * Logout mock
     */
    static async signOut(): Promise<void> {
        console.log('🎭 MockAuthService.signOut');

        await this.delay(300); // Delay más corto para logout

        this.clearSession();
        console.log('✅ Logout mock completado');
    }

    /**
     * Verificar si email existe (siempre retorna false en mock para permitir registro)
     */
    static async checkEmailExists(email: string): Promise<boolean> {
        await this.delay(400);

        // En modo mock, solo retorna true si es uno de los usuarios predefinidos
        return Object.keys(MOCK_CREDENTIALS).includes(email);
    }

    // ===== MÉTODOS DE SESIÓN (iguales que AuthService) =====

    static getCurrentSession(): UserSession | null {
        try {
            if (typeof window === 'undefined') return null;

            const sessionData = localStorage.getItem(this.STORAGE_KEY);
            if (!sessionData) return null;

            const session: UserSession = JSON.parse(sessionData);

            // Verificar expiración
            if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
                this.clearSession();
                return null;
            }

            return session;
        } catch (error) {
            console.error('❌ Error al recuperar sesión mock:', error);
            this.clearSession();
            return null;
        }
    }

    static saveSession(session: UserSession): void {
        try {
            if (typeof window === 'undefined') return;
            const sessionData = JSON.stringify(session);
            localStorage.setItem(this.STORAGE_KEY, sessionData);
        } catch (error) {
            console.error('❌ Error al guardar sesión mock:', error);
        }
    }

    static clearSession(): void {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(this.STORAGE_KEY);
            }
        } catch (error) {
            console.error('❌ Error al limpiar sesión mock:', error);
        }
    }

    static hasValidSession(): boolean {
        const session = this.getCurrentSession();
        return session !== null && session.isAuthenticated;
    }

    static getCurrentUser(): User | null {
        const session = this.getCurrentSession();
        return session?.user || null;
    }
}

/**
 * 🎭 HELPER: Información de usuarios mock disponibles
 */
export const getMockUsersInfo = () => ({
    credentials: Object.keys(MOCK_CREDENTIALS).map(email => ({
        email,
        password: '123456',
        user: MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS].user
    })),

    summary: {
        totalUsers: Object.keys(MOCK_CREDENTIALS).length,
        kids: Object.values(MOCK_CREDENTIALS).filter(c => c.user.userType === 'kid').length,
        tutors: Object.values(MOCK_CREDENTIALS).filter(c => c.user.userType === 'tutor').length,
        freeUsers: Object.values(MOCK_CREDENTIALS).filter(c => c.user.subscription === 'free').length,
        premiumUsers: Object.values(MOCK_CREDENTIALS).filter(c => c.user.subscription === 'premium').length,
    }
});
