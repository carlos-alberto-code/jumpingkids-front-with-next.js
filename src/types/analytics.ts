
export interface KidAnalytics {
    id: string;
    name: string;
    avatar: string;
    age: number;
    metrics: {
        consistency: number; // porcentaje
        totalRoutines: number;
        totalMinutes: number;
        averageSessionTime: number;
        longestStreak: number;
        currentStreak: number;
        improvement: number; // porcentaje vs mes anterior
    };
    exerciseDistribution: {
        cardio: number;
        strength: number;
        flexibility: number;
        core: number;
    };
    weeklyProgress: number[]; // 7 días
    monthlyProgress: number[]; // 4 semanas
    favoriteExercises: string[];
    strugglingAreas: string[];
    achievements: number;
}

export interface OverallMetrics {
    totalKidsActive: number;
    averageConsistency: number;
    totalRoutinesCompleted: number;
    totalMinutesExercised: number;
    weeklyGrowth: number;
    mostPopularExercise: string;
    bestPerformingKid: string;
}

export interface MetricCardData {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle: string;
    color?: string;
    trend?: {
        value: number;
        label: string;
        positive?: boolean;
    };
}

export interface AnalyticsFilters {
    selectedKid: string;
    timeRange: string;
}
