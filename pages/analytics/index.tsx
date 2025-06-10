import {
    Analytics as AnalyticsIcon,
    FitnessCenter as ExerciseIcon,
    Person as PersonIcon,
    Timer as TimerIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
    Alert,
    Container
} from '@mui/material';
import {
    AnalyticsFilters,
    AnalyticsTabs,
    MetricsGrid,
    PageHeader
} from '../../src/components/analytics';
import PermissionGate from '../../src/components/auth/PermissionGate';
import { useAuthContext } from '../../src/context/auth/AuthContext';
import { useAnalyticsData } from '../../src/hooks/analytics/useAnalyticsData';
import type { MetricCardData } from '../../src/types/analytics';

export default function AnalyticsPage() {
    const { session } = useAuthContext();
    const {
        kidsData,
        overallMetrics,
        selectedKid,
        setSelectedKid,
        timeRange,
        setTimeRange,
        handleExportData
    } = useAnalyticsData();

    // Crear métricas para el overview
    const overviewMetrics: MetricCardData[] = [
        {
            icon: <PersonIcon />,
            title: overallMetrics.totalKidsActive.toString(),
            value: overallMetrics.totalKidsActive,
            subtitle: 'niños activos',
            color: 'primary.main'
        },
        {
            icon: <TrendingUpIcon />,
            title: `${overallMetrics.averageConsistency}%`,
            value: `${overallMetrics.averageConsistency}%`,
            subtitle: 'consistencia promedio',
            color: 'success.main'
        },
        {
            icon: <ExerciseIcon />,
            title: overallMetrics.totalRoutinesCompleted.toString(),
            value: overallMetrics.totalRoutinesCompleted,
            subtitle: 'rutinas completadas',
            color: 'secondary.main'
        },
        {
            icon: <TimerIcon />,
            title: `${Math.floor(overallMetrics.totalMinutesExercised / 60)}h`,
            value: `${Math.floor(overallMetrics.totalMinutesExercised / 60)}h`,
            subtitle: 'tiempo total ejercitado',
            color: 'warning.main'
        }
    ];

    return (
        <PermissionGate
            permission="canAccessAnalytics"
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
                <PageHeader
                    icon={<AnalyticsIcon />}
                    title="Analytics Avanzados"
                    subtitle="Análisis profundo del progreso y tendencias"
                    showPremiumBadge={true}
                    showExportButton={true}
                    onExport={handleExportData}
                />

                {/* Filtros */}
                <AnalyticsFilters
                    selectedKid={selectedKid}
                    onKidChange={setSelectedKid}
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                    kidsData={kidsData}
                />

                {/* Métricas generales */}
                <MetricsGrid metrics={overviewMetrics} />

                {/* Contenido con tabs */}
                <AnalyticsTabs
                    kidsData={kidsData}
                    selectedKid={selectedKid}
                    overallMetrics={overallMetrics}
                />
            </Container>
        </PermissionGate>
    );
}
