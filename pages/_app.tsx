import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import type { Navigation } from '@toolpad/core/AppProvider';
import type { AppProps } from 'next/app';

// Definir la navegación - aquí agregamos nuestras dos páginas
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Páginas principales',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'about',
    title: 'Acerca de',
    icon: <InfoIcon />,
  },
];

// Configuración del branding
const BRANDING = {
  title: 'Mi App con Toolpad',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
        <DashboardLayout>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </DashboardLayout>
      </NextAppProvider>
    </AppCacheProvider>
  );
}