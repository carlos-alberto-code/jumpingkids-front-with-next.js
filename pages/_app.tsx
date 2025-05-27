// pages/_app.tsx
import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { Navigation } from '@toolpad/core/AppProvider';
import type { AppProps } from 'next/app';
import { jumpingkidsTheme } from '../src/theme/theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Entrenamiento',
  },
  {
    segment: 'exercise',
    title: 'Ejercicios',
    icon: <FitnessCenterIcon />,
  },
  {
    segment: 'routine',
    title: 'Rutinas',
    icon: <ListAltIcon />,
  },
  {
    segment: 'workout',
    title: 'Entrenamiento',
    icon: <DirectionsRunIcon />,
  },
];

// 🎨 Configuración del branding
const BRANDING = {
  title: 'Jumpingkids',
  logo: (
    <img 
      src="https://webstockreview.net/images/clipart-exercise-animated-gif-13.gif"
      alt="Jumpingkids Logo"
      style={{ 
        height: 50,
        width: 'auto'
      }} 
    />
  ),
};

export default function App({ Component, pageProps }: AppProps) {
  // 🔍 Debug del tema en desarrollo
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Theme applied:', jumpingkidsTheme);
      console.log('🌓 Color schemes:', (jumpingkidsTheme as any).colorSchemes);
      console.log('🔧 CSS Variables config:', (jumpingkidsTheme as any).cssVariables);
      
      // Verificar después de un momento si aparece el toggle
      setTimeout(() => {
        const toggleButton = document.querySelector('[aria-label*="toggle"]') || 
                            document.querySelector('[data-testid*="theme"]') ||
                            document.querySelector('button[title*="theme"]');
        
        if (toggleButton) {
          console.log('✅ Theme toggle found!', toggleButton);
        } else {
          console.warn('❌ Theme toggle not found. Check Toolpad Core version and theme config.');
        }
      }, 2000);
    }
  }, []);

  return (
    <AppCacheProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Jumpingkids - Aplicación de Ejercicios</title>
        <meta name="description" content="Aplicación de ejercicios para mantenerte en forma" />
      </Head>
      <NextAppProvider 
        navigation={NAVIGATION} 
        branding={BRANDING}
        theme={jumpingkidsTheme} // 🎨 Aplicar el tema personalizado
      >
        <DashboardLayout 
          sidebarExpandedWidth={240}
          // 🌓 El toggle debería aparecer automáticamente con colorSchemes definidos
        >
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </DashboardLayout>
      </NextAppProvider>
    </AppCacheProvider>
  );
}