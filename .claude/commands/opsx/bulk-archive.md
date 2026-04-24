---
name: /opsx-bulk-archive
id: opsx-bulk-archive
category: Workflow
description: Archivar múltiples cambios completados en una sola operación
---

Archiva varios cambios de forma masiva.

## Pasos

1. Obtener cambios activos con `openspec list --json`.
2. Pedir selección múltiple con `AskUserQuestion` (incluye opción "All changes").
3. Validar cada cambio seleccionado:
- Estado de artefactos con `openspec status --change "<name>" --json`.
- Estado de tareas en `tasks.md` (`- [ ]` vs `- [x]`).
4. Mostrar resumen por cambio con advertencias.
5. Pedir confirmación final para archivado masivo.
6. Ejecutar archivado de todos los confirmados.
7. Reportar resultados (éxitos/fallos por cambio).

## Guardrails
- No auto-seleccionar cambios.
- Confirmación explícita antes de ejecutar.
- Si un cambio falla, continuar con el resto y reportar detalle.
