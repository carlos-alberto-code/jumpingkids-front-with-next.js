import { createMockSession, findUserByEmail } from '../../constants/authMocks';
import { SignUpData, User, UserSession } from '../../types/auth';

export class AuthService {
    private static readonly STORAGE_KEY = 'jumpingkids-session';
    private static readonly MOCK_DELAY_MS = 800;

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

                    // ✅ GARANTIZAR que se guarde en localStorage
                    this.saveSession(session);
                    console.log('Sesión guardada:', session); // Debug

                    resolve(session);
                } catch (error) {
                    console.error('Error en signIn:', error);
                    reject(new Error('Error en el login'));
                }
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Simula registro de nuevo usuario
     */
    static async signUp(userData: SignUpData): Promise<UserSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Verificar si el email ya existe
                    const existingUser = findUserByEmail(userData.username);
                    if (existingUser) {
                        reject(new Error('El email ya está registrado'));
                        return;
                    }

                    // Crear nuevo usuario mock
                    const newUser: User = {
                        id: `user-${Date.now()}`,
                        name: userData.name,
                        email: userData.username,
                        userType: userData.userType,
                        subscription: userData.subscription || 'free',
                        avatar: undefined,
                    };

                    const session: UserSession = createMockSession(newUser);

                    // ✅ GARANTIZAR que se guarde en localStorage
                    this.saveSession(session);
                    console.log('Nueva sesión creada:', session); // Debug

                    resolve(session);
                } catch (error) {
                    console.error('Error en signUp:', error);
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
                console.log('Sesión cerrada'); // Debug
                resolve();
            }, 300);
        });
    }

    /**
     * Obtener sesión actual desde localStorage
     */
    static getCurrentSession(): UserSession | null {
        try {
            // ✅ Verificar que estamos en el browser
            if (typeof window === 'undefined') {
                return null;
            }

            const sessionData = localStorage.getItem(this.STORAGE_KEY);
            console.log('Session data from storage:', sessionData); // Debug

            if (!sessionData) {
                return null;
            }

            const session: UserSession = JSON.parse(sessionData);

            // Verificar que la sesión no haya expirado
            if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
                console.log('Sesión expirada'); // Debug
                this.clearSession();
                return null;
            }

            // Verificar que el token sea válido
            if (!this.validateToken(session.token || '')) {
                console.log('Token inválido'); // Debug
                this.clearSession();
                return null;
            }

            console.log('Sesión válida recuperada:', session); // Debug
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
            // ✅ Verificar que estamos en el browser
            if (typeof window === 'undefined') {
                console.warn('No se puede guardar sesión: no hay localStorage disponible');
                return;
            }

            const sessionData = JSON.stringify(session);
            localStorage.setItem(this.STORAGE_KEY, sessionData);
            console.log('Sesión guardada en localStorage:', sessionData); // Debug
        } catch (error) {
            console.error('Error al guardar sesión:', error);
        }
    }

    /**
     * Limpiar sesión de localStorage
     */
    static clearSession(): void {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(this.STORAGE_KEY);
                console.log('Sesión eliminada de localStorage'); // Debug
            }
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

    // ✅ MÉTODOS PARA LOGIN RÁPIDO CON USUARIOS HARDCODEADOS
    
    /**
     * Login rápido con usuarios predefinidos
     */
    static async quickLogin(userType: 'kid-free' | 'kid-premium' | 'tutor-free' | 'tutor-premium'): Promise<UserSession> {
        const emailMap = {
            'kid-free': 'sofia@ejemplo.com',
            'kid-premium': 'diego@ejemplo.com', 
            'tutor-free': 'ana@ejemplo.com',
            'tutor-premium': 'carlos@ejemplo.com'
        };

        const email = emailMap[userType];
        return this.signIn(email, 'demo123');
    }

    /**
     * Verificar si es la primera carga de la app
     */
    static isFirstLoad(): boolean {
        return !this.hasValidSession();
    }
}