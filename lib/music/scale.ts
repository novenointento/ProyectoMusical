import { Scale } from 'tonal';

/** Devuelve las notas (sin octava) de una escala. Ej: scaleNotes("C major"). */
export function scaleNotes(scaleName: string): string[] {
  return Scale.get(scaleName).notes;
}
