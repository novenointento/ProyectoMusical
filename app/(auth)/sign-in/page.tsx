import Link from 'next/link';
import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  async function handleSignIn(formData: FormData) {
    'use server';
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Iniciar sesion</h1>
      <form action={handleSignIn} className="flex flex-col gap-3">
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
