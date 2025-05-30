import { CheckCircle as VerifyIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { jumpingkidsTheme } from '../../src/theme/theme';


export default function VerifyPage() {
    
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
        setIsVerifying(true);

        // Simulación de verificación (mock)
        setTimeout(() => {
            setIsVerifying(false);
            // Redirigir al login después de verificación exitosa
            router.push('/auth/login');
        }, 2000);
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
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'success.main',
                        width: 56,
                        height: 56
                    }}>
                        <VerifyIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                        Verificar Cuenta
                    </Typography>

                    <Card sx={{ width: '100%', maxWidth: 500 }}>
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                ¡Ya casi terminas! 🎉
                            </Typography>

                            <Typography variant="body1" paragraph>
                                Para completar tu registro como tutor, necesitamos verificar
                                que eres un adulto responsable.
                            </Typography>

                            <Box sx={{
                                p: 3,
                                bgcolor: 'background.default',
                                borderRadius: 2,
                                mb: 3
                            }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    📸 Verificación por Foto
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    (Simulado para MVP universitario)
                                </Typography>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        Toma una foto sosteniendo tu identificación
                                        para verificar que eres mayor de edad.
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleVerify}
                                disabled={isVerifying}
                                sx={{ mb: 2 }}
                            >
                                {isVerifying ? 'Verificando...' : '📸 Tomar Foto de Verificación'}
                            </Button>

                            <Typography variant="caption" color="text.secondary">
                                Esta verificación es solo para tutores. Los niños no necesitan verificación.
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                <Button
                                    variant="text"
                                    onClick={() => router.push('/auth/login')}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Volver al login
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}