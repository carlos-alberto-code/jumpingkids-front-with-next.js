// src/app/layout.tsx
import type { Metadata } from 'next';
import { AppProvider } from '@toolpad/core';
import type { Navigation } from '@toolpad/core';
import ThemeRegistry from '@/components/ThemeRegistry';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import './globals.css';

// Definición de la navegación
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Entrenamientos',
  },
  {
    segment: 'worksouts',
    title: 'Mis Ejercicios',
    icon: <FitnessCenterIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'progress',
    title: 'Mi Progreso',
    icon: <TrendingUpIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'Configuración',
    icon: <SettingsIcon />,
  },
];

// Información de la aplicación (branding)
const BRANDING = {
  title: 'Workout App',
};

export const metadata: Metadata = {
  title: 'Workout App',
  description: 'Aplicación de entrenamientos y ejercicios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      suppressHydrationWarning
      data-toolpad-color-scheme="light"
    >
      <body>
        <ThemeRegistry>
          <AppProvider 
            navigation={NAVIGATION}
            branding={BRANDING}
          >
            {children}
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}