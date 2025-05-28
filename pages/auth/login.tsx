import { Lock as LockIcon } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MOCK_USERS } from '../../src/constants/authMocks';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { jumpingkidsTheme } from '../../src/theme/theme';

export default function LoginPage() {
    const router = useRouter();
    const { signIn, loading, error } = useAuthContext();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(formData.email, formData.password);
            // Redirección será manejada por el contexto/Toolpad
            router.push('/');
        } catch (err) {
            // Error será manejado por el contexto
        }
    };

    const handleQuickLogin = async (email: string) => {
        try {
            await signIn(email, 'demo123');
            router.push('/');
        } catch (err) {
            // Error será manejado por el contexto
        }
    };

    return (
        <ThemeProvider theme={jumpingkidsTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {/* Logo/Branding */}
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56
                    }}>
                        <LockIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                        Iniciar Sesión
                    </Typography>

                    <Card sx={{ width: '100%', maxWidth: 500 }}>
                        <CardContent sx={{ p: 3 }}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </Button>

                                <Divider sx={{ my: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        O usa los usuarios de prueba
                                    </Typography>
                                </Divider>

                                {/* Botones de login rápido */}
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {MOCK_USERS.map((user) => (
                                        <Button
                                            key={user.id}
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleQuickLogin(user.email)}
                                            disabled={loading}
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: '0.75rem',
                                                py: 1,
                                                flex: '1 1 45%'
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="caption" component="div">
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {user.userType} {user.subscription}
                                                </Typography>
                                            </Box>
                                        </Button>
                                    ))}
                                </Stack>

                                {/* Info para testing */}
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Credenciales de prueba:</strong><br />
                                        Cualquier email de los usuarios mock con contraseña: <code>demo123</code>
                                    </Typography>
                                </Alert>

                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        ¿No tienes cuenta?{' '}
                                        <Button
                                            variant="text"
                                            onClick={() => router.push('/auth/signup')}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Regístrate aquí
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
