Por favor, analiza y mejora el ticket de Jira: $ARGUMENTS.

Sigue estos pasos:

1. Usa Jira MCP para obtener los detalles del ticket, ya sea por ID/número, por palabras clave o por estado (por ejemplo, "el que está en progreso").
2. Actúa como experto/a de producto con conocimiento técnico.
3. Entiende el problema descrito en el ticket.
4. Decide si la Historia de usuario está completamente detallada según las mejores prácticas de producto. Debe incluir: descripción funcional completa, lista de campos a actualizar, estructura y URLs de endpoints necesarios, archivos a modificar según arquitectura y buenas prácticas, pasos para dar por completada la tarea, actualización de documentación y/o pruebas unitarias, y requisitos no funcionales (seguridad, rendimiento, etc.).
5. Si la historia no tiene suficiente detalle técnico y específico para que una persona desarrolladora sea autónoma, redacta una versión mejorada, más clara, específica y concisa, alineada con las mejores prácticas del paso 4. Usa el contexto técnico disponible en `@ai-specs`. Devuélvela en formato Markdown.
6. Actualiza el ticket en Jira agregando el contenido nuevo debajo del original y marcando cada sección con los títulos H2 `[original]` y `[enhanced]`. Aplica formato legible y visualmente claro (listas, fragmentos de código, etc.).
7. Si el estado del ticket era "To refine", mueve la tarea a la columna "Pending refinement validation".
