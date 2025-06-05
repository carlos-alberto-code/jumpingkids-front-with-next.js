import {
    Settings as SettingsIcon,
    Person as PersonIcon,
    Notifications as NotificationsIcon,
    SupervisorAccount as KidsIcon,
    Apps as AppIcon,
    Schedule as ScheduleIcon,
    Security as SecurityIcon,
    Palette as ThemeIcon,
    Language as LanguageIcon,
    VolumeUp as SoundIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// ⚙️ TIPOS PARA CONFIGURACIONES
interface TutorSettings {
    profile: {
        name: string;
        email: string;
        phone: string;
        organization: string;
    };
    notifications: {
        emailReminders: boolean;
        pushNotifications: boolean;
        weeklyReports: boolean;
        childAchievements: boolean;
        missedWorkouts: boolean;
        reminderTime: string;
    };
    kidsSettings: {
        maxDailyExercises: number;
        preferredWorkoutTime: string;
        allowSkipExercises: boolean;
        autoAssignRoutines: boolean;
        difficultyProgression: boolean;
    };
    application: {
        theme: 'light' | 'dark' | 'auto';
        language: 'es' | 'en';
        soundEffects: boolean;
        animations: boolean;
        compactView: boolean;
    };
}

// 🎛️ CONFIGURACIONES MOCK
const MOCK_SETTINGS: TutorSettings = {
    profile: {
        name: 'Carlos López',
        email: 'carlos@ejemplo.com',
        phone: '+52 55 1234 5678',
        organization: 'Escuela Primaria Benito Juárez'
    },
    notifications: {
        emailReminders: true,
        pushNotifications: true,
        weeklyReports: true,
        childAchievements: true,
        missedWorkouts: true,
        reminderTime: '19:00'
    },
    kidsSettings: {
        maxDailyExercises: 5,
        preferredWorkoutTime: '16:00',
        allowSkipExercises: true,
        autoAssignRoutines: false,
        difficultyProgression: true
    },
    application: {
        theme: 'auto',
        language: 'es',
        soundEffects: true,
        animations: true,
        compactView: false
    }
};

const MOCK_MANAGED_KIDS = [
    { id: 'sofia-001', name: 'Sofia García', age: 8, avatar: '👧', maxExercises: 5, preferredTime: '16:00' },
    { id: 'diego-002', name: 'Diego Martínez', age: 6, avatar: '👦', maxExercises: 4, preferredTime: '15:30' },
    { id: 'maria-003', name: 'María López', age: 10, avatar: '👧', maxExercises: 6, preferredTime: '17:00' }
];

export default function SettingsPage() {
    const { session } = useAuthContext();
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);
    const [settings, setSettings] = useState<TutorSettings>(MOCK_SETTINGS);
    const [hasChanges, setHasChanges] = useState(false);

    // Filtrar niños según suscripción
    const managedKids = isPremiumUser ? MOCK_MANAGED_KIDS : MOCK_MANAGED_KIDS.slice(0, 1);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleSettingChange = (section: keyof TutorSettings, key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
        setHasChanges(true);
    };

    const handleSaveSettings = () => {
        // Mock de guardado
        console.log('Guardando configuraciones:', settings);
        setHasChanges(false);
        alert('✅ Configuraciones guardadas exitosamente');
    };

    const handleResetSettings = () => {
        setSettings(MOCK_SETTINGS);
        setHasChanges(false);
        alert('🔄 Configuraciones restablecidas');
    };

    return (
        <PermissionGate
            permission="canManageKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad está disponible solo para tutores.
                    </Alert>
                </Container>
            }
        >
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 4
                }}>
                    <SettingsIcon sx={{ fontSize: 40, color: 'info.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Configuraciones
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Personaliza tu experiencia como tutor
                        </Typography>
                    </Box>
                    {isPremiumUser && (
                        <Chip
                            label="PREMIUM"
                            color="secondary"
                            size="small"
                            sx={{ ml: 'auto' }}
                        />
                    )}
                </Box>

                {/* Acciones principales */}
                {hasChanges && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Tienes cambios sin guardar</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button size="small" onClick={handleResetSettings}>
                                    Descartar
                                </Button>
                                <Button variant="contained" size="small" onClick={handleSaveSettings}>
                                    Guardar
                                </Button>
                            </Stack>
                        </Box>
                    </Alert>
                )}

                {/* Tabs de configuración */}
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable">
                            <Tab
                                icon={<PersonIcon />}
                                label="Perfil"
                                iconPosition="start"
                            />
                            <Tab
                                icon={<NotificationsIcon />}
                                label="Notificaciones"
                                iconPosition="start"
                            />
                            <Tab
                                icon={<KidsIcon />}
                                label="Gestión de Hijos"
                                iconPosition="start"
                            />
                            {isPremiumUser && (
                                <Tab
                                    icon={<AppIcon />}
                                    label="Aplicación"
                                    iconPosition="start"
                                />
                            )}
                        </Tabs>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        {/* Tab 1: Perfil */}
                        {currentTab === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    👤 Información Personal
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Nombre completo"
                                            value={settings.profile.name}
                                            onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={settings.profile.email}
                                            onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Teléfono"
                                            value={settings.profile.phone}
                                            onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Organización"
                                            value={settings.profile.organization}
                                            onChange={(e) => handleSettingChange('profile', 'organization', e.target.value)}
                                            helperText="Escuela, centro deportivo, etc."
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" gutterBottom>
                                    🔒 Seguridad
                                </Typography>
                                <Stack spacing={2} sx={{ maxWidth: 400 }}>
                                    <Button variant="outlined" startIcon={<SecurityIcon />}>
                                        Cambiar Contraseña
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        Eliminar Cuenta
                                    </Button>
                                </Stack>
                            </Box>
                        )}

                        {/* Tab 2: Notificaciones */}
                        {currentTab === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    🔔 Preferencias de Notificaciones
                                </Typography>
                                
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                Tipos de Notificación
                                            </Typography>
                                            <Stack spacing={2}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.notifications.emailReminders}
                                                            onChange={(e) => handleSettingChange('notifications', 'emailReminders', e.target.checked)}
                                                        />
                                                    }
                                                    label="Recordatorios por email"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.notifications.pushNotifications}
                                                            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                                                        />
                                                    }
                                                    label="Notificaciones push"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.notifications.weeklyReports}
                                                            onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                                                        />
                                                    }
                                                    label="Reportes semanales"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.notifications.childAchievements}
                                                            onChange={(e) => handleSettingChange('notifications', 'childAchievements', e.target.checked)}
                                                        />
                                                    }
                                                    label="Logros de hijos"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.notifications.missedWorkouts}
                                                            onChange={(e) => handleSettingChange('notifications', 'missedWorkouts', e.target.checked)}
                                                        />
                                                    }
                                                    label="Rutinas perdidas"
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                Horarios
                                            </Typography>
                                            <FormControl fullWidth sx={{ mb: 2 }}>
                                                <InputLabel>Hora de recordatorio</InputLabel>
                                                <Select
                                                    value={settings.notifications.reminderTime}
                                                    label="Hora de recordatorio"
                                                    onChange={(e) => handleSettingChange('notifications', 'reminderTime', e.target.value)}
                                                >
                                                    <MenuItem value="08:00">8:00 AM</MenuItem>
                                                    <MenuItem value="12:00">12:00 PM</MenuItem>
                                                    <MenuItem value="16:00">4:00 PM</MenuItem>
                                                    <MenuItem value="19:00">7:00 PM</MenuItem>
                                                    <MenuItem value="21:00">9:00 PM</MenuItem>
                                                </Select>
                                            </FormControl>
                                            
                                            <Alert severity="info">
                                                Los recordatorios se envían 1 hora antes del horario preferido de ejercicio de cada hijo
                                            </Alert>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Tab 3: Gestión de Hijos */}
                        {currentTab === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    👨‍👩‍👧‍👦 Configuraciones por Hijo
                                </Typography>

                                {/* Configuraciones globales */}
                                <Paper sx={{ p: 2, mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        ⚙️ Configuraciones Generales
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormControl fullWidth>
                                                <InputLabel>Máximo ejercicios por día</InputLabel>
                                                <Select
                                                    value={settings.kidsSettings.maxDailyExercises}
                                                    label="Máximo ejercicios por día"
                                                    onChange={(e) => handleSettingChange('kidsSettings', 'maxDailyExercises', Number(e.target.value))}
                                                >
                                                    <MenuItem value={3}>3 ejercicios</MenuItem>
                                                    <MenuItem value={4}>4 ejercicios</MenuItem>
                                                    <MenuItem value={5}>5 ejercicios</MenuItem>
                                                    <MenuItem value={6}>6 ejercicios</MenuItem>
                                                    <MenuItem value={7}>7 ejercicios</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Horario preferido"
                                                type="time"
                                                value={settings.kidsSettings.preferredWorkoutTime}
                                                onChange={(e) => handleSettingChange('kidsSettings', 'preferredWorkoutTime', e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.kidsSettings.allowSkipExercises}
                                                    onChange={(e) => handleSettingChange('kidsSettings', 'allowSkipExercises', e.target.checked)}
                                                />
                                            }
                                            label="Permitir saltar ejercicios"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.kidsSettings.autoAssignRoutines}
                                                    onChange={(e) => handleSettingChange('kidsSettings', 'autoAssignRoutines', e.target.checked)}
                                                    disabled={!isPremiumUser}
                                                />
                                            }
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    Asignar rutinas automáticamente
                                                    {!isPremiumUser && <Chip label="PREMIUM" size="small" color="secondary" />}
                                                </Box>
                                            }
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.kidsSettings.difficultyProgression}
                                                    onChange={(e) => handleSettingChange('kidsSettings', 'difficultyProgression', e.target.checked)}
                                                    disabled={!isPremiumUser}
                                                />
                                            }
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    Progresión automática de dificultad
                                                    {!isPremiumUser && <Chip label="PREMIUM" size="small" color="secondary" />}
                                                </Box>
                                            }
                                        />
                                    </Stack>
                                </Paper>

                                {/* Configuraciones individuales por hijo */}
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    👶 Configuraciones Individuales
                                </Typography>
                                <Grid container spacing={2}>
                                    {managedKids.map((kid) => (
                                        <Grid size={{ xs: 12, md: isPremiumUser ? 4 : 12 }} key={kid.id}>
                                            <Paper sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    <Typography variant="h4">{kid.avatar}</Typography>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {kid.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {kid.age} años
                                                    </Typography>
                                                </Box>
                                                
                                                <Stack spacing={2}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>Máx. ejercicios</InputLabel>
                                                        <Select
                                                            value={kid.maxExercises}
                                                            label="Máx. ejercicios"
                                                            disabled={!isPremiumUser}
                                                        >
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                            <MenuItem value={5}>5</MenuItem>
                                                            <MenuItem value={6}>6</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="Horario preferido"
                                                        type="time"
                                                        value={kid.preferredTime}
                                                        disabled={!isPremiumUser}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Stack>

                                                {!isPremiumUser && (
                                                    <Alert severity="info" sx={{ mt: 2 }}>
                                                        Configuraciones individuales disponibles con Premium
                                                    </Alert>
                                                )}
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                                {!isPremiumUser && (
                                    <Alert severity="info" sx={{ mt: 3 }}>
                                        💎 Con Premium podrías personalizar configuraciones individuales para cada hijo y gestionar hasta 3 hijos
                                    </Alert>
                                )}
                            </Box>
                        )}

                        {/* Tab 4: Aplicación (solo premium) */}
                        {currentTab === 3 && isPremiumUser && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    🎨 Personalización de la Aplicación
                                </Typography>
                                
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                <ThemeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Apariencia
                                            </Typography>
                                            <Stack spacing={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Tema</InputLabel>
                                                    <Select
                                                        value={settings.application.theme}
                                                        label="Tema"
                                                        onChange={(e) => handleSettingChange('application', 'theme', e.target.value)}
                                                    >
                                                        <MenuItem value="light">Claro</MenuItem>
                                                        <MenuItem value="dark">Oscuro</MenuItem>
                                                        <MenuItem value="auto">Automático</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.application.animations}
                                                            onChange={(e) => handleSettingChange('application', 'animations', e.target.checked)}
                                                        />
                                                    }
                                                    label="Animaciones"
                                                />
                                                
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.application.compactView}
                                                            onChange={(e) => handleSettingChange('application', 'compactView', e.target.checked)}
                                                        />
                                                    }
                                                    label="Vista compacta"
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                <LanguageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Idioma y Sonido
                                            </Typography>
                                            <Stack spacing={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Idioma</InputLabel>
                                                    <Select
                                                        value={settings.application.language}
                                                        label="Idioma"
                                                        onChange={(e) => handleSettingChange('application', 'language', e.target.value)}
                                                    >
                                                        <MenuItem value="es">Español</MenuItem>
                                                        <MenuItem value="en">English</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.application.soundEffects}
                                                            onChange={(e) => handleSettingChange('application', 'soundEffects', e.target.checked)}
                                                        />
                                                    }
                                                    label={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <SoundIcon />
                                                            Efectos de sonido
                                                        </Box>
                                                    }
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Alert severity="success" sx={{ mt: 3 }}>
                                    🎉 Como usuario Premium, tienes acceso completo a todas las opciones de personalización
                                </Alert>
                            </Box>
                        )}
                    </CardContent>
                </Card>

                {/* Botones de acción finales */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleResetSettings}
                    >
                        Restablecer Todo
                    </Button>
                    
                    <Button
                        variant="contained"
                        onClick={handleSaveSettings}
                        disabled={!hasChanges}
                    >
                        Guardar Configuraciones
                    </Button>
                </Box>
            </Container>
        </PermissionGate>
    );
}