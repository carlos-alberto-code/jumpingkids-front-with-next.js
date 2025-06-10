
import { useMemo, useState } from 'react';
import type { KidAnalytics, OverallMetrics } from '../../types/analytics';
import { usePermissionCheck } from '../auth/useUserPermissions';

// 📈 DATOS MOCK PARA ANALYTICS
const MOCK_KIDS_ANALYTICS: KidAnalytics[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        avatar: '👧',
        age: 8,
        metrics: {
            consistency: 84,
            totalRoutines: 45,
            totalMinutes: 1125,
            averageSessionTime: 25,
            longestStreak: 12,
            currentStreak: 5,
            improvement: 15
        },
        exerciseDistribution: {
            cardio: 45,
            strength: 25,
            flexibility: 20,
            core: 10
        },
        weeklyProgress: [1, 1, 0, 1, 1, 1, 0], // L M X J V S D
        monthlyProgress: [85, 78, 92, 84], // 4 semanas
        favoriteExercises: ['Jumping Jacks', 'Lagartijas', 'Sentadillas'],
        strugglingAreas: ['Ejercicios de core', 'Rutinas largas'],
        achievements: 12
    },
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        avatar: '👦',
        age: 6,
        metrics: {
            consistency: 67,
            totalRoutines: 28,
            totalMinutes: 672,
            averageSessionTime: 24,
            longestStreak: 7,
            currentStreak: 2,
            improvement: 8
        },
        exerciseDistribution: {
            cardio: 60,
            strength: 30,
            flexibility: 5,
            core: 5
        },
        weeklyProgress: [0, 1, 1, 0, 1, 0, 1],
        monthlyProgress: [72, 65, 58, 67],
        favoriteExercises: ['Burpees', 'Correr en el lugar', 'Mountain climbers'],
        strugglingAreas: ['Ejercicios de flexibilidad', 'Consistencia diaria'],
        achievements: 8
    },
    {
        id: 'maria-003',
        name: 'María López',
        avatar: '👧',
        age: 10,
        metrics: {
            consistency: 96,
            totalRoutines: 58,
            totalMinutes: 1740,
            averageSessionTime: 30,
            longestStreak: 21,
            currentStreak: 14,
            improvement: 22
        },
        exerciseDistribution: {
            cardio: 30,
            strength: 40,
            flexibility: 20,
            core: 10
        },
        weeklyProgress: [1, 1, 1, 1, 1, 1, 1],
        monthlyProgress: [94, 96, 98, 96],
        favoriteExercises: ['Plancha isométrica', 'Yoga', 'Ejercicios de fuerza'],
        strugglingAreas: [], // ¡Ninguna!
        achievements: 18
    }
];

const MOCK_OVERALL_METRICS: OverallMetrics = {
    totalKidsActive: 3,
    averageConsistency: 82,
    totalRoutinesCompleted: 131,
    totalMinutesExercised: 3537,
    weeklyGrowth: 12,
    mostPopularExercise: 'Jumping Jacks',
    bestPerformingKid: 'María López'
};

export function useAnalyticsData() {
    const { isPremiumUser } = usePermissionCheck();
    const [selectedKid, setSelectedKid] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<string>('month');

    // Filtrar datos según suscripción
    const kidsData = useMemo(() => {
        return isPremiumUser ? MOCK_KIDS_ANALYTICS : MOCK_KIDS_ANALYTICS.slice(0, 1);
    }, [isPremiumUser]);

    const selectedKidData = useMemo(() => {
        return selectedKid === 'all' ? null : kidsData.find(k => k.id === selectedKid);
    }, [selectedKid, kidsData]);

    const overallMetrics = useMemo(() => {
        // En el futuro aquí se podría calcular dinámicamente basado en los datos filtrados
        return MOCK_OVERALL_METRICS;
    }, [timeRange]);

    const handleExportData = () => {
        alert('📊 Datos exportados exitosamente (funcionalidad simulada)');
    };

    return {
        kidsData,
        selectedKidData,
        overallMetrics,
        selectedKid,
        setSelectedKid,
        timeRange,
        setTimeRange,
        handleExportData,
        isPremiumUser
    };
}
