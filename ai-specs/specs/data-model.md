# Modelo de datos

La fuente canonica es [`prisma/schema.prisma`](../../prisma/schema.prisma).
Este documento describe el **intento** y las **relaciones** de alto nivel.

## Identidad (Auth.js v5)

- `User` - cuenta con `email` unico y `passwordHash` (bcrypt) para el
  proveedor Credentials. `name`, `image` y `emailVerified` son opcionales.
- `Account`, `Session`, `VerificationToken` - se mantienen listas para
  habilitar OAuth y verificacion de email en fase 2 sin migracion
  destructiva, aunque en MVP se usa sesion JWT.

## Contenido (metadata - el contenido teorico vive en `/content/*.mdx`)

- `Course` - identificado por `slug` unico. Tiene `level`
  (`ELEMENTARY`/`INTERMEDIATE`/`ADVANCED`) y `published`.
- `Topic` - agrupador dentro de un curso. Unicidad por `(courseId, slug)`.
- `Lesson` - unidad de aprendizaje. Unicidad por `(topicId, slug)`.
  Tiene `difficulty` por leccion (`BEGINNER`/`EASY`/`MEDIUM`/`HARD`).

La union con los archivos MDX se hace por slug:

- `content/courses/{course.slug}.mdx`
- `content/lessons/{course.slug}/{topic.slug}/{lesson.slug}.mdx`

## Ejercicios y auditoria

- `Exercise` - pertenece a una leccion. `type` es uno de
  `MULTIPLE_CHOICE | NOTE_WRITING | DICTATION | LISTEN_REPEAT`.
  `config` es `Json` validado por Zod segun el `kind` embebido.
- `ExerciseAttempt` - append-only. Guarda `input` generado (incluyendo
  `seed`) y `answer` del usuario, junto a `correct`, `score` (0-100) y
  `timeMs`. Permite reproducir cualquier intento.

## Progreso

- `UserProgress` - unico por `(userId, lessonId)`. `status` transita
  `NOT_STARTED -> IN_PROGRESS -> COMPLETED`. `score` registra la mejor
  puntuacion acumulada.

## Logros

- `Achievement` - definicion con `criteria: Json` (shape
  `{ type, count }`). Tipos iniciales: `LESSONS_COMPLETED`,
  `CORRECT_STREAK`, `LESSON_PERFECT`.
- `UserAchievement` - relacion unica `(userId, achievementId)`.

## Relaciones

```
User 1---N Account
User 1---N Session
User 1---N UserProgress N---1 Lesson N---1 Topic N---1 Course
User 1---N ExerciseAttempt N---1 Exercise N---1 Lesson
User 1---N UserAchievement N---1 Achievement
```

## Enums

| Enum | Valores |
|---|---|
| `Level` | ELEMENTARY, INTERMEDIATE, ADVANCED |
| `Difficulty` | BEGINNER, EASY, MEDIUM, HARD |
| `ExerciseType` | MULTIPLE_CHOICE, NOTE_WRITING, DICTATION, LISTEN_REPEAT |
| `ProgressStatus` | NOT_STARTED, IN_PROGRESS, COMPLETED |
