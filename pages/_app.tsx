// pages/_app.tsx
import { Box, CircularProgress } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import type { Authentication, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { PageContainer } from '@toolpad/core/PageContainer';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { AuthProvider, useAuthContext } from '../src/context/auth/AuthContext';
import { useUserTheme } from '../src/hooks/auth/useUserTheme';
import { useDynamicNavigation } from '../src/utils/navigation';

// 🎨 Configuración del branding
const BRANDING = {
  title: 'Jumpingkids',
  logo: (
    <img
      src="https://webstockreview.net/images/clipart-exercise-animated-gif-13.gif"
      alt="Jumpingkids Logo"
      style={{
        height: 40,
        width: 'auto'
      }}
    />
  ),
};

// Lista de rutas que no requieren el layout de Toolpad
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/verify'];

// Componente interno que usa el contexto de autenticación
function AppContent({ Component, pageProps }: AppProps) {
  const { session, signOut, loading } = useAuthContext();
  const router = useRouter();
  const dynamicNavigation = useDynamicNavigation();
  const userTheme = useUserTheme(); // ← Tema dinámico según usuario

  // Verificar si estamos en una ruta de autenticación
  const isAuthRoute = AUTH_ROUTES.includes(router.pathname);

  // Configurar authentication object para Toolpad
  const authentication: Authentication = React.useMemo(() => ({
    signIn: () => {
      // Redirigir a página de login custom
      router.push('/auth/login');
    },
    signOut: async () => {
      await signOut();
      router.push('/auth/login');
    }
  }), [signOut, router]);

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

  // Redirección automática para usuarios no autenticados (excepto rutas de auth)
  React.useEffect(() => {
    if (!loading && !session?.isAuthenticated && !isAuthRoute) {
      router.push('/auth/login');
    }
  }, [loading, session?.isAuthenticated, router, isAuthRoute]);

  // Loading spinner durante verificación de sesión
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Para rutas de autenticación, renderizar sin layout de Toolpad
  if (isAuthRoute) {
    return <Component {...pageProps} />;
  }

  // Si no hay sesión y no estamos en ruta de auth, mostrar loading
  if (!session?.isAuthenticated) {
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

  // Renderizar con layout de Toolpad para usuarios autenticados
  return (
    <NextAppProvider
      navigation={dynamicNavigation}
      branding={BRANDING}
      theme={userTheme} // ← Usar tema dinámico
      session={toolpadSession}
      authentication={authentication}
    >
      <DashboardLayout
        sidebarExpandedWidth={280}
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
        <meta name="description" content="Aplicación de ejercicios personalizada para niños" />
      </Head>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </AppCacheProvider>
  );
}