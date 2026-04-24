import type { ExerciseDefinition } from './types';
import { noteRecognitionExercise } from './multipleChoice';

/**
 * Registro central de ejercicios por `kind`. El consumidor (API /
 * server action) lee Exercise.config.kind y resuelve aqui el contrato.
 *
 * Cuando se implementen dictation/noteWriting/listenRepeat, se anaden
 * entradas adicionales a este mapa.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exerciseRegistry: Record<string, ExerciseDefinition<any, any, any>> = {
  NOTE_RECOGNITION: noteRecognitionExercise,
};

export function getExerciseByKind(kind: string) {
  const def = exerciseRegistry[kind];
  if (!def) throw new Error(`Exercise kind no registrado: ${kind}`);
  return def;
}
