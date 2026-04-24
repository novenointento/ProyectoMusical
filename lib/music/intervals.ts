import { Interval, Note } from 'tonal';

/** Distancia interválica entre dos notas cientificas. Ej: between("C4","E4") -> "3M". */
export function between(from: string, to: string): string {
  return Interval.distance(from, to);
}

/** Semitonos entre dos notas. */
export function semitonesBetween(from: string, to: string): number | null {
  const a = Note.midi(from);
  const b = Note.midi(to);
  if (a === null || b === null) return null;
  return b - a;
}
