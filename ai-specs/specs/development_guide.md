# Guia de desarrollo

Todos los comandos se ejecutan desde la raiz del repositorio (proyecto
Next.js unificado, sin subproyectos).

## 1. Requisitos

- Node.js 20+
- PostgreSQL (local con Docker o cloud en [Neon](https://neon.tech))

## 2. Setup inicial

```bash
cp .env.example .env.local        # completa DATABASE_URL y AUTH_SECRET
openssl rand -base64 32           # valor sugerido para AUTH_SECRET

# Base de datos local (opcional):
docker compose up -d

npm install
npm run prisma:migrate            # crea tablas
npm run prisma:seed               # siembra curso, tema, leccion, ejercicios, logros
```

## 3. Desarrollo diario

```bash
npm run dev                       # http://localhost:3000
npm run prisma:studio             # inspeccionar BD
```

## 4. Calidad

```bash
npm run typecheck
npm run lint
npm run format:check
npm test                          # Vitest (unit)
npm run test:e2e                  # Playwright (E2E)
```

## 5. Prisma workflow

```bash
# Tras editar prisma/schema.prisma:
npm run prisma:migrate -- --name <slug_descriptivo>
npm run prisma:generate
```

## 6. Despliegue

- Proyecto Vercel enlazado con el repo; cada PR crea preview.
- Variables de entorno productivas: `DATABASE_URL` (Neon, con
  `?sslmode=require`), `AUTH_SECRET`.
- Migraciones en produccion: `npm run prisma:deploy` como build step o via
  hook de despliegue.

## 7. Workflow recomendado

1. Abre un change OpenSpec (`openspec/changes/{slug}`).
2. Divide en tareas de < 2 horas en `tasks.md`.
3. Implementa siguiendo los estandares de [`backend-standards.mdc`](backend-standards.mdc)
   y [`frontend-standards.mdc`](frontend-standards.mdc).
4. Verifica con `typecheck`, `test`, `test:e2e` antes de cerrar la tarea.
5. Actualiza `data-model.md` y `api-spec.yml` si cambias el contrato.
6. `/opsx:verify` y luego `/opsx:archive`.
