// src/app/(dashboard)/layout.tsx
'use client';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayout>
      <PageContainer>
        {children}
      </PageContainer>
    </DashboardLayout>
  );
}