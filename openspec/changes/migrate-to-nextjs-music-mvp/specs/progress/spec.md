# Capability: Progreso y logros

## Contexto

Cada intento de un usuario sobre un ejercicio se audita y alimenta dos
vistas: progreso por leccion (estado + puntuacion) y logros (hitos
acumulativos). Este capability depende de auth y del motor de ejercicios.

## Modelo

- `ExerciseAttempt`: append-only. Contiene `input` generado, `answer` del
  usuario, `correct`, `score`, `timeMs`, `createdAt`.
- `UserProgress` unico por `(userId, lessonId)`:
  - `status`: `NOT_STARTED | IN_PROGRESS | COMPLETED`.
  - `score`: mejor puntuacion acumulada.
  - `completedExercises`: contador.
  - `lastAttemptAt`, `completedAt`.
- `Achievement` + `UserAchievement`:
  - `Achievement.criteria: Json` con shape `{ type, count }`.
  - Tipos iniciales: `LESSONS_COMPLETED`, `CORRECT_STREAK`, `LESSON_PERFECT`.

## Requisitos

### Registro de intento

- Server action `recordAttempt(exerciseId, answer, seed)`:
  1. Valida auth; obtiene `userId`.
  2. Lee `Exercise` + valida `config` con Zod.
  3. Regenera `input` con `definition.generate(config, seed)`.
  4. Llama `definition.validate(input, answer)`.
  5. Persiste `ExerciseAttempt` (incluye `input` y `answer` serializados).
  6. Actualiza `UserProgress` (upsert): transitions
     `NOT_STARTED → IN_PROGRESS`; marca `COMPLETED` cuando todos los
     ejercicios de la leccion tienen al menos un intento correcto.
  7. Evalua criterios de logros; crea `UserAchievement` si procede.
- Todo lo anterior en una sola transaccion Prisma.

### Listado de progreso

- Dashboard consulta `UserProgress` del usuario con `lesson.topic.course`.

### Listado de logros

- Pagina `/achievements` lista `Achievement` + flag `unlocked`.

## Criterios de aceptacion

- Un usuario que responde correctamente al menos uno de los 5 ejercicios de
  la leccion MVP avanza a `IN_PROGRESS`.
- Completar los 5 correctamente marca `COMPLETED` y desbloquea
  `primera-leccion`.
- 5 respuestas correctas seguidas desbloquean `cinco-aciertos`.
- Completar la leccion con 100% desbloquea `primer-pleno`.
- No es posible desbloquear un logro dos veces (constraint unique).
