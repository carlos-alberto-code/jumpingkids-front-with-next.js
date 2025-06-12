import { Lock as LockIcon } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { jumpingkidsTheme } from '../../src/theme/theme';

export default function LoginPage() {
    const router = useRouter();
    const { signIn, loading, error } = useAuthContext();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(formData.username, formData.password);
            // Redirección será manejada por el contexto
            router.push('/');
        } catch {
            // Error será manejado por el contexto
        }
    };

    return (
        <ThemeProvider theme={jumpingkidsTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm">
                <Box sx={{
                    marginTop: 8,
                    marginBottom: 4,
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

                    <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                        Iniciar Sesión
                    </Typography>

                    <Card sx={{ width: '100%', maxWidth: 400 }}>
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
                                    id="username"
                                    label="Email o nombre de usuario"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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

                                <Box sx={{ textAlign: 'center' }}>
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