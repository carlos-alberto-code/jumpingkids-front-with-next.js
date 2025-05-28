import { User } from '../types/auth';

export interface UserPermissions {
    // Ejercicios
    canAccessPremiumExercises: boolean;
    canCreateCustomExercises: boolean;
    maxExercisesPerDay?: number; // undefined = ilimitado

    // Rutinas
    canCreatePersonalRoutines: boolean;
    canAccessPremiumRoutines: boolean;
    canShareRoutines: boolean;
    maxRoutinesStored?: number; // undefined = ilimitado

    // Entrenamiento y seguimiento
    canTrackProgress: boolean;
    canAccessAdvancedMetrics: boolean;
    canExportData: boolean;

    // Gestión (específico para tutores)
    canManageMultipleKids: boolean;
    canAccessAnalytics: boolean;
    canCreateExercisesForKids: boolean;

    // Suscripción
    canUpgradeSubscription: boolean;
}

/**
 * Obtiene todos los permisos para un usuario específico
 */
export function getUserPermissions(user: User | null): UserPermissions {
    // Usuario no autenticado - permisos mínimos
    if (!user) {
        return {
            canAccessPremiumExercises: false,
            canCreateCustomExercises: false,
            maxExercisesPerDay: 3,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            maxRoutinesStored: 0,
            canTrackProgress: false,
            canAccessAdvancedMetrics: false,
            canExportData: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canUpgradeSubscription: true
        };
    }

    const { userType: type, subscription } = user;

    // NIÑO FREE
    if (type === 'kid' && subscription === 'free') {
        return {
            canAccessPremiumExercises: false,
            canCreateCustomExercises: false,
            maxExercisesPerDay: 5,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            maxRoutinesStored: 1,
            canTrackProgress: false,
            canAccessAdvancedMetrics: false,
            canExportData: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canUpgradeSubscription: true
        };
    }

    // NIÑO PREMIUM
    if (type === 'kid' && subscription === 'premium') {
        return {
            canAccessPremiumExercises: true,
            canCreateCustomExercises: false, // Solo tutores
            maxExercisesPerDay: undefined, // Ilimitado
            canCreatePersonalRoutines: true,
            canAccessPremiumRoutines: true,
            canShareRoutines: false, // Solo tutores
            maxRoutinesStored: 10,
            canTrackProgress: true,
            canAccessAdvancedMetrics: true,
            canExportData: false, // Solo tutores
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canUpgradeSubscription: false // Ya es premium
        };
    }

    // TUTOR FREE
    if (type === 'tutor' && subscription === 'free') {
        return {
            canAccessPremiumExercises: false,
            canCreateCustomExercises: false,
            maxExercisesPerDay: 5,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            maxRoutinesStored: 3,
            canTrackProgress: true, // Básico para supervisión
            canAccessAdvancedMetrics: false,
            canExportData: false,
            canManageMultipleKids: false, // Solo 1 niño
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canUpgradeSubscription: true
        };
    }

    // TUTOR PREMIUM
    if (type === 'tutor' && subscription === 'premium') {
        return {
            canAccessPremiumExercises: true,
            canCreateCustomExercises: true,
            maxExercisesPerDay: undefined, // Ilimitado
            canCreatePersonalRoutines: true,
            canAccessPremiumRoutines: true,
            canShareRoutines: true,
            maxRoutinesStored: undefined, // Ilimitado
            canTrackProgress: true,
            canAccessAdvancedMetrics: true,
            canExportData: true,
            canManageMultipleKids: true,
            canAccessAnalytics: true,
            canCreateExercisesForKids: true,
            canUpgradeSubscription: false // Ya es premium
        };
    }

    // Fallback - permisos mínimos por seguridad
    return getUserPermissions(null);
}

/**
 * Funciones helper para verificaciones específicas
 */
export const checkPermissions = {
    canCreateContent: (user: User | null): boolean => {
        const perms = getUserPermissions(user);
        return perms.canCreateCustomExercises || perms.canCreateExercisesForKids;
    },

    isPremiumUser: (user: User | null): boolean => {
        return user?.subscription === 'premium';
    },

    isTutor: (user: User | null): boolean => {
        return user?.userType === 'tutor';
    },

    needsUpgrade: (user: User | null): boolean => {
        return getUserPermissions(user).canUpgradeSubscription;
    },

    canAccessFeature: (user: User | null, feature: keyof UserPermissions): boolean => {
        const perms = getUserPermissions(user);
        return Boolean(perms[feature]);
    }
};
