import { createMockSession, findUserByEmail } from '../../constants/authMocks';
import { RegisterData, User, UserSession } from '../../types/auth';

export class AuthService {
    private static readonly STORAGE_KEY = 'jumpingkids-session';
    private static readonly MOCK_DELAY_MS = 1000;

    /**
     * Simula login de usuario
     */
    static async signIn(email: string, password: string): Promise<UserSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Buscar usuario en MOCK_USERS por email
                    const user = findUserByEmail(email);

                    if (!user || password !== 'demo123') {
                        reject(new Error('Credenciales inválidas'));
                        return;
                    }

                    const session: UserSession = createMockSession(user);

                    // Guardar en localStorage
                    this.saveSession(session);
                    resolve(session);
                } catch (error) {
                    reject(new Error('Error en el login'));
                }
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Simula registro de nuevo usuario
     */
    static async signUp(userData: RegisterData): Promise<UserSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Verificar si el email ya existe
                    const existingUser = findUserByEmail(userData.email);
                    if (existingUser) {
                        reject(new Error('El email ya está registrado'));
                        return;
                    }

                    // Crear nuevo usuario mock
                    const newUser: User = {
                        id: `user-${Date.now()}`,
                        name: userData.name,
                        email: userData.email,
                        userType: userData.userType,
                        subscription: userData.subscription || 'free',
                        avatar: undefined,
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    };

                    const session: UserSession = createMockSession(newUser);

                    // Guardar en localStorage
                    this.saveSession(session);
                    resolve(session);
                } catch (error) {
                    reject(new Error('Error en el registro'));
                }
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Cerrar sesión
     */
    static async signOut(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.clearSession();
                resolve();
            }, 500);
        });
    }

    /**
     * Obtener sesión actual desde localStorage
     */
    static getCurrentSession(): UserSession | null {
        try {
            const sessionData = localStorage.getItem(this.STORAGE_KEY);
            if (!sessionData) {
                return null;
            }

            const session: UserSession = JSON.parse(sessionData);

            // Verificar que la sesión no haya expirado
            if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
                this.clearSession();
                return null;
            }

            // Verificar que el token sea válido
            if (!this.validateToken(session.token || '')) {
                this.clearSession();
                return null;
            }

            return session;
        } catch (error) {
            console.error('Error al recuperar sesión:', error);
            this.clearSession();
            return null;
        }
    }

    /**
     * Guardar sesión en localStorage
     */
    static saveSession(session: UserSession): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
        } catch (error) {
            console.error('Error al guardar sesión:', error);
        }
    }

    /**
     * Limpiar sesión de localStorage
     */
    static clearSession(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Error al limpiar sesión:', error);
        }
    }

    /**
     * Validar token (preparación para JWT real)
     */
    static validateToken(token: string): boolean {
        // Validación mock - en producción sería validación JWT real
        return token.startsWith('mock-jwt-token-');
    }

    /**
     * Verificar si hay una sesión activa válida
     */
    static hasValidSession(): boolean {
        const session = this.getCurrentSession();
        return session !== null && session.isAuthenticated;
    }

    /**
     * Obtener información del usuario actual
     */
    static getCurrentUser(): User | null {
        const session = this.getCurrentSession();
        return session?.user || null;
    }
}
