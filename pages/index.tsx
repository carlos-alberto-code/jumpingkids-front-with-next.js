import {
  Assignment as AssignmentIcon,
  CalendarMonth,
  Dashboard as DashboardIcon,
  EmojiEvents,
  FitnessCenter,
  NotificationsActive,
  PersonAdd,
  Speed,
  SupervisorAccount,
  TrendingUp,
  Warning
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../src/context/auth/AuthContext';
import { usePermissionCheck } from '../src/hooks/auth/useUserPermissions';

// 📊 DATOS MOCK PARA DASHBOARD
const MOCK_KIDS_DATA = {
  free: [
    {
      id: 'sofia-001',
      name: 'Sofia García',
      age: 8,
      avatar: '👧',
      thisWeek: { completed: 4, total: 5, streak: 3 },
      lastActivity: '2024-06-04T10:30:00Z',
      favoriteExercise: 'Jumping Jacks'
    }
  ],
  premium: [
    {
      id: 'sofia-001',
      name: 'Sofia García',
      age: 8,
      avatar: '👧',
      thisWeek: { completed: 5, total: 6, streak: 5 },
      lastActivity: '2024-06-04T10:30:00Z',
      favoriteExercise: 'Jumping Jacks'
    },
    {
      id: 'diego-002',
      name: 'Diego Martínez',
      age: 6,
      avatar: '👦',
      thisWeek: { completed: 3, total: 4, streak: 2 },
      lastActivity: '2024-06-04T08:15:00Z',
      favoriteExercise: 'Burpees'
    },
    {
      id: 'maria-003',
      name: 'María López',
      age: 10,
      avatar: '👧',
      thisWeek: { completed: 6, total: 6, streak: 7 },
      lastActivity: '2024-06-04T16:45:00Z',
      favoriteExercise: 'Plancha Isométrica'
    }
  ]
};

const MOCK_RECENT_ASSIGNMENTS = [
  { kid: 'Sofia', routine: 'Rutina Matutina Energética', date: '2024-06-04', status: 'pending' },
  { kid: 'Diego', routine: 'Cardio Rápido', date: '2024-06-04', status: 'completed' },
  { kid: 'María', routine: 'Fuerza y Equilibrio', date: '2024-06-04', status: 'completed' },
  { kid: 'Sofia', routine: 'Relajación y Estiramiento', date: '2024-06-03', status: 'completed' },
  { kid: 'Diego', routine: 'Rutina Matutina Energética', date: '2024-06-03', status: 'missed' }
];

const MOCK_PENDING_TASKS = [
  { id: 1, text: 'Revisar progreso semanal de Sofia', priority: 'medium', type: 'review' },
  { id: 2, text: 'Asignar rutina para mañana (Diego)', priority: 'high', type: 'assign' },
  { id: 3, text: 'Crear nueva rutina personalizada', priority: 'low', type: 'create' },
  { id: 4, text: 'Revisar estadísticas mensuales', priority: 'medium', type: 'analytics' }
];

export default function DashboardPage() {
  const router = useRouter();
  const { session } = useAuthContext();
  const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
  const theme = useTheme();

  // Datos según suscripción
  const kidsData = isPremiumUser ? MOCK_KIDS_DATA.premium : MOCK_KIDS_DATA.free;
  const recentAssignments = isPremiumUser ? MOCK_RECENT_ASSIGNMENTS : MOCK_RECENT_ASSIGNMENTS.slice(0, 3);
  const pendingTasks = isPremiumUser ? MOCK_PENDING_TASKS : MOCK_PENDING_TASKS.slice(0, 2);

  // Calcular estadísticas consolidadas
  const totalKids = kidsData.length;
  const totalCompletedThisWeek = kidsData.reduce((sum, kid) => sum + kid.thisWeek.completed, 0);
  const totalAssignedThisWeek = kidsData.reduce((sum, kid) => sum + kid.thisWeek.total, 0);
  const averageCompletion = totalAssignedThisWeek > 0 ? (totalCompletedThisWeek / totalAssignedThisWeek) * 100 : 0;
  const bestStreak = Math.max(...kidsData.map(kid => kid.thisWeek.streak));

  // Handlers para navegación rápida
  const quickActions = [
    {
      title: 'Asignar Rutinas',
      description: 'Programa rutinas para hoy',
      icon: <AssignmentIcon />,
      route: '/assign_routine',
      color: 'primary.main',
      enabled: true
    },
    {
      title: 'Ver Progreso',
      description: 'Estadísticas de tus hijos',
      icon: <TrendingUp />,
      route: '/analytics',
      color: 'secondary.main',
      enabled: isPremiumUser
    },
    {
      title: 'Gestionar Hijos',
      description: 'Perfiles y configuración',
      icon: <SupervisorAccount />,
      route: '/my_kids',
      color: 'info.main',
      enabled: true
    },
    {
      title: 'Crear Contenido',
      description: 'Ejercicios y rutinas',
      icon: <FitnessCenter />,
      route: '/create_exercise',
      color: 'success.main',
      enabled: isPremiumUser
    }
  ];

  const handleQuickAction = (route: string, enabled: boolean) => {
    if (enabled) {
      router.push(route);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4
      }}>
        <DashboardIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Dashboard Principal
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            ¡Hola {user?.name}! Aquí tienes el resumen de tu{totalKids > 1 ? 's' : ''} hijo{totalKids > 1 ? 's' : ''}
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

      {/* Estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Total de hijos */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <SupervisorAccount sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {totalKids}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                hijo{totalKids > 1 ? 's' : ''} supervisado{totalKids > 1 ? 's' : ''}
              </Typography>
              {!isPremiumUser && totalKids === 1 && (
                <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 1 }}>
                  Upgrade para gestionar más
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Progreso semanal */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CalendarMonth sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {Math.round(averageCompletion)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                completado esta semana
              </Typography>
              <LinearProgress
                variant="determinate"
                value={averageCompletion}
                sx={{ mt: 2, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Mejor racha */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {bestStreak}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                mejor racha activa
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
                🔥 ¡Excelente consistencia!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tareas pendientes */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <NotificationsActive sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {pendingTasks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                tareas pendientes
              </Typography>
              {pendingTasks.length > 0 && (
                <Typography variant="caption" color="error.main" sx={{ display: 'block', mt: 1 }}>
                  Revisa la lista abajo ⬇️
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Panel izquierdo */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Resumen de hijos */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  👨‍👩‍👧‍👦 Resumen de Hijos
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push('/my_kids')}
                >
                  Ver todos
                </Button>
              </Box>

              <Grid container spacing={2}>
                {kidsData.map((kid) => (
                  <Grid size={{ xs: 12, sm: isPremiumUser ? 4 : 12 }} key={kid.id}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {kid.avatar}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {kid.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {kid.age} años
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Esta semana: {kid.thisWeek.completed}/{kid.thisWeek.total}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(kid.thisWeek.completed / kid.thisWeek.total) * 100}
                          sx={{ mt: 1, height: 4, borderRadius: 2 }}
                        />

                        <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                          <Chip
                            label={`${kid.thisWeek.streak} días`}
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                {/* Botón agregar hijo (solo si no está al límite) */}
                {(!isPremiumUser && totalKids < 1) || (isPremiumUser && totalKids < 3) ? (
                  <Grid size={{ xs: 12, sm: isPremiumUser ? 4 : 12 }}>
                    <Paper sx={{
                      p: 2,
                      textAlign: 'center',
                      border: `2px dashed ${theme.palette.grey[300]}`,
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: theme.palette.action.hover }
                    }}>
                      <IconButton color="primary" size="large">
                        <PersonAdd />
                      </IconButton>
                      <Typography variant="h6" color="primary.main">
                        Agregar Hijo
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hasta {isPremiumUser ? '3 hijos' : '1 hijo'}
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null}
              </Grid>

              {!isPremiumUser && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Con Premium podrías gestionar hasta 3 hijos y ver comparativas detalladas
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Accesos rápidos */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ⚡ Accesos Rápidos
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Paper
                      sx={{
                        p: 2,
                        cursor: action.enabled ? 'pointer' : 'not-allowed',
                        opacity: action.enabled ? 1 : 0.6,
                        border: action.enabled ? `1px solid ${theme.palette.divider}` : `1px solid ${theme.palette.grey[300]}`,
                        '&:hover': action.enabled ? {
                          backgroundColor: theme.palette.action.hover,
                          borderColor: action.color
                        } : {},
                        transition: 'all 0.2s'
                      }}
                      onClick={() => handleQuickAction(action.route, action.enabled)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: action.enabled ? action.color : theme.palette.grey[400] }}>
                          {action.icon}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {action.title}
                            {!action.enabled && (
                              <Chip
                                label="PREMIUM"
                                size="small"
                                color="secondary"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Panel derecho */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Tareas pendientes */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📋 Tareas Pendientes
                </Typography>
                {pendingTasks.length > 0 ? (
                  <List dense>
                    {pendingTasks.map((task) => (
                      <ListItem key={task.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          {task.priority === 'high' ? (
                            <Warning color="error" />
                          ) : task.priority === 'medium' ? (
                            <Speed color="warning" />
                          ) : (
                            <NotificationsActive color="info" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={task.text}
                          secondary={`Prioridad: ${task.priority}`}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '0.75rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    🎉 ¡No tienes tareas pendientes!
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Actividad reciente */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📅 Actividad Reciente
                </Typography>
                <List dense>
                  {recentAssignments.slice(0, isPremiumUser ? 5 : 3).map((assignment, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${assignment.kid}: ${assignment.routine}`}
                        secondary={new Date(assignment.date).toLocaleDateString()}
                        primaryTypographyProps={{ fontSize: '0.85rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        label={
                          assignment.status === 'completed' ? '✅' :
                            assignment.status === 'pending' ? '⏳' :
                              assignment.status === 'missed' ? '❌' : '?'
                        }
                        size="small"
                        color={
                          assignment.status === 'completed' ? 'success' :
                            assignment.status === 'pending' ? 'warning' :
                              'error'
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                {!isPremiumUser && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Con Premium verías historial completo
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Estadísticas extra para premium */}
            {isPremiumUser && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    📊 Insights Premium
                  </Typography>
                  <Stack spacing={1}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Hijo más activo esta semana
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="success.main">
                        {kidsData.reduce((best, kid) =>
                          kid.thisWeek.completed > best.thisWeek.completed ? kid : best
                        ).name}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Ejercicio más popular
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary.main">
                        Jumping Jacks
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Promedio de adherencia
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="info.main">
                        {Math.round(averageCompletion)}% esta semana
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}