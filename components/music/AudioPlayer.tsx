'use client';

import { Button } from '@/components/ui/button';

export interface AudioPlayerProps {
  /** Nota a reproducir, p.ej. "E4". */
  note: string;
  /** Duracion en segundos. */
  durationSec?: number;
}

/**
 * Placeholder del reproductor con Tone.js. La Fase 3 importa dinamicamente
 * `tone` e instancia un PolySynth + Sampler de piano para reproducir `note`.
 */
export function AudioPlayer({ note, durationSec = 1 }: AudioPlayerProps) {
  async function play() {
    // TODO Fase 3: import Tone, Tone.start(), synth.triggerAttackRelease(note, durationSec)
    console.log(`[AudioPlayer stub] playing ${note} for ${durationSec}s`);
  }

  return (
    <Button type="button" variant="secondary" onClick={play}>
      Escuchar {note}
    </Button>
  );
}
