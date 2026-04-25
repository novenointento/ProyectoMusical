import { auth, signOut } from '@/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-ds-border bg-ds-surface px-margin">
      <button
        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-ds-primary-container/20"
        aria-label="Menú"
      >
        <span className="material-symbols-outlined text-ds-inverse-surface">menu</span>
      </button>

      <span className="font-lexend text-lg font-light uppercase tracking-[0.2em] text-ds-inverse-surface">
        Proyecto Musical
      </span>

      <div className="flex items-center gap-sm">
        {session?.user && (
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-ds-primary-container/20"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <span className="material-symbols-outlined text-ds-inverse-surface">logout</span>
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
