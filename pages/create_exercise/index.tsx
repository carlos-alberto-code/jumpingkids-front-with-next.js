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
    MediaSection,
    Notification
} from '../../src/components/common';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { useNotification } from '../../src/hooks/common/useNotification';
import { useCreateExercise, useExerciseForm } from '../../src/hooks/exercise';

export default function CreateExercisePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const [showPreview, setShowPreview] = useState(false);

    // Hooks personalizados para manejar el formulario y la API
    const {
        formData,
        formErrors,
        handleInputChange,
        handleCategoryToggle,
        handleEquipmentToggle,
        handleArrayFieldChange,
        addArrayField,
        removeArrayField,
        validateForm,
        resetForm,
        estimatedCalories
    } = useExerciseForm();

    const { createExercise, loading, error, clearError } = useCreateExercise();
    const { notification, showSuccess, showError, hideNotification } = useNotification();

    const handleSave = async () => {
        if (!validateForm()) {
            showError('Por favor, completa todos los campos requeridos.');
            return;
        }

        const result = await createExercise(formData);

        if (result) {
            showSuccess('✅ Ejercicio creado exitosamente');
            resetForm(); // Usar el método del hook
        } else if (error) {
            showError(`Error al crear ejercicio: ${error}`);
        }
    };

    const handlePreview = () => {
        if (!validateForm()) return;
        setShowPreview(true);
    };

    const handleReset = () => {
        resetForm();
        clearError(); // Limpiar errores de API también
    };

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
                            loading={loading}
                            error={error}
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

                {/* Sistema de notificaciones */}
                <Notification
                    notification={notification}
                    onClose={hideNotification}
                />
            </Container>
        </PermissionGate>
    );
}