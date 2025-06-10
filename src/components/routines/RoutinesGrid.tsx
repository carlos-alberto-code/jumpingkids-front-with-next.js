import { Box } from '@mui/material';
import { Routine } from '../../types/routines';
import { EmptyState } from '../common';
import RoutineCard from './RoutineCard';

export interface RoutinesGridProps {
    routines: Routine[];
    isPremiumUser?: boolean;
    onPreviewRoutine: (routine: Routine) => void;
    onDuplicateRoutine?: (routine: Routine) => void;
    loading?: boolean;
}

export default function RoutinesGrid({
    routines,
    isPremiumUser = false,
    onPreviewRoutine,
    onDuplicateRoutine,
    loading = false
}: RoutinesGridProps) {

    if (loading) {
        return <EmptyState title="Cargando rutinas..." description="Por favor espere mientras se cargan las rutinas disponibles" />;
    }

    if (routines.length === 0) {
        return (
            <EmptyState
                title="No se encontraron rutinas"
                description="Ajusta los filtros o prueba con otros criterios de búsqueda"
            />
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: 3
            }}
        >
            {routines.map((routine) => (
                <Box key={routine.id}>
                    <RoutineCard
                        routine={routine}
                        isPremiumUser={isPremiumUser}
                        onPreview={onPreviewRoutine}
                        onDuplicate={onDuplicateRoutine}
                    />
                </Box>
            ))}
        </Box>
    );
}
