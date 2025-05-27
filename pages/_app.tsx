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

// Configuración del branding
const BRANDING = {
  title: 'Jumpingkids',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
        <DashboardLayout 
          sidebarExpandedWidth={240}
        >
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </DashboardLayout>
      </NextAppProvider>
    </AppCacheProvider>
  );
}