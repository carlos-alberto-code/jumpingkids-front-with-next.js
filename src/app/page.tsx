// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirigir automáticamente al dashboard
  redirect('/dashboard');
}