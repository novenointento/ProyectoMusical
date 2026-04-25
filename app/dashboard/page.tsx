import Link from 'next/link';
import { auth } from '@/auth';

const sections: Array<{
  title: string;
  icon: string;
  href: string | null;
}> = [
  { title: 'TEORÍA',                                   icon: 'menu_book',    href: null },
  { title: 'LECTURA\nCLAVE SOL Y FA',                 icon: 'music_note',   href: '/learn/lectura-notas' },
  { title: 'INTERVALOS',                               icon: 'straighten',   href: '/learn/intervalos' },
  { title: 'ESCALAS\nMAYORES',                         icon: 'trending_up',  href: '/learn/escalas-mayores' },
  { title: 'ESCALAS\nMENORES',                         icon: 'trending_down',href: '/learn/escalas-menores' },
  { title: 'TONALIDADES',                              icon: 'key',          href: null },
  { title: 'ACORDES',                                  icon: 'library_music',href: null },
];

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-5xl px-margin pb-xl pt-24">

      {/* Cabecera de sección */}
      <div className="mb-lg flex items-center justify-between">
        <h2 className="font-lexend text-[20px] font-medium uppercase tracking-wide text-ds-inverse-surface">
          Biblioteca académica
        </h2>
        {session?.user?.name && (
          <span className="font-lexend text-[12px] font-semibold uppercase tracking-[0.1em] text-ds-on-surface-variant">
            {session.user.name}
          </span>
        )}
      </div>

      {/* Separador tipo pentagrama */}
      <div className="mb-lg space-y-1 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="stave-line" />
        ))}
      </div>

      {/* Grid de secciones */}
      <div className="grid grid-cols-2 gap-md sm:grid-cols-3 lg:grid-cols-4">
        {sections.map((section) => {
          const cardClasses =
            'flex flex-col items-center justify-center gap-md border border-ds-border bg-ds-surface-low p-lg text-center transition-colors';
          const interactive = section.href
            ? 'cursor-pointer hover:bg-ds-primary-container/10'
            : 'cursor-not-allowed opacity-60';

          const inner = (
            <>
              <span className="material-symbols-outlined text-4xl text-ds-primary">
                {section.icon}
              </span>
              <h3 className="whitespace-pre-line font-lexend text-[12px] font-semibold uppercase leading-tight tracking-[0.1em] text-ds-inverse-surface">
                {section.title}
              </h3>
            </>
          );

          if (section.href) {
            return (
              <Link
                key={section.title}
                href={section.href as never}
                className={`${cardClasses} ${interactive}`}
              >
                {inner}
              </Link>
            );
          }

          return (
            <div key={section.title} className={`${cardClasses} ${interactive}`} aria-disabled>
              {inner}
            </div>
          );
        })}
      </div>
    </main>
  );
}
