# Capability: Motor de ejercicios

## Contexto

Cuatro tipos de ejercicio comparten un contrato comun que permite cargar,
generar, validar y persistir intentos de forma uniforme. El MVP implementa
**reconocimiento de notas** (`kind = NOTE_RECOGNITION`) sobre el tipo
`MULTIPLE_CHOICE`; dictado, escritura y escucha-repite quedan registrados
como placeholders para las siguientes fases.

## Contrato base

`lib/exercises/types.ts` expone:

```ts
interface ExerciseDefinition<TConfig, TInput, TAnswer> {
  type: 'MULTIPLE_CHOICE' | 'NOTE_WRITING' | 'DICTATION' | 'LISTEN_REPEAT';
  kind: string;                          // identificador fino
  configSchema: ZodType<TConfig>;
  inputSchema:  ZodType<TInput>;
  answerSchema: ZodType<TAnswer>;
  generate(config, seed?): TInput;
  validate(input, answer): ValidationResult;
}
```

## Requisitos

### Registro

- `lib/exercises/registry.ts` expone `exerciseRegistry: Record<kind, def>` y
  `getExerciseByKind(kind)`.
- Al anadir un tipo nuevo, basta con registrar la definicion.

### Validacion de payloads

- `lib/validation/schemas.ts` expone unions Zod discriminadas por `kind` para
  `config`, `input` y `answer`. Todo payload leido de BD o recibido de
  cliente pasa primero por estos schemas.

### NoteRecognitionExercise

- `kind = NOTE_RECOGNITION`, `type = MULTIPLE_CHOICE`.
- Config:
  - `clef`: `"treble" | "bass"`.
  - `noteRange`: `{ from: string; to: string }` en notacion cientifica.
  - `optionCount`: entero 2-7 (default 4).
- `generate(config, seed)`:
  - Usa `naturalNotesInRange` para obtener las candidatas.
  - Elige una con RNG determinista sembrado por `seed`.
  - Construye `options` en solfeo espanol (correcta + distractores unicos,
    todos mezclados con RNG).
  - Devuelve `{ clef, displayedNote, options, correctOption, seed }`.
- `validate(input, answer)`:
  - `correct = answer.selected === input.correctOption`.
  - `score = correct ? 100 : 0`.
  - `feedback` localizado en espanol.

## Criterios de aceptacion

- Dado `seed="abc"` y la misma config, `generate` devuelve el mismo `input`
  byte a byte.
- `validate` es pura: no efectos laterales, no I/O.
- El registry permite resolver `NOTE_RECOGNITION` → definicion.
- Los schemas Zod rechazan configs/inputs/answers invalidos antes de llegar
  a la logica de negocio.
