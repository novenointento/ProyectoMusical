import { Chord } from 'tonal';

/** Devuelve las notas del acorde dado. Ej: chordNotes("Cmaj7"). */
export function chordNotes(symbol: string): string[] {
  return Chord.get(symbol).notes;
}
