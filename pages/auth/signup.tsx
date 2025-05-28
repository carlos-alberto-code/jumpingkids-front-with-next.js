import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { jumpingkidsTheme } from '../../src/theme/theme';
import { RegisterData, UserType } from '../../src/types/auth';

export default function SignupPage() {
    const router = useRouter();
    const { signUp, loading, error } = useAuthContext();

    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'kid',
        subscription: 'free'
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email inválido';
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await signUp(formData);
            router.push('/');
        } catch {
            // Error será manejado por el contexto
        }
    };

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo al escribir
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <ThemeProvider theme={jumpingkidsTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Box sx={{
                    marginTop: 4,
                    marginBottom: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {/* Logo/Branding */}
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'secondary.main',
                        width: 56,
                        height: 56
                    }}>
                        <PersonAddIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                        Crear Cuenta
                    </Typography>

                    <Card sx={{ width: '100%', maxWidth: 600 }}>
                        <CardContent sx={{ p: 4 }}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                {/* Información básica */}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre completo"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    error={!!formErrors.password}
                                    helperText={formErrors.password}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar Contraseña"
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    error={!!formErrors.confirmPassword}
                                    helperText={formErrors.confirmPassword}
                                />

                                {/* Tipo de usuario */}
                                <FormControl component="fieldset" sx={{ mt: 3, mb: 2 }}>
                                    <FormLabel component="legend">
                                        <Typography variant="h6">Tipo de cuenta</Typography>
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="userType"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={(e) => handleInputChange('userType', e.target.value as UserType)}
                                    >
                                        <FormControlLabel
                                            value="kid"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography variant="body1">Niño/a</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Cuenta para realizar ejercicios
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                        <FormControlLabel
                                            value="tutor"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography variant="body1">Tutor</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Cuenta para gestionar niños
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>

                                {/* Tipo de suscripción */}
                                <FormControl component="fieldset" sx={{ mt: 2, mb: 3 }}>
                                    <FormLabel component="legend">
                                        <Typography variant="h6">Plan de suscripción</Typography>
                                    </FormLabel>
                                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                        <Paper
                                            elevation={formData.subscription === 'free' ? 3 : 0}
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer',
                                                border: formData.subscription === 'free' ? 2 : 1,
                                                borderColor: formData.subscription === 'free' ? 'primary.main' : 'divider'
                                            }}
                                            onClick={() => handleInputChange('subscription', 'free')}
                                        >
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label="GRATIS"
                                                    color="default"
                                                    size="small"
                                                    sx={{ mb: 1 }}
                                                />
                                                <Typography variant="h6">Plan Básico</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Ejercicios básicos<br />
                                                    • {formData.userType === 'kid' ? '5 ejercicios/día' : 'Seguimiento básico'}<br />
                                                    • {formData.userType === 'kid' ? '1 rutina guardada' : '3 rutinas guardadas'}
                                                </Typography>
                                            </Box>
                                        </Paper>

                                        <Paper
                                            elevation={formData.subscription === 'premium' ? 3 : 0}
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer',
                                                border: formData.subscription === 'premium' ? 2 : 1,
                                                borderColor: formData.subscription === 'premium' ? 'secondary.main' : 'divider'
                                            }}
                                            onClick={() => handleInputChange('subscription', 'premium')}
                                        >
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label="PREMIUM"
                                                    color="secondary"
                                                    size="small"
                                                    sx={{ mb: 1 }}
                                                />
                                                <Typography variant="h6">Plan Premium</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    • Ejercicios premium<br />
                                                    • {formData.userType === 'kid' ? 'Rutinas personales' : 'Crear ejercicios'}<br />
                                                    • {formData.userType === 'kid' ? 'Seguimiento progreso' : 'Gestión múltiples niños'}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Stack>
                                </FormControl>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                                </Button>

                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        ¿Ya tienes cuenta?{' '}
                                        <Button
                                            variant="text"
                                            onClick={() => router.push('/auth/login')}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Inicia sesión aquí
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
