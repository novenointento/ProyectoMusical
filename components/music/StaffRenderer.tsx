'use client';

import { useEffect, useRef } from 'react';

export interface StaffRendererProps {
  clef: 'treble' | 'bass';
  /** Nota a dibujar en notacion cientifica, p.ej. "E4". */
  note: string;
  width?: number;
  height?: number;
}

/** Convierte "C4" → "c/4", "F#5" → "f#/5". */
function toVexFlowKey(scientific: string): string {
  const match = /^([A-G])(#|b)?(-?\d+)$/.exec(scientific);
  if (!match) throw new Error(`Nota invalida: ${scientific}`);
  const [, letter, accidental, octave] = match;
  return `${letter.toLowerCase()}${accidental ?? ''}/${octave}`;
}

/**
 * Renderiza un pentagrama con una nota negra en la clave indicada usando
 * VexFlow. Carga la libreria dinamicamente porque depende de `document`.
 */
export function StaffRenderer({ clef, note, width = 280, height = 160 }: StaffRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      const { Renderer, Stave, StaveNote, Voice, Formatter, Barline } = await import('vexflow');
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = '';

      const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
      renderer.resize(width, height);
      const context = renderer.getContext();

      const stave = new Stave(10, 30, width - 20);
      stave.addClef(clef === 'treble' ? 'treble' : 'bass');
      stave.setEndBarType(Barline.type.END);
      stave.setContext(context).draw();

      const staveNote = new StaveNote({
        clef: clef === 'treble' ? 'treble' : 'bass',
        keys: [toVexFlowKey(note)],
        duration: 'w',
      });

      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables([staveNote]);

      new Formatter().joinVoices([voice]).format([voice], width - 80);
      voice.draw(context, stave);
    })();

    return () => {
      cancelled = true;
    };
  }, [clef, note, width, height]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Pentagrama en clave ${clef === 'treble' ? 'de sol' : 'de fa'} con la nota ${note}`}
      style={{ width, height }}
    />
  );
}
