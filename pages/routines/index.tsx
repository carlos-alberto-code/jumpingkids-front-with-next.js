import {
    Box,
    Container
} from '@mui/material';
import { useState } from 'react';
import {
    DEFAULT_FILTERS,
    filterRoutines,
    generateCustomRoutines,
    getAvailableCategories,
    RoutineCreator,
    RoutineFilters,
    RoutinePreview,
    RoutinesGrid
} from '../../src/components/routines';
import type { RoutineFilters as IRoutineFilters } from '../../src/components/routines/routinesUtils';
import { MOCK_ROUTINES } from '../../src/constants/routinesMocks';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Routine } from '../../src/types/routines';

export default function RoutinesPage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const [filters, setFilters] = useState<IRoutineFilters>(DEFAULT_FILTERS);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);

    // Filtrar rutinas según suscripción
    const allRoutines = isPremiumUser ?
        [...MOCK_ROUTINES, ...generateCustomRoutines()] :
        MOCK_ROUTINES.filter(r => r.isPublic);

    // Aplicar filtros
    const filteredRoutines = filterRoutines(allRoutines, filters);

    // Obtener categorías únicas
    const availableCategories = getAvailableCategories(allRoutines);

    // Handlers
    const handleFilterChange = (filterKey: keyof IRoutineFilters, value: string) => {
        setFilters((prev: IRoutineFilters) => ({ ...prev, [filterKey]: value }));
    };

    const handleClearFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const handlePreviewRoutine = (routine: Routine) => {
        setSelectedRoutine(routine);
        setPreviewModalOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewModalOpen(false);
        setSelectedRoutine(null);
    };

    const handleDuplicateRoutine = (routine: Routine) => {
        // TODO: Implementar lógica de duplicación
        console.log('Duplicar rutina:', routine.id);
    };

    const handleCreateRoutine = () => {
        // TODO: Implementar navegación a creador de rutinas
        console.log('Crear nueva rutina');
    };

    const handleUpgradePremium = () => {
        // TODO: Implementar navegación a upgrade premium
        console.log('Upgrade a premium');
    };

    const handleUseInAssignment = (routine: Routine) => {
        // TODO: Implementar navegación a asignación
        console.log('Usar rutina en asignación:', routine.id);
        handleClosePreview();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <RoutineCreator
                isPremiumUser={isPremiumUser}
                onCreateRoutine={handleCreateRoutine}
                onUpgradePremium={handleUpgradePremium}
                totalRoutines={allRoutines.length}
                filteredRoutines={filteredRoutines.length}
            />

            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Panel de filtros */}
                <Box sx={{ width: '300px', flexShrink: 0 }}>
                    <RoutineFilters
                        filters={filters}
                        availableCategories={availableCategories}
                        isPremiumUser={isPremiumUser}
                        totalRoutines={allRoutines.length}
                        filteredCount={filteredRoutines.length}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </Box>

                {/* Lista de rutinas */}
                <Box sx={{ flex: 1 }}>
                    <RoutinesGrid
                        routines={filteredRoutines}
                        isPremiumUser={isPremiumUser}
                        onPreviewRoutine={handlePreviewRoutine}
                        onDuplicateRoutine={handleDuplicateRoutine}
                    />
                </Box>
            </Box>

            {/* Modal de preview */}
            <RoutinePreview
                routine={selectedRoutine}
                open={previewModalOpen}
                isPremiumUser={isPremiumUser}
                onClose={handleClosePreview}
                onDuplicate={handleDuplicateRoutine}
                onUseInAssignment={handleUseInAssignment}
            />
        </Container>
    );
}
