import { Note } from 'tonal';

/**
 * Funciones puras sobre notas. Envolvemos Tonal.js para aislar
 * la superficie de API usada por el motor de ejercicios.
 */

/** MIDI number o null si es invalida. */
export function midi(scientific: string): number | null {
  return Note.midi(scientific);
}

/** Nombre cientifico simplificado ("C4") o null. */
export function name(scientific: string): string | null {
  const n = Note.get(scientific);
  return n.empty ? null : n.name;
}

/** Genera el listado ascendente de notas naturales entre from..to inclusive. */
export function naturalNotesInRange(from: string, to: string): string[] {
  const start = Note.midi(from);
  const end = Note.midi(to);
  if (start === null || end === null) {
    throw new Error(`Rango invalido: ${from}..${to}`);
  }
  if (end < start) throw new Error(`Rango invertido: ${from}..${to}`);

  const out: string[] = [];
  for (let m = start; m <= end; m++) {
    const n = Note.fromMidi(m);
    if (!n) continue;
    // Tonal devuelve, p.ej., "C4" o "C#4". Filtramos alteraciones.
    if (!/[#b]/.test(n)) out.push(n);
  }
  return out;
}
