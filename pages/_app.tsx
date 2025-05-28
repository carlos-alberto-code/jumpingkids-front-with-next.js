// pages/_app.tsx
import { Box, CircularProgress } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import type { Authentication, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { PageContainer } from '@toolpad/core/PageContainer';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { AuthProvider, useAuthContext } from '../src/context/auth/AuthContext';
import { jumpingkidsTheme } from '../src/theme/theme';
import { useDynamicNavigation } from '../src/utils/navigation';

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

// Componente interno que usa el contexto de autenticación
function AppContent({ Component, pageProps }: AppProps) {
  const { session, signOut, loading } = useAuthContext();
  const dynamicNavigation = useDynamicNavigation(); // ← Nuevo

  // Configurar authentication object para Toolpad
  const authentication: Authentication = React.useMemo(() => ({
    signIn: () => {
      // Redirigir a página de login custom
      window.location.href = '/auth/login';
    },
    signOut: async () => {
      await signOut();
    }
  }), [signOut]);

  // Configurar session object para Toolpad
  const toolpadSession: Session | null = React.useMemo(() => {
    if (!session?.isAuthenticated) return null;

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.avatar || undefined
      }
    };
  }, [session]);

  // Loading spinner durante verificación de sesión
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <NextAppProvider
      navigation={dynamicNavigation} // ← Cambio del NAVIGATION estático
      branding={BRANDING}
      theme={jumpingkidsTheme}
      session={toolpadSession}
      authentication={authentication}
    >
      <DashboardLayout
        sidebarExpandedWidth={240}
      >
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </DashboardLayout>
    </NextAppProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <AppCacheProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Jumpingkids - Aplicación de Ejercicios</title>
        <meta name="description" content="Aplicación de ejercicios para mantenerte en forma" />
      </Head>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </AppCacheProvider>
  );
}