import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { registerAction } from './actions';

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <form action={registerAction} className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
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
          placeholder="Contrasena (minimo 8 caracteres)"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <Button type="submit">Registrarme</Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Ya tienes cuenta?{' '}
        <Link className="underline" href="/sign-in">
          Iniciar sesion
        </Link>
      </p>
    </main>
  );
}
