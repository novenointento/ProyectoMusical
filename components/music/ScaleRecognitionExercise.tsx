'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Note } from 'tonal';
import { ScaleStaffRenderer } from './ScaleStaffRenderer';
import {
  MAJOR_TONICS,
  MINOR_TONICS,
  MAJOR_TYPES,
  MINOR_TYPES,
  generateScaleExercise,
  isTonicMatch,
  validateScaleAnswer,
  type ScaleExercise,
  type ScaleMode,
} from '@/lib/music/scaleData';

export interface ScaleRecognitionExerciseProps {
  mode: ScaleMode;
}

export function ScaleRecognitionExercise({ mode }: ScaleRecognitionExerciseProps) {
  const tonics = mode === 'major' ? MAJOR_TONICS : MINOR_TONICS;
  const types = mode === 'major' ? MAJOR_TYPES : MINOR_TYPES;

  const [exercise, setExercise] = useState<ScaleExercise>(() => generateScaleExercise(mode));
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null);
  const [selectedTonic, setSelectedTonic] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const synthRef = useRef<unknown>(null);

  async function playScale() {
    const Tone = await import('tone');
    await Tone.start();
    if (!synthRef.current) {
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 },
      }).toDestination();
    }
    const synth = synthRef.current as {
      triggerAttackRelease: (n: string, d: string, t?: number) => void;
    };
    const now = Tone.now();
    exercise.notes.forEach((note, i) => {
      // Convertimos por MIDI para que Tone reproduzca dobles alteraciones (Bbb, F##…).
      const midi = Note.midi(note);
      const playable = midi !== null ? Note.fromMidi(midi) : note;
      synth.triggerAttackRelease(playable, '8n', now + i * 0.35);
    });
  }

  function handleCheck() {
    if (feedback || !selectedTonic || !selectedType) return;
    const ok = validateScaleAnswer(exercise, selectedTonic, selectedType);
    if (ok) {
      setCorrectCount((c) => c + 1);
      setFeedback('correct');
    } else {
      setErrorCount((c) => c + 1);
      setFeedback('error');
    }
    setTimeout(() => {
      setExercise((prev) => generateScaleExercise(mode, prev));
      setFeedback(null);
      setSelectedTonic(null);
      setSelectedType(null);
    }, 1700);
  }

  const heading = mode === 'major' ? '¿Qué escala mayor es?' : '¿Qué escala menor es?';
  const canCheck = !!selectedTonic && !!selectedType && !feedback;

  return (
    <main className="mx-auto max-w-4xl px-margin pb-xl pt-24">
      {/* Barra superior */}
      <div className="mb-lg flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-xs font-lexend text-[12px] font-semibold uppercase tracking-[0.1em] text-ds-on-surface-variant transition-colors hover:text-ds-inverse-surface"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver
        </Link>

        <div className="flex items-center gap-md font-lexend text-[14px] font-medium tracking-[0.05em]">
          <span className="flex items-center gap-xs text-emerald-700">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            {correctCount}
          </span>
          <span className="flex items-center gap-xs text-red-700">
            <span className="material-symbols-outlined text-[18px]">cancel</span>
            {errorCount}
          </span>
        </div>
      </div>

      {/* Encabezado */}
      <h1 className="mb-xs text-center font-lexend text-[20px] font-medium uppercase tracking-wide text-ds-inverse-surface">
        {heading}
      </h1>
      <p className="mb-lg text-center font-lexend text-[12px] font-semibold uppercase tracking-[0.1em] text-ds-on-surface-variant">
        Pulsa el pentagrama para escuchar la escala
      </p>

      {/* Pentagrama */}
      <div className="mb-xl flex justify-center overflow-x-auto">
        <button
          type="button"
          onClick={playScale}
          className="border border-ds-border bg-ds-surface-low p-lg transition-colors hover:bg-ds-primary-container/15"
          aria-label="Escuchar escala"
        >
          <ScaleStaffRenderer notes={exercise.notes} />
        </button>
      </div>

      {/* Botones de tónica */}
      <div className="mb-lg">
        <h3 className="mb-sm font-lexend text-[11px] font-semibold uppercase tracking-[0.15em] text-ds-on-surface-variant">
          Tónica
        </h3>
        <div className="grid grid-cols-3 gap-sm sm:grid-cols-5">
          {tonics.map((tonic) => {
            const isSelected = selectedTonic === tonic.id;
            const isAnswered = !!feedback;
            const isCorrectChoice = isTonicMatch(tonic.id, exercise.tonicId, exercise.mode);

            let extra = 'border-ds-border bg-ds-surface-low text-ds-inverse-surface hover:bg-ds-primary-container/20';
            if (!isAnswered && isSelected) {
              extra = 'border-ds-primary bg-ds-primary-container text-ds-inverse-surface';
            } else if (isAnswered && isCorrectChoice) {
              extra = 'border-emerald-500 bg-emerald-100 text-emerald-900';
            } else if (isAnswered && isSelected && !isCorrectChoice) {
              extra = 'border-red-500 bg-red-100 text-red-900';
            }

            return (
              <button
                key={tonic.id}
                type="button"
                onClick={() => !isAnswered && setSelectedTonic(tonic.id)}
                disabled={isAnswered}
                className={`border p-sm font-lexend text-[13px] font-medium uppercase tracking-[0.05em] transition-colors disabled:cursor-not-allowed ${extra}`}
              >
                {tonic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botones de tipo */}
      <div className="mb-lg">
        <h3 className="mb-sm font-lexend text-[11px] font-semibold uppercase tracking-[0.15em] text-ds-on-surface-variant">
          Tipo
        </h3>
        <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
          {types.map((type) => {
            const isSelected = selectedType === type.id;
            const isAnswered = !!feedback;
            const isCorrectChoice = type.id === exercise.typeId;

            let extra = 'border-ds-border bg-ds-surface-low text-ds-inverse-surface hover:bg-ds-primary-container/20';
            if (!isAnswered && isSelected) {
              extra = 'border-ds-primary bg-ds-primary-container text-ds-inverse-surface';
            } else if (isAnswered && isCorrectChoice) {
              extra = 'border-emerald-500 bg-emerald-100 text-emerald-900';
            } else if (isAnswered && isSelected && !isCorrectChoice) {
              extra = 'border-red-500 bg-red-100 text-red-900';
            }

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => !isAnswered && setSelectedType(type.id)}
                disabled={isAnswered}
                className={`border p-md font-lexend text-[13px] font-medium uppercase tracking-[0.05em] transition-colors disabled:cursor-not-allowed ${extra}`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón Comprobar */}
      <div className="mb-md flex justify-center">
        <button
          type="button"
          onClick={handleCheck}
          disabled={!canCheck}
          className="border border-ds-primary bg-ds-primary px-lg py-md font-lexend text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Comprobar
        </button>
      </div>

      {/* Feedback */}
      <div className="h-6 text-center font-lexend text-sm">
        {feedback === 'correct' && <span className="text-emerald-700">¡Correcto!</span>}
        {feedback === 'error' && (
          <span className="text-red-700">
            Era {exercise.tonicLabel} {mode === 'major' ? 'mayor' : 'menor'} {exercise.typeLabel.toLowerCase()}.
          </span>
        )}
      </div>
    </main>
  );
}
