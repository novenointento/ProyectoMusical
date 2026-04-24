# Prompts de referencia

Ejemplos de prompts que encajan con el workflow OpenSpec + el dominio de
Proyecto Musical.

## Abrir un change nuevo

> Abre un change OpenSpec `add-dictation-exercise` para implementar el
> ejercicio de dictado (2-4 notas). Genera proposal, design, tasks y un
> spec en `specs/exercises/spec.md` (delta). Recuerda respetar el contrato
> `ExerciseDefinition` y extender la union discriminada Zod.

## Backend / servidor

> Implementa la server action `recordAttempt(exerciseId, answer, seed)`.
> Debe: autenticar con `auth()`, validar inputs con Zod, regenerar el
> input con `generate(config, seed)`, validar respuesta, persistir
> `ExerciseAttempt` y actualizar `UserProgress` dentro de una transaccion
> Prisma. Acompana con tests Vitest.

## Frontend / UI

> Conecta `ExerciseContainer` con server actions reales via TanStack
> Query mutations y muestra estados de carga/error en espanol. Respeta
> accesibilidad (`role="radiogroup"`, `role="status"`).

## Motor musical

> Anade `lib/music/intervals.ts: classifyInterval(from, to)` que devuelva
> la clasificacion (`m2`, `M3`, ...) con Tonal.js. Incluye tests unitarios
> Vitest con casos borde (mismo pitch, octava, tritono).
