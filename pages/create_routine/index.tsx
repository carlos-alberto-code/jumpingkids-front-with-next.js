import {
    PlaylistAdd as PlaylistAddIcon,
    Star as PremiumIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Chip,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { MOCK_EXERCISES } from '../../src/constants/exerciseMocks';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { useNotification } from '../../src/hooks/common/useNotification';
import { useCreateRoutine, useExerciseFilter, useRoutineForm } from '../../src/hooks/routine';

import { Notification } from '../../src/components/common';
import {
    ExerciseSelectorModal,
    RoutineActionsPanel,
    RoutineBasicInfoSection,
    RoutineExercisesList,
    RoutinePreviewModal,
    RoutineSummary,
    RoutineTips
} from '../../src/components/routine';

export default function CreateRoutinePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const [showPreview, setShowPreview] = useState(false);
    const [showExerciseSelector, setShowExerciseSelector] = useState(false);

    // Hooks personalizados para manejar el formulario y la API
    const {
        formData,
        formErrors,
        handleInputChange,
        handleAddExercise,
        handleRemoveExercise,
        validateForm,
        resetForm,
        totalCalories,
        totalTimeWithRest
    } = useRoutineForm();

    const { createRoutine, loading, error, clearError } = useCreateRoutine();
    const { notification, showSuccess, showError, hideNotification } = useNotification();
    const { exerciseFilter, filteredExercises, updateFilter } = useExerciseFilter(MOCK_EXERCISES);

    const handleSave = async () => {
        if (!validateForm()) {
            showError('Por favor, completa todos los campos requeridos.');
            return;
        }

        const result = await createRoutine(formData);

        if (result) {
            showSuccess('Rutina creada exitosamente');
            resetForm();
            setShowPreview(false);
        } else if (error) {
            showError(`Error al crear rutina: ${error.message}`);
        }
    };

    const handlePreview = () => {
        if (!validateForm()) {
            showError('Por favor, completa todos los campos requeridos antes de la vista previa.');
            return;
        }
        setShowPreview(true);
    };

    const handleReset = () => {
        resetForm();
        clearError();
    };

    return (
        <PermissionGate
            permission="canCreateExercisesForKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad requiere suscripción Premium y permisos de tutor.
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
                    <PlaylistAddIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Crear Rutina Personalizada
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Combina ejercicios para crear rutinas únicas
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
                    {/* Información básica */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RoutineBasicInfoSection
                            formData={formData}
                            formErrors={formErrors}
                            onInputChange={handleInputChange}
                        />
                    </Grid>

                    {/* Resumen automático */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RoutineSummary
                            formData={formData}
                            formErrors={formErrors}
                            totalCalories={totalCalories}
                            totalTimeWithRest={totalTimeWithRest}
                        />
                    </Grid>

                    {/* Ejercicios en la rutina */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RoutineExercisesList
                            formData={formData}
                            onRemoveExercise={handleRemoveExercise}
                            onAddExercises={() => setShowExerciseSelector(true)}
                        />
                    </Grid>

                    {/* Acciones */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RoutineActionsPanel
                            hasExercises={formData.exercises.length > 0}
                            loading={loading}
                            onSave={handleSave}
                            onPreview={handlePreview}
                            onReset={handleReset}
                        />
                    </Grid>
                </Grid>

                {/* Modal selector de ejercicios */}
                <ExerciseSelectorModal
                    open={showExerciseSelector}
                    onClose={() => setShowExerciseSelector(false)}
                    exercises={filteredExercises}
                    exerciseFilter={exerciseFilter}
                    onFilterChange={updateFilter}
                    onAddExercise={handleAddExercise}
                />

                {/* Modal de vista previa */}
                <RoutinePreviewModal
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    formData={formData}
                    totalCalories={totalCalories}
                    onSave={handleSave}
                />

                {/* Sistema de notificaciones */}
                <Notification
                    notification={notification}
                    onClose={hideNotification}
                />

                {/* Tips para crear rutinas */}
                <RoutineTips showInitially={true} showHelpButton={true} />
            </Container>
        </PermissionGate>
    );
}
