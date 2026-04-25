import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Proyecto Musical',
  description:
    'Aplicacion de estudio de lenguaje musical (conservatorio elemental). Aprende teoria, lectura y oido con ejercicios interactivos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={lexend.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
