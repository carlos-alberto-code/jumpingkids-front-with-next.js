import { User } from '../types/auth';

export interface UserPermissions {
    // ✅ NAVEGACIÓN BÁSICA - Todos los usuarios autenticados
    canAccessExercises: boolean;
    canAccessOwnTraining: boolean;      // Niños pueden ver SU entrenamiento
    canAccessOwnAssignments: boolean;   // Niños pueden ver SUS asignaciones
    canAccessOwnProgress: boolean;      // Niños pueden ver SU progreso

    // 🏆 GAMIFICACIÓN Y RECOMPENSAS
    canAccessBasicRewards: boolean;        // Logros básicos para todos los niños
    canAccessPremiumRewards: boolean;      // Logros premium adicionales
    canAccessChallenges: boolean;          // Desafíos semanales (solo premium)

    // 🎯 EJERCICIOS
    canAccessPremiumExercises: boolean;
    canCreateCustomExercises: boolean;
    maxExercisesPerDay?: number; // undefined = ilimitado

    // 📋 RUTINAS
    canCreatePersonalRoutines: boolean;
    canAccessPremiumRoutines: boolean;
    canShareRoutines: boolean;
    maxRoutinesStored?: number; // undefined = ilimitado

    // 📊 ENTRENAMIENTO Y SEGUIMIENTO
    canTrackProgress: boolean;
    canAccessAdvancedMetrics: boolean;
    canExportData: boolean;

    // 👨‍👩‍👧‍👦 GESTIÓN (específico para tutores)
    canManageKids: boolean;              // Cualquier tutor puede gestionar
    canManageMultipleKids: boolean;      // Solo premium: múltiples hijos
    canAccessAnalytics: boolean;
    canCreateExercisesForKids: boolean;
    canAssignRoutines: boolean;          // Cualquier tutor puede asignar

    // 💳 SUSCRIPCIÓN
    canUpgradeSubscription: boolean;

    // 📊 REPORTES Y CONFIGURACIONES
    canAccessBasicReports: boolean;        // Reportes básicos para todos los tutores
    canAccessAdvancedReports: boolean;     // Reportes avanzados con gráficos y comparativas
    canExportReports: boolean;             // Exportar reportes a PDF
    canAccessAdvancedSettings: boolean;    // Configuraciones avanzadas de la aplicación
}

/**
 * 🎯 NUEVA FILOSOFÍA: "Acceso amplio, funcionalidades limitadas"
 * - Los niños pueden ver SUS datos (training, assignments, progress)
 * - Los tutores pueden gestionar (con limitaciones según suscripción)
 * - Solo restringimos funcionalidades avanzadas, no navegación básica
 */
