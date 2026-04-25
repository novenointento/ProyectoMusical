import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signInAction } from './actions';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Iniciar sesion</h1>

      {error === 'invalid' && (
        <p className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Email o contraseña incorrectos.
        </p>
      )}

      <form action={signInAction} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Contrasena"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <Button type="submit">Entrar</Button>
      </form>

      <p className="text-sm text-muted-foreground">
        No tienes cuenta?{' '}
        <Link className="underline" href="/sign-up">
          Crear cuenta
        </Link>
      </p>
    </main>
  );
}
