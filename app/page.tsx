import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 p-8">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Conservatorio elemental
      </p>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Aprende lenguaje musical a tu ritmo.
      </h1>
      <p className="text-lg text-muted-foreground">
        Lecciones cortas, ejercicios de lectura, dictado y reconocimiento auditivo. Empieza por los
        fundamentos del pentagrama y la clave de sol.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/sign-up">Crear cuenta</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/sign-in">Iniciar sesion</Link>
        </Button>
      </div>
    </main>
  );
}
