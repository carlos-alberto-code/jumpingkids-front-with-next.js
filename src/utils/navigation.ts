import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { Navigation } from '@toolpad/core/AppProvider';
import React, { useMemo } from 'react';
import { useAuthContext } from '../context/auth/AuthContext';
import { User } from '../types/auth';
import { getUserPermissions } from './permissions';

/**
 * 🎯 NUEVA FILOSOFÍA: Navegación basada en tipo de usuario, no solo permisos
 * - Niños ven: Ejercicios, Training, Assignments, Progress
 * - Tutores ven: Dashboard, Ejercicios, Rutinas, Gestión de hijos, etc.
 * - Solo se ocultan funcionalidades premium específicas
 */
export function getDynamicNavigation(user: User | null): Navigation {
    const permissions = getUserPermissions(user);
    const navigation: Navigation = [];

    // ========================
    // 👧👦 NAVEGACIÓN PARA NIÑOS
    // ========================
    if (user?.userType === 'kid') {
        // Header principal
        navigation.push({
            kind: 'header',
            title: '🏃‍♀️ Mi Entrenamiento'
        });

        // Training - SIEMPRE visible para niños autenticados
        navigation.push({
            segment: 'training',
            title: 'Entrenamiento',
            icon: React.createElement(DirectionsRunIcon),
        });

        // Assignments - SIEMPRE visible para niños autenticados
        navigation.push({
            segment: 'asignments',  // ✅ Corregido: coincide con el archivo
            title: 'Mis Asignaciones',
            icon: React.createElement(CalendarMonthIcon),
        });

        // Progress - SIEMPRE visible para niños autenticados
        navigation.push({
            segment: 'progress',
            title: 'Mi Progreso',
            icon: React.createElement(TrendingUpIcon),
        });

        // Header de gamificación
        navigation.push({
            kind: 'header',
            title: '🎮 Gamificación'
        });

        // Rewards - Accesible para todos los niños (básicas) o premium
        if (permissions.canAccessBasicRewards) {
            navigation.push({
                segment: 'rewards',
                title: permissions.canAccessPremiumRewards ? 'Recompensas' : 'Recompensas Básicas',
                icon: React.createElement(EmojiEventsIcon),
            });
        }

        // Challenges - Solo para niños premium
        if (permissions.canAccessChallenges) {
            navigation.push({
                segment: 'challenges',
                title: 'Desafíos',
                icon: React.createElement(SportsMmaIcon),
            });
        }

        // Divider
        navigation.push({ kind: 'divider' });

        return navigation;
    }

    // ========================
    // 👩‍🏫👨‍🏫 NAVEGACIÓN PARA TUTORES
    // ========================
    if (user?.userType === 'tutor') {
        // Header principal - Dashboard
        navigation.push({
            kind: 'header',
            title: '📊 Panel de Control'
        });

        // Dashboard - SIEMPRE visible para tutores
        navigation.push({
            segment: '',
            title: 'Dashboard',
            icon: React.createElement(DashboardIcon),
        });

        // Header gestión de hijos
        navigation.push({
            kind: 'header',
            title: '👨‍👩‍👧‍👦 Gestión de Hijos'
        });

        // My Kids - SIEMPRE visible para tutores
        if (permissions.canManageKids) {
            navigation.push({
                segment: 'my_kids',
                title: 'Mis Hijos',
                icon: React.createElement(SupervisorAccountIcon),
            });
        }

        // Assign Routine - SIEMPRE visible para tutores
        if (permissions.canAssignRoutines) {
            navigation.push({
                segment: 'assign_routine',
                title: 'Asignar Rutinas',
                icon: React.createElement(AssignmentIcon),
            });
        }

        // Analytics - Solo premium
        if (permissions.canAccessAnalytics) {
            navigation.push({
                segment: 'analytics',
                title: 'Analytics',
                icon: React.createElement(AnalyticsIcon),
            });
        }

        // Reports - SIEMPRE visible para tutores
        navigation.push({
            segment: 'reports',
            title: 'Reportes',
            icon: React.createElement(AssessmentIcon),
        });

        // Header contenido
        navigation.push({
            kind: 'header',
            title: '📚 Contenido'
        });

        // Ejercicios - SIEMPRE visible
        navigation.push({
            segment: 'exercise',
            title: 'Ejercicios',
            icon: React.createElement(FitnessCenterIcon),
        });

        // Rutinas - SIEMPRE visible para tutores
        navigation.push({
            segment: 'routines',
            title: 'Rutinas',
            icon: React.createElement(ListAltIcon),
        });

        // Sección de creación - Solo premium
        if (permissions.canCreateCustomExercises || permissions.canCreateExercisesForKids) {
            navigation.push({
                kind: 'header',
                title: '✨ Crear Contenido (Premium)'
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

        // Header configuraciones - Solo premium
        if (permissions.canAccessAdvancedSettings) {
            navigation.push({
                kind: 'header',
                title: '⚙️ Configuración Avanzada (Premium)'
            });

            navigation.push({
                segment: 'settings',
                title: 'Configuraciones',
                icon: React.createElement(SettingsIcon),
            });
        }

        return navigation;
    }

    // ========================
    // 🔓 NAVEGACIÓN ANÓNIMA
    // ========================
    navigation.push({
        kind: 'header',
        title: '🔍 Explorar'
    });

    // Solo ejercicios para usuarios no autenticados
    navigation.push({
        segment: 'exercise',
        title: 'Ejercicios',
        icon: React.createElement(FitnessCenterIcon),
    });

    return navigation;
}

/**
 * Hook para obtener navegación dinámica
 */
export function useDynamicNavigation(): Navigation {
    const { session } = useAuthContext();

    return useMemo(() => {
        const nav = getDynamicNavigation(session?.user || null);
        console.log('🧭 Navegación generada para:', {
            userType: session?.user?.userType || 'anonymous',
            subscription: session?.user?.subscription || 'none',
            navigationItems: nav.length
        });
        return nav;
    }, [session?.user]);
}

/**
 * ✅ HELPER: Verificar si una ruta específica debería ser accesible
 */
export function canAccessRoute(user: User | null, route: string): boolean {
    const permissions = getUserPermissions(user);

    // Rutas de autenticación - siempre accesibles
    if (route.startsWith('/auth/')) {
        return true;
    }

    // Ejercicios - siempre accesibles
    if (route === '/exercise') {
        return user?.userType === 'tutor';
    }

    // Rutas específicas de niños
    if (user?.userType === 'kid') {
        if (route === '/') {
            return false;
        }
        const kidRoutes = ['/training', '/asignments', '/progress'];  // ✅ Corregido

        // Agregar rutas de gamificación según permisos
        if (permissions.canAccessBasicRewards && route === '/rewards') {
            return true;
        }
        if (permissions.canAccessChallenges && route === '/challenges') {
            return true;
        }

        return kidRoutes.includes(route);
    }

    // Rutas específicas de tutores
    if (user?.userType === 'tutor') {
        // Dashboard y gestión básica
        const basicTutorRoutes = ['/', '/my_kids', '/assign_routine', '/routines'];
        if (basicTutorRoutes.includes(route)) {
            return permissions.canManageKids;
        }

        // Rutas premium
        if (route === '/analytics') {
            return permissions.canAccessAnalytics;
        }
        if (route === '/create_exercise') {
            return permissions.canCreateCustomExercises;
        }
        if (route === '/create_routine') {
            return permissions.canCreateExercisesForKids;
        }

        // Reports - disponible para todos los tutores
        if (route === '/reports') {
            return permissions.canAccessBasicReports;
        }

        // Settings - solo premium
        if (route === '/settings') {
            return permissions.canAccessAdvancedSettings;
        }
    }

    // Por defecto, denegar acceso
    return false;
}

/**
 * ✅ HELPER: Obtener ruta de redirección por defecto según usuario
 */
export function getDefaultRoute(user: User | null): string {
    if (!user) {
        return '/auth/login'; // Usuarios anónimos van a ejercicios
    }

    if (user.userType === 'kid') {
        return '/asignments'; // Niños van a asignaciones
    }

    if (user.userType === 'tutor') {
        return '/'; // Tutores van al dashboard
    }

    return '/auth/login'; // Fallback
}