'use client';

import { useEffect, useRef } from 'react';

interface ParsedNote {
  letter: string;
  accidental: '' | '#' | '##' | 'b' | 'bb';
  octave: string;
}

function parseNote(scientific: string): ParsedNote {
  const match = /^([A-G])(##|#|bb|b)?(-?\d+)$/.exec(scientific);
  if (!match) throw new Error(`Nota inválida: ${scientific}`);
  return {
    letter: match[1].toLowerCase(),
    accidental: (match[2] ?? '') as '' | '#' | '##' | 'b' | 'bb',
    octave: match[3],
  };
}

function toVexFlowKey({ letter, accidental, octave }: ParsedNote): string {
  return `${letter}${accidental}/${octave}`;
}

export interface ScaleStaffRendererProps {
  /** 8 notas ascendentes en notación científica. */
  notes: string[];
  width?: number;
  height?: number;
}

/**
 * Pentagrama en clave de sol con N negras consecutivas y alteraciones
 * (incluidas dobles) renderizadas en cada cabeza de nota.
 */
export function ScaleStaffRenderer({ notes, width = 540, height = 170 }: ScaleStaffRendererProps) {
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

      const staveNotes = notes.map((note) => {
        const parsed = parseNote(note);
        const sn = new StaveNote({
          clef: 'treble',
          keys: [toVexFlowKey(parsed)],
          duration: 'w',
        });
        if (parsed.accidental) {
          sn.addModifier(new Accidental(parsed.accidental), 0);
        }
        return sn;
      });

      const voice = new Voice({ num_beats: notes.length * 4, beat_value: 4 });
      voice.addTickables(staveNotes);

      new Formatter().joinVoices([voice]).format([voice], width - 80);
      voice.draw(context, stave);
    })();

    return () => {
      cancelled = true;
    };
  }, [notes, width, height]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Escala en clave de sol: ${notes.join(', ')}`}
      style={{ width, height }}
    />
  );
}
