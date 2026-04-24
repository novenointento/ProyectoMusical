import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Tu panel</h1>
      <p className="mt-2 text-muted-foreground">
        Bienvenido{session?.user?.name ? `, ${session.user.name}` : ''}. Aqui apareceran tus cursos
        y progreso cuando los implementemos en la Fase 4.
      </p>
    </main>
  );
}
