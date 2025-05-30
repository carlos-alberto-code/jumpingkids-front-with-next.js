import { Lock as LockIcon, Speed as QuickIcon } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QUICK_ACCESS_USERS } from '../../src/constants/authMocks';
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
            // Redirección será manejada por el contexto
            router.push('/');
        } catch {
            // Error será manejado por el contexto
        }
    };

    // 🚀 LOGIN RÁPIDO CON USUARIOS PREDEFINIDOS
    const handleQuickLogin = async (userKey: keyof typeof QUICK_ACCESS_USERS) => {
        const user = QUICK_ACCESS_USERS[userKey];
        try {
            await signIn(user.email, user.password);
            router.push('/');
        } catch {
            // Error será manejado por el contexto
        }
    };

    return (
        <ThemeProvider theme={jumpingkidsTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Box sx={{
                    marginTop: 6,
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

                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        {/* 📋 FORMULARIO MANUAL */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Login Manual
                                    </Typography>

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
                        </Grid>

                        {/* 🚀 ACCESOS RÁPIDOS PARA TESTING */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', bgcolor: 'grey.50' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <QuickIcon sx={{ mr: 1, color: 'secondary.main' }} />
                                        <Typography variant="h6">
                                            Acceso Rápido (Testing)
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Para pruebas rápidas, usa estos usuarios predefinidos:
                                    </Typography>

                                    <Stack spacing={1.5}>
                                        {/* 👧 Niño FREE */}
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleQuickLogin('kid-free')}
                                            disabled={loading}
                                            startIcon={<span>👧</span>}
                                            sx={{ 
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                px: 2
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    Sofia (Niño FREE)
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Funciones básicas, tema estándar
                                                </Typography>
                                            </Box>
                                            <Chip label="FREE" size="small" color="default" />
                                        </Button>

                                        {/* 👦 Niño PREMIUM */}
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleQuickLogin('kid-premium')}
                                            disabled={loading}
                                            startIcon={<span>👦</span>}
                                            sx={{ 
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                px: 2
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    Diego (Niño PREMIUM)
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Tema personalizado + modo oscuro
                                                </Typography>
                                            </Box>
                                            <Chip label="PREMIUM" size="small" color="secondary" />
                                        </Button>

                                        <Divider sx={{ my: 1 }} />

                                        {/* 👩‍🏫 Tutor FREE */}
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleQuickLogin('tutor-free')}
                                            disabled={loading}
                                            startIcon={<span>👩‍🏫</span>}
                                            sx={{ 
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                px: 2
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    Ana (Tutor FREE)
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Gestión básica, 1 hijo
                                                </Typography>
                                            </Box>
                                            <Chip label="FREE" size="small" color="default" />
                                        </Button>

                                        {/* 👨‍🏫 Tutor PREMIUM */}
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleQuickLogin('tutor-premium')}
                                            disabled={loading}
                                            startIcon={<span>👨‍🏫</span>}
                                            sx={{ 
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                px: 2
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    Carlos (Tutor PREMIUM)
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Crear contenido + analytics
                                                </Typography>
                                            </Box>
                                            <Chip label="PREMIUM" size="small" color="secondary" />
                                        </Button>
                                    </Stack>

                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                                        💡 Todos usan password: "demo123"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}