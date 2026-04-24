import { cn } from '@/lib/utils';
import type { ValidationResult } from '@/lib/exercises/types';

export function ExerciseResults({ result }: { result: ValidationResult | null }) {
  if (!result) return null;
  return (
    <div
      role="status"
      className={cn(
        'rounded-md border p-3 text-sm',
        result.correct
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700'
          : 'border-destructive/40 bg-destructive/10 text-destructive',
      )}
    >
      {result.feedback ?? (result.correct ? 'Correcto' : 'Incorrecto')}
    </div>
  );
}
