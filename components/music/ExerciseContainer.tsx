'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StaffRenderer } from './StaffRenderer';
import { ExerciseResults } from './ExerciseResults';
import type { NoteRecognitionInput } from '@/lib/exercises/multipleChoice';
import type { ValidationResult } from '@/lib/exercises/types';

export interface NoteRecognitionContainerProps {
  input: NoteRecognitionInput;
  onSubmit: (selected: string) => Promise<ValidationResult> | ValidationResult;
}

/**
 * Orquestador minimo para el ejercicio "reconocer nota".
 * Fase 3 anadira un patron generico por tipo de ejercicio.
 */
export function NoteRecognitionContainer({ input, onSubmit }: NoteRecognitionContainerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    try {
      const r = await onSubmit(selected);
      setResult(r);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <StaffRenderer clef={input.clef} note={input.displayedNote} />
      <div role="radiogroup" aria-label="Opciones" className="flex flex-wrap gap-2">
        {input.options.map((option) => (
          <Button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected === option}
            variant={selected === option ? 'default' : 'outline'}
            onClick={() => setSelected(option)}
            disabled={submitting || !!result}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleSubmit} disabled={!selected || !!result || submitting}>
          Comprobar
        </Button>
      </div>
      <ExerciseResults result={result} />
    </section>
  );
}
