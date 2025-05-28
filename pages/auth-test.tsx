import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { QUICK_LOGIN_USERS } from '../src/constants/authMocks';
import { AuthProvider, useAuthContext } from '../src/context/auth/AuthContext';
import { useUserPermissions } from '../src/hooks/auth/useUserPermissions';

// Componente interno que usa el contexto de auth
const AuthTestContent: React.FC = () => {
    const {
        session,
        loading,
        error,
        signIn,
        signOut,
        isAuthenticated,
        user
    } = useAuthContext();

    const permissions = useUserPermissions();

    const handleQuickLogin = async (userKey: keyof typeof QUICK_LOGIN_USERS) => {
        const selectedUser = QUICK_LOGIN_USERS[userKey];
        await signIn({
            email: selectedUser.email,
            password: '123456'
        }, true);
    };

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                🧪 Test del Sistema de Autenticación - Jumpingkids
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Typography>
            )}

            {/* Estado actual */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        📊 Estado Actual
                    </Typography>
                    <Typography>
                        <strong>Autenticado:</strong> {isAuthenticated ? '✅ Sí' : '❌ No'}
                    </Typography>
                    {user && (
                        <>
                            <Typography>
                                <strong>Usuario:</strong> {user.name} ({user.email})
                            </Typography>
                            <Typography>
                                <strong>Tipo:</strong> {user.type} | <strong>Suscripción:</strong> {user.subscription}
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Login rápido */}
            {!isAuthenticated && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            🚀 Login Rápido (Testing)
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Button
                                variant="outlined"
                                onClick={() => handleQuickLogin('kidFree')}
                                size="small"
                            >
                                Niño Free
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleQuickLogin('kidPremium')}
                                size="small"
                            >
                                Niño Premium
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleQuickLogin('tutorFree')}
                                size="small"
                            >
                                Tutor Free
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleQuickLogin('tutorPremium')}
                                size="small"
                            >
                                Tutor Premium
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {/* Permisos */}
            {isAuthenticated && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            🔐 Permisos del Usuario
                        </Typography>
                        <Typography>
                            <strong>Ejercicios Premium:</strong> {permissions.canAccessPremiumExercises ? '✅' : '❌'}
                        </Typography>
                        <Typography>
                            <strong>Crear Ejercicios:</strong> {permissions.canCreateCustomExercises ? '✅' : '❌'}
                        </Typography>
                        <Typography>
                            <strong>Rutinas Personales:</strong> {permissions.canCreatePersonalRoutines ? '✅' : '❌'}
                        </Typography>
                        <Typography>
                            <strong>Gestionar Múltiples Niños:</strong> {permissions.canManageMultipleKids ? '✅' : '❌'}
                        </Typography>
                        <Typography>
                            <strong>Acceso Analytics:</strong> {permissions.canAccessAnalytics ? '✅' : '❌'}
                        </Typography>
                        <Typography>
                            <strong>Ejercicios por día:</strong> {permissions.maxExercisesPerDay ?? 'Ilimitado'}
                        </Typography>
                        <Typography>
                            <strong>Rutinas guardadas:</strong> {permissions.maxRoutinesStored ?? 'Ilimitado'}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Logout */}
            {isAuthenticated && (
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={signOut}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            )}
        </Box>
    );
};

// Página principal envuelta con el AuthProvider
const AuthTestPage: React.FC = () => {
    return (
        <AuthProvider>
            <AuthTestContent />
        </AuthProvider>
    );
};

export default AuthTestPage;
