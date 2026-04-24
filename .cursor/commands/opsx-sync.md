---
name: /opsx-sync
id: opsx-sync
category: Workflow
description: Sincronizar delta specs de un cambio con las specs principales
---

Sincroniza las delta specs de un cambio hacia las specs principales.

Esta es una operación **guiada por agente**: lees las delta specs y editas directamente las specs base para aplicar cambios con merge inteligente.

**Entrada**: nombre opcional de cambio tras `/opsx:sync` (por ejemplo `/opsx:sync add-auth`). Si no se indica, intenta inferir por contexto; si hay ambigüedad, debes pedir selección.

## Pasos

1. **Seleccionar cambio**
- Si no hay nombre, ejecutar `openspec list --json` y usar `AskUserQuestion`.
- Mostrar solo cambios con delta specs (`specs/`).
- No adivinar ni auto-seleccionar.

2. **Encontrar delta specs**
- Buscar en `openspec/changes/<name>/specs/*/spec.md`.
- Secciones esperadas:
  - `## ADDED Requisitos`
  - `## MODIFIED Requisitos`
  - `## REMOVED Requisitos`
  - `## RENAMED Requisitos`
- Si no hay delta specs, informar y detener.

3. **Aplicar cambios por capability**
Para cada delta spec:
- Leer intención de cambio.
- Abrir spec principal correspondiente en `openspec/specs/<capability>/spec.md`.
- Aplicar cambios:
  - ADDED: añadir requerimientos/escenarios faltantes.
  - MODIFIED: actualizar solo los fragmentos necesarios.
  - REMOVED: eliminar requerimientos indicados.
  - RENAMED: renombrar manteniendo contenido.

4. **Validar consistencia**
- Comprobar que estructura y formato de specs quedan válidos.
- Revisar que no se dupliquen ni pierdan escenarios por error.

5. **Resumen final**
- Mostrar qué archivos de specs se tocaron.
- Resumen por tipo de cambio (added/modified/removed/renamed).
- Sugerir siguiente paso (por ejemplo `/opsx:archive`).

## Guardrails
- No copiar/pegar a ciegas el delta completo.
- Hacer merge semántico y mínimo.
- Preservar formato y convenciones de OpenSpec.
