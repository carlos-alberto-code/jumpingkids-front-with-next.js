import {
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
  FitnessCenter,
  SupervisorAccount,
  TrendingUp,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../src/context/auth/AuthContext';
import { usePermissionCheck } from '../src/hooks/auth/useUserPermissions';

// Importar componentes refactorizados
import { PageHeader } from '../src/components/analytics';
import {
  DashboardTabs,
  PendingTasksList,
  PremiumUpgradePrompt,
  QuickActionsGrid,
  RecentActivityList,
  StatsSummary,
  type DashboardStats,
  type KidData,
  type PendingTask,
  type PremiumInsight,
  type QuickAction,
  type RecentAssignment,
} from '../src/components/dashboard';

// 📊 DATOS MOCK PARA DASHBOARD
const MOCK_KIDS_DATA: KidData[] = [
  {
    id: 'sofia-001',
    name: 'Sofia García',
    age: 8,
    avatar: '👧',
    thisWeek: { completed: 4, total: 5, streak: 3 },
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
];

const MOCK_RECENT_ASSIGNMENTS: RecentAssignment[] = [
  { kid: 'Sofia', routine: 'Rutina Matutina Energética', date: '2024-06-04', status: 'pending' },
  { kid: 'Diego', routine: 'Cardio Rápido', date: '2024-06-04', status: 'completed' },
  { kid: 'María', routine: 'Fuerza y Equilibrio', date: '2024-06-04', status: 'completed' },
  { kid: 'Sofia', routine: 'Relajación y Estiramiento', date: '2024-06-03', status: 'completed' },
  { kid: 'Diego', routine: 'Rutina Matutina Energética', date: '2024-06-03', status: 'missed' }
];

const MOCK_PENDING_TASKS: PendingTask[] = [
  { id: 1, text: 'Revisar progreso semanal de Sofia', priority: 'medium', type: 'review' },
  { id: 2, text: 'Asignar rutina para mañana (Diego)', priority: 'high', type: 'assign' },
  { id: 3, text: 'Crear nueva rutina personalizada', priority: 'low', type: 'create' },
  { id: 4, text: 'Revisar estadísticas mensuales', priority: 'medium', type: 'analytics' }
];

export default function DashboardPage() {
  const router = useRouter();
  const { session } = useAuthContext();
  const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();

  // Datos según suscripción  
  const kidsData = isPremiumUser ? MOCK_KIDS_DATA : MOCK_KIDS_DATA.slice(0, 1);
  const recentAssignments = isPremiumUser ? MOCK_RECENT_ASSIGNMENTS : MOCK_RECENT_ASSIGNMENTS.slice(0, 3);
  const pendingTasks = isPremiumUser ? MOCK_PENDING_TASKS : MOCK_PENDING_TASKS.slice(0, 2);

  // Calcular estadísticas consolidadas
  const totalKids = kidsData.length;
  const totalCompletedThisWeek = kidsData.reduce((sum: number, kid: KidData) => sum + kid.thisWeek.completed, 0);
  const totalAssignedThisWeek = kidsData.reduce((sum: number, kid: KidData) => sum + kid.thisWeek.total, 0);
  const averageCompletion = totalAssignedThisWeek > 0 ? (totalCompletedThisWeek / totalAssignedThisWeek) * 100 : 0;
  const bestStreak = Math.max(...kidsData.map((kid: KidData) => kid.thisWeek.streak));

  // Estadísticas para el componente StatsSummary
  const dashboardStats: DashboardStats = {
    totalKids,
    averageCompletion,
    bestStreak,
    pendingTasks: pendingTasks.length,
    isPremiumUser,
  };

  // Acciones rápidas
  const quickActions: QuickAction[] = [
    {
      id: 'assign-routines',
      title: 'Asignar Rutinas',
      description: 'Programa rutinas para hoy',
      icon: <AssignmentIcon />,
      route: '/assign_routine',
      color: 'primary',
      enabled: true,
    },
    {
      id: 'view-progress',
      title: 'Ver Progreso',
      description: 'Estadísticas de tus hijos',
      icon: <TrendingUp />,
      route: '/analytics',
      color: 'secondary',
      enabled: isPremiumUser,
      badge: !isPremiumUser ? 'PREMIUM' : undefined,
    },
    {
      id: 'manage-kids',
      title: 'Gestionar Hijos',
      description: 'Perfiles y configuración',
      icon: <SupervisorAccount />,
      route: '/my_kids',
      color: 'info',
      enabled: true,
    },
    {
      id: 'create-content',
      title: 'Crear Contenido',
      description: 'Ejercicios y rutinas',
      icon: <FitnessCenter />,
      route: '/create_exercise',
      color: 'success',
      enabled: isPremiumUser,
      badge: !isPremiumUser ? 'PREMIUM' : undefined,
    },
  ];

  // Insights premium
  const premiumInsights: PremiumInsight[] = [
    {
      label: 'Hijo más activo esta semana',
      value: kidsData.reduce((best: KidData, kid: KidData) =>
        kid.thisWeek.completed > best.thisWeek.completed ? kid : best
      ).name,
      color: 'success',
    },
    {
      label: 'Ejercicio más popular',
      value: 'Jumping Jacks',
      color: 'primary',
    },
    {
      label: 'Promedio de adherencia',
      value: `${Math.round(averageCompletion)}% esta semana`,
      color: 'info',
    },
  ];

  // Handlers
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const handleKidClick = (kidId: string) => {
    router.push(`/my_kids?kid=${kidId}`);
  };

  const handleAddKidClick = () => {
    router.push('/my_kids?action=add');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header reutilizable */}
      <PageHeader
        title="Dashboard Principal"
        subtitle={`¡Hola ${user?.name}! Aquí tienes el resumen de tu${totalKids > 1 ? 's' : ''} hijo${totalKids > 1 ? 's' : ''}`}
        icon={<DashboardIcon />}
        actions={
          isPremiumUser ? (
            <Chip
              label="PREMIUM"
              color="secondary"
              size="small"
            />
          ) : undefined
        }
      />

      {/* Estadísticas principales */}
      <Box sx={{ mb: 3 }}>
        <StatsSummary stats={dashboardStats} />
      </Box>

      <Grid container spacing={3}>
        {/* Panel izquierdo */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Resumen de hijos */}
            <DashboardTabs
              kidsData={kidsData}
              totalKids={totalKids}
              isPremiumUser={isPremiumUser}
              onKidClick={handleKidClick}
              onAddKidClick={handleAddKidClick}
            />

            {/* Accesos rápidos */}
            <QuickActionsGrid
              actions={quickActions}
              onNavigate={handleNavigation}
            />
          </Stack>
        </Grid>

        {/* Panel derecho */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Tareas pendientes */}
            <PendingTasksList tasks={pendingTasks} />

            {/* Actividad reciente */}
            <RecentActivityList
              assignments={recentAssignments}
              maxItems={isPremiumUser ? 5 : 3}
              isPremiumUser={isPremiumUser}
            />

            {/* Insights premium */}
            {isPremiumUser && (
              <PremiumUpgradePrompt insights={premiumInsights} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}