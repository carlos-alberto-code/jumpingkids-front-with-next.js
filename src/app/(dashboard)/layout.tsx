// src/app/(dashboard)/layout.tsx
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}