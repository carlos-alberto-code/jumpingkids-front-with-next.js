import {
    EmojiEvents as AchievementIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    SupervisorAccount as KidsIcon,
    Person as PersonIcon,
    TrendingUp as ProgressIcon,
    LocalFireDepartment as StreakIcon
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';

// 👶 TIPOS PARA GESTIÓN DE HIJOS
interface Kid {
    id: string;
    name: string;
    age: number;
    avatar: string;
    birthDate: string;
    preferences: {
        favoriteExercises: string[];
        preferredTime: string;
        maxDailyExercises: number;
        difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    };
    stats: {
        totalRoutines: number;
        thisWeekCompleted: number;
        thisWeekAssigned: number;
        currentStreak: number;
        longestStreak: number;
        favoriteCategory: string;
        totalMinutes: number;
        lastActivity?: string;
    };
    createdAt: string;
}

// 📊 DATOS MOCK DE HIJOS (según suscripción del tutor)
const MOCK_KIDS_FREE: Kid[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        age: 8,
        avatar: '👧',
        birthDate: '2016-03-15',
        preferences: {
            favoriteExercises: ['Jumping Jacks', 'Lagartijas Clásicas'],
            preferredTime: '16:00',
            maxDailyExercises: 5,
            difficulty: 'Principiante'
        },
        stats: {
            totalRoutines: 45,
            thisWeekCompleted: 4,
            thisWeekAssigned: 5,
            currentStreak: 3,
            longestStreak: 8,
            favoriteCategory: 'Cardio',
            totalMinutes: 1200,
            lastActivity: '2024-06-04T16:30:00Z'
        },
        createdAt: '2024-01-15T10:00:00Z'
    }
];

const MOCK_KIDS_PREMIUM: Kid[] = [
    ...MOCK_KIDS_FREE,
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        age: 6,
        avatar: '👦',
        birthDate: '2018-07-22',
        preferences: {
            favoriteExercises: ['Burpees', 'Sentadillas'],
            preferredTime: '15:30',
            maxDailyExercises: 4,
            difficulty: 'Principiante'
        },
        stats: {
            totalRoutines: 32,
            thisWeekCompleted: 3,
            thisWeekAssigned: 4,
            currentStreak: 2,
            longestStreak: 5,
            favoriteCategory: 'Fuerza',
            totalMinutes: 800,
            lastActivity: '2024-06-04T15:45:00Z'
        },
        createdAt: '2024-02-01T14:00:00Z'
    },
    {
        id: 'maria-003',
        name: 'María López',
        age: 10,
        avatar: '👧',
        birthDate: '2014-11-08',
        preferences: {
            favoriteExercises: ['Plancha Isométrica', 'Yoga Saludo al Sol'],
            preferredTime: '17:00',
            maxDailyExercises: 6,
            difficulty: 'Intermedio'
        },
        stats: {
            totalRoutines: 67,
            thisWeekCompleted: 6,
            thisWeekAssigned: 6,
            currentStreak: 7,
            longestStreak: 15,
            favoriteCategory: 'Flexibilidad',
            totalMinutes: 1800,
            lastActivity: '2024-06-04T17:15:00Z'
        },
        createdAt: '2024-01-20T09:00:00Z'
    }
];

const AVATAR_OPTIONS = ['👧', '👦', '🧒', '👨‍🦱', '👩‍🦱', '👶'];

