import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export async function Header() {
  const session = await auth();
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">
          Proyecto Musical
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Mi panel
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <Button type="submit" variant="ghost" size="sm">
                  Salir
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-muted-foreground hover:text-foreground">
                Entrar
              </Link>
              <Button asChild size="sm">
                <Link href="/sign-up">Registrarse</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
