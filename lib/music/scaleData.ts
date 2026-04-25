import { Scale, Note } from 'tonal';

export type ScaleMode = 'major' | 'minor';

export interface ScaleType {
  id: string;
  label: string;
  /** Grados (0-indexed sobre la escala natural) a alterar. */
  alterations: number[];
  /** Si las alteraciones suben o bajan un semitono. */
  alterationDirection: 'up' | 'down';
}

export const MAJOR_TYPES: ReadonlyArray<ScaleType> = [
  { id: 'natural',          label: 'Natural',          alterations: [],     alterationDirection: 'down' },
  { id: 'mixta-principal',  label: 'Mixta principal',  alterations: [5],    alterationDirection: 'down' },
  { id: 'mixta-secundaria', label: 'Mixta secundaria', alterations: [5, 6], alterationDirection: 'down' },
  { id: 'mixolidia',        label: 'Mixolidia',        alterations: [6],    alterationDirection: 'down' },
];

export const MINOR_TYPES: ReadonlyArray<ScaleType> = [
  { id: 'natural',  label: 'Natural',  alterations: [],     alterationDirection: 'up' },
  { id: 'armonica', label: 'Armónica', alterations: [6],    alterationDirection: 'up' },
  { id: 'melodica', label: 'Melódica', alterations: [5, 6], alterationDirection: 'up' },
  { id: 'dorica',   label: 'Dórica',   alterations: [5],    alterationDirection: 'up' },
];

export interface TonicOption {
  /** Nombre Tonal-compatible: 'C', 'F#', 'Bb', 'Cb'… */
  id: string;
  /** Nombre en solfeo español. */
  label: string;
  /** Si el tono tiene equivalencia enarmónica entre las opciones disponibles. */
  enharmonicId?: string;
}

// 15 tonalidades mayores (hasta 7# y 7b)
export const MAJOR_TONICS: ReadonlyArray<TonicOption> = [
  { id: 'C',  label: 'Do' },
  { id: 'C#', label: 'Do#', enharmonicId: 'Db' },
  { id: 'Db', label: 'Reb', enharmonicId: 'C#' },
  { id: 'D',  label: 'Re' },
  { id: 'Eb', label: 'Mib' },
  { id: 'E',  label: 'Mi' },
  { id: 'F',  label: 'Fa' },
  { id: 'F#', label: 'Fa#', enharmonicId: 'Gb' },
  { id: 'Gb', label: 'Solb', enharmonicId: 'F#' },
  { id: 'G',  label: 'Sol' },
  { id: 'Ab', label: 'Lab' },
  { id: 'A',  label: 'La' },
  { id: 'Bb', label: 'Sib' },
  { id: 'B',  label: 'Si',  enharmonicId: 'Cb' },
  { id: 'Cb', label: 'Dob', enharmonicId: 'B' },
];

// 15 tonalidades menores (hasta 7# y 7b)
export const MINOR_TONICS: ReadonlyArray<TonicOption> = [
  { id: 'C',  label: 'Do' },
  { id: 'C#', label: 'Do#' },
  { id: 'D',  label: 'Re' },
  { id: 'D#', label: 'Re#', enharmonicId: 'Eb' },
  { id: 'Eb', label: 'Mib', enharmonicId: 'D#' },
  { id: 'E',  label: 'Mi' },
  { id: 'F',  label: 'Fa' },
  { id: 'F#', label: 'Fa#' },
  { id: 'G',  label: 'Sol' },
  { id: 'G#', label: 'Sol#', enharmonicId: 'Ab' },
  { id: 'Ab', label: 'Lab',  enharmonicId: 'G#' },
  { id: 'A',  label: 'La' },
  { id: 'A#', label: 'La#', enharmonicId: 'Bb' },
  { id: 'Bb', label: 'Sib',  enharmonicId: 'A#' },
  { id: 'B',  label: 'Si' },
];

// --- Helpers de alteración ---

