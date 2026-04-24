// Traduccion letra -> solfeo espanol y utilidades de nombre.

export const LETTER_TO_SOLFEGE_ES = {
  C: 'Do',
  D: 'Re',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol',
  A: 'La',
  B: 'Si',
} as const;

export type NoteLetter = keyof typeof LETTER_TO_SOLFEGE_ES;
export type SolfegeES = (typeof LETTER_TO_SOLFEGE_ES)[NoteLetter];

export const ALL_SOLFEGE_ES: SolfegeES[] = Object.values(LETTER_TO_SOLFEGE_ES);

/** Convierte una nota cientifica ("C4", "F#5") a solfeo espanol ("Do", "Fa#"). */
export function pitchToSolfegeES(scientific: string): string {
  const match = /^([A-G])(#|b)?(-?\d+)$/.exec(scientific);
  if (!match) throw new Error(`Nota invalida: ${scientific}`);
  const [, letter, accidental] = match;
  return LETTER_TO_SOLFEGE_ES[letter as NoteLetter] + (accidental ?? '');
}

/** Extrae solo el nombre naturalizado (sin alteraciones) en solfeo espanol. */
export function pitchToNaturalSolfegeES(scientific: string): SolfegeES {
  const letter = scientific[0] as NoteLetter;
  if (!(letter in LETTER_TO_SOLFEGE_ES)) {
    throw new Error(`Nota invalida: ${scientific}`);
  }
  return LETTER_TO_SOLFEGE_ES[letter];
}
