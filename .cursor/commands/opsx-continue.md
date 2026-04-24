---
name: /opsx-continue
id: opsx-continue
category: Workflow
description: Continuar un cambio creando el siguiente artefacto (Experimental)
---

Continúa un cambio OpenSpec creando el siguiente artefacto.

## Entrada
Opcionalmente después de `/opsx:continue`:
- ID de Jira (`SCRUM-123`)
- Nombre de cambio (`add-auth`)
- Nada (inferir por contexto)

Si hay ambigüedad, pedir selección.

## Pasos

1. **Resolver contexto**
- Si parece ticket Jira:
  - Obtén `cloudId` y issue vía MCP.
  - Extrae título/descr./criterios.
  - Deriva nombre kebab-case desde el título.
  - Busca cambio existente o pregunta si se crea uno nuevo.
- Si es nombre de cambio o vacío:
  - Lista cambios (`openspec list --json`) y pide selección si aplica.

2. **Revisar estado del cambio**
- `openspec status --change "<name>" --json`.
- Identifica esquema y artefactos ya completados.

3. **Generar siguiente artefacto**
- Usa lógica/instrucciones OpenSpec para crear el próximo artefacto pendiente.
- Usa el contexto de ticket y conversación.

4. **Mostrar resultado**
- Qué artefacto se creó o actualizó.
- Qué queda pendiente para continuar.

## Guardrails
- No asumir cambio si hay duda.
- Mantener consistencia entre artefactos previos y el nuevo.
