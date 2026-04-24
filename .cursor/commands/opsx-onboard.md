---
name: /opsx-onboard
id: opsx-onboard
category: Workflow
description: Onboarding guiado del ciclo completo OpenSpec con narración
---

Guía al usuario por un ciclo completo de OpenSpec (de idea a implementación) de forma didáctica.

## Preflight

Primero verifica si OpenSpec está inicializado:
```bash
openspec status --json 2>&1 || echo "NOT_INITIALIZED"
```

Si no está inicializado, indicar que debe ejecutar `openspec init` y detener.

## Flujo guiado sugerido

1. Bienvenida y explicación breve del ciclo.
2. Elegir una tarea pequeña y real del código.
3. Explorar el problema.
4. Crear cambio.
5. Generar artefactos (proposal → specs → design → tasks).
6. Ejecutar implementación base.
7. Verificar y cerrar.

En cada fase, narrar qué se hace, por qué y qué resultado deja.
