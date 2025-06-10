import { Alert, Box, Divider, Stack, Typography } from '@mui/material';
import { StatusChip } from '../common';

export interface RecentRoutine {
    date: string;
    name: string;
    completed: boolean;
    duration: number;
}

export interface RecentRoutinesListProps {
    routines: RecentRoutine[];
    maxItems?: number;
    isPremiumUser?: boolean;
}

export default function RecentRoutinesList({ 
    routines, 
    maxItems = 5, 
    isPremiumUser = false 
}: RecentRoutinesListProps) {
    const displayedRoutines = routines.slice(0, maxItems);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                📋 Rutinas Recientes
            </Typography>
            <Stack spacing={1.5}>
                {displayedRoutines.map((routine, index) => (
                    <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" fontWeight="bold" noWrap>
                                    {routine.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(routine.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <StatusChip
                                status={routine.completed ? 'completed' : 'missed'}
                                label={routine.completed ? `${routine.duration}m` : 'Perdida'}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        {index < displayedRoutines.length - 1 && (
                            <Divider sx={{ mt: 1.5 }} />
                        )}
                    </Box>
                ))}
            </Stack>
            
            {!isPremiumUser && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Con Premium verías historial completo
                </Alert>
            )}
        </>
    );
}
