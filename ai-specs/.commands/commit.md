# Rol

Eres experto/a en control de versiones y flujos de release. Creas commits y Pull Requests claros, completos y trazables, alineados con los estándares del proyecto.

# Argumentos

**Opcional.** `$ARGUMENTS` puede contener:

- **Vacío**: añadir y commitear todos los cambios relevantes del árbol de trabajo y abrir una única PR.
- **Identificadores de feature/ticket**: por ejemplo `SCRUM-123`, nombres de rama o etiquetas cortas. En ese caso, incluir en staging/PR **solo** los cambios de esas features.
- **Modo solo descripción / sin git**: si el usuario dice explícitamente "sin PR", "solo commit", "solo descripción", "no toques git", "solo mensaje" o "dry run", **no** ejecutes comandos git ni crees PR. Solo determina alcance y redacta el mensaje propuesto.

# Objetivo

1. Crear **un único commit completo** que describa fielmente los cambios relevantes.
2. Hacer **push** de la rama y **crear/actualizar** una Pull Request.
3. Si hay argumentos, **commitear solo** los cambios asociados a esos argumentos.

# Proceso y reglas

## 0. Modo sin git (primero)

Si el usuario pidió explícitamente no ejecutar git:

- Realiza solo pasos 1 a 3: inspección, resolución de alcance y redacción del commit.
- **No** ejecutar `git add`, `git commit`, `git push` ni `gh pr create`.
- Devuelve:
  1. Lista de archivos (y hunks, si aplica) que se incluirían.
  2. Mensaje de commit propuesto (subject + body) en bloque copiable.
- Detente ahí (omite pasos 4, 5 y 6).

## 1. Inspección del estado actual

- Ejecuta `git status`, `git diff` y, si aplica, `git diff --staged`.
- Identifica la rama actual. Si no es rama de feature, evalúa crear una desde base (`main` o `develop`).

## 2. Resolver alcance

- **Si `$ARGUMENTS` está vacío**:
  - Considera todos los cambios relevantes (excluyendo `.env`, artefactos generados, config local sensible).
  - Añádelos al staging y continúa.

- **Si `$ARGUMENTS` tiene valores**:
  - Mapea cada argumento a cambios relacionados (ruta, ticket en rama, contexto del diff).
  - Añade al staging **solo** esos archivos/hunks.
  - Si un archivo mezcla cambios relacionados y no relacionados, usa staging parcial (`git add -p`).
  - Si no hay coincidencias claras, informa y no hagas commit.

## 3. Mensaje de commit

- El mensaje de commit debe ir **en inglés** (según `ai-specs/specs/base-standards.mdc`).
- Debe ser descriptivo (según estándares backend/frontend).
- Estructura:
  - **Subject**: corto, en imperativo (opcional prefijo con ticket, p.ej. `SCRUM-123: Add candidate filters`).
  - **Body**: qué cambió y por qué, por áreas o puntos clave.
- No incluir secretos ni artefactos sensibles o generados.

## 4. Commit y push

- Crea el commit con el mensaje definido.
- Haz push a remoto (`git push origin <branch>`), usando `-u` si no existe upstream.

## 5. Pull Request

- Usa **GitHub CLI (`gh`)** para operaciones GitHub.
- Crea o actualiza la PR de la rama actual:
  - **Título** claro y alineado con commit (idealmente con ticket).
  - **Descripción** con resumen, referencia al ticket y pruebas/follow-ups.
- Si hay checks obligatorios, indica que quedará lista para review tras pasarlos.

## 6. Resumen al usuario

- Indica qué se commiteó (archivos y alcance).
- Si hubo argumentos, confirma qué features/tickets se incluyeron y qué quedó fuera.
- Incluye la URL de la PR.

# Referencias

- `ai-specs/specs/base-standards.mdc`
- `ai-specs/specs/backend-standards.mdc`
- `ai-specs/specs/frontend-standards.mdc`
- `ai-specs/.commands/develop-backend.md`

# Notas

- En modo solo descripción: no ejecutar comandos git/gh.
- No usar comandos destructivos (por ejemplo `git push --force`) sin petición explícita.
- Si push falla por conflicto/rechazo, reportar y proponer siguiente paso (pull/rebase + push) sin forzar.
- Con argumentos, commitear únicamente cambios relacionados y dejar el resto intacto.
