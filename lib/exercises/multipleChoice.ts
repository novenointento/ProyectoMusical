import { z } from 'zod';
import { naturalNotesInRange } from '@/lib/music/notes';
import { ALL_SOLFEGE_ES, pitchToNaturalSolfegeES } from '@/lib/music/solfege';
import { createRng, pick, randomSeed, sampleWithout } from '@/lib/music/rng';
import type { ExerciseDefinition, ValidationResult } from './types';

// ----- Schemas Zod -----

export const noteRecognitionConfigSchema = z.object({
  kind: z.literal('NOTE_RECOGNITION'),
  clef: z.enum(['treble', 'bass']),
  noteRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
  optionCount: z.number().int().min(2).max(7).default(4),
});

export const noteRecognitionInputSchema = z.object({
  kind: z.literal('NOTE_RECOGNITION'),
  clef: z.enum(['treble', 'bass']),
  displayedNote: z.string(),
  options: z.array(z.string()).min(2),
  correctOption: z.string(),
  seed: z.string(),
});

export const noteRecognitionAnswerSchema = z.object({
  selected: z.string(),
});

export type NoteRecognitionConfig = z.infer<typeof noteRecognitionConfigSchema>;
export type NoteRecognitionInput = z.infer<typeof noteRecognitionInputSchema>;
export type NoteRecognitionAnswer = z.infer<typeof noteRecognitionAnswerSchema>;

// ----- Implementacion -----

/**
 * Ejercicio "reconocer la nota en el pentagrama".
 *
 * Conservatorio elemental / piano / clave de sol:
 * - Toma un rango de notas naturales (p.ej. C4..G4).
 * - Elige una al azar (reproducible via seed).
 * - Construye `optionCount` opciones en solfeo espanol, con la correcta
 *   incluida y el resto como distractores sin repetir.
 *
 * La instancia generada se guarda en ExerciseAttempt.input para
 * reconstruir exactamente lo que vio el usuario.
 */
export const noteRecognitionExercise: ExerciseDefinition<
  NoteRecognitionConfig,
  NoteRecognitionInput,
  NoteRecognitionAnswer
> = {
  type: 'MULTIPLE_CHOICE',
  kind: 'NOTE_RECOGNITION',

  configSchema: noteRecognitionConfigSchema,
  inputSchema: noteRecognitionInputSchema,
  answerSchema: noteRecognitionAnswerSchema,

  generate(config, seed = randomSeed()): NoteRecognitionInput {
    const rng = createRng(seed);
    const candidates = naturalNotesInRange(config.noteRange.from, config.noteRange.to);
    if (candidates.length === 0) {
      throw new Error(`Rango sin notas naturales: ${config.noteRange.from}..${config.noteRange.to}`);
    }

    const displayedNote = pick(candidates, rng);
    const correctOption = pitchToNaturalSolfegeES(displayedNote);

    const distractorPool = ALL_SOLFEGE_ES.filter((s) => s !== correctOption);
    const distractorCount = Math.max(0, config.optionCount - 1);
    const distractors = sampleWithout(distractorPool, distractorCount, rng);

    const options = sampleWithout([correctOption, ...distractors], config.optionCount, rng);

    return {
      kind: 'NOTE_RECOGNITION',
      clef: config.clef,
      displayedNote,
      options,
      correctOption,
      seed,
    };
  },

  validate(input, answer): ValidationResult {
    const correct = answer.selected === input.correctOption;
    return {
      correct,
      score: correct ? 100 : 0,
      feedback: correct
        ? 'Correcto!'
        : `La nota era ${input.correctOption}.`,
    };
  },
};
