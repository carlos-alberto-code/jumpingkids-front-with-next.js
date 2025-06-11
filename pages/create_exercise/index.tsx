import { Add as AddIcon, Star as PremiumIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Chip,
    Container,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import {
    AdvancedConfigSection,
    BasicInfoSection,
    CategoriesSection,
    ExercisePreviewModal,
    ExerciseSidebar,
    InstructionsSection,
    MediaSection
} from '../../src/components/common';
import { DEFAULT_CREATE_EXERCISE_FORM } from '../../src/constants/exercise';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { CreateExerciseForm } from '../../src/types/exercise';

export default function CreateExercisePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState<CreateExerciseForm>(DEFAULT_CREATE_EXERCISE_FORM);
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
        handleReset();
    };

    const handlePreview = () => {
        if (!validateForm()) return;
        setShowPreview(true);
    };

    const handleReset = () => {
        setFormData(DEFAULT_CREATE_EXERCISE_FORM);
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
                            Creación de Ejercicios Personalizados
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Diseña ejercicios especialmente para tus hijos.
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
                            <BasicInfoSection
                                formData={formData}
                                formErrors={formErrors}
                                estimatedCalories={estimatedCalories}
                                onInputChange={handleInputChange}
                            />

                            {/* Categorías y equipo */}
                            <CategoriesSection
                                selectedCategories={formData.categories}
                                selectedEquipment={formData.equipment}
                                categoryError={formErrors.categories}
                                onCategoryToggle={handleCategoryToggle}
                                onEquipmentToggle={handleEquipmentToggle}
                            />

                            {/* Media */}
                            <MediaSection
                                gifUrl={formData.gifUrl}
                                gifUrlError={formErrors.gifUrl}
                                onGifUrlChange={(url) => handleInputChange('gifUrl', url)}
                            />

                            {/* Instrucciones */}
                            <InstructionsSection
                                instructions={formData.instructions}
                                instructionsError={formErrors.instructions}
                                onInstructionChange={(index, value) => handleArrayFieldChange('instructions', index, value)}
                                onAddInstruction={() => addArrayField('instructions')}
                                onRemoveInstruction={(index) => removeArrayField('instructions', index)}
                            />

                            {/* Configuraciones avanzadas */}
                            <AdvancedConfigSection
                                targetAudience={formData.targetAudience}
                                safetyNotes={formData.safetyNotes}
                                isPublic={formData.isPublic}
                                onTargetAudienceChange={(value) => handleInputChange('targetAudience', value)}
                                onSafetyNoteChange={(index, value) => handleArrayFieldChange('safetyNotes', index, value)}
                                onAddSafetyNote={() => addArrayField('safetyNotes')}
                                onRemoveSafetyNote={(index) => removeArrayField('safetyNotes', index)}
                                onIsPublicChange={(value) => handleInputChange('isPublic', value)}
                            />
                        </Stack>
                    </Grid>

                    {/* Panel lateral */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <ExerciseSidebar
                            formData={formData}
                            onSave={handleSave}
                            onPreview={handlePreview}
                            onReset={handleReset}
                        />
                    </Grid>
                </Grid>

                {/* Modal de vista previa */}
                <ExercisePreviewModal
                    open={showPreview}
                    formData={formData}
                    onClose={() => setShowPreview(false)}
                    onSave={handleSave}
                />
            </Container>
        </PermissionGate>
    );
}