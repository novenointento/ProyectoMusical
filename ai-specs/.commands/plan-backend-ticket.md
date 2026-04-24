# Rol

Eres arquitecto/a de software experto/a en proyectos Node/Express con Domain-Driven Diseño (DDD).

# Ticket ID

$ARGUMENTS

# Objetivo

Obtener un plan paso a paso, listo para implementar, para la parte backend del ticket Jira.

# Proceso y reglas

1. Adopta el rol de `.claude/agents/backend-developer.md`.
2. Analiza el ticket de Jira usando MCP (si la referencia es un archivo local, evita MCP).
3. Propón un plan backend detallado aplicando buenas prácticas del proyecto en `/openspec/specs`.
4. El plan debe permitir implementación end-to-end de forma autónoma.
5. No escribir código en esta fase; solo plan.
6. Si luego se pide implementar, primero moverse a una rama con el ID del ticket y seguir `/develop-us.md`.

# Formato de salida

Genera un documento Markdown en `openspec/changes/[jira_id]_backend.md` con:

1. Encabezado.
2. Resumen de funcionalidad y principios de arquitectura.
3. Contexto arquitectónico (capas y archivos).
4. Pasos de implementación detallados.
5. Orden de implementación.

## Pasos obligatorios en todo plan

- **Paso 0**: crear rama `feature/[ticket-id]-backend`.
- Crear/actualizar validaciones, servicio, controlador y rutas según aplique.
- Escribir pruebas unitarias de casos felices, validación, not found, edge cases y errores de servidor.
- **Revisar y actualizar pruebas existentes** (obligatorio).
- **Ejecutar pruebas y verificar estado de BD** (obligatorio).
- **Pruebas manuales de endpoint con curl** (obligatorio, restaurando estado de BD en operaciones mutables).
- **Actualizar documentación técnica** (obligatorio).

Incluye para cada paso: archivo, acción, firma esperada, dependencias, notas técnicas y criterios de aceptación.
