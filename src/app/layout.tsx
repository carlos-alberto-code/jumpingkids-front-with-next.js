import ThemeRegistry from '@/components/ThemeRegistry';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import type { Navigation } from '@toolpad/core';
import { AppProvider } from '@toolpad/core';
import type { Metadata } from 'next';
import './globals.css';

// Navegación súper simple con 2 páginas
const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Inicio',
    icon: <HomeIcon />,
  },
  {
    segment: 'about',
    title: 'Acerca de',
    icon: <InfoIcon />,
  },
];

const BRANDING = {
  title: 'Mi App Básica',
};

export const metadata: Metadata = {
  title: 'Mi App Básica',
  description: 'Ejemplo básico de Toolpad Core',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
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