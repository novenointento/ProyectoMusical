'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Note } from 'tonal';
import { IntervalStaffRenderer } from './IntervalStaffRenderer';

// Intervalos válidos en conservatorio elemental.
const INTERVALS: ReadonlyArray<{ id: string; label: string }> = [
  { id: '2m', label: '2ª menor' },
  { id: '2M', label: '2ª mayor' },
  { id: '3m', label: '3ª menor' },
  { id: '3M', label: '3ª mayor' },
  { id: '4P', label: '4ª justa' },
  { id: '5P', label: '5ª justa' },
  { id: '6m', label: '6ª menor' },
  { id: '6M', label: '6ª mayor' },
  { id: '7m', label: '7ª menor' },
  { id: '7M', label: '7ª mayor' },
  { id: '8P', label: '8ª justa' },
];

// Notas base naturales en una zona cómoda de la clave de sol.
const BASE_NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

// Limites para que la nota superior no se salga del pentagrama.
const MIN_MIDI = Note.midi('G3')!;
const MAX_MIDI = Note.midi('B5')!;

interface Exercise {
  lower: string;
  upper: string;
  intervalId: string;
  intervalLabel: string;
  direction: 'asc' | 'desc';
  /** Lo que se dibuja en el primer compás. */
  firstNote: string;
  /** Lo que se dibuja en el segundo compás. */
  secondNote: string;
}

function newExercise(prev?: Exercise): Exercise {
  for (let i = 0; i < 30; i++) {
    const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    const lower = BASE_NOTES[Math.floor(Math.random() * BASE_NOTES.length)];
    const upper = Note.transpose(lower, interval.id);
    if (!upper) continue;

    const upperMidi = Note.midi(upper);
    if (upperMidi === null || upperMidi < MIN_MIDI || upperMidi > MAX_MIDI) continue;

    // Evitamos enarmonías raras (Tonal a veces devuelve E#, B#, Cb, Fb…).
    if (/^[A-G][#b]?[A-G]/.test(upper)) continue;

    const direction: 'asc' | 'desc' = Math.random() < 0.5 ? 'asc' : 'desc';
    const candidate: Exercise = {
      lower,
      upper,
      intervalId: interval.id,
      intervalLabel: interval.label,
      direction,
      firstNote: direction === 'asc' ? lower : upper,
      secondNote: direction === 'asc' ? upper : lower,
    };

    if (prev && candidate.firstNote === prev.firstNote && candidate.secondNote === prev.secondNote) {
      continue;
    }
    return candidate;
  }

  // Fallback determinista en caso improbable.
  return {
    lower: 'C4',
    upper: 'E4',
    intervalId: '3M',
    intervalLabel: '3ª mayor',
    direction: 'asc',
    firstNote: 'C4',
    secondNote: 'E4',
  };
}

export function IntervalRecognitionExercise() {
  const [exercise, setExercise] = useState<Exercise>(() => newExercise());
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const synthRef = useRef<unknown>(null);

  async function playInterval() {
    const Tone = await import('tone');
    await Tone.start();
    if (!synthRef.current) {
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.6 },
      }).toDestination();
    }
    const synth = synthRef.current as {
      triggerAttackRelease: (n: string, d: string, t?: number) => void;
    };
    const now = Tone.now();
    synth.triggerAttackRelease(exercise.firstNote, '4n', now);
    synth.triggerAttackRelease(exercise.secondNote, '4n', now + 0.6);
  }

  function handleAnswer(intervalId: string) {
    if (feedback) return;
    setSelected(intervalId);
    const isCorrect = intervalId === exercise.intervalId;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setFeedback('correct');
    } else {
      setErrorCount((c) => c + 1);
      setFeedback('error');
    }
    setTimeout(() => {
      setExercise((prev) => newExercise(prev));
      setFeedback(null);
      setSelected(null);
    }, 1400);
  }

  return (
    <main className="mx-auto max-w-3xl px-margin pb-xl pt-24">
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
        ¿Qué intervalo es?
      </h1>
      <p className="mb-lg text-center font-lexend text-[12px] font-semibold uppercase tracking-[0.1em] text-ds-on-surface-variant">
        Pulsa el pentagrama para escuchar el intervalo
      </p>

      {/* Pentagrama clicable */}
      <div className="mb-xl flex justify-center">
        <button
          type="button"
          onClick={playInterval}
          className="border border-ds-border bg-ds-surface-low p-lg transition-colors hover:bg-ds-primary-container/15"
          aria-label="Escuchar intervalo"
        >
          <IntervalStaffRenderer firstNote={exercise.firstNote} secondNote={exercise.secondNote} />
        </button>
      </div>

      {/* Botones de respuesta */}
      <div className="mb-md grid grid-cols-2 gap-md sm:grid-cols-4">
        {INTERVALS.map((interval) => {
          const isAnswered = !!feedback;
          const isCorrectOpt = interval.id === exercise.intervalId;
          const isUserPick = selected === interval.id;

          let extra = '';
          if (isAnswered && isCorrectOpt) {
            extra = 'border-emerald-500 bg-emerald-100 text-emerald-900';
          } else if (isAnswered && isUserPick && !isCorrectOpt) {
            extra = 'border-red-500 bg-red-100 text-red-900';
          }

          return (
            <button
              key={interval.id}
              type="button"
              onClick={() => handleAnswer(interval.id)}
              disabled={isAnswered}
              className={`border border-ds-border bg-ds-surface-low p-md font-lexend text-[13px] font-medium uppercase tracking-[0.05em] text-ds-inverse-surface transition-colors hover:bg-ds-primary-container/20 disabled:cursor-not-allowed ${extra}`}
            >
              {interval.label}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <div className="h-6 text-center font-lexend text-sm">
        {feedback === 'correct' && <span className="text-emerald-700">¡Correcto!</span>}
        {feedback === 'error' && (
          <span className="text-red-700">Era {exercise.intervalLabel}.</span>
        )}
      </div>
    </main>
  );
}
