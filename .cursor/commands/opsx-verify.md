---
name: /opsx-verify
id: opsx-verify
category: Workflow
description: Verificar que la implementación coincide con los artefactos del cambio antes de archivar
---

Verifica que la implementación coincide con specs, tareas y diseño del cambio.

## Entrada
Nombre opcional tras `/opsx:verify`. Si falta o es ambiguo, pedir selección.

## Pasos

1. **Seleccionar cambio**
- `openspec list --json` + `AskUserQuestion`.
- Mostrar cambios con tareas de implementación y marcar los incompletos.

2. **Revisar esquema y artefactos**
```bash
openspec status --change "<name>" --json
```

3. **Cargar contexto del cambio**
```bash
openspec instructions apply --change "<name>" --json
```
- Leer artefactos disponibles en `contextFiles`.

4. **Evaluar en tres dimensiones**
- **Completitud**: tareas completadas y cobertura de requerimientos.
- **Corrección**: alineación entre requerimientos/escenarios y código/tests.
- **Coherencia**: consistencia con decisiones de diseño y patrones del proyecto.

5. **Clasificar hallazgos**
- `CRITICAL`: bloquea archivado.
- `WARNING`: debería corregirse.
- `SUGGESTION`: mejora recomendada.

6. **Emitir reporte**
- Scorecard resumen por dimensión.
- Lista de hallazgos con recomendaciones accionables y referencias de archivo.
- Veredicto final: listo para archivar o no.

## Heurísticas
- Priorizar evidencia objetiva (tareas, requerimientos, pruebas).
- En incertidumbre, bajar severidad (SUGGESTION > WARNING > CRITICAL).
- Cada hallazgo debe tener acción concreta.
