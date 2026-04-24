---
name: /opsx-ff
id: opsx-ff
category: Workflow
description: Crear un cambio y generar todos los artefactos necesarios de una vez
---

Fast-forward de artefactos: genera todo lo necesario para empezar implementación.

## Entrada
Argumento de `/opsx:ff` puede ser:
- Ticket Jira (`SCRUM-123`)
- Nombre de cambio en kebab-case
- Descripción libre de lo que se quiere construir

## Pasos

1. Determinar tipo de entrada y contexto.
- Si es Jira: leer ticket vía MCP, derivar nombre kebab-case y usar contenido del ticket.
- Si es nombre: usarlo directamente.
- Si es descripción: derivar nombre kebab-case.

2. Crear o reutilizar cambio.
- Si existe, confirmar si continuar.
- Si no existe, crearlo.

3. Generar artefactos en secuencia.
- Propuesta
- Specs (delta)
- Diseño
- Tasks

4. Validar consistencia entre artefactos.
5. Mostrar resumen final con rutas, estado y próximos pasos para implementar.

## Guardrails
- Evitar generar artefactos ambiguos.
- Pedir aclaración cuando faltan decisiones clave.
