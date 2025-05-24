// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirige al dashboard por defecto
  redirect('/worksouts');
}