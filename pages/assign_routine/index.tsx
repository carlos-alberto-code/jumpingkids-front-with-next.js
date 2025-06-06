import {
    Assignment as AssignIcon,
    CalendarMonth as CalendarIcon,
    CheckCircle as AssignedIcon,
    FitnessCenter as ExerciseIcon,
    Schedule as ScheduleIcon,
    SupervisorAccount as KidIcon,
    Timer as TimerIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { MOCK_ROUTINES } from '../../src/constants/routinesMocks';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Routine } from '../../src/types/routines';

// 📅 TIPOS PARA ASIGNACIÓN DE RUTINAS
interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isPast: boolean;
    assignments: { [kidId: string]: Routine | null };
}

interface Kid {
    id: string;
    name: string;
    avatar: string;
    age: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
}

interface Assignment {
    id: string;
    kidId: string;
    routineId: string;
    date: string;
    routine: Routine;
}

// 👶 DATOS MOCK DE HIJOS (según suscripción)
const MOCK_KIDS_FREE: Kid[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        avatar: '👧',
        age: 8,
        difficulty: 'Principiante'
    }
];

const MOCK_KIDS_PREMIUM: Kid[] = [
    ...MOCK_KIDS_FREE,
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        avatar: '👦',
        age: 6,
        difficulty: 'Principiante'
    },
    {
        id: 'maria-003',
        name: 'María López',
        avatar: '👧',
        age: 10,
        difficulty: 'Intermedio'
    }
];

// 📋 ASIGNACIONES EXISTENTES (mock)
const MOCK_EXISTING_ASSIGNMENTS: Assignment[] = [
    {
        id: 'assign-1',
        kidId: 'sofia-001',
        routineId: 'routine-001',
        date: '2024-06-05',
        routine: MOCK_ROUTINES[0]
    },
    {
        id: 'assign-2',
        kidId: 'diego-002',
        routineId: 'routine-002',
        date: '2024-06-05',
        routine: MOCK_ROUTINES[1]
    },
    {
        id: 'assign-3',
        kidId: 'sofia-001',
        routineId: 'routine-004',
        date: '2024-06-06',
        routine: MOCK_ROUTINES[3]
    }
];