const ACCIDENTAL_RE = /^([A-G])(##|#|bb|b)?$/;

function lowerSemitone(note: string): string {
  const m = ACCIDENTAL_RE.exec(note);
  if (!m) return note;
  const [, letter, acc = ''] = m;
  if (acc === '##') return letter + '#';
  if (acc === '#')  return letter;
  if (acc === '')   return letter + 'b';
  if (acc === 'b')  return letter + 'bb';
  return note;
}

function raiseSemitone(note: string): string {
  const m = ACCIDENTAL_RE.exec(note);
  if (!m) return note;
  const [, letter, acc = ''] = m;
  if (acc === 'bb') return letter + 'b';
  if (acc === 'b')  return letter;
  if (acc === '')   return letter + '#';
  if (acc === '#')  return letter + '##';
  return note;
}

function assignOctaves(pitchClasses: string[], startOctave = 4): string[] {
  const result: string[] = [];
  let octave = startOctave;
  let lastMidi = -Infinity;

  for (let i = 0; i < pitchClasses.length; i++) {
    const pc = pitchClasses[i];
    let candidate = `${pc}${octave}`;
    let midi = Note.midi(candidate);

    if (i === 0) {
      if (midi === null) throw new Error(`Cannot get midi for ${candidate}`);
      result.push(candidate);
      lastMidi = midi;
      continue;
    }

    while (midi !== null && midi <= lastMidi) {
      octave++;
      candidate = `${pc}${octave}`;
      midi = Note.midi(candidate);
    }
    if (midi === null) throw new Error(`Cannot get midi for ${candidate}`);
    result.push(candidate);
    lastMidi = midi;
  }
  return result;
}

// --- Construcción y generación de ejercicios ---

export interface ScaleExercise {
  tonicId: string;
  tonicLabel: string;
  typeId: string;
  typeLabel: string;
  mode: ScaleMode;
  /** 8 notas ascendentes con octavas. */
  notes: string[];
}

export function buildScaleNotes(
  tonic: TonicOption,
  type: ScaleType,
  mode: ScaleMode,
): string[] {
  const baseScale = Scale.get(`${tonic.id} ${mode}`).notes;
  if (baseScale.length !== 7) {
    throw new Error(`Escala inválida: ${tonic.id} ${mode}`);
  }

  const altered = [...baseScale];
  for (const idx of type.alterations) {
    altered[idx] = type.alterationDirection === 'down'
      ? lowerSemitone(altered[idx])
      : raiseSemitone(altered[idx]);
  }

  // Cierra la octava con la tónica.
  const eight = [...altered, baseScale[0]];
  return assignOctaves(eight);
}

export function generateScaleExercise(mode: ScaleMode, prev?: ScaleExercise): ScaleExercise {
  const tonics = mode === 'major' ? MAJOR_TONICS : MINOR_TONICS;
  const types  = mode === 'major' ? MAJOR_TYPES  : MINOR_TYPES;

  for (let i = 0; i < 30; i++) {
    const tonic = tonics[Math.floor(Math.random() * tonics.length)];
    const type  = types[Math.floor(Math.random() * types.length)];

    let notes: string[];
    try {
      notes = buildScaleNotes(tonic, type, mode);
    } catch {
      continue;
    }

    if (prev && prev.tonicId === tonic.id && prev.typeId === type.id) continue;

    return {
      tonicId: tonic.id,
      tonicLabel: tonic.label,
      typeId: type.id,
      typeLabel: type.label,
      mode,
      notes,
    };
  }

  // Fallback determinista
  const t = tonics[0];
  const ty = types[0];
  return {
    tonicId: t.id,
    tonicLabel: t.label,
    typeId: ty.id,
    typeLabel: ty.label,
    mode,
    notes: buildScaleNotes(t, ty, mode),
  };
}

/** Considera enarmónicos: Fa# = Solb, Si = Dob, Re# = Mib, etc. */
export function isTonicMatch(
  candidateId: string,
  correctId: string,
  mode: ScaleMode,
): boolean {
  if (candidateId === correctId) return true;
  const tonics = mode === 'major' ? MAJOR_TONICS : MINOR_TONICS;
  const candidate = tonics.find((t) => t.id === candidateId);
  return candidate?.enharmonicId === correctId;
}

export function validateScaleAnswer(
  exercise: ScaleExercise,
  selectedTonicId: string,
  selectedTypeId: string,
): boolean {
  if (selectedTypeId !== exercise.typeId) return false;
  return isTonicMatch(selectedTonicId, exercise.tonicId, exercise.mode);
}
