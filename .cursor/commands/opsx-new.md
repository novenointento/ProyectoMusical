---
name: /opsx-new
id: opsx-new
category: Workflow
description: Iniciar un cambio nuevo con el flujo experimental de artefactos (OPSX)
---

Inicia un cambio nuevo con enfoque basado en artefactos.

## Entrada
El argumento de `/opsx:new` puede ser nombre de cambio (kebab-case) o descripción de lo que se quiere construir.

## Pasos

1. Si no hay entrada, preguntar qué se quiere construir con `AskUserQuestion`.
2. Determinar esquema de workflow:
- Usar el esquema por defecto salvo petición explícita.
- Si el usuario pide ver workflows, ejecutar `openspec schemas --json` y dejar elegir.
3. Crear cambio:
```bash
openspec new change "<name>"
```
- Añadir `--schema <name>` solo si lo pidió.
4. Si hay archivos adjuntos, incorporarlos como contexto.
5. Confirmar creación mostrando ruta, esquema usado y siguiente paso recomendado (`/opsx:continue`).

## Guardrails
- No proceder sin entender qué se quiere construir.
- Mantener nombres de cambio claros y en kebab-case.
