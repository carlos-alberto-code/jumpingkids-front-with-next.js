// pages/asignments/index.tsx - Corregida para niños
import {
    CalendarMonth as CalendarIcon,
    CheckCircle as CompletedIcon,
    Event as EventIcon,
    HighlightOff as MissedIcon,
    Schedule as PendingIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    IconButton,
    Modal,
    Paper,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getMockAssignmentsForKid } from '../../src/constants/progressMocks';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { getAssignments } from '../../src/services/routine/RoutineService';
import { RoutineAssignment } from '../../src/types/routines';

// Tipos para el calendario
interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    assignment?: RoutineAssignment;
}

export default function AssignmentsPage() {
    const { session } = useAuthContext();
    const { isPremiumUser, isKid } = usePermissionCheck();
    const theme = useTheme();

    const [assignments, setAssignments] = useState<RoutineAssignment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedAssignment, setSelectedAssignment] = useState<RoutineAssignment | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // ✅ VERIFICACIÓN: Solo niños pueden acceder
    if (!isKid) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Esta página es solo para niños. Los tutores deben usar "Asignar Rutinas".
                </Alert>
            </Container>
        );
    }

    // Cargar asignaciones del mes actual
    useEffect(() => {
        const loadAssignments = async () => {
            if (!session?.user?.id) {
                console.log('❌ No hay usuario autenticado para cargar asignaciones');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                console.log('📅 Cargando asignaciones para kidId:', session.user.id);

                // 🎭 Usar datos mock si está configurado
                if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
                    console.log('🎭 Usando datos mock para asignaciones');
                    const mockAssignments = getMockAssignmentsForKid(session.user.id);
                    console.log('✅ Asignaciones mock cargadas:', mockAssignments);
                    setAssignments(mockAssignments);
                    setLoading(false);
                    return;
                }

                // 🌐 Usar API real
                const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

                const monthAssignments = await getAssignments(
                    session.user.id,
                    startOfMonth.toISOString().split('T')[0],
                    endOfMonth.toISOString().split('T')[0]
                );

                console.log('✅ Asignaciones cargadas:', monthAssignments);
                setAssignments(monthAssignments);
            } catch (err) {
                console.error('❌ Error cargando asignaciones:', err);
                setError('Error al cargar asignaciones');
            } finally {
                setLoading(false);
            }
        };

        loadAssignments();
    }, [session?.user?.id, currentMonth]);

    // Generar días del calendario
    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

        const days: CalendarDay[] = [];
        const currentDate = new Date(startDate);

        for (let i = 0; i < 42; i++) { // 6 semanas × 7 días
            const dateStr = currentDate.toISOString().split('T')[0];
            const assignment = assignments.find(a => a.assignedDate === dateStr);

            days.push({
                date: new Date(currentDate),
                dayNumber: currentDate.getDate(),
                isCurrentMonth: currentDate.getMonth() === month,
                assignment
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    // Obtener color y estado según assignment
    const getAssignmentStatus = (assignment: RoutineAssignment | undefined, date: Date) => {
        if (!assignment) {
            const today = new Date();
            if (date < today) {
                return { status: 'missed', color: theme.palette.error.main, icon: <MissedIcon /> };
            }
            return { status: 'empty', color: theme.palette.grey[300], icon: null };
        }

        switch (assignment.status) {
            case 'completed':
                return { status: 'completed', color: theme.palette.success.main, icon: <CompletedIcon /> };
            case 'pending':
                const today = new Date();
                const assignmentDate = new Date(assignment.assignedDate);
                if (assignmentDate.toDateString() === today.toDateString()) {
                    return { status: 'today', color: theme.palette.primary.main, icon: <PendingIcon /> };
                }
                return { status: 'pending', color: theme.palette.info.main, icon: <PendingIcon /> };
            default:
                return { status: 'unknown', color: theme.palette.grey[500], icon: <EventIcon /> };
        }
    };

    // Handlers
    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDayClick = (day: CalendarDay) => {
        if (day.assignment) {
            setSelectedAssignment(day.assignment);
            setModalOpen(true);
        }
    };

    const calendarDays = generateCalendarDays();
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography>Cargando tus asignaciones...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4
            }}>
                <CalendarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Mis Asignaciones
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ¡Aquí están tus rutinas programadas, {session?.user?.name}! 📅
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

            {/* Información para el niño */}
            <Alert severity="info" sx={{ mb: 3 }}>
                💡 <strong>¿Cómo funciona?</strong> Tu tutor programa rutinas para ti cada día.
                Puedes ver qué rutina tienes hoy y qué viene después.
            </Alert>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Calendario */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    {/* Header del calendario */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderBottom: `1px solid ${theme.palette.divider}`
                    }}>
                        <IconButton onClick={handlePreviousMonth}>
                            ←
                        </IconButton>
                        <Typography variant="h5" fontWeight="bold">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </Typography>
                        <IconButton onClick={handleNextMonth}>
                            →
                        </IconButton>
                    </Box>

                    {/* Días de la semana */}
                    <Grid container sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                        {dayNames.map((day) => (
                            <Grid size={{ xs: 12 / 7 }} key={day}>
                                <Box sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.grey[50],
                                    fontWeight: 'bold'
                                }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {day}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Días del calendario */}
                    <Grid container>
                        {calendarDays.map((day, index) => {
                            const { status, color, icon } = getAssignmentStatus(day.assignment, day.date);
                            const isToday = day.date.toDateString() === new Date().toDateString();

                            return (
                                <Grid size={{ xs: 12 / 7 }} key={index}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            height: 80,
                                            p: 1,
                                            cursor: day.assignment ? 'pointer' : 'default',
                                            opacity: day.isCurrentMonth ? 1 : 0.3,
                                            backgroundColor: isToday ? theme.palette.primary.light + '20' : 'transparent',
                                            border: isToday ? `2px solid ${theme.palette.primary.main}` : 'none',
                                            borderRadius: 0,
                                            borderRight: `1px solid ${theme.palette.divider}`,
                                            borderBottom: `1px solid ${theme.palette.divider}`,
                                            '&:hover': day.assignment ? {
                                                backgroundColor: theme.palette.action.hover
                                            } : {},
                                            transition: 'background-color 0.2s'
                                        }}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: isToday ? 'bold' : 'normal',
                                                    color: isToday ? theme.palette.primary.main : 'inherit'
                                                }}
                                            >
                                                {day.dayNumber}
                                            </Typography>

                                            {icon && (
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    <Box sx={{ color, fontSize: 16 }}>
                                                        {icon}
                                                    </Box>
                                                    {day.assignment && (
                                                        <Typography variant="caption" sx={{
                                                            fontSize: '0.6rem',
                                                            textAlign: 'center',
                                                            lineHeight: 1,
                                                            maxWidth: 40,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                            {day.assignment.routine.title}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}
                                        </Box>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>

            {/* Leyenda */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        🔍 ¿Qué significan los colores?
                    </Typography>
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CompletedIcon sx={{ color: theme.palette.success.main }} />
                            <Typography variant="body2">¡Ya la hiciste! 🎉</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PendingIcon sx={{ color: theme.palette.primary.main }} />
                            <Typography variant="body2">¡Hoy toca entrenar! 💪</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PendingIcon sx={{ color: theme.palette.info.main }} />
                            <Typography variant="body2">Viene después 📅</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MissedIcon sx={{ color: theme.palette.error.main }} />
                            <Typography variant="body2">Se te pasó 😔</Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            {/* Modal de detalle */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Card sx={{ maxWidth: 500, mx: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        {selectedAssignment && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    {selectedAssignment.routine.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {selectedAssignment.routine.description}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <Chip
                                        label={`${selectedAssignment.routine.exercises.length} ejercicios`}
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={`${selectedAssignment.routine.totalDuration} min`}
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={selectedAssignment.routine.difficulty}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>

                                <Typography variant="body2" color="text.secondary">
                                    📅 Fecha: {new Date(selectedAssignment.assignedDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    📊 Estado: {selectedAssignment.status === 'completed' ? '✅ Completada' :
                                        selectedAssignment.status === 'pending' ? '⏳ Pendiente' :
                                            selectedAssignment.status}
                                </Typography>

                                {selectedAssignment.completedAt && (
                                    <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                                        🎉 ¡Completada el {new Date(selectedAssignment.completedAt).toLocaleString()}!
                                    </Typography>
                                )}

                                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        💡 <strong>Tip:</strong> Ve a "Entrenamiento" para hacer esta rutina cuando sea el día indicado.
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Modal>
        </Container>
    );
}