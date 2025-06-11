// 👶 Kids Domain Types
export interface Kid {
    id: string;
    name: string;
    age: number;
    avatar: string;
    birthDate: string;
    preferences: {
        favoriteExercises: string[];
        preferredTime: string;
        maxDailyExercises: number;
        difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    };
    stats: {
        totalRoutines: number;
        thisWeekCompleted: number;
        thisWeekAssigned: number;
        currentStreak: number;
        longestStreak: number;
        favoriteCategory: string;
        totalMinutes: number;
        lastActivity?: string;
    };
    createdAt: string;
}

export interface KidFormData {
    name: string;
    age: number;
    avatar: string;
    preferredTime: string;
    maxDailyExercises: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export interface KidsPageProps {
    kids: Kid[];
    isPremiumUser: boolean;
    maxKids: number;
    onAddKid: () => void;
    onEditKid: (kid: Kid) => void;
    onDeleteKid: (kid: Kid) => void;
}

export interface KidCardProps {
    kid: Kid;
    isPremiumUser: boolean;
    onEdit: (kid: Kid) => void;
    onDelete: (kid: Kid) => void;
    isOnlyKid?: boolean;
}

export interface KidFormProps {
    open: boolean;
    mode: 'add' | 'edit';
    initialData?: KidFormData;
    isPremiumUser: boolean;
    onClose: () => void;
    onSubmit: (data: KidFormData) => void;
}

export interface ConsolidatedStatsProps {
    kids: Kid[];
    show: boolean;
}

// Constants
export const AVATAR_OPTIONS = ['👧', '👦', '🧒', '👨‍🦱', '👩‍🦱', '👶'];

export const DIFFICULTY_OPTIONS = [
    { value: 'Principiante', label: 'Principiante' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' }
] as const;

export const MAX_EXERCISES_OPTIONS = [3, 4, 5, 6, 7, 8];
