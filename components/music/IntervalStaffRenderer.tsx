'use client';

import { useEffect, useRef } from 'react';

export interface IntervalStaffRendererProps {
  /** Nota del primer tiempo en notación científica, p.ej. "E4". */
  firstNote: string;
  /** Nota del segundo tiempo. */
  secondNote: string;
  width?: number;
  height?: number;
}

interface ParsedNote {
  letter: string;
  accidental: '' | '#' | 'b';
  octave: string;
}

function parseNote(scientific: string): ParsedNote {
  const match = /^([A-G])(#|b)?(-?\d+)$/.exec(scientific);
  if (!match) throw new Error(`Nota inválida: ${scientific}`);
  return {
    letter: match[1].toLowerCase(),
    accidental: (match[2] ?? '') as '' | '#' | 'b',
    octave: match[3],
  };
}

function toVexFlowKey({ letter, accidental, octave }: ParsedNote): string {
  return `${letter}${accidental}/${octave}`;
}

/**
 * Renderiza un único compás en clave de Sol con dos redondas consecutivas
 * y doble barra final.
 */
export function IntervalStaffRenderer({
  firstNote,
  secondNote,
  width = 340,
  height = 160,
}: IntervalStaffRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Barline } = await import('vexflow');
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = '';

      const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
      renderer.resize(width, height);
      const context = renderer.getContext();

      const stave = new Stave(10, 30, width - 20);
      stave.addClef('treble');
      stave.setEndBarType(Barline.type.END);
      stave.setContext(context).draw();

      const parsed1 = parseNote(firstNote);
      const parsed2 = parseNote(secondNote);

      const note1 = new StaveNote({
        clef: 'treble',
        keys: [toVexFlowKey(parsed1)],
        duration: 'w',
      });
      if (parsed1.accidental) {
        note1.addModifier(new Accidental(parsed1.accidental), 0);
      }

      const note2 = new StaveNote({
        clef: 'treble',
        keys: [toVexFlowKey(parsed2)],
        duration: 'w',
      });
      if (parsed2.accidental) {
        note2.addModifier(new Accidental(parsed2.accidental), 0);
      }

      // Dos redondas = 8 tiempos (2 × 4), sin validación de compás estándar.
      const voice = new Voice({ num_beats: 8, beat_value: 4 });
      voice.addTickables([note1, note2]);

      new Formatter().joinVoices([voice]).format([voice], width - 80);
      voice.draw(context, stave);
    })();

    return () => {
      cancelled = true;
    };
  }, [firstNote, secondNote, width, height]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Pentagrama en clave de sol con las notas ${firstNote} y ${secondNote}`}
      style={{ width, height }}
    />
  );
}
