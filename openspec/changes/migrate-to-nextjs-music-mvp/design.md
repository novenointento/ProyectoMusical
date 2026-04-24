# Diseno - Migracion a Next.js + MVP musical

## Stack final

| Area | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, RSC, server actions) |
| Lenguaje | TypeScript estricto |
| UI | Tailwind CSS + shadcn/ui (new-york) + lucide-react |
| Estado cliente | Zustand |
| Datos servidor | TanStack Query |
| Validacion | Zod |
| Auth | Auth.js v5 + PrismaAdapter (sesion JWT, Credentials) |
| BD | Postgres (Neon) via Prisma |
| Audio | Tone.js (cliente) |
| Teoria musical | Tonal.js (isomorfico, usado server + client) |
| Pentagrama | VexFlow (cliente, dynamic import) |
| Contenido | MDX (`@next/mdx`) con gray-matter para frontmatter |
| Tests | Vitest (unit) + Playwright (E2E) |
| Hosting | Vercel |

## Arquitectura por capas

```
app/                      Rutas Next.js (UI + API)
  api/...                 Endpoints REST (alternativa a server actions)
  (auth)/                 Paginas de sign-in y sign-up
  dashboard/              Panel del usuario autenticado
  learn/[...slug]         Lecciones dinamicas con MDX + ejercicios

components/
  ui/                     Primitivos shadcn (button, label, ...)
  music/                  StaffRenderer, AudioPlayer, ExerciseContainer
  layout/                 Header, Sidebar, Navigation
  providers/              QueryProvider y cualquier provider futuro

content/                  MDX del contenido teorico (fuente de verdad)
  courses/{slug}.mdx
  lessons/{course}/{topic}/{lesson}.mdx

lib/
  music/                  Puro, testeable sin DOM. Usa Tonal.js.
  exercises/              Contrato + implementaciones por `kind`.
  validation/             Unions Zod discriminadas por `kind`.
  auth/                   Utilidades de password.
  prisma.ts               Singleton PrismaClient.

prisma/
  schema.prisma           Dominio completo
  seed.ts                 Siembra curso/tema/leccion/ejercicios iniciales

types/
  next-auth.d.ts          Extiende Session.user con `id`.

auth.config.ts            Configuracion edge-safe (middleware).
auth.ts                   Instancia completa con Prisma + bcrypt.
middleware.ts             Proteccion de rutas.
```

## Contrato de ejercicios

```ts
interface ExerciseDefinition<TConfig, TInput, TAnswer> {
  type: ExerciseType;          // MULTIPLE_CHOICE | NOTE_WRITING | DICTATION | LISTEN_REPEAT
  kind: string;                // identificador fino (ej. NOTE_RECOGNITION)
  configSchema: ZodType<TConfig>;
  inputSchema:  ZodType<TInput>;
  answerSchema: ZodType<TAnswer>;
  generate(config, seed?): TInput;
  validate(input, answer): ValidationResult;
}
```

- `config` vive en la BD, inmutable hasta que el autor cambia el ejercicio.
- `input` es la instancia que ve el usuario (derivada con RNG por `seed`).
- Guardar `input + answer` en `ExerciseAttempt` permite reproducir cualquier
  intento para auditar o para mostrar correcciones.

## Flujo de un intento

1. Usuario abre una leccion → server lee `Exercise` de la BD y valida
   `config` con Zod.
2. Server llama `definition.generate(config, newSeed)` y devuelve `input` al
   cliente.
3. Cliente renderiza `input` via `ExerciseContainer`.
4. Usuario responde; server action recibe `answer`, ejecuta
   `definition.validate(input, answer)`, persiste `ExerciseAttempt` y
   actualiza `UserProgress`.
5. Evalua criterios de logros; crea `UserAchievement` si procede.

## Seguridad

- `Credentials` con bcryptjs (12 salt rounds).
- Sesion **JWT** (obligatorio con Credentials en v5). `AUTH_SECRET` requerido.
- Middleware protege `/dashboard`, `/learn`, `/achievements`.
- Validacion Zod en toda server action y API.

## Decisiones tecnicas clave

- **Un solo proyecto Next.js** (no monorepo). Menos friccion para Auth.js y
  Vercel.
- **Config de ejercicio como JSON + Zod**, no tablas polimorficas. Mas flexible
  y mas simple.
- **JWT en MVP, tablas Account/Session preparadas** para OAuth en fase 2 sin
  migracion destructiva.
- **RNG determinista por seed** para reproducibilidad de intentos.

## No objetivos

- Web MIDI, OAuth, i18n, editor de contenido admin: fase 2+.