export default function AssignRoutinePage() {
    const { user, isPremiumUser } = usePermissionCheck();
    const theme = useTheme();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>(MOCK_EXISTING_ASSIGNMENTS);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

    // Datos según suscripción
    const kids = isPremiumUser ? MOCK_KIDS_PREMIUM : MOCK_KIDS_FREE;
    const availableRoutines = isPremiumUser ? MOCK_ROUTINES : MOCK_ROUTINES.filter(r => r.isPublic);

    // Generar días del calendario
    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days: CalendarDay[] = [];
        const currentDate = new Date(startDate);
        const today = new Date();

        for (let i = 0; i < 42; i++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            
            // Obtener asignaciones para este día
            const dayAssignments: { [kidId: string]: Routine | null } = {};
            kids.forEach(kid => {
                const assignment = assignments.find(a => a.kidId === kid.id && a.date === dateStr);
                dayAssignments[kid.id] = assignment ? assignment.routine : null;
            });

            days.push({
                date: new Date(currentDate),
                dayNumber: currentDate.getDate(),
                isCurrentMonth: currentDate.getMonth() === month,
                isToday: currentDate.toDateString() === today.toDateString(),
                isPast: currentDate < today,
                assignments: dayAssignments
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    const calendarDays = generateCalendarDays();
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // Handlers
    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDayClick = (day: CalendarDay) => {
        if (day.isPast || !day.isCurrentMonth) return;
        
        setSelectedDate(day.date);
        setSelectedKid(null);
        setSelectedRoutine(null);
        setAssignModalOpen(true);
    };

    const handleAssignRoutine = () => {
        if (!selectedDate || !selectedKid || !selectedRoutine) return;

        const dateStr = selectedDate.toISOString().split('T')[0];
        const existingAssignmentIndex = assignments.findIndex(
            a => a.kidId === selectedKid.id && a.date === dateStr
        );

        const newAssignment: Assignment = {
            id: `assign-${Date.now()}`,
            kidId: selectedKid.id,
            routineId: selectedRoutine.id,
            date: dateStr,
            routine: selectedRoutine
        };

        if (existingAssignmentIndex >= 0) {
            // Reemplazar asignación existente
            setAssignments(prev => {
                const updated = [...prev];
                updated[existingAssignmentIndex] = newAssignment;
                return updated;
            });
        } else {
            // Agregar nueva asignación
            setAssignments(prev => [...prev, newAssignment]);
        }

        setAssignModalOpen(false);
        setSelectedDate(null);
        setSelectedKid(null);
        setSelectedRoutine(null);
    };

    const handleRemoveAssignment = (kidId: string, date: string) => {
        setAssignments(prev => prev.filter(a => !(a.kidId === kidId && a.date === date)));
    };

    // Filtrar rutinas por dificultad del niño seleccionado
    const getRoutinesForKid = (kid: Kid): Routine[] => {
        if (kid.difficulty === 'Principiante') {
            return availableRoutines.filter(r => r.difficulty === 'Principiante');
        } else if (kid.difficulty === 'Intermedio') {
            return availableRoutines.filter(r => ['Principiante', 'Intermedio'].includes(r.difficulty));
        } else {
            return availableRoutines; // Avanzado puede hacer cualquier rutina
        }
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
                    <AssignIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Asignar Rutinas
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Programa rutinas para tu{kids.length > 1 ? 's' : ''} hijo{kids.length > 1 ? 's' : ''} en el calendario
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
                <Alert severity="info" sx={{ mb: 3 }}>
                    💡 <strong>Instrucciones:</strong> Haz clic en cualquier día futuro para asignar una rutina. 
                    {isPremiumUser ? 
                        ' Con Premium tienes acceso a rutinas personalizadas y gestión de múltiples hijos.' :
                        ' Con el plan gratuito puedes asignar rutinas predefinidas a 1 hijo.'
                    }
                </Alert>

                <Grid container spacing={3}>
                    {/* Panel izquierdo - Hijos y estadísticas */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={3}>
                            {/* Lista de hijos */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        👨‍👩‍👧‍👦 Hijos Supervisados
                                    </Typography>
                                    <Stack spacing={2}>
                                        {kids.map((kid) => {
                                            const kidAssignments = assignments.filter(a => a.kidId === kid.id);
                                            const thisWeekAssignments = kidAssignments.filter(a => {
                                                const assignDate = new Date(a.date);
                                                const today = new Date();
                                                const weekStart = new Date(today);
                                                weekStart.setDate(today.getDate() - today.getDay());
                                                const weekEnd = new Date(weekStart);
                                                weekEnd.setDate(weekStart.getDate() + 6);
                                                return assignDate >= weekStart && assignDate <= weekEnd;
                                            });

                                            return (
                                                <Paper key={kid.id} sx={{ p: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Typography variant="h5">{kid.avatar}</Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {kid.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {kid.age} años • {kid.difficulty}
                                                            </Typography>
                                                        </Box>
                                                        <Chip 
                                                            label={`${thisWeekAssignments.length} esta semana`}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </Paper>
                                            );
                                        })}
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Rutinas disponibles */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        📚 Rutinas Disponibles
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {isPremiumUser ? `${availableRoutines.length} rutinas (incluye personalizadas)` : `${availableRoutines.length} rutinas predefinidas`}
                                    </Typography>
                                    
                                    <Stack spacing={1}>
                                        {availableRoutines.slice(0, 4).map((routine) => (
                                            <Paper key={routine.id} sx={{ p: 1.5 }}>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {routine.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                                    <Chip 
                                                        label={`${routine.exercises.length} ejercicios`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                    <Chip 
                                                        label={`${routine.totalDuration} min`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                    <Chip 
                                                        label={routine.difficulty}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Paper>
                                        ))}
                                        
                                        {availableRoutines.length > 4 && (
                                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', pt: 1 }}>
                                                Y {availableRoutines.length - 4} rutinas más...
                                            </Typography>
                                        )}
                                    </Stack>

                                    {!isPremiumUser && (
                                        <Alert severity="info" sx={{ mt: 2 }}>
                                            Con Premium tendrías acceso a rutinas personalizadas
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>

                    {/* Panel derecho - Calendario */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card>
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
                                        <Grid size={{ xs: 12/7 }} key={day}>
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
                                        const hasAssignments = Object.values(day.assignments).some(a => a !== null);
                                        const assignmentCount = Object.values(day.assignments).filter(a => a !== null).length;
                                        
                                        return (
                                            <Grid size={{ xs: 12/7 }} key={index}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        height: 120,
                                                        p: 1,
                                                        cursor: (!day.isPast && day.isCurrentMonth) ? 'pointer' : 'default',
                                                        opacity: day.isCurrentMonth ? 1 : 0.3,
                                                        backgroundColor: day.isToday ? theme.palette.primary.light + '20' : 
                                                                         day.isPast ? theme.palette.grey[100] : 'transparent',
                                                        border: day.isToday ? `2px solid ${theme.palette.primary.main}` : 'none',
                                                        borderRadius: 0,
                                                        borderRight: `1px solid ${theme.palette.divider}`,
                                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                                        '&:hover': (!day.isPast && day.isCurrentMonth) ? {
                                                            backgroundColor: theme.palette.action.hover
                                                        } : {},
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onClick={() => handleDayClick(day)}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: day.isToday ? 'bold' : 'normal',
                                                            color: day.isToday ? theme.palette.primary.main : 
                                                                   day.isPast ? theme.palette.text.disabled : 'inherit',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {day.dayNumber}
                                                    </Typography>

                                                    {/* Mostrar asignaciones */}
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, height: '80px', overflow: 'hidden' }}>
                                                        {kids.map((kid) => {
                                                            const assignment = day.assignments[kid.id];
                                                            if (!assignment) return null;

                                                            return (
                                                                <Box
                                                                    key={kid.id}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.5,
                                                                        p: 0.25,
                                                                        backgroundColor: theme.palette.primary.light + '40',
                                                                        borderRadius: 1,
                                                                        border: `1px solid ${theme.palette.primary.main}`,
                                                                        minHeight: 20
                                                                    }}
                                                                >
                                                                    <Typography 
                                                                        variant="caption" 
                                                                        sx={{ 
                                                                            fontSize: '0.6rem',
                                                                            lineHeight: 1,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap',
                                                                            flex: 1
                                                                        }}
                                                                    >
                                                                        {kid.avatar} {assignment.title.slice(0, 10)}...
                                                                    </Typography>
                                                                </Box>
                                                            );
                                                        })}

                                                        {/* Indicador de más asignaciones */}
                                                        {assignmentCount > 2 && (
                                                            <Typography variant="caption" color="primary.main" sx={{ fontSize: '0.6rem' }}>
                                                                +{assignmentCount - 2} más
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Modal de asignación */}
                <Dialog open={assignModalOpen} onClose={() => setAssignModalOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>
                        📅 Asignar Rutina - {selectedDate?.toLocaleDateString()}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            {/* Selector de hijo */}
                            <FormControl fullWidth>
                                <InputLabel>Selecciona el hijo</InputLabel>
                                <Select
                                    value={selectedKid?.id || ''}
                                    label="Selecciona el hijo"
                                    onChange={(e) => {
                                        const kid = kids.find(k => k.id === e.target.value);
                                        setSelectedKid(kid || null);
                                        setSelectedRoutine(null); // Reset routine when kid changes
                                    }}
                                >
                                    {kids.map((kid) => (
                                        <MenuItem key={kid.id} value={kid.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>{kid.avatar}</span>
                                                <span>{kid.name}</span>
                                                <Chip label={kid.difficulty} size="small" variant="outlined" />
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Selector de rutina (solo si hay hijo seleccionado) */}
                            {selectedKid && (
                                <FormControl fullWidth>
                                    <InputLabel>Selecciona la rutina</InputLabel>
                                    <Select
                                        value={selectedRoutine?.id || ''}
                                        label="Selecciona la rutina"
                                        onChange={(e) => {
                                            const routine = getRoutinesForKid(selectedKid).find(r => r.id === e.target.value);
                                            setSelectedRoutine(routine || null);
                                        }}
                                    >
                                        {getRoutinesForKid(selectedKid).map((routine) => (
                                            <MenuItem key={routine.id} value={routine.id}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="body1">{routine.title}</Typography>
                                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                            <Chip label={`${routine.exercises.length} ejercicios`} size="small" />
                                                            <Chip label={`${routine.totalDuration} min`} size="small" />
                                                            <Chip label={routine.difficulty} size="small" />
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {routine.description}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            {/* Preview de la rutina seleccionada */}
                            {selectedRoutine && (
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            📋 Vista Previa: {selectedRoutine.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {selectedRoutine.description}
                                        </Typography>
                                        
                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                            <Grid size={4}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <ExerciseIcon color="primary" />
                                                    <Typography variant="h6">{selectedRoutine.exercises.length}</Typography>
                                                    <Typography variant="caption">Ejercicios</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={4}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <TimerIcon color="secondary" />
                                                    <Typography variant="h6">{selectedRoutine.totalDuration}</Typography>
                                                    <Typography variant="caption">Minutos</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={4}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <ScheduleIcon color="info" />
                                                    <Typography variant="h6">{selectedRoutine.difficulty}</Typography>
                                                    <Typography variant="caption">Dificultad</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Typography variant="subtitle2" gutterBottom>
                                            Ejercicios incluidos:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selectedRoutine.exercises.slice(0, 5).map((exercise, index) => (
                                                <Chip 
                                                    key={index}
                                                    label={exercise.title}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                            {selectedRoutine.exercises.length > 5 && (
                                                <Chip 
                                                    label={`+${selectedRoutine.exercises.length - 5} más`}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Verificar si ya hay asignación */}
                            {selectedDate && selectedKid && (
                                (() => {
                                    const dateStr = selectedDate.toISOString().split('T')[0];
                                    const existingAssignment = assignments.find(
                                        a => a.kidId === selectedKid.id && a.date === dateStr
                                    );
                                    
                                    if (existingAssignment) {
                                        return (
                                            <Alert severity="warning">
                                                ⚠️ {selectedKid.name} ya tiene asignada la rutina "{existingAssignment.routine.title}" para este día. 
                                                Si continúas, la rutina anterior será reemplazada.
                                            </Alert>
                                        );
                                    }
                                    return null;
                                })()
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAssignModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleAssignRoutine}
                            variant="contained"
                            disabled={!selectedKid || !selectedRoutine}
                            startIcon={<AssignedIcon />}
                        >
                            Asignar Rutina
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PermissionGate>
    );
}