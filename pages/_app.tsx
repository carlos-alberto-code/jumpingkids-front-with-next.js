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
import AuthDebug from '../src/components/auth/AuthDebug';
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
  const { session, signOut, loading, isAuthenticated } = useAuthContext();
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

  // ✅ Redirección automática mejorada
  React.useEffect(() => {
    console.log('🔄 Verificando redirección:', {
      loading,
      isAuthenticated,
      isAuthRoute,
      pathname: router.pathname
    });

    if (!loading && !isAuthenticated && !isAuthRoute) {
      console.log('🚪 Redirigiendo a login...');
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router, isAuthRoute]);

  // Loading spinner durante verificación de sesión
  if (loading) {
    console.log('⏳ Mostrando loading...');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Box sx={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            🏃‍♀️ Jumpingkids
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            Verificando sesión...
          </div>
        </Box>
      </Box>
    );
  }

  // Para rutas de autenticación, renderizar sin layout de Toolpad
  if (isAuthRoute) {
    console.log('🔓 Renderizando página de auth sin layout');
    return (
      <>
        <Component {...pageProps} />
        <AuthDebug />
      </>
    );
  }

  // Si no hay sesión y no estamos en ruta de auth, mostrar loading
  if (!isAuthenticated) {
    console.log('❌ No autenticado, mostrando loading...');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <div>Redirigiendo al login...</div>
      </Box>
    );
  }

  // ✅ Renderizar con layout de Toolpad para usuarios autenticados
  console.log('✅ Usuario autenticado, renderizando con layout');
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
      
      {/* 🔍 Debug component */}
      <AuthDebug />
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