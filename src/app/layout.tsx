// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { Navigation } from '@toolpad/core/AppProvider';

const inter = Inter({ subsets: ['latin'] });

// Configuración de navegación
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: 'Menu Principal',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Pedidos',
    icon: <ShoppingCartIcon />,
  },

  {
    segment: 'reports',
    title: 'Reportes',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Ventas',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Tráfico',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integraciones',
    icon: <LayersIcon />,
  },
];

// Configuración de branding
const BRANDING = {
  title: 'Jumpingkids',
};

export const metadata: Metadata = {
  title: 'Jumpingkids App',
  description: 'Aplicación creada con Next.js, Material UI y Toolpad Core',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
          >
            {children}
          </NextAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}