export function getUserPermissions(user: User | null): UserPermissions {
    // Usuario no autenticado - solo navegación anónima
    if (!user) {
        return {
            canAccessExercises: true,                // ✅ Navegación anónima permitida
            canAccessOwnTraining: false,
            canAccessOwnAssignments: false,
            canAccessOwnProgress: false,
            canAccessBasicRewards: false,
            canAccessPremiumRewards: false,
            canAccessChallenges: false,
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
            canManageKids: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canAssignRoutines: false,
            canUpgradeSubscription: true,
            canAccessBasicReports: false,          // Niños no tienen reportes
            canAccessAdvancedReports: false,       // Niños no tienen reportes
            canExportReports: false,               // Niños no exportan
            canAccessAdvancedSettings: false       // Niños no configuran
        };
    }

    const { userType: type, subscription } = user;

    // 👧 NIÑO FREE
    if (type === 'kid' && subscription === 'free') {
        return {
            canAccessExercises: true,               // ✅ Puede ver ejercicios
            canAccessOwnTraining: true,             // ✅ Puede entrenar
            canAccessOwnAssignments: true,          // ✅ Puede ver sus asignaciones
            canAccessOwnProgress: true,             // ✅ Puede ver su progreso
            canAccessBasicRewards: true,            // ✅ Recompensas básicas
            canAccessPremiumRewards: false,         // ❌ Sin recompensas premium
            canAccessChallenges: false,             // ❌ Sin desafíos
            canAccessPremiumExercises: false,       // ❌ Sin ejercicios premium
            canCreateCustomExercises: false,
            maxExercisesPerDay: 5,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            maxRoutinesStored: 1,
            canTrackProgress: true,                 // ✅ Seguimiento básico
            canAccessAdvancedMetrics: false,       // ❌ Sin métricas avanzadas
            canExportData: false,
            canManageKids: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canAssignRoutines: false,
            canUpgradeSubscription: true,
            canAccessBasicReports: false,          // Niños no tienen reportes
            canAccessAdvancedReports: false,       // Niños no tienen reportes
            canExportReports: false,               // Niños no exportan
            canAccessAdvancedSettings: false       // Niños no configuran
        };
    }

    // 👦 NIÑO PREMIUM
    if (type === 'kid' && subscription === 'premium') {
        return {
            canAccessExercises: true,               // ✅ Puede ver ejercicios
            canAccessOwnTraining: true,             // ✅ Puede entrenar
            canAccessOwnAssignments: true,          // ✅ Puede ver sus asignaciones
            canAccessOwnProgress: true,             // ✅ Puede ver su progreso
            canAccessBasicRewards: true,            // ✅ Recompensas básicas
            canAccessPremiumRewards: true,          // ✅ Recompensas premium
            canAccessChallenges: true,              // ✅ Desafíos semanales
            canAccessPremiumExercises: true,        // ✅ Ejercicios premium
            canCreateCustomExercises: false,        // Solo tutores
            maxExercisesPerDay: undefined,          // Ilimitado
            canCreatePersonalRoutines: true,
            canAccessPremiumRoutines: true,
            canShareRoutines: false,                // Solo tutores
            maxRoutinesStored: 10,
            canTrackProgress: true,
            canAccessAdvancedMetrics: true,         // ✅ Métricas avanzadas
            canExportData: false,                   // Solo tutores
            canManageKids: false,
            canManageMultipleKids: false,
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canAssignRoutines: false,
            canUpgradeSubscription: false,          // Ya es premium
            canAccessBasicReports: false,          // Niños no tienen reportes
            canAccessAdvancedReports: false,       // Niños no tienen reportes
            canExportReports: false,               // Niños no exportan
            canAccessAdvancedSettings: false       // Niños no configuran
        };
    }

    // 👩‍🏫 TUTOR FREE
    if (type === 'tutor' && subscription === 'free') {
        return {
            canAccessExercises: true,               // ✅ Puede ver ejercicios
            canAccessOwnTraining: false,            // Los tutores no entrenan
            canAccessOwnAssignments: false,         // Los tutores no tienen asignaciones
            canAccessOwnProgress: false,            // Los tutores no tienen progreso personal
            canAccessBasicRewards: false,           // Tutores no tienen gamificación
            canAccessPremiumRewards: false,         // Tutores no tienen gamificación
            canAccessChallenges: false,             // Tutores no tienen gamificación
            canAccessPremiumExercises: false,
            canCreateCustomExercises: false,
            maxExercisesPerDay: 5,
            canCreatePersonalRoutines: false,
            canAccessPremiumRoutines: false,
            canShareRoutines: false,
            maxRoutinesStored: 3,
            canTrackProgress: true,                 // ✅ Puede ver progreso de hijos
            canAccessAdvancedMetrics: false,
            canExportData: false,
            canManageKids: true,                    // ✅ Puede gestionar hijos
            canManageMultipleKids: false,           // ❌ Solo 1 hijo
            canAccessAnalytics: false,
            canCreateExercisesForKids: false,
            canAssignRoutines: true,                // ✅ Puede asignar rutinas
            canUpgradeSubscription: true,
            canAccessBasicReports: true,           // ✅ Reportes básicos
            canAccessAdvancedReports: false,       // ❌ Sin reportes avanzados
            canExportReports: false,               // ❌ Sin exportación
            canAccessAdvancedSettings: false       // ❌ Solo configuraciones básicas
        };
    }

    // 👨‍🏫 TUTOR PREMIUM
    if (type === 'tutor' && subscription === 'premium') {
        return {
            canAccessExercises: true,               // ✅ Puede ver ejercicios
            canAccessOwnTraining: false,            // Los tutores no entrenan
            canAccessOwnAssignments: false,         // Los tutores no tienen asignaciones
            canAccessOwnProgress: false,            // Los tutores no tienen progreso personal
            canAccessBasicRewards: false,           // Tutores no tienen gamificación
            canAccessPremiumRewards: false,         // Tutores no tienen gamificación
            canAccessChallenges: false,             // Tutores no tienen gamificación
            canAccessPremiumExercises: true,
            canCreateCustomExercises: true,
            maxExercisesPerDay: undefined,          // Ilimitado
            canCreatePersonalRoutines: true,
            canAccessPremiumRoutines: true,
            canShareRoutines: true,
            maxRoutinesStored: undefined,           // Ilimitado
            canTrackProgress: true,
            canAccessAdvancedMetrics: true,
            canExportData: true,
            canManageKids: true,                    // ✅ Puede gestionar hijos
            canManageMultipleKids: true,            // ✅ Hasta 3 hijos
            canAccessAnalytics: true,
            canCreateExercisesForKids: true,
            canAssignRoutines: true,                // ✅ Puede asignar rutinas
            canUpgradeSubscription: false,          // Ya es premium
            canAccessBasicReports: true,           // ✅ Reportes básicos
            canAccessAdvancedReports: true,        // ✅ Reportes avanzados
            canExportReports: true,                // ✅ Exportación completa
            canAccessAdvancedSettings: true        // ✅ Configuraciones avanzadas
        };
    }

    // Fallback - permisos mínimos por seguridad
    return getUserPermissions(null);
}

/**
 * ✅ FUNCIONES HELPER ACTUALIZADAS
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

    isKid: (user: User | null): boolean => {
        return user?.userType === 'kid';
    },

    needsUpgrade: (user: User | null): boolean => {
        return getUserPermissions(user).canUpgradeSubscription;
    },

    canAccessFeature: (user: User | null, feature: keyof UserPermissions): boolean => {
        const perms = getUserPermissions(user);
        return Boolean(perms[feature]);
    },

    // ✅ NUEVA: Verificar si puede ver contenido específico de niños
    canViewOwnContent: (user: User | null): boolean => {
        if (!user) return false;
        const perms = getUserPermissions(user);
        return perms.canAccessOwnTraining || perms.canAccessOwnAssignments || perms.canAccessOwnProgress;
    },

    // ✅ NUEVA: Verificar si puede gestionar otros usuarios
    canManageOthers: (user: User | null): boolean => {
        const perms = getUserPermissions(user);
        return perms.canManageKids;
    }
};