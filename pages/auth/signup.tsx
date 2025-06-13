import { CreditCard as CreditCardIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Grid,
    Paper,
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
import { SignUpData } from '../../src/types/auth';

export default function SignupPage() {
    const router = useRouter();
    const { signUp, signIn, loading, error } = useAuthContext();

    // Estado para el modal de advertencia
    const [showWarningModal, setShowWarningModal] = useState(true);

    // Estado para el modal de pago
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        email: ''
    });
    const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<SignUpData>({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'tutor', // Implícitamente será tutor
        subscription: 'free'
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isRegistering, setIsRegistering] = useState(false);

    // Validaciones en tiempo real para nombre y username
    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'name':
                if (!value.trim()) {
                    return 'El nombre es requerido';
                } else if (value.trim().length < 10) {
                    return 'El nombre debe tener al menos 10 caracteres';
                }
                return '';
            case 'username':
                if (!value.trim()) {
                    return 'El nombre de usuario es requerido';
                } else if (value.trim().length < 4) {
                    return 'El nombre de usuario debe tener al menos 4 caracteres';
                }
                return '';
            default:
                return '';
        }
    };

    // Validación completa del formulario (solo para contraseñas y submit)
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Validar nombre
        const nameError = validateField('name', formData.name);
        if (nameError) errors.name = nameError;

        // Validar username
        const usernameError = validateField('username', formData.username);
        if (usernameError) errors.username = usernameError;

        // Validar contraseñas solo en submit
        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
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

        // Si eligió premium, mostrar modal de pago
        if (formData.subscription === 'premium') {
            setShowPaymentModal(true);
            return;
        }

        // Si eligió gratuito, proceder con registro normal
        await processRegistration();
    };

    const processRegistration = async () => {
        try {
            setIsRegistering(true);
            console.log('📝 Iniciando registro...'); // Debug
            await signUp(formData);

            console.log('✅ Registro exitoso, iniciando sesión automática...');

            // Simular un pequeño delay para mostrar el mensaje al usuario
            setTimeout(async () => {
                try {
                    // Realizar login automático
                    await signIn(formData.username, formData.password);

                    console.log('🤖 Login automático exitoso, redirigiendo...');

                    // Como todos los registros son tutores, ir al dashboard
                    router.push('/');
                } catch (loginError) {
                    console.error('❌ Error en login automático:', loginError);
                    // Si falla el login automático, redirigir manualmente al login
                    router.push('/auth/login');
                }
            }, 1500);

        } catch (error) {
            console.error('❌ Error en registro:', error);
            setIsRegistering(false);
            // Error será mostrado automáticamente por useAuthContext
        }
    };

    const handleInputChange = (field: keyof SignUpData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Validación en tiempo real solo para nombre y username
        if (field === 'name' || field === 'username') {
            const error = validateField(field, value);
            setFormErrors(prev => ({ ...prev, [field]: error }));
        } else {
            // Limpiar error del campo al escribir (para contraseñas)
            if (formErrors[field]) {
                setFormErrors(prev => ({ ...prev, [field]: '' }));
            }
        }
    };

    const handlePaymentInputChange = (field: string, value: string) => {
        setPaymentData(prev => ({ ...prev, [field]: value }));
        // Limpiar errores al escribir
        if (paymentErrors[field]) {
            setPaymentErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validatePaymentForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!paymentData.cardNumber.trim()) {
            errors.cardNumber = 'Número de tarjeta requerido';
        } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
            errors.cardNumber = 'Número de tarjeta inválido';
        }

        if (!paymentData.expiryDate.trim()) {
            errors.expiryDate = 'Fecha de vencimiento requerida';
        } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
            errors.expiryDate = 'Formato: MM/AA';
        }

        if (!paymentData.cvv.trim()) {
            errors.cvv = 'CVV requerido';
        } else if (paymentData.cvv.length < 3) {
            errors.cvv = 'CVV inválido';
        }

        if (!paymentData.cardName.trim()) {
            errors.cardName = 'Nombre del titular requerido';
        }

        if (!paymentData.email.trim()) {
            errors.email = 'Email requerido';
        } else if (!/\S+@\S+\.\S+/.test(paymentData.email)) {
            errors.email = 'Email inválido';
        }

        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePayment = async () => {
        if (!validatePaymentForm()) {
            return;
        }

        // Mostrar modal de éxito simulado
        setShowPaymentModal(false);
        setShowPaymentSuccessModal(true);
    };

    const handlePaymentSuccess = async () => {
        setShowPaymentSuccessModal(false);
        // Proceder con el registro después del "pago" exitoso
        await processRegistration();
    };

    return (
        <ThemeProvider theme={jumpingkidsTheme}>
            <CssBaseline />

            {/* Modal de Advertencia */}
            <Dialog
                open={showWarningModal}
                onClose={() => setShowWarningModal(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                        ⚠️ Registro Solo para Tutores
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Este formulario de registro está <strong>exclusivamente destinado para tutores</strong> que desean crear una cuenta para gestionar a sus niños.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Si eres un niño que quiere usar JumpingKids, por favor contacta a tu tutor (padre, madre o encargado) para que te registre en la plataforma.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowWarningModal(false)}
                        variant="contained"
                        color="primary"
                    >
                        Entendido, Continuar
                    </Button>
                    <Button
                        onClick={() => router.push('/auth/login')}
                        variant="text"
                    >
                        Volver al Login
                    </Button>
                </DialogActions>
            </Dialog>

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
                        Crear Cuenta de Tutor
                    </Typography>

                    <Card sx={{ width: '100%', maxWidth: 600 }}>
                        <CardContent sx={{ p: 4 }}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {error}
                                </Alert>
                            )}

                            {isRegistering && (
                                <Alert severity="info" sx={{ mb: 3 }}>
                                    🤖 Cuenta creada exitosamente. Iniciando sesión automáticamente...
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
                                    helperText={formErrors.name || 'Mínimo 10 caracteres'}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nombre de Usuario"
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    error={!!formErrors.username}
                                    helperText={formErrors.username || 'Mínimo 4 caracteres'}
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
                                    helperText={formErrors.password || 'Mínimo 8 caracteres'}
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
                                    helperText={formErrors.confirmPassword || 'Debe coincidir con la contraseña'}
                                />

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
                                                <Typography variant="h6">Plan Gratuito</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                                    • Número limitado de rutinas<br />
                                                    • Ejercicios básicos<br />
                                                    • Seguimiento básico<br />
                                                    • Un niño
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
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                                    • Gestión múltiples niños<br />
                                                    • Seguimiento avanzado<br />
                                                    • Creación de ejercicios<br />
                                                    • Ejercicios premium<br />
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
                                    disabled={loading || isRegistering}
                                >
                                    {isRegistering ? '🤖 Creando cuenta y iniciando sesión...' :
                                        loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                                </Button>

                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        ¿Ya tienes cuenta?{' '}
                                        <Button
                                            variant="text"
                                            onClick={() => router.push('/auth/login')}
                                            sx={{ textTransform: 'none' }}
                                            disabled={loading || isRegistering}
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

            {/* Modal de Pago Premium */}
            <Dialog
                open={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CreditCardIcon sx={{ color: 'secondary.main' }} />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            💳 Información de Pago - Plan Premium
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        Esta es una aplicación demostrativa. No se procesarán pagos reales.
                    </Alert>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Número de Tarjeta"
                                value={paymentData.cardNumber}
                                onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                                error={!!paymentErrors.cardNumber}
                                helperText={paymentErrors.cardNumber || '1234 5678 9012 3456'}
                                placeholder="1234 5678 9012 3456"
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                label="Fecha Vencimiento"
                                value={paymentData.expiryDate}
                                onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                                error={!!paymentErrors.expiryDate}
                                helperText={paymentErrors.expiryDate || 'MM/AA'}
                                placeholder="12/28"
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                label="CVV"
                                value={paymentData.cvv}
                                onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                                error={!!paymentErrors.cvv}
                                helperText={paymentErrors.cvv || '123'}
                                placeholder="123"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Nombre del Titular"
                                value={paymentData.cardName}
                                onChange={(e) => handlePaymentInputChange('cardName', e.target.value)}
                                error={!!paymentErrors.cardName}
                                helperText={paymentErrors.cardName}
                                placeholder="Como aparece en la tarjeta"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Email de Facturación"
                                type="email"
                                value={paymentData.email}
                                onChange={(e) => handlePaymentInputChange('email', e.target.value)}
                                error={!!paymentErrors.email}
                                helperText={paymentErrors.email}
                                placeholder="tu@email.com"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPaymentModal(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handlePayment}
                        variant="contained"
                        color="secondary"
                        startIcon={<CreditCardIcon />}
                    >
                        Realizar Pago ($9.99/mes)
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Éxito de Pago */}
            <Dialog
                open={showPaymentSuccessModal}
                onClose={() => { }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'success.main', textAlign: 'center' }}>
                        ✅ Pago Procesado Exitosamente
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            🎉 ¡Bienvenido al Plan Premium!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Tu suscripción Premium ha sido activada exitosamente.
                        </Typography>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            <strong>Nota:</strong> Esta es una aplicación demostrativa. No se ha procesado ningún pago real.
                        </Alert>
                        <Typography variant="body2" color="text.secondary">
                            Ahora procederemos a crear tu cuenta y te llevaremos al dashboard...
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handlePaymentSuccess}
                        variant="contained"
                        color="success"
                        size="large"
                    >
                        Continuar al Dashboard
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
