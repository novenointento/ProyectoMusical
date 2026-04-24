---
name: /opsx-apply
id: opsx-apply
category: Workflow
description: Implementar tareas de un cambio OpenSpec (Experimental)
---

Implementa las tareas de un cambio OpenSpec.

**Entrada**: puedes indicar nombre de cambio (por ejemplo `/opsx:apply add-auth`). Si no se indica, intenta inferirlo por contexto; si hay ambigüedad, debes pedir selección.

## Pasos

1. **Seleccionar cambio**
- Si se indicó nombre, úsalo.
- Si no, infiere por contexto o selecciona automáticamente solo si hay un único cambio activo.
- Si es ambiguo, ejecuta `openspec list --json` y usa `AskUserQuestion` para elegir.
- Anuncia siempre: `Using change: <name>` y cómo sobrescribirlo.

2. **Revisar estado y esquema**
```bash
openspec status --change "<name>" --json
```
- Identifica `schemaName` y el artefacto que contiene tareas.

3. **Obtener instrucciones de aplicación**
```bash
openspec instructions apply --change "<name>" --json
```
- Usa rutas en `contextFiles`, progreso, lista de tareas e instrucción dinámica.
- Si estado es `blocked`, informar y sugerir `/opsx:continue`.
- Si estado es `all_done`, felicitar y sugerir archivado.

4. **Leer archivos de contexto**
- Lee los archivos listados en `contextFiles` (proposal, specs, design, tasks u otros según esquema).

5. **Mostrar progreso actual**
- Esquema activo.
- Progreso `N/M`.
- Resumen de tareas pendientes.
- Instrucción dinámica del CLI.

6. **Implementar tareas (loop)**
- Para cada tarea pendiente:
  - Indica la tarea en curso.
  - Implementa cambios de forma mínima y enfocada.
  - Marca tarea completada en `tasks.md` (`- [ ]` → `- [x]`).
- Pausa si hay bloqueo, ambigüedad, issue de diseño o interrupción del usuario.

7. **Cerrar sesión de trabajo**
- Reporta tareas completadas y progreso total.
- Si está todo completado, sugerir archivo.
- Si queda en pausa, explicar motivo.

## Guardrails
- Leer `contextFiles` antes de implementar.
- No adivinar requisitos ambiguos.
- Mantener cambios mínimos y acotados.
- Marcar tareas al completar.
