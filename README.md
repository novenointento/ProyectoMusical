# Proyecto Musical

Aplicacion web para estudiar **lenguaje musical** en el nivel de
**conservatorio elemental**. Combina teoria breve con ejercicios
interactivos (opcion multiple sobre pentagrama, dictado, escritura de
notas y escucha-repite) y mantiene progreso y logros por usuario.

## Stack

- **Next.js 15** (App Router) + **TypeScript** estricto
- **Tailwind CSS** + **shadcn/ui** + **lucide-react**
- **Zustand** (estado cliente) + **TanStack Query** (estado servidor)
- **Zod** (validacion y tipos compartidos)
- **Auth.js v5** (Credentials, JWT) + **PrismaAdapter**
- **Prisma** + **PostgreSQL** (Neon en produccion)
- **Tone.js** (audio), **Tonal.js** (teoria), **VexFlow** (pentagrama)
- **MDX** (`@next/mdx`) para el contenido teorico
- **Vitest** (unit) + **Playwright** (E2E)
- Hosting **Vercel**

## Estructura

```
.
|- app/                 Rutas Next.js (UI + API)
|  |- api/health        Health check
|  |- api/auth          Auth.js + /register
|  |- (auth)/           sign-in, sign-up
|  |- dashboard/
|  `- layout.tsx, page.tsx, globals.css
|- components/
|  |- ui/               Primitivos shadcn
|  |- music/            StaffRenderer, AudioPlayer, ExerciseContainer, ExerciseResults
|  |- layout/           Header
|  `- providers/        QueryProvider
|- content/             MDX (cursos y lecciones)
|- lib/
|  |- music/            Logica musical pura (Tonal.js)
|  |- exercises/        Contrato + implementaciones por `kind`
|  |- validation/       Unions Zod discriminadas
|  |- auth/             Utilidades de password
|  |- prisma.ts, utils.ts
|- prisma/              schema.prisma + seed.ts
|- types/               Extensiones de tipos (next-auth)
|- auth.ts, auth.config.ts, middleware.ts
|- openspec/            Artefactos OpenSpec (source of truth del trabajo)
|- ai-specs/specs/      Estandares y referencias para los agentes
`- docker-compose.yml   Postgres local (opcional)
```

## Primeros pasos

### 1. Requisitos

- Node.js 20+.
- PostgreSQL (opciones):
  - **Local**: `docker compose up -d` usa `docker-compose.yml`.
  - **Cloud**: una base de datos en [Neon](https://neon.tech).

### 2. Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```bash
cp .env.example .env.local
# Genera AUTH_SECRET:
openssl rand -base64 32
```

### 3. Instalar, migrar, sembrar

```bash
npm install
npm run prisma:migrate   # crea la BD y aplica la primera migracion
npm run prisma:seed      # inserta curso, tema, leccion, ejercicios y logros
```

### 4. Desarrollo

```bash
npm run dev              # http://localhost:3000
```

Rutas utiles:

- `/` - landing
- `/sign-up` y `/sign-in`
- `/dashboard` (protegida)
- `/api/health`

## Scripts

| Script | Proposito |
|---|---|
| `dev` | Next.js en modo desarrollo |
| `build` / `start` | Build y servidor de produccion |
| `lint` / `typecheck` / `format` | Calidad |
| `test` / `test:e2e` | Vitest y Playwright |
| `prisma:migrate` / `prisma:studio` / `prisma:seed` | Prisma workflow |

## Dominio y datos

Las entidades principales estan definidas en `prisma/schema.prisma`:

- **User** (Auth.js) + Account / Session / VerificationToken.
- **Course -> Topic -> Lesson** (metadata). El contenido teorico vive en
  `/content` como MDX, vinculado por `slug`.
- **Exercise** + **ExerciseAttempt** (config/input/answer como JSON, validados
  con Zod).
- **UserProgress** unico por (user, lesson).
- **Achievement** + **UserAchievement**.

Ver detalle en [`ai-specs/specs/data-model.md`](ai-specs/specs/data-model.md).

## Motor de ejercicios

Contrato en [`lib/exercises/types.ts`](lib/exercises/types.ts):

```ts
interface ExerciseDefinition<TConfig, TInput, TAnswer> {
  type: 'MULTIPLE_CHOICE' | 'NOTE_WRITING' | 'DICTATION' | 'LISTEN_REPEAT';
  kind: string;                          // identificador fino
  configSchema / inputSchema / answerSchema: ZodType<...>;
  generate(config, seed?): TInput;
  validate(input, answer): ValidationResult;
}
```

El MVP implementa `NoteRecognitionExercise` (opcion multiple con
pentagrama) en [`lib/exercises/multipleChoice.ts`](lib/exercises/multipleChoice.ts).
Dictado, escritura y escucha-repite son placeholders para fases
posteriores.

## OpenSpec

El trabajo se captura primero en `openspec/changes/{nombre}`. El change
activo es
[`migrate-to-nextjs-music-mvp`](openspec/changes/migrate-to-nextjs-music-mvp/proposal.md).

## Licencia

MIT, ver [LICENSE.md](LICENSE.md).
