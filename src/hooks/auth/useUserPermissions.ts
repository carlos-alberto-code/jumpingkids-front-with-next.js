import { useMemo } from 'react';
import { useAuthContext } from '../../context/auth/AuthContext';
import { checkPermissions, getUserPermissions, UserPermissions } from '../../utils/permissions';

/**
 * Hook principal para obtener permisos del usuario actual
 */
export const useUserPermissions = (): UserPermissions => {
    const { session } = useAuthContext();

    const permissions = useMemo(() => {
        return getUserPermissions(session?.user || null);
    }, [session?.user]);

    return permissions;
};

/**
 * Hook de conveniencia para verificaciones rápidas
 */
export const usePermissionCheck = () => {
    const { session } = useAuthContext();
    const permissions = useUserPermissions();

    return useMemo(() => ({
        // Info básica del usuario
        user: session?.user || null,
        isAuthenticated: !!session?.isAuthenticated,
        isPremiumUser: checkPermissions.isPremiumUser(session?.user || null),
        isTutor: checkPermissions.isTutor(session?.user || null),
        isKid: session?.user?.userType === 'kid',

        // Verificaciones de capacidades específicas
        canCreateContent: checkPermissions.canCreateContent(session?.user || null),
        canManageOthers: permissions.canManageMultipleKids,
        needsUpgrade: checkPermissions.needsUpgrade(session?.user || null),

        // Límites actuales
        exerciseLimit: permissions.maxExercisesPerDay,
        routineLimit: permissions.maxRoutinesStored,

        // Permisos completos
        ...permissions,

        // Función helper para verificar características específicas
        canAccess: (feature: keyof UserPermissions) =>
            checkPermissions.canAccessFeature(session?.user || null, feature)
    }), [session, permissions]);
};

/**
 * Hook específico para verificar un permiso individual
 */
export const useHasPermission = (permission: keyof UserPermissions): boolean => {
    const permissions = useUserPermissions();
    return Boolean(permissions[permission]);
};
