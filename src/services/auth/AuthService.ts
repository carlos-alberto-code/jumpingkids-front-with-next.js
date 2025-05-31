// src/services/auth/AuthService.ts - ACTUALIZAR
import { createMockSession, findUserByEmail, findUserByEmailOrUsername } from '../../constants/authMocks';
import { SignInRequest, SignUpRequest } from '../../types/api';
import { SignUpData, User, UserSession } from '../../types/auth';
import { AuthApi } from '../api/authApi';

export class AuthService {
    private static readonly STORAGE_KEY = 'jumpingkids-session';
    private static readonly USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

    /**
     * Iniciar sesión (API real o mock)
     */
    static async signIn(username: string, password: string): Promise<UserSession> {
        console.log('🔐 AuthService.signIn:', {
            username: username,
            useMock: this.USE_MOCK_DATA,
            apiUrl: process.env.NEXT_PUBLIC_API_URL
        });

        // Usar mock si está configurado
        if (this.USE_MOCK_DATA) {
            return this.signInMock(username, password);
        }

        try {
            const request: SignInRequest = {
                email: username.trim(),
                password: password,
                rememberMe: true
            };

            const response = await AuthApi.signIn(request);

            // Crear sesión desde respuesta de API
            const session: UserSession = {
                user: response.user,
                token: response.tokens.accessToken,
                isAuthenticated: true,
                expiresAt: new Date(Date.now() + (response.tokens.expiresIn * 1000)).toISOString()
            };

            this.saveSession(session);
            console.log('✅ Login con API exitoso');
            return session;

        } catch (error) {
            console.error('❌ Error en login con API:', error);
            throw error;
        }
    }

    /**
     * Registrar usuario (API real o mock)
     */
    static async signUp(userData: SignUpData): Promise<UserSession> {
        console.log('📝 AuthService.signUp:', {
            email: userData.username,
            userType: userData.userType,
            useMock: this.USE_MOCK_DATA,
            apiUrl: process.env.NEXT_PUBLIC_API_URL
        });

        // Usar mock si está configurado
        if (this.USE_MOCK_DATA) {
            return this.signUpMock(userData);
        }

        try {
            const request: SignUpRequest = {
                name: userData.name.trim(),
                email: userData.username.trim(),
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                userType: userData.userType,
                subscription: userData.subscription || 'free'
            };

            const response = await AuthApi.signUp(request);

            // Crear sesión desde respuesta de API
            const session: UserSession = {
                user: response.user,
                token: response.tokens.accessToken,
                isAuthenticated: true,
                expiresAt: new Date(Date.now() + (response.tokens.expiresIn * 1000)).toISOString()
            };

            this.saveSession(session);
            console.log('✅ Registro con API exitoso');
            return session;

        } catch (error) {
            console.error('❌ Error en registro con API:', error);
            throw error;
        }
    }

    /**
     * Cerrar sesión (API real o mock)
     */
    static async signOut(): Promise<void> {
        console.log('🚪 AuthService.signOut:', { useMock: this.USE_MOCK_DATA });

        if (!this.USE_MOCK_DATA) {
            try {
                await AuthApi.signOut();
            } catch (error) {
                console.error('❌ Error en logout con API:', error);
                // Continuar con limpieza local incluso si falla API
            }
        }

        this.clearSession();
        console.log('✅ Logout completado');
    }

    // ===== MÉTODOS MOCK (sin cambios) =====
    private static async signInMock(emailOrUsername: string, password: string): Promise<UserSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const user = findUserByEmailOrUsername(emailOrUsername);
                    if (!user || password !== 'demo123') {
                        reject(new Error('Credenciales inválidas'));
                        return;
                    }
                    const session: UserSession = createMockSession(user);
                    this.saveSession(session);
                    resolve(session);
                } catch (error) {
                    reject(new Error('Error en el login'));
                }
            }, 800);
        });
    }

    private static async signUpMock(userData: SignUpData): Promise<UserSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const existingUser = findUserByEmail(userData.username);
                    if (existingUser) {
                        reject(new Error('El email ya está registrado'));
                        return;
                    }

                    const newUser: User = {
                        id: `user-${Date.now()}`,
                        name: userData.name,
                        email: userData.username,
                        userType: userData.userType,
                        subscription: userData.subscription || 'free',
                        avatar: userData.userType === 'tutor' ? '👨‍🏫' : '👧',
                    };

                    const session: UserSession = createMockSession(newUser);
                    this.saveSession(session);
                    resolve(session);
                } catch (error) {
                    reject(new Error('Error en el registro'));
                }
            }, 800);
        });
    }

    // ===== MÉTODOS DE SESIÓN (sin cambios) =====
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
            console.error('❌ Error al recuperar sesión:', error);
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
            console.error('❌ Error al guardar sesión:', error);
        }
    }

    static clearSession(): void {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(this.STORAGE_KEY);
            }
        } catch (error) {
            console.error('❌ Error al limpiar sesión:', error);
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

    // ===== NUEVOS MÉTODOS PARA API =====
    static async checkEmailExists(email: string): Promise<boolean> {
        if (this.USE_MOCK_DATA) {
            return !!findUserByEmail(email);
        }

        try {
            return await AuthApi.checkEmailExists(email);
        } catch (error) {
            console.error('❌ Error al verificar email:', error);
            return false;
        }
    }
}