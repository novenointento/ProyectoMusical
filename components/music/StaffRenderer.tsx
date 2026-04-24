'use client';

import { useEffect, useRef } from 'react';

export interface StaffRendererProps {
  clef: 'treble' | 'bass';
  /** Nota a dibujar en notacion cientifica, p.ej. "E4". */
  note: string;
  width?: number;
  height?: number;
}

/**
 * Placeholder de renderizado con VexFlow. La Fase 3 importa dinamicamente
 * vexflow (solo cliente) y dibuja una sola cabeza de nota en el compas.
 */
export function StaffRenderer({ clef, note, width = 220, height = 140 }: StaffRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO Fase 3: import('vexflow') y render sobre `ref.current`.
    // Mantenemos stub accesible para no bloquear el resto del flujo.
  }, [clef, note]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Pentagrama en clave ${clef === 'treble' ? 'de sol' : 'de fa'} con la nota ${note}`}
      className="flex items-center justify-center rounded-md border border-dashed border-muted-foreground/50 bg-muted/30 text-sm text-muted-foreground"
      style={{ width, height }}
    >
      {`[Pentagrama ${clef} - ${note}]`}
    </div>
  );
}