export default function MyKidsPage() {
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
    const theme = useTheme();
    const [kids, setKids] = useState<Kid[]>(isPremiumUser ? MOCK_KIDS_PREMIUM : MOCK_KIDS_FREE);
    const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [kidToDelete, setKidToDelete] = useState<Kid | null>(null);

    // Límites según suscripción
    const maxKids = isPremiumUser ? 3 : 1;
    const canAddMore = kids.length < maxKids;

    // Form state para agregar/editar
    const [formData, setFormData] = useState<{
        name: string;
        age: number;
        avatar: string;
        preferredTime: string;
        maxDailyExercises: number;
        difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    }>({
        name: '',
        age: 6,
        avatar: '👧',
        preferredTime: '16:00',
        maxDailyExercises: 5,
        difficulty: 'Principiante'
    });

    // Handlers
    const handleEditKid = (kid: Kid) => {
        setSelectedKid(kid);
        setFormData({
            name: kid.name,
            age: kid.age,
            avatar: kid.avatar,
            preferredTime: kid.preferences.preferredTime,
            maxDailyExercises: kid.preferences.maxDailyExercises,
            difficulty: kid.preferences.difficulty
        });
        setEditModalOpen(true);
    };

    const handleAddKid = () => {
        setFormData({
            name: '',
            age: 6,
            avatar: '👧',
            preferredTime: '16:00',
            maxDailyExercises: 5,
            difficulty: 'Principiante'
        });
        setAddModalOpen(true);
    };

    const handleSaveKid = () => {
        if (selectedKid) {
            // Editar hijo existente
            setKids(prevKids => prevKids.map(kid =>
                kid.id === selectedKid.id
                    ? {
                        ...kid,
                        name: formData.name,
                        age: formData.age,
                        avatar: formData.avatar,
                        preferences: {
                            ...kid.preferences,
                            preferredTime: formData.preferredTime,
                            maxDailyExercises: formData.maxDailyExercises,
                            difficulty: formData.difficulty
                        }
                    }
                    : kid
            ));
            setEditModalOpen(false);
        } else {
            // Agregar nuevo hijo
            const newKid: Kid = {
                id: `kid-${Date.now()}`,
                name: formData.name,
                age: formData.age,
                avatar: formData.avatar,
                birthDate: new Date(Date.now() - formData.age * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                preferences: {
                    favoriteExercises: [],
                    preferredTime: formData.preferredTime,
                    maxDailyExercises: formData.maxDailyExercises,
                    difficulty: formData.difficulty
                },
                stats: {
                    totalRoutines: 0,
                    thisWeekCompleted: 0,
                    thisWeekAssigned: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    favoriteCategory: 'Cardio',
                    totalMinutes: 0
                },
                createdAt: new Date().toISOString()
            };
            setKids(prevKids => [...prevKids, newKid]);
            setAddModalOpen(false);
        }
        setSelectedKid(null);
    };

    const handleDeleteKid = (kid: Kid) => {
        setKidToDelete(kid);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (kidToDelete) {
            setKids(prevKids => prevKids.filter(kid => kid.id !== kidToDelete.id));
            setDeleteConfirmOpen(false);
            setKidToDelete(null);
        }
    };

    const renderKidCard = (kid: Kid) => (
        <Card key={kid.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
                {/* Header con avatar y nombre */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, fontSize: '2rem' }}>
                        {kid.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {kid.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {kid.age} años
                        </Typography>
                        <Chip
                            label={kid.preferences.difficulty}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                {/* Estadísticas de la semana */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        📅 Esta Semana
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Rutinas: {kid.stats.thisWeekCompleted}/{kid.stats.thisWeekAssigned}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {Math.round((kid.stats.thisWeekCompleted / kid.stats.thisWeekAssigned) * 100) || 0}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(kid.stats.thisWeekCompleted / kid.stats.thisWeekAssigned) * 100 || 0}
                        sx={{ height: 6, borderRadius: 3 }}
                    />
                </Box>

                {/* Estadísticas rápidas */}
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid size={4}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <StreakIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                            <Typography variant="caption" display="block">
                                Racha
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {kid.stats.currentStreak}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={4}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <AchievementIcon sx={{ color: 'success.main', fontSize: 20 }} />
                            <Typography variant="caption" display="block">
                                Total
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {kid.stats.totalRoutines}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={4}>
                        <Paper sx={{ p: 1, textAlign: 'center' }}>
                            <ProgressIcon sx={{ color: 'info.main', fontSize: 20 }} />
                            <Typography variant="caption" display="block">
                                Horas
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {Math.floor(kid.stats.totalMinutes / 60)}h
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Preferencias */}
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        ⚙️ Configuración
                    </Typography>
                    <Stack spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                            Horario preferido: {kid.preferences.preferredTime}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Máx. ejercicios: {kid.preferences.maxDailyExercises}/día
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Categoría favorita: {kid.stats.favoriteCategory}
                        </Typography>
                        {kid.stats.lastActivity && (
                            <Typography variant="caption" color="success.main">
                                Última actividad: {new Date(kid.stats.lastActivity).toLocaleDateString()}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditKid(kid)}
                    size="small"
                    disabled={!isPremiumUser && kids.length > 0 && kid.id !== kids[0].id}
                >
                    Editar
                </Button>
                <IconButton
                    onClick={() => handleDeleteKid(kid)}
                    color="error"
                    size="small"
                    disabled={!isPremiumUser && kids.length === 1}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );

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
                    <KidsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Mis Hijos
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Gestiona los perfiles de tu{kids.length > 1 ? 's' : ''} hijo{kids.length > 1 ? 's' : ''} ({kids.length}/{maxKids})
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

                {/* Información del plan */}
                <Alert
                    severity={isPremiumUser ? "success" : "info"}
                    sx={{ mb: 3 }}
                >
                    {isPremiumUser ? (
                        <>
                            🎉 <strong>Plan Premium:</strong> Puedes gestionar hasta 3 hijos con configuraciones individuales y estadísticas avanzadas.
                        </>
                    ) : (
                        <>
                            ℹ️ <strong>Plan Gratuito:</strong> Puedes gestionar 1 hijo. Actualiza a Premium para gestionar hasta 3 hijos con funciones avanzadas.
                        </>
                    )}
                </Alert>

                {/* Lista de hijos */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {kids.map(kid => (
                        <Grid size={{ xs: 12, sm: 6, md: isPremiumUser ? 4 : 6 }} key={kid.id}>
                            {renderKidCard(kid)}
                        </Grid>
                    ))}

                    {/* Card para agregar hijo */}
                    {canAddMore && (
                        <Grid size={{ xs: 12, sm: 6, md: isPremiumUser ? 4 : 6 }}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px dashed ${theme.palette.grey[300]}`,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    borderColor: theme.palette.primary.main
                                }
                            }}
                                onClick={handleAddKid}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <PersonIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                    <Typography variant="h6" color="primary.main">
                                        Agregar Hijo
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hasta {maxKids} hijo{maxKids > 1 ? 's' : ''}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>

                {/* Estadísticas consolidadas */}
                {kids.length > 1 && isPremiumUser && (
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                📊 Resumen Consolidado (Premium)
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" fontWeight="bold" color="primary.main">
                                            {kids.reduce((sum, kid) => sum + kid.stats.thisWeekCompleted, 0)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Rutinas completadas esta semana
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" fontWeight="bold" color="success.main">
                                            {Math.max(...kids.map(kid => kid.stats.currentStreak))}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Mejor racha actual
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" fontWeight="bold" color="info.main">
                                            {Math.floor(kids.reduce((sum, kid) => sum + kid.stats.totalMinutes, 0) / 60)}h
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tiempo total ejercitado
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {/* FAB para agregar hijo */}
                {canAddMore && (
                    <Fab
                        color="primary"
                        aria-label="add kid"
                        onClick={handleAddKid}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <AddIcon />
                    </Fab>
                )}

                {/* Modal Agregar Hijo */}
                <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>👶 Agregar Nuevo Hijo</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Nombre completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                label="Edad"
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                inputProps={{ min: 3, max: 16 }}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Avatar</InputLabel>
                                <Select
                                    value={formData.avatar}
                                    label="Avatar"
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                >
                                    {AVATAR_OPTIONS.map((avatar) => (
                                        <MenuItem key={avatar} value={avatar}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span style={{ fontSize: '1.5rem' }}>{avatar}</span>
                                                <span>Avatar {AVATAR_OPTIONS.indexOf(avatar) + 1}</span>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Horario preferido"
                                type="time"
                                value={formData.preferredTime}
                                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Máximo ejercicios por día</InputLabel>
                                <Select
                                    value={formData.maxDailyExercises}
                                    label="Máximo ejercicios por día"
                                    onChange={(e) => setFormData({ ...formData, maxDailyExercises: Number(e.target.value) })}
                                >
                                    {[3, 4, 5, 6, 7, 8].map((num) => (
                                        <MenuItem key={num} value={num}>{num} ejercicios</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Nivel inicial</InputLabel>
                                <Select
                                    value={formData.difficulty}
                                    label="Nivel inicial"
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                                >
                                    <MenuItem value="Principiante">Principiante</MenuItem>
                                    <MenuItem value="Intermedio">Intermedio</MenuItem>
                                    <MenuItem value="Avanzado">Avanzado</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddModalOpen(false)}>Cancelar</Button>
                        <Button
                            onClick={handleSaveKid}
                            variant="contained"
                            disabled={!formData.name.trim()}
                        >
                            Agregar Hijo
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Modal Editar Hijo */}
                <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>✏️ Editar Hijo</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Nombre completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                label="Edad"
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                inputProps={{ min: 3, max: 16 }}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Avatar</InputLabel>
                                <Select
                                    value={formData.avatar}
                                    label="Avatar"
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                >
                                    {AVATAR_OPTIONS.map((avatar) => (
                                        <MenuItem key={avatar} value={avatar}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span style={{ fontSize: '1.5rem' }}>{avatar}</span>
                                                <span>Avatar {AVATAR_OPTIONS.indexOf(avatar) + 1}</span>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Horario preferido"
                                type="time"
                                value={formData.preferredTime}
                                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                disabled={!isPremiumUser}
                                helperText={!isPremiumUser ? "Configuración individual disponible con Premium" : ""}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Máximo ejercicios por día</InputLabel>
                                <Select
                                    value={formData.maxDailyExercises}
                                    label="Máximo ejercicios por día"
                                    onChange={(e) => setFormData({ ...formData, maxDailyExercises: Number(e.target.value) })}
                                    disabled={!isPremiumUser}
                                >
                                    {[3, 4, 5, 6, 7, 8].map((num) => (
                                        <MenuItem key={num} value={num}>{num} ejercicios</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Nivel de dificultad</InputLabel>
                                <Select
                                    value={formData.difficulty}
                                    label="Nivel de dificultad"
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                                    disabled={!isPremiumUser}
                                >
                                    <MenuItem value="Principiante">Principiante</MenuItem>
                                    <MenuItem value="Intermedio">Intermedio</MenuItem>
                                    <MenuItem value="Avanzado">Avanzado</MenuItem>
                                </Select>
                            </FormControl>

                            {!isPremiumUser && (
                                <Alert severity="info">
                                    Las configuraciones individuales están disponibles con la suscripción Premium
                                </Alert>
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
                        <Button
                            onClick={handleSaveKid}
                            variant="contained"
                            disabled={!formData.name.trim()}
                        >
                            Guardar Cambios
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Modal Confirmar Eliminación */}
                <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                    <DialogTitle>⚠️ Confirmar Eliminación</DialogTitle>
                    <DialogContent>
                        <Typography>
                            ¿Estás seguro de que deseas eliminar el perfil de{' '}
                            <strong>{kidToDelete?.name}</strong>?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Esta acción no se puede deshacer y se perderán todas las estadísticas.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PermissionGate>
    );
}