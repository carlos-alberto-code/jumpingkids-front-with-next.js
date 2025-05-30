import { useMemo } from 'react';
import { User } from '../../types/auth';
import { jumpingkidsTheme } from '../../theme/theme';
import { createTheme, Theme } from '@mui/material/styles';
import { useAuthContext } from '../../context/auth/AuthContext';

/**
 * Tema básico para usuarios FREE
 * Material-UI estándar sin personalizaciones avanzadas
 */
const createBasicTheme = (): Theme => {
    return createTheme({
        palette: {
            primary: {
                main: '#1976d2', // Azul estándar de Material-UI
            },
            secondary: {
                main: '#dc004e', // Rosa estándar
            },
        },
        // Sin CSS Variables para usuarios FREE
        cssVariables: false,
        // Solo modo claro
        colorSchemes: {
            light: {
                palette: {
                    primary: { main: '#1976d2' },
                    secondary: { main: '#dc004e' },
                }
            }
        },
        components: {
            // Componentes básicos sin animaciones ni efectos avanzados
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                },
            },
        },
    });
};

/**
 * Hook para obtener el tema apropiado según el usuario actual
 */
export const useUserTheme = (): Theme => {
    const { session } = useAuthContext();

    const theme = useMemo(() => {
        const user = session?.user;

        // Usuario no autenticado o FREE - tema básico
        if (!user || user.subscription === 'free') {
            return createBasicTheme();
        }

        // Usuario PREMIUM - tema Jumpingkids completo
        if (user.subscription === 'premium') {
            return jumpingkidsTheme;
        }

        // Fallback - tema básico
        return createBasicTheme();
    }, [session?.user]);

    return theme;
};

/**
 * Hook para verificar capacidades del tema actual
 */
export const useThemeCapabilities = () => {
    const { session } = useAuthContext();
    const user = session?.user;

    return useMemo(() => ({
        // Solo Premium tiene modo oscuro
        hasDarkMode: user?.subscription === 'premium',

        // Solo Premium tiene CSS Variables
        hasCssVariables: user?.subscription === 'premium',

        // Solo Premium tiene animaciones avanzadas
        hasAdvancedAnimations: user?.subscription === 'premium',

        // Solo Premium tiene componentes personalizados
        hasCustomComponents: user?.subscription === 'premium',

        // Solo Premium tiene paleta de colores Jumpingkids
        hasJumpingkidsColors: user?.subscription === 'premium',

        // Verificar si puede cambiar tema
        canToggleTheme: user?.subscription === 'premium',
    }), [user?.subscription]);
};

/**
 * Hook para obtener información sobre el tema del usuario
 */
export const useUserThemeInfo = () => {
    const { session } = useAuthContext();
    const capabilities = useThemeCapabilities();
    const user = session?.user;

    return useMemo(() => ({
        // Información básica
        themeName: user?.subscription === 'premium' ? 'Jumpingkids Premium' : 'Material-UI Básico',
        themeLevel: user?.subscription || 'free',

        // Capacidades
        ...capabilities,

        // Mensajes para UI
        upgradeMessage: !capabilities.hasDarkMode
            ? 'Actualiza a Premium para acceder al modo oscuro y temas personalizados'
            : null,

        // Color principal del tema
        primaryColor: user?.subscription === 'premium' ? '#E91E63' : '#1976d2',
    }), [user?.subscription, capabilities]);
};