import { useMemo } from 'react';
import { useAuthContext } from '../../context/auth/AuthContext';
import { UserPermissions } from '../../types/auth';

/**
 * Hook para gestionar permisos de usuario basado en tipo y suscripción
 * Retorna objeto con todas las capacidades del usuario actual
 */
export const useUserPermissions = (): UserPermissions => {
    const { session } = useAuthContext();

    /**
     * Calcula permisos basado en el usuario actual
     * Usa useMemo para optimizar re-renders
     */
    const permissions = useMemo((): UserPermissions => {
        // Usuario no autenticado - sin permisos
        if (!session?.user) {
            return {
                // Ejercicios
                canAccessPremiumExercises: false,
                canCreateCustomExercises: false,
                canAccessExerciseLibrary: true, // Permitir navegación anónima

                // Rutinas
                canCreatePersonalRoutines: false,
                canAccessPremiumRoutines: false,
                canShareRoutines: false,

                // Entrenamiento
                canTrackProgress: false,
                canAccessAdvancedMetrics: false,
                canExportData: false,

                // Gestión (específico para tutores)
                canManageMultipleKids: false,
                canAccessAnalytics: false,
                canCreateExercisesForKids: false,

                // Suscripción
                canUpgradeSubscription: true,
                maxExercisesPerDay: 3,
                maxRoutinesStored: 0
            };
        }

        const { userType, subscription } = session.user;

        // NIÑO FREE
        if (userType === 'kid' && subscription === 'free') {
            return {
                // Ejercicios
                canAccessPremiumExercises: false,
                canCreateCustomExercises: false,
                canAccessExerciseLibrary: true,

                // Rutinas
                canCreatePersonalRoutines: false,
                canAccessPremiumRoutines: false,
                canShareRoutines: false,

                // Entrenamiento
                canTrackProgress: false,
                canAccessAdvancedMetrics: false,
                canExportData: false,

                // Gestión
                canManageMultipleKids: false,
                canAccessAnalytics: false,
                canCreateExercisesForKids: false,

                // Suscripción
                canUpgradeSubscription: true,
                maxExercisesPerDay: 5,
                maxRoutinesStored: 1
            };
        }

        // NIÑO PREMIUM
        if (userType === 'kid' && subscription === 'premium') {
            return {
                // Ejercicios
                canAccessPremiumExercises: true,
                canCreateCustomExercises: false, // Solo tutores pueden crear
                canAccessExerciseLibrary: true,

                // Rutinas
                canCreatePersonalRoutines: true,
                canAccessPremiumRoutines: true,
                canShareRoutines: false, // Solo para tutores

                // Entrenamiento
                canTrackProgress: true,
                canAccessAdvancedMetrics: true,
                canExportData: false,

                // Gestión
                canManageMultipleKids: false,
                canAccessAnalytics: false,
                canCreateExercisesForKids: false,

                // Suscripción
                canUpgradeSubscription: false, // Ya es premium
                maxExercisesPerDay: undefined, // Ilimitado
                maxRoutinesStored: 10
            };
        }

        // TUTOR FREE
        if (userType === 'tutor' && subscription === 'free') {
            return {
                // Ejercicios (incluye todo lo de niño free)
                canAccessPremiumExercises: false,
                canCreateCustomExercises: false,
                canAccessExerciseLibrary: true,

                // Rutinas
                canCreatePersonalRoutines: false,
                canAccessPremiumRoutines: false,
                canShareRoutines: false,

                // Entrenamiento
                canTrackProgress: true, // Básico para monitoreo
                canAccessAdvancedMetrics: false,
                canExportData: false,

                // Gestión (capacidades básicas de tutor)
                canManageMultipleKids: false, // Solo 1 niño
                canAccessAnalytics: false,
                canCreateExercisesForKids: false,

                // Suscripción
                canUpgradeSubscription: true,
                maxExercisesPerDay: 5,
                maxRoutinesStored: 3
            };
        }

        // TUTOR PREMIUM
        if (userType === 'tutor' && subscription === 'premium') {
            return {
                // Ejercicios (acceso completo)
                canAccessPremiumExercises: true,
                canCreateCustomExercises: true,
                canAccessExerciseLibrary: true,

                // Rutinas (acceso completo)
                canCreatePersonalRoutines: true,
                canAccessPremiumRoutines: true,
                canShareRoutines: true,

                // Entrenamiento (acceso completo)
                canTrackProgress: true,
                canAccessAdvancedMetrics: true,
                canExportData: true,

                // Gestión (capacidades completas de tutor)
                canManageMultipleKids: true,
                canAccessAnalytics: true,
                canCreateExercisesForKids: true,

                // Suscripción
                canUpgradeSubscription: false, // Ya es premium
                maxExercisesPerDay: undefined, // Ilimitado
                maxRoutinesStored: undefined // Ilimitado
            };
        }

        // Fallback por seguridad - permisos mínimos
        return {
            canAccessPremiumExercises: false,
            canCreateCustomExercises: false,
            canAccessExerciseLibrary: true,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            canTrackProgress: false,
            canAccessAdvancedMetrics: false,
            canExportData: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canUpgradeSubscription: true,
            maxExercisesPerDay: 1,
            maxRoutinesStored: 0
        };
    }, [session]);

    return permissions;
};

/**
 * Hook de conveniencia para verificaciones rápidas de permisos específicos
 */
export const usePermissionCheck = () => {
    const permissions = useUserPermissions();
    const { session } = useAuthContext();

    return {
        // Verificaciones rápidas
        isPremiumUser: session?.user.subscription === 'premium',
        isTutor: session?.user.userType === 'tutor',
        isKid: session?.user.userType === 'kid',
        isAuthenticated: !!session?.isAuthenticated,

        // Verificaciones de capacidades específicas
        canCreateContent: permissions.canCreateCustomExercises || permissions.canCreateExercisesForKids,
        canAccessPremiumFeatures: permissions.canAccessPremiumExercises && permissions.canAccessPremiumRoutines,
        canManageOthers: permissions.canManageMultipleKids,
        needsUpgrade: permissions.canUpgradeSubscription,

        // Límites actuales
        exerciseLimit: permissions.maxExercisesPerDay,
        routineLimit: permissions.maxRoutinesStored,

        // Permisos completos
        ...permissions
    };
};
