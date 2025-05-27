// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// 🎨 Paleta de colores basada en la ilustración del dragón
// Colores vibrantes y amigables perfectos para aplicación infantil
const jumpingKidsColors = {
  // Colores primarios - Rosa energético del dragón
  primary: {
    light: '#F48FB1',    // Rosa claro del dragón
    main: '#E91E63',     // Rosa principal vibrante
    dark: '#C2185B',     // Rosa oscuro intenso
  },
  // Colores secundarios - Verde natura/salud
  secondary: {
    light: '#A5D6A7',    // Verde menta claro
    main: '#4CAF50',     // Verde natural principal
    dark: '#388E3C',     // Verde oscuro
  },
  // Colores de ejercicios - Inspirados en la naturaleza y diversión
  exercise: {
    // Dificultades con colores intuitivos de la paleta
    beginner: '#81C784',     // Verde menta = fácil/natural
    intermediate: '#FF7043', // Naranja coral = moderado
    advanced: '#E91E63',     // Rosa intenso = desafiante
    
    // Categorías con colores de la ilustración
    cardio: '#E91E63',       // Rosa energético del dragón
    strength: '#8D6E63',     // Marrón chocolate para fuerza
    flexibility: '#CE93D8',  // Morado suave para flexibilidad
    core: '#795548',         // Marrón tierra para core
    balance: '#4CAF50',      // Verde natural para equilibrio
    fun: '#FFEB3B',         // Amarillo brillante para diversión
  },
  // Colores adicionales de la paleta
  nature: {
    mintGreen: '#81C784',    // Verde menta del dragón
    limeGreen: '#8BC34A',    // Verde lima vibrante
    cream: '#FFF8E1',        // Crema suave para fondos
    chocolate: '#8D6E63',    // Marrón chocolate
    lavender: '#CE93D8',     // Morado suave
  },
  // Estados de UI usando la paleta natural
  states: {
    success: '#4CAF50',      // Verde natural
    warning: '#FF7043',      // Naranja coral
    error: '#E91E63',        // Rosa intenso
    info: '#81C784',         // Verde menta
  }
};

