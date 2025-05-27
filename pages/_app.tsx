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

const BRANDING = {
  title: 'JumpingKids',
  logo: (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2780/2780119.png"
      alt="Jumpingkids Logo"
      style={{
        height: 28,
        width: "auto",
        marginRight: 8,
        verticalAlign: 'middle',
        display: 'inline-block',
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.28s',
        cursor: 'pointer',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.15) rotate(4deg)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
      onMouseEnter={(e) => {
        e.currentTarget.style.animation = 'shake 2.5s ease-in-out infinite';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animation = 'none';
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
    />
  ),
};

export default function App({ Component, pageProps }: AppProps) {
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
        theme={jumpingkidsTheme}
      >
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