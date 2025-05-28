import React from 'react';
import { usePermissionCheck, useUserPermissions } from '../../hooks/auth/useUserPermissions';
import { UserPermissions } from '../../utils/permissions';

interface PermissionGateProps {
    children: React.ReactNode;

    // Opciones de verificación - usar solo una
    permission?: keyof UserPermissions;
    permissions?: (keyof UserPermissions)[];
    requireAll?: boolean; // Para múltiples permisos: AND vs OR

    // Condiciones personalizadas
    condition?: boolean;
    customCheck?: (permissions: UserPermissions) => boolean;

    // Fallbacks
    fallback?: React.ReactNode;
    showUpgradePrompt?: boolean;
}

/**
 * Componente para controlar acceso a contenido basado en permisos
 * 
 * Ejemplos de uso:
 * <PermissionGate permission="canCreateCustomExercises">
 *   <CreateExerciseButton />
 * </PermissionGate>
 * 
 * <PermissionGate permissions={['canAccessPremiumExercises', 'canTrackProgress']} requireAll={false}>
 *   <PremiumContent />
 * </PermissionGate>
 */
const PermissionGate: React.FC<PermissionGateProps> = ({
    children,
    permission,
    permissions,
    requireAll = true,
    condition,
    customCheck,
    fallback = null,
    showUpgradePrompt = false
}) => {
    const userPermissions = useUserPermissions();
    const { needsUpgrade } = usePermissionCheck();

    // Determinar si se debe mostrar el contenido
    const hasAccess = React.useMemo(() => {
        // Condición personalizada tiene prioridad
        if (condition !== undefined) {
            return condition;
        }

        // Check personalizado
        if (customCheck) {
            return customCheck(userPermissions);
        }

        // Permiso único
        if (permission) {
            return Boolean(userPermissions[permission]);
        }

        // Múltiples permisos
        if (permissions && permissions.length > 0) {
            const results = permissions.map(perm => Boolean(userPermissions[perm]));
            return requireAll
                ? results.every(Boolean) // AND - todos deben ser true
                : results.some(Boolean);  // OR - al menos uno debe ser true
        }

        // Sin condiciones especificadas - denegar por defecto
        return false;
    }, [userPermissions, permission, permissions, requireAll, condition, customCheck]);

    // Mostrar contenido si tiene acceso
    if (hasAccess) {
        return <>{children}</>;
    }

    // Mostrar prompt de upgrade si es aplicable
    if (showUpgradePrompt && needsUpgrade) {
        return (
            <div>
                {/* Aquí se podría mostrar un componente de upgrade */}
                <p>Esta funcionalidad requiere suscripción premium</p>
            </div>
        );
    }

    // Mostrar fallback o nada
    return <>{fallback}</>;
};

export default PermissionGate;
