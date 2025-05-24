// src/app/layout.tsx
import type { Metadata } from 'next';
import { NextAppProvider } from '@toolpad/core/nextjs';
import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Workout App',
  description: 'Aplicación de entrenamientos y ejercicios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          <NextAppProvider>
            {children}
          </NextAppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}