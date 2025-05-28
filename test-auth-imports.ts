// Test file para verificar que todos los imports funcionan correctamente
// Este archivo será eliminado después de la verificación

// Imports de tipos
import type {
    User,
    UserSession
} from './src/types/auth';

// Imports de mocks
import {
    MOCK_SESSIONS,
    MOCK_USERS,
    findUserByEmail,
    validateMockCredentials
} from './src/constants/authMocks';

// Imports de hooks

// Imports de context

// Test básico de tipos
const testUser: User = MOCK_USERS[0];
const testSession: UserSession = MOCK_SESSIONS.kidFree;

console.log('✅ Todos los imports de autenticación funcionan correctamente');
console.log('📋 Usuario de prueba:', testUser.name);
console.log('🔑 Sesión de prueba:', testSession.user.email);

// Verificar función helper
const foundUser = findUserByEmail('sofia@ejemplo.com');
console.log('🔍 Usuario encontrado:', foundUser?.name);

// Verificar validación de credenciales
const isValid = validateMockCredentials('sofia@ejemplo.com', '123456');
console.log('✅ Credenciales válidas:', isValid);

export { }; // Hacer este archivo un módulo

