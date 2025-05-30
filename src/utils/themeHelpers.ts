// src/utils/themeHelpers.ts
import { Theme } from '@mui/material/styles';

/**
 * Utilidades para acceso seguro a propiedades personalizadas del tema
 * Previene errores cuando el tema personalizado no está disponible
 */

// Interfaz para colores personalizados (debe coincidir con la declaración del tema)
interface CustomPalette {
  exerciseDifficulty?: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  exerciseCategory?: {
    cardio: string;
    strength: string;
    flexibility: string;
    core: string;
    balance: string;
    fun: string;
  };
  dragonColors?: {
    mintGreen: string;
    limeGreen: string;
    cream: string;
    chocolate: string;
    lavender: string;
  };
}

/**
 * Obtiene colores de dificultad de ejercicios de manera segura
 */
export const getDifficultyColor = (difficulty: string, theme: Theme): string => {
  const customColors = (theme.palette as any).exerciseDifficulty as CustomPalette['exerciseDifficulty'];
  
  if (customColors) {
    const colorMap: Record<string, string> = {
      'Principiante': customColors.beginner,
      'Intermedio': customColors.intermediate,
      'Avanzado': customColors.advanced,
    };
    return colorMap[difficulty];
  }
  
  // Fallbacks seguros usando colores estándar de MUI
  const fallbackMap: Record<string, string> = {
    'Principiante': theme.vars?.palette.success.main || theme.palette.success.main,
    'Intermedio': theme.vars?.palette.warning.main || theme.palette.warning.main,
    'Avanzado': theme.vars?.palette.error.main || theme.palette.error.main,
  };
  
  return fallbackMap[difficulty] || (theme.vars?.palette.grey[500] || theme.palette.grey[500]);
};

/**
 * Obtiene estilos completos de dificultad (background + color)
 */
export const getDifficultyStyles = (difficulty: string, theme: Theme): { backgroundColor: string; color: string } => {
  const customColors = (theme.palette as any).exerciseDifficulty as CustomPalette['exerciseDifficulty'];
  
  if (customColors) {
    const styleMap: Record<string, { backgroundColor: string; color: string }> = {
      'Principiante': { 
        backgroundColor: customColors.beginner, 
        color: '#FFFFFF' 
      },
      'Intermedio': { 
        backgroundColor: customColors.intermediate, 
        color: '#FFFFFF' 
      },
      'Avanzado': { 
        backgroundColor: customColors.advanced, 
        color: '#FFFFFF' 
      },
    };
    return styleMap[difficulty];
  }
  
  // Fallbacks seguros usando colores estándar de MUI
  const fallbackMap: Record<string, { backgroundColor: string; color: string }> = {
    'Principiante': {
      backgroundColor: theme.vars?.palette.success.main || theme.palette.success.main,
      color: theme.vars?.palette.success.contrastText || theme.palette.success.contrastText,
    },
    'Intermedio': {
      backgroundColor: theme.vars?.palette.warning.main || theme.palette.warning.main,
      color: theme.vars?.palette.warning.contrastText || theme.palette.warning.contrastText,
    },
    'Avanzado': {
      backgroundColor: theme.vars?.palette.error.main || theme.palette.error.main,
      color: theme.vars?.palette.error.contrastText || theme.palette.error.contrastText,
    },
  };
  
  return fallbackMap[difficulty] || {
    backgroundColor: theme.vars?.palette.grey[500] || theme.palette.grey[500],
    color: '#FFFFFF'
  };
};

/**
 * Obtiene colores de categoría de ejercicios de manera segura
 */
export const getCategoryColor = (category: string, theme: Theme): string => {
  const customColors = (theme.palette as any).exerciseCategory as CustomPalette['exerciseCategory'];
  
  if (customColors) {
    const colorMap: Record<string, string> = {
      'Cardio': customColors.cardio,
      'Fuerza': customColors.strength,
      'Flexibilidad': customColors.flexibility,
      'Cuerpo Completo': customColors.strength,
      'Core': customColors.core,
      'Piernas': customColors.strength,
      'Movilidad': customColors.flexibility,
      'Bienestar': customColors.fun,
      'Equilibrio': customColors.balance,
    };
    return colorMap[category];
  }
  
  // Fallback al color primario
  return theme.vars?.palette.primary.main || theme.palette.primary.main;
};

/**
 * Obtiene colores del dragón (personalizados) de manera segura
 */
export const getDragonColor = (colorName: keyof NonNullable<CustomPalette['dragonColors']>, theme: Theme): string => {
  const customColors = (theme.palette as any).dragonColors as CustomPalette['dragonColors'];
  
  if (customColors && customColors[colorName]) {
    return customColors[colorName];
  }
  
  // Fallbacks seguros
  const fallbackMap: Record<string, string> = {
    mintGreen: theme.vars?.palette.success.light || theme.palette.success.light,
    limeGreen: theme.vars?.palette.success.main || theme.palette.success.main,
    cream: theme.vars?.palette.background.paper || theme.palette.background.paper,
    chocolate: theme.vars?.palette.grey[600] || theme.palette.grey[600],
    lavender: theme.vars?.palette.secondary.light || theme.palette.secondary.light,
  };
  
  return fallbackMap[colorName] || (theme.vars?.palette.primary.main || theme.palette.primary.main);
};

/**
 * Verifica si el tema personalizado está disponible
 */
export const hasCustomTheme = (theme: Theme): boolean => {
  return !!(theme.palette as any).exerciseDifficulty;
};

/**
 * Obtiene un color seguro con fallback automático
 */
export const getSafeColor = (
  path: string,
  fallback: string,
  theme: Theme
): string => {
  try {
    // Intentar acceder al path usando notación de puntos
    const pathArray = path.split('.');
    let value: any = theme;
    
    for (const key of pathArray) {
      value = value?.[key];
      if (value === undefined) {
        return fallback;
      }
    }
    
    return typeof value === 'string' ? value : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Crea transparencia de color de manera segura
 */
export const createAlphaColor = (color: string, alpha: number): string => {
  // Usar color-mix que es compatible con CSS Variables de MUI v6+
  return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
};

/**
 * Hook personalizado para usar los helpers del tema
 */
export const useThemeHelpers = (theme: Theme) => {
  return {
    getDifficultyColor: (difficulty: string) => getDifficultyColor(difficulty, theme),
    getDifficultyStyles: (difficulty: string) => getDifficultyStyles(difficulty, theme),
    getCategoryColor: (category: string) => getCategoryColor(category, theme),
    getDragonColor: (colorName: keyof NonNullable<CustomPalette['dragonColors']>) => 
      getDragonColor(colorName, theme),
    hasCustomTheme: () => hasCustomTheme(theme),
    getSafeColor: (path: string, fallback: string) => getSafeColor(path, fallback, theme),
    createAlphaColor,
  };
};