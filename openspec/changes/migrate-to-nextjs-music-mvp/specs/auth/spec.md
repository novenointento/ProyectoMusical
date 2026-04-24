# Capability: Autenticacion

## Contexto

Usuarios se identifican con email + password (Credentials de Auth.js v5) y
mantienen una sesion JWT. Las tablas Account/Session/VerificationToken se
preparan ya en el schema para habilitar OAuth y verificacion de email en
fase 2 sin migracion destructiva.

## Requisitos

### Registro

- `POST /api/auth/register` (o server action `registerAction`):
  - Payload: `{ email, password, name? }`.
  - Validacion Zod: email valido, password >= 8 caracteres, name opcional <= 80.
  - Rechaza emails ya registrados con HTTP 409.
  - Hashea password con bcryptjs (saltRounds = 12) antes de persistir.
  - En server action: autoinicia sesion tras registro y redirige a `/dashboard`.

### Login

- Proveedor `Credentials` en `auth.ts`:
  - Busca `User` por email.
  - Compara `passwordHash` con bcrypt.
  - Devuelve `{ id, email, name, image }` al token JWT.

### Sesion

- Estrategia `jwt` (obligatorio por usar Credentials en v5).
- `session.user.id` disponible tras el callback; se extiende el tipo
  `Session` en `types/next-auth.d.ts`.

### Proteccion de rutas

- `middleware.ts` protege `/dashboard`, `/learn`, `/achievements`.
- Rutas no autorizadas redirigen a `/sign-in`.

### Logout

- Server action con `signOut({ redirectTo: '/' })`.

## Criterios de aceptacion

- Un usuario nuevo puede registrarse, queda autenticado y ve el dashboard.
- El mismo email no puede registrarse dos veces.
- Con credenciales validas puede volver a iniciar sesion tras cerrar.
- Acceder a `/dashboard` sin sesion redirige a `/sign-in`.
- El middleware se ejecuta en edge sin errores (no importa Prisma/bcrypt).
