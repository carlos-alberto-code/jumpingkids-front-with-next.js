import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import type { Navigation } from '@toolpad/core/AppProvider';
import React, { useMemo } from 'react';
import { useAuthContext } from '../context/auth/AuthContext';
import { User } from '../types/auth';
import { getUserPermissions } from './permissions';

/**
 * Genera la navegación dinámica basada en el usuario actual
 */
export function getDynamicNavigation(user: User | null): Navigation {
    const permissions = getUserPermissions(user);
    const navigation: Navigation = [];

    // Header principal - siempre visible
    navigation.push({
        kind: 'header',
        title: user ? 'Mi Entrenamiento' : 'Explorar'
    });

    // Ejercicios - siempre visible (modo anónimo permitido)
    navigation.push({
        segment: 'exercise',
        title: 'Ejercicios',
        icon: React.createElement(FitnessCenterIcon),
    });

    // Rutinas - visible según permisos
    if (!user || permissions.canCreatePersonalRoutines || permissions.canAccessPremiumRoutines) {
        navigation.push({
            segment: 'routines',
            title: 'Rutinas',
            icon: React.createElement(ListAltIcon),
        });
    }

    // Entrenamiento - visible si puede hacer seguimiento
    if (permissions.canTrackProgress) {
        navigation.push({
            segment: 'training',
            title: 'Entrenamiento',
            icon: React.createElement(DirectionsRunIcon),
        });
    }

    // Sección de creación - solo para tutores premium
    if (permissions.canCreateCustomExercises || permissions.canCreateExercisesForKids) {
        navigation.push({
            kind: 'header',
            title: 'Creación'
        });

        if (permissions.canCreateCustomExercises) {
            navigation.push({
                segment: 'create_exercise',
                title: 'Crear Ejercicio',
                icon: React.createElement(AddIcon),
            });
        }

        if (permissions.canCreateExercisesForKids) {
            navigation.push({
                segment: 'create_routine',
                title: 'Crear Rutina',
                icon: React.createElement(AddIcon),
            });
        }
    }

    // Sección de gestión - solo para tutores
    if (user?.userType === 'tutor') {
        navigation.push({
            kind: 'header',
            title: 'Gestión'
        });

        if (permissions.canAccessAnalytics) {
            navigation.push({
                segment: 'analytics',
                title: 'Analytics',
                icon: React.createElement(AnalyticsIcon),
            });
        }

        if (permissions.canManageMultipleKids) {
            navigation.push({
                segment: 'my_kids',
                title: 'Mis Niños',
                icon: React.createElement(SupervisorAccountIcon),
            });
        }

        // Agregar asignar rutinas para tutores
        if (user?.userType === 'tutor') {
            navigation.push({
                segment: 'assign_routine',
                title: 'Asignar Rutinas',
                icon: React.createElement(ListAltIcon),
            });
        }
    }

    // Divider antes de secciones de usuario
    if (user) {
        navigation.push({
            kind: 'divider'
        });
    }

    return navigation;
}

/**
 * Hook para obtener navegación dinámica
 */
export function useDynamicNavigation(): Navigation {
    const { session } = useAuthContext();

    return useMemo(() => {
        return getDynamicNavigation(session?.user || null);
    }, [session?.user]);
}
