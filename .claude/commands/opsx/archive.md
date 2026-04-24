---
name: /opsx-archive
id: opsx-archive
category: Workflow
description: Archivar un cambio completado en el flujo experimental
---

Archiva un cambio completado.

**Entrada**: nombre opcional después de `/opsx:archive`.

## Pasos

1. **Seleccionar cambio (si no viene nombre)**
- Ejecuta `openspec list --json`.
- Usa `AskUserQuestion` para elegir (solo cambios activos).
- No adivinar ni auto-seleccionar.

2. **Verificar estado de artefactos**
- Ejecuta `openspec status --change "<name>" --json`.
- Si algún artefacto no está `done`, advertir y pedir confirmación.

3. **Verificar tareas**
- Revisa `tasks.md` si existe.
- Si hay tareas incompletas (`- [ ]`), advertir y pedir confirmación.

4. **Evaluar sincronización de delta specs**
- Si existen `openspec/changes/<name>/specs/`, comparar contra `openspec/specs/<capability>/spec.md`.
- Mostrar resumen de cambios detectados.
- Ofrecer opciones: sincronizar ahora (recomendado) o archivar sin sincronizar.

5. **Archivar**
- Ejecutar el archivado según flujo de OpenSpec.

6. **Resumen**
- Reportar estado final y qué decisiones se tomaron (sync/no sync, advertencias confirmadas).

## Guardrails
- No archivar a ciegas si hay incompletos sin confirmación explícita.
- Mostrar claramente riesgos de archivar sin sincronizar.