// 🌈 Tema principal con CSS Variables y colorSchemes
export const jumpingkidsTheme = createTheme({
  // ✨ Habilitar CSS Variables para mejor rendimiento y modo oscuro sin parpadeo
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme', // 🔧 Selector específico para Toolpad
  },
  // 🌓 Esquemas de color para modo claro y oscuro
  colorSchemes: {
    light: {
      palette: {
        primary: jumpingKidsColors.primary,
        secondary: jumpingKidsColors.secondary,
        success: {
          light: '#A5D6A7',
          main: jumpingKidsColors.states.success,
          dark: '#388E3C',
        },
        warning: {
          light: '#FFAB91',
          main: jumpingKidsColors.states.warning,
          dark: '#D84315',
        },
        error: {
          light: '#F48FB1',
          main: jumpingKidsColors.states.error,
          dark: '#C2185B',
        },
        info: {
          light: '#C8E6C9',
          main: jumpingKidsColors.states.info,
          dark: '#388E3C',
        },
        background: {
          default: jumpingKidsColors.nature.cream,    // Crema suave de la ilustración
          paper: '#FFFFFF',                           // Blanco puro para cards
        },
        text: {
          primary: '#2E2E2E',    // Gris oscuro suave, amigable
          secondary: '#616161',   // Gris medio para texto secundario
        },
        // 🎯 Colores personalizados para ejercicios - basados en la ilustración
        exerciseDifficulty: {
          beginner: jumpingKidsColors.exercise.beginner,
          intermediate: jumpingKidsColors.exercise.intermediate,
          advanced: jumpingKidsColors.exercise.advanced,
        },
        exerciseCategory: {
          cardio: jumpingKidsColors.exercise.cardio,
          strength: jumpingKidsColors.exercise.strength,
          flexibility: jumpingKidsColors.exercise.flexibility,
          core: jumpingKidsColors.exercise.core,
          balance: jumpingKidsColors.exercise.balance,
          fun: jumpingKidsColors.exercise.fun,
        },
        // 🎨 Colores adicionales de la ilustración
        dragonColors: {
          mintGreen: jumpingKidsColors.nature.mintGreen,
          limeGreen: jumpingKidsColors.nature.limeGreen,
          cream: jumpingKidsColors.nature.cream,
          chocolate: jumpingKidsColors.nature.chocolate,
          lavender: jumpingKidsColors.nature.lavender,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: '#F48FB1',      // Rosa más claro para modo oscuro
          main: '#EC407A',       // Rosa principal ajustado
          dark: '#C2185B',       // Rosa más oscuro
        },
        secondary: {
          light: '#C8E6C9',      // Verde menta más claro
          main: '#66BB6A',       // Verde principal ajustado
          dark: '#388E3C',       // Verde más oscuro
        },
        success: {
          light: '#C8E6C9',
          main: '#66BB6A',       // Verde más suave para modo oscuro
          dark: '#388E3C',
        },
        warning: {
          light: '#FFCC02',
          main: '#FFAB91',       // Naranja coral suave
          dark: '#D84315',
        },
        error: {
          light: '#F48FB1',
          main: '#EC407A',       // Rosa ajustado para oscuro
          dark: '#C2185B',
        },
        info: {
          light: '#C8E6C9',
          main: '#81C784',       // Verde menta
          dark: '#388E3C',
        },
        background: {
          default: '#1A1625',    // Púrpura muy oscuro pero cálido
          paper: '#2A2438',      // Púrpura oscuro para cards
        },
        text: {
          primary: '#F5F5F5',    // Blanco suave
          secondary: '#B3B3B3',  // Gris claro para texto secundario
        },
        // 🎯 Colores de ejercicios ajustados para modo oscuro
        exerciseDifficulty: {
          beginner: '#A5D6A7',   // Verde menta más claro
          intermediate: '#FFAB91', // Naranja coral más claro
          advanced: '#F48FB1',   // Rosa más claro
        },
        exerciseCategory: {
          cardio: '#F48FB1',     // Rosa más claro
          strength: '#A1887F',   // Marrón más claro
          flexibility: '#DDA0DD', // Morado más claro
          core: '#8D6E63',       // Marrón ajustado
          balance: '#A5D6A7',    // Verde menta más claro
          fun: '#FFEE58',        // Amarillo más claro
        },
        // 🎨 Colores de la ilustración ajustados para modo oscuro
        dragonColors: {
          mintGreen: '#A5D6A7',
          limeGreen: '#AED581',
          cream: '#2A2438',      // Fondo oscuro en lugar de crema
          chocolate: '#A1887F',
          lavender: '#DDA0DD',
        },
      },
    },
  },

  // 📐 Breakpoints responsivos mejorados
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // 📏 Sistema de espaciado (usando el estándar 8px de Material Design)
  spacing: 8, // 1 unidad = 8px

  // 🎭 Formas y bordes - Más redondeados para look amigable infantil
  shape: {
    borderRadius: 16, // Bordes más redondeados para una sensación amigable
  },

  // ✍️ Tipografía optimizada para niños y legibilidad
  typography: {
    fontFamily: '"Inter", "Roboto", "Poppins", "Helvetica", "Arial", sans-serif',
    
    // Tamaños más grandes y pesos más suaves para mejor legibilidad infantil
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Sin mayúsculas automáticas (más amigable)
      fontWeight: 500,
      fontSize: '0.875rem',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },

  // 🎛️ Componentes personalizados con estilos adaptados
  components: {
    // 🎨 ThemeProvider global
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Scroll suave para mejor UX
          scrollBehavior: 'smooth',
        },
      },
    },

    // 📄 Cards con animaciones y estilos amigables
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 1.5, // 24px - súper redondeado
          boxShadow: theme.shadows[2],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Transición suave
          border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          '&:hover': {
            boxShadow: theme.shadows[8],
            transform: 'translateY(-4px)',
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
        }),
      },
    },

    // 🎨 Chips con colores vibrantes
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 0.75, // 12px
          fontWeight: 500,
          fontSize: '0.75rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }),
        colorPrimary: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
        }),
      },
    },

    // 🔘 Botones con estilos más amigables
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 20px',
          fontSize: '0.875rem',
          minHeight: 42, // Altura mínima para mejor accesibilidad táctil
          transition: 'all 0.2s ease-in-out',
        }),
        contained: ({ theme }) => ({
          boxShadow: theme.shadows[2],
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }),
        outlined: ({ theme }) => ({
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-1px)',
            boxShadow: theme.shadows[2],
          },
        }),
      },
    },

    // 📋 Paper con consistencia visual
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
        elevation1: ({ theme }) => ({
          boxShadow: theme.shadows[1],
        }),
      },
    },

    // 📱 TextField con mejor UX
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
            transition: 'all 0.2s ease-in-out',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        }),
      },
    },

    // 🎭 Modales con diseño mejorado
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 2, // 32px - súper redondeado
          margin: theme.spacing(2),
          maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        }),
      },
    },

    // 🔄 IconButton con mejor feedback
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
          },
        }),
      },
    },

    // 📊 LinearProgress con estilo personalizado
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          height: 8,
        }),
      },
    },
  },
});

