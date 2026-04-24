# Tareas

Convencion: `[x]` hecho, `[ ]` pendiente. Cada casilla debe ser ejecutable en
menos de 2 horas. Las fases 1 y 2 son paralelizables tras completar la 0.

## Fase 0 - Setup (bloqueante)

- [x] Eliminar `backend/`, `frontend/` y `openspec/changes/template-project/`.
- [x] Crear `package.json` raiz con stack completo (Next 15, React 19, Prisma, Auth.js v5, Tailwind, Tone, Tonal, VexFlow, TanStack, Zustand, Zod, MDX).
- [x] Crear `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `prettier.config.mjs`, `components.json`.
- [x] Actualizar `.gitignore` para Next.js; crear `.env.example` con Neon + Auth.
- [x] Crear `prisma/schema.prisma` con User/Account/Session/VerificationToken + Course/Topic/Lesson/Exercise/ExerciseAttempt/UserProgress/Achievement/UserAchievement y enums.
- [x] Crear `prisma/seed.ts` con curso "Fundamentos", tema "Lectura clave de sol", leccion "Reconocer notas Do-Sol" + 5 ejercicios.
- [x] Crear `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/api/health/route.ts`.
- [x] Auth.js v5 esqueleto: `auth.config.ts`, `auth.ts`, `middleware.ts`, rutas `app/api/auth/[...nextauth]/route.ts` y `app/api/auth/register/route.ts`.
- [x] Paginas `(auth)/sign-in` y `(auth)/sign-up` minimas + server action `registerAction`.
- [x] `lib/prisma.ts`, `lib/auth/password.ts`, `lib/utils.ts` (cn shadcn).
- [x] `lib/music/{notes,scale,intervals,chords,solfege,rng}.ts`.
- [x] `lib/exercises/types.ts` con contrato `ExerciseDefinition`.
- [x] `lib/exercises/multipleChoice.ts` con `noteRecognitionExercise` completo.
- [x] `lib/exercises/{dictation,noteWriting,listenRepeat}.ts` como placeholders.
- [x] `lib/exercises/registry.ts` + `lib/validation/schemas.ts` con unions discriminadas Zod.
- [x] Componentes stub: `components/ui/button.tsx`, `components/music/{StaffRenderer,AudioPlayer,ExerciseContainer,ExerciseResults}.tsx`, `components/layout/Header.tsx`, `components/providers/query-provider.tsx`.
- [x] Contenido MDX inicial: `content/courses/fundamentos.mdx`, `content/lessons/fundamentos/lectura-clave-sol/reconocer-notas-do-sol.mdx`.
- [x] Reescribir `README.md`, `ai-specs/specs/*`, actualizar `openspec/config.yaml`.
- [ ] `npm install` y resolver conflictos de peers.
- [ ] Crear proyecto en **Vercel** y base de datos en **Neon** (manual). Guardar `DATABASE_URL` y `AUTH_SECRET` en `.env.local`.
- [ ] `npx prisma migrate dev --name init` y `npm run prisma:seed`.
- [ ] Verificar `npm run dev` → landing + `/api/health` responden.

## Fase 1 - Auth + navegacion base

- [ ] Mejorar formularios sign-in/sign-up con `useActionState` y mensajes de error.
- [ ] Anadir `components/layout/{Sidebar,Navigation}.tsx` en layout autenticado.
- [ ] E2E Playwright: flujo completo `signup → signin → dashboard → signout`.

## Fase 2 - Motor de musica (paralelizable con Fase 1)

- [ ] Tests unitarios Vitest para `lib/music/*` y `lib/exercises/multipleChoice.ts`.
- [ ] Implementar `dictationExercise` (secuencia de 2-4 notas).
- [ ] Implementar `noteWritingExercise` (posicionar cabeza de nota).
- [ ] Implementar `listenRepeatExercise` (teclado virtual Fase 3).

## Fase 3 - Componentes UI de ejercicios

- [ ] `StaffRenderer` real con VexFlow (dynamic import, ssr:false).
- [ ] `AudioPlayer` real con Tone.js + Sampler de piano.
- [ ] `ExerciseContainer` generico mapeando `type`/`kind` a renderer.

## Fase 4 - Contenido MDX y rutas de aprendizaje

- [ ] Loader MDX con frontmatter (gray-matter) que reconcilia con BD por slug.
- [ ] Ruta `app/learn/[courseSlug]/[topicSlug]/[lessonSlug]/page.tsx`.
- [ ] Dashboard muestra progreso real del usuario.

## Fase 5 - Progreso + logros

- [ ] Server action `recordAttempt(exerciseId, answer, seed)` atomico.
- [ ] Actualizacion incremental de `UserProgress.status` y `score`.
- [ ] Evaluador de criterios de logros; pagina `/achievements`.

## Fase 6 - Hardening + deploy

- [ ] Deploy preview en Vercel; env vars configuradas.
- [ ] E2E en preview; smoke tests manuales.
- [ ] Actualizacion final de docs.
