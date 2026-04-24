import { z } from 'zod';
import {
  noteRecognitionAnswerSchema,
  noteRecognitionConfigSchema,
  noteRecognitionInputSchema,
} from '@/lib/exercises/multipleChoice';

/**
 * Union discriminada de configs de ejercicio por `kind`. Permite validar
 * Exercise.config leido de la BD antes de entregarlo al registry.
 *
 * A medida que se registren nuevos tipos (dictation, noteWriting,
 * listenRepeat), se extiende esta union.
 */
export const exerciseConfigSchema = z.discriminatedUnion('kind', [
  noteRecognitionConfigSchema,
]);

export const exerciseInputSchema = z.discriminatedUnion('kind', [
  noteRecognitionInputSchema,
]);

export const exerciseAnswerSchema = z.union([noteRecognitionAnswerSchema]);

export type ExerciseConfig = z.infer<typeof exerciseConfigSchema>;
export type ExerciseInput = z.infer<typeof exerciseInputSchema>;
export type ExerciseAnswer = z.infer<typeof exerciseAnswerSchema>;