// 🎯 Declaración de tipos personalizados para TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    exerciseDifficulty: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    exerciseCategory: {
      cardio: string;
      strength: string;
      flexibility: string;
      core: string;
      balance: string;
      fun: string;
    };
    dragonColors: {
      mintGreen: string;
      limeGreen: string;
      cream: string;
      chocolate: string;
      lavender: string;
    };
  }

  interface PaletteOptions {
    exerciseDifficulty?: {
      beginner?: string;
      intermediate?: string;
      advanced?: string;
    };
    exerciseCategory?: {
      cardio?: string;
      strength?: string;
      flexibility?: string;
      core?: string;
      balance?: string;
      fun?: string;
    };
    dragonColors?: {
      mintGreen?: string;
      limeGreen?: string;
      cream?: string;
      chocolate?: string;
      lavender?: string;
    };
  }
}

// 🛠️ Utilidades del tema para uso en componentes
export const themeUtils = {
  // 🎨 Obtener color de dificultad con fallback seguro
  getDifficultyColor: (difficulty: string, theme: typeof jumpingkidsTheme) => {
    const difficultyMap: Record<string, string> = {
      'Principiante': theme.palette.exerciseDifficulty.beginner,
      'Intermedio': theme.palette.exerciseDifficulty.intermediate,
      'Avanzado': theme.palette.exerciseDifficulty.advanced,
    };
    return difficultyMap[difficulty] || theme.palette.grey[500];
  },

  // 🏷️ Obtener color de categoría con mapeo completo
  getCategoryColor: (category: string, theme: typeof jumpingkidsTheme) => {
    const categoryMap: Record<string, string> = {
      'Cardio': theme.palette.exerciseCategory.cardio,
      'Fuerza': theme.palette.exerciseCategory.strength,
      'Flexibilidad': theme.palette.exerciseCategory.flexibility,
      'Cuerpo Completo': theme.palette.exerciseCategory.strength,
      'Core': theme.palette.exerciseCategory.core,
      'Piernas': theme.palette.exerciseCategory.strength,
      'Movilidad': theme.palette.exerciseCategory.flexibility,
      'Bienestar': theme.palette.exerciseCategory.fun,
      'Equilibrio': theme.palette.exerciseCategory.balance,
    };
    return categoryMap[category] || theme.palette.primary.main;
  },

  // 🌓 Verificar modo oscuro
  isDarkMode: (theme: typeof jumpingkidsTheme) => {
    return theme.palette.mode === 'dark';
  },

  // 🎨 Crear color con transparencia usando CSS variables
  createAlphaColor: (color: string, alpha: number) => {
    // Funciona con CSS variables de MUI v6
    return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
  },

  // 📏 Obtener espaciado responsivo
  getResponsiveSpacing: (theme: typeof jumpingkidsTheme, factor: number) => ({
    xs: theme.spacing(factor * 0.5),  // Reducido en móvil
    sm: theme.spacing(factor * 0.75), // Intermedio en tablet
    md: theme.spacing(factor),        // Normal en desktop
    lg: theme.spacing(factor * 1.25), // Aumentado en pantallas grandes
  }),

  // 🎭 Aplicar estilos según el modo (reemplaza theme.palette.mode checks)
  applyModeStyles: (theme: typeof jumpingkidsTheme, lightStyles: any, darkStyles: any) => {
    return {
      ...lightStyles,
      ...theme.applyStyles('dark', darkStyles),
    };
  },
};

// 🚀 Exportación por defecto del tema
export default jumpingkidsTheme;