// src/app/(dashboard)/layout.tsx
'use client';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import type { Navigation } from '@toolpad/core';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';

// Definición de la navegación
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Entrenamientos',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <AssignmentIcon />,
  },
  {
    segment: 'workouts', // Aquí irá tu pantalla de ejercicios
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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayout navigation={NAVIGATION} branding={BRANDING}>
      <PageContainer>
        {children}
      </PageContainer>
    </DashboardLayout>
  );
}