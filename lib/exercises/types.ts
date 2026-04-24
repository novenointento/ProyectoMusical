import { z } from 'zod';

export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'NOTE_WRITING'
  | 'DICTATION'
  | 'LISTEN_REPEAT';

/**
 * Resultado de validar una respuesta frente al input presentado.
 * - `score` en [0, 100] permite parciales (util para dictados multi-nota).
 */
export interface ValidationResult {
  correct: boolean;
  score: number;
  feedback?: string;
  details?: unknown;
}

/**
 * Contrato estatico de un ejercicio. TConfig es lo que guarda la BD en
 * Exercise.config, TInput la instancia generada (determinista via seed)
 * y TAnswer la respuesta del usuario.
 */
export interface ExerciseDefinition<TConfig, TInput, TAnswer> {
  type: ExerciseType;
  kind: string;

  configSchema: z.ZodType<TConfig>;
  inputSchema: z.ZodType<TInput>;
  answerSchema: z.ZodType<TAnswer>;

  generate(config: TConfig, seed?: string): TInput;
  validate(input: TInput, answer: TAnswer): ValidationResult;
}
