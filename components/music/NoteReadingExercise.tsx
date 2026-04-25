'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { StaffRenderer } from './StaffRenderer';
import { naturalNotesInRange } from '@/lib/music/notes';
import { ALL_SOLFEGE_ES, pitchToNaturalSolfegeES } from '@/lib/music/solfege';

// Rangos pensados para conservatorio elemental.
const TREBLE_RANGE = { from: 'C4', to: 'G5' };
const BASS_RANGE = { from: 'E2', to: 'C4' };

interface Exercise {
  clef: 'treble' | 'bass';
  note: string;
  correct: string;
}

function newExercise(prev?: Exercise): Exercise {
  for (let i = 0; i < 6; i++) {
    const clef = Math.random() < 0.5 ? 'treble' : 'bass';
    const range = clef === 'treble' ? TREBLE_RANGE : BASS_RANGE;
    const notes = naturalNotesInRange(range.from, range.to);
    const note = notes[Math.floor(Math.random() * notes.length)];
    const correct = pitchToNaturalSolfegeES(note);
    if (!prev || prev.note !== note || prev.clef !== clef) {
      return { clef, note, correct };
    }
  }
  // Fallback (improbable): primera natural del rango opuesto.
  const fallbackClef: 'treble' | 'bass' = prev?.clef === 'treble' ? 'bass' : 'treble';
  const range = fallbackClef === 'treble' ? TREBLE_RANGE : BASS_RANGE;
  const notes = naturalNotesInRange(range.from, range.to);
  return { clef: fallbackClef, note: notes[0], correct: pitchToNaturalSolfegeES(notes[0]) };
}

export function NoteReadingExercise() {
  const [exercise, setExercise] = useState<Exercise>(() => newExercise());
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const synthRef = useRef<unknown>(null);

  async function playNote() {
    const Tone = await import('tone');
    await Tone.start();
    if (!synthRef.current) {
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.6 },
      }).toDestination();
    }
    (synthRef.current as { triggerAttackRelease: (n: string, d: string) => void })
      .triggerAttackRelease(exercise.note, '2n');
  }

  function handleAnswer(answer: string) {
    if (feedback) return;
    setSelected(answer);
    const isCorrect = answer === exercise.correct;
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
      {/* Barra superior: Volver + contadores */}
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
        ¿Qué nota es?
      </h1>
      <p className="mb-lg text-center font-lexend text-[12px] font-semibold uppercase tracking-[0.1em] text-ds-on-surface-variant">
        Pulsa el pentagrama para escuchar la nota
      </p>

      {/* Pentagrama clicable */}
      <div className="mb-xl flex justify-center">
        <button
          type="button"
          onClick={playNote}
          className="border border-ds-border bg-ds-surface-low p-lg transition-colors hover:bg-ds-primary-container/15"
          aria-label="Escuchar nota"
        >
          <StaffRenderer clef={exercise.clef} note={exercise.note} />
        </button>
      </div>

      {/* Botones de respuesta */}
      <div className="mb-md grid grid-cols-4 gap-md sm:grid-cols-7">
        {ALL_SOLFEGE_ES.map((solfege) => {
          const isAnswered = !!feedback;
          const isCorrectOpt = solfege === exercise.correct;
          const isUserPick = selected === solfege;

          let extra = '';
          if (isAnswered && isCorrectOpt) {
            extra = 'border-emerald-500 bg-emerald-100 text-emerald-900';
          } else if (isAnswered && isUserPick && !isCorrectOpt) {
            extra = 'border-red-500 bg-red-100 text-red-900';
          }

          return (
            <button
              key={solfege}
              type="button"
              onClick={() => handleAnswer(solfege)}
              disabled={isAnswered}
              className={`border border-ds-border bg-ds-surface-low p-md font-lexend text-[14px] font-medium uppercase tracking-[0.05em] text-ds-inverse-surface transition-colors hover:bg-ds-primary-container/20 disabled:cursor-not-allowed ${extra}`}
            >
              {solfege}
            </button>
          );
        })}
      </div>

      {/* Mensaje de retro-alimentación */}
      <div className="h-6 text-center font-lexend text-sm">
        {feedback === 'correct' && (
          <span className="text-emerald-700">¡Correcto!</span>
        )}
        {feedback === 'error' && (
          <span className="text-red-700">Era {exercise.correct}.</span>
        )}
      </div>
    </main>
  );
}
