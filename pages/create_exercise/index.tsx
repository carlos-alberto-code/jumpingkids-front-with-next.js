import {
    Add as AddIcon,
    Star as PremiumIcon,
    Save as SaveIcon,
    Preview as PreviewIcon,
    CloudUpload as UploadIcon,
    Delete as DeleteIcon,
    RestartAlt as ResetIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { DIFFICULTY_OPTIONS } from '../../src/constants/exercise';

// 🏋️ TIPOS PARA CREAR EJERCICIO
interface CreateExerciseForm {
    title: string;
    description: string;
    duration: number;
    calories: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    categories: string[];
    gifUrl: string;
    instructions: string[];
    equipment: string[];
    targetAudience: 'kids' | 'teens' | 'all';
    safetyNotes: string[];
    isPublic: boolean;
}

// 📋 CATEGORÍAS DISPONIBLES
const AVAILABLE_CATEGORIES = [
    'Cardio',
    'Fuerza',
    'Flexibilidad',
    'Core',
    'Piernas',
    'Brazos',
    'Cuerpo Completo',
    'Movilidad',
    'Equilibrio',
    'Coordinación',
    'Relajación',
    'Bienestar'
];

const AVAILABLE_EQUIPMENT = [
    'Sin equipo',
    'Colchoneta',
    'Pelota pequeña',
    'Bandas elásticas',
    'Mancuernas ligeras',
    'Cojines',
    'Silla',
    'Pared',
    'Escalón'
];

const TARGET_AUDIENCE_OPTIONS = [
    { value: 'kids', label: 'Niños (5-12 años)', description: 'Ejercicios adaptados para niños' },
    { value: 'teens', label: 'Adolescentes (13-17 años)', description: 'Ejercicios para teens activos' },
    { value: 'all', label: 'Todas las edades', description: 'Ejercicios universales' }
];

export default function CreateExercisePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState<CreateExerciseForm>({
        title: '',
        description: '',
        duration: 10,
        calories: 50,
        difficulty: 'Principiante',
        categories: [],
        gifUrl: '',
        instructions: [''],
        equipment: ['Sin equipo'],
        targetAudience: 'kids',
        safetyNotes: [''],
        isPublic: false
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Handlers
    const handleInputChange = (field: keyof CreateExerciseForm, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleCategoryToggle = (category: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleEquipmentToggle = (equipment: string) => {
        setFormData(prev => ({
            ...prev,
            equipment: prev.equipment.includes(equipment)
                ? prev.equipment.filter(e => e !== equipment)
                : [...prev.equipment, equipment]
        }));
    };

    const handleArrayFieldChange = (field: 'instructions' | 'safetyNotes', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayField = (field: 'instructions' | 'safetyNotes') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayField = (field: 'instructions' | 'safetyNotes', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = 'El título es requerido';
        if (!formData.description.trim()) errors.description = 'La descripción es requerida';
        if (formData.duration < 1) errors.duration = 'La duración debe ser mayor a 0';
        if (formData.calories < 1) errors.calories = 'Las calorías deben ser mayores a 0';
        if (formData.categories.length === 0) errors.categories = 'Selecciona al menos una categoría';
        if (!formData.gifUrl.trim()) errors.gifUrl = 'La URL del GIF es requerida';
        if (formData.instructions.every(inst => !inst.trim())) errors.instructions = 'Agrega al menos una instrucción';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        // Simular guardado
        console.log('Guardando ejercicio:', formData);
        alert('✅ Ejercicio creado exitosamente (funcionalidad simulada)');
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            duration: 10,
            calories: 50,
            difficulty: 'Principiante',
            categories: [],
            gifUrl: '',
            instructions: [''],
            equipment: ['Sin equipo'],
            targetAudience: 'kids',
            safetyNotes: [''],
            isPublic: false
        });
    };

    const handlePreview = () => {
        if (!validateForm()) return;
        setShowPreview(true);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            duration: 10,
            calories: 50,
            difficulty: 'Principiante',
            categories: [],
            gifUrl: '',
            instructions: [''],
            equipment: ['Sin equipo'],
            targetAudience: 'kids',
            safetyNotes: [''],
            isPublic: false
        });
        setFormErrors({});
    };

    const estimatedCalories = Math.round(formData.duration * 5 + (formData.difficulty === 'Avanzado' ? 10 : formData.difficulty === 'Intermedio' ? 5 : 0));

    return (
        <PermissionGate
            permission="canCreateCustomExercises"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium.
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
                    <AddIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Crear Ejercicio Personalizado
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Diseña ejercicios únicos para tus hijos
                        </Typography>
                    </Box>
                    <Chip
                        icon={<PremiumIcon />}
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Formulario principal */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={3}>
                            {/* Información básica */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        📝 Información Básica
                                    </Typography>
                                    
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Nombre del ejercicio"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                error={!!formErrors.title}
                                                helperText={formErrors.title || 'Ej: "Saltos de rana divertidos"'}
                                                placeholder="Escribe un nombre atractivo para niños"
                                            />
                                        </Grid>
                                        
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Descripción"
                                                value={formData.description}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                                error={!!formErrors.description}
                                                helperText={formErrors.description || 'Describe el ejercicio de manera simple y motivadora'}
                                                placeholder="Explica qué hace el ejercicio y por qué es divertido..."
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Duración (minutos)"
                                                value={formData.duration}
                                                onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                                                error={!!formErrors.duration}
                                                helperText={formErrors.duration}
                                                inputProps={{ min: 1, max: 60 }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Calorías estimadas"
                                                value={formData.calories}
                                                onChange={(e) => handleInputChange('calories', Number(e.target.value))}
                                                slotProps={{
                                                    input: {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Est: {estimatedCalories}
                                                                </Typography>
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                helperText="Ajusta según la intensidad"
                                                inputProps={{ min: 1, max: 500 }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormControl fullWidth error={!!formErrors.difficulty}>
                                                <InputLabel>Dificultad</InputLabel>
                                                <Select
                                                    value={formData.difficulty}
                                                    label="Dificultad"
                                                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                                >
                                                    {DIFFICULTY_OPTIONS.map((difficulty) => (
                                                        <MenuItem key={difficulty} value={difficulty}>
                                                            {difficulty}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Categorías y equipo */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        🎯 Categorías y Equipo
                                    </Typography>
                                    
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Categorías (selecciona las que apliquen):
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {AVAILABLE_CATEGORIES.map((category) => (
                                                <Chip
                                                    key={category}
                                                    label={category}
                                                    variant={formData.categories.includes(category) ? 'filled' : 'outlined'}
                                                    color={formData.categories.includes(category) ? 'primary' : 'default'}
                                                    onClick={() => handleCategoryToggle(category)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </Box>
                                        {formErrors.categories && (
                                            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                                                {formErrors.categories}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Equipo necesario:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {AVAILABLE_EQUIPMENT.map((equipment) => (
                                                <Chip
                                                    key={equipment}
                                                    label={equipment}
                                                    variant={formData.equipment.includes(equipment) ? 'filled' : 'outlined'}
                                                    color={formData.equipment.includes(equipment) ? 'secondary' : 'default'}
                                                    onClick={() => handleEquipmentToggle(equipment)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Media */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        🎬 Media y Demostración
                                    </Typography>
                                    
                                    <TextField
                                        fullWidth
                                        label="URL del GIF o imagen"
                                        value={formData.gifUrl}
                                        onChange={(e) => handleInputChange('gifUrl', e.target.value)}
                                        error={!!formErrors.gifUrl}
                                        helperText={formErrors.gifUrl || 'Pega la URL de un GIF que muestre el ejercicio'}
                                        placeholder="https://ejemplo.com/mi-ejercicio.gif"
                                        sx={{ mb: 2 }}
                                    />

                                    <Button
                                        variant="outlined"
                                        startIcon={<UploadIcon />}
                                        disabled
                                        sx={{ mb: 2 }}
                                    >
                                        Subir archivo (próximamente)
                                    </Button>

                                    {formData.gifUrl && (
                                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Vista previa:
                                            </Typography>
                                            <Box
                                                component="img"
                                                src={formData.gifUrl}
                                                alt="Vista previa del ejercicio"
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: 200,
                                                    borderRadius: 2,
                                                    boxShadow: 2
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Instrucciones */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        📋 Instrucciones Paso a Paso
                                    </Typography>
                                    
                                    {formData.instructions.map((instruction, index) => (
                                        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                label={`Paso ${index + 1}`}
                                                value={instruction}
                                                onChange={(e) => handleArrayFieldChange('instructions', index, e.target.value)}
                                                placeholder="Describe este paso de manera clara y simple"
                                            />
                                            {formData.instructions.length > 1 && (
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeArrayField('instructions', index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    ))}
                                    
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => addArrayField('instructions')}
                                        size="small"
                                    >
                                        Agregar paso
                                    </Button>
                                    
                                    {formErrors.instructions && (
                                        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                                            {formErrors.instructions}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Configuraciones avanzadas */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        ⚙️ Configuraciones Avanzadas
                                    </Typography>
                                    
                                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                                        <FormLabel component="legend">Audiencia objetivo:</FormLabel>
                                        <RadioGroup
                                            value={formData.targetAudience}
                                            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                                        >
                                            {TARGET_AUDIENCE_OPTIONS.map((option) => (
                                                <FormControlLabel
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Radio />}
                                                    label={
                                                        <Box>
                                                            <Typography variant="body2">{option.label}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {option.description}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>

                                    {/* Notas de seguridad */}
                                    <Typography variant="subtitle2" gutterBottom>
                                        Notas de seguridad (opcional):
                                    </Typography>
                                    {formData.safetyNotes.map((note, index) => (
                                        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                label={`Nota de seguridad ${index + 1}`}
                                                value={note}
                                                onChange={(e) => handleArrayFieldChange('safetyNotes', index, e.target.value)}
                                                placeholder="Ej: Mantener la espalda recta durante el ejercicio"
                                                size="small"
                                            />
                                            {formData.safetyNotes.length > 1 && (
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeArrayField('safetyNotes', index)}
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    ))}
                                    
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => addArrayField('safetyNotes')}
                                        size="small"
                                        sx={{ mb: 2 }}
                                    >
                                        Agregar nota de seguridad
                                    </Button>

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={formData.isPublic}
                                                onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                                            />
                                        }
                                        label="Hacer público (otros tutores podrán usar este ejercicio)"
                                    />
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>

                    {/* Panel lateral */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={3}>
                            {/* Acciones */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        🚀 Acciones
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={handleSave}
                                            fullWidth
                                        >
                                            Guardar Ejercicio
                                        </Button>
                                        
                                        <Button
                                            variant="outlined"
                                            startIcon={<PreviewIcon />}
                                            onClick={handlePreview}
                                            fullWidth
                                        >
                                            Vista Previa
                                        </Button>
                                        
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<ResetIcon />}
                                            onClick={handleReset}
                                            fullWidth
                                        >
                                            Limpiar Todo
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Resumen */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        📊 Resumen
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Duración:</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formData.duration} min
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Calorías:</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formData.calories} cal
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Dificultad:</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formData.difficulty}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Categorías:</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formData.categories.length}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Instrucciones:</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formData.instructions.filter(i => i.trim()).length}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Tips */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        💡 Tips para Crear Ejercicios
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Alert severity="info" sx={{ p: 1 }}>
                                            <Typography variant="caption">
                                                Usa nombres divertidos que atraigan a los niños
                                            </Typography>
                                        </Alert>
                                        <Alert severity="success" sx={{ p: 1 }}>
                                            <Typography variant="caption">
                                                Las instrucciones claras mejoran la seguridad
                                            </Typography>
                                        </Alert>
                                        <Alert severity="warning" sx={{ p: 1 }}>
                                            <Typography variant="caption">
                                                Considera la edad del niño al establecer la dificultad
                                            </Typography>
                                        </Alert>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Modal de vista previa */}
                <Dialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Vista Previa del Ejercicio
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {formData.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {formData.description}
                            </Typography>
                            
                            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                                <Chip label={`${formData.duration} min`} color="primary" />
                                <Chip label={`${formData.calories} cal`} color="secondary" />
                                <Chip label={formData.difficulty} color="default" />
                            </Stack>

                            {formData.gifUrl && (
                                <Box
                                    component="img"
                                    src={formData.gifUrl}
                                    alt={formData.title}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: 300,
                                        borderRadius: 2,
                                        mb: 2
                                    }}
                                />
                            )}

                            <Typography variant="h6" gutterBottom>
                                Instrucciones:
                            </Typography>
                            <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
                                {formData.instructions.filter(i => i.trim()).map((instruction, index) => (
                                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                        {index + 1}. {instruction}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowPreview(false)}>
                            Cerrar
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Guardar Ejercicio
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PermissionGate>
    );
}