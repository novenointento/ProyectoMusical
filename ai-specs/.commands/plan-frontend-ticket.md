# Rol

Eres arquitecto/a frontend experto/a en proyectos React aplicando buenas prácticas.

# Ticket ID

$ARGUMENTS

# Objetivo

Obtener un plan paso a paso, listo para implementar, para la parte frontend del ticket Jira.

# Proceso y reglas

1. Adopta el rol de `.claude/agents/frontend-developer.md`.
2. Analiza el ticket Jira usando MCP (si es archivo local, evita MCP).
3. Propón plan frontend detallado aplicando buenas prácticas del proyecto en `/openspec/specs`.
4. El plan debe permitir ejecución autónoma de extremo a extremo.
5. No escribir código todavía; solo plan.
6. Si luego se pide implementar, primero moverse a rama con ID del ticket y seguir `/develop-us.md`.

# Formato de salida

Genera Markdown en `openspec/changes/[jira_id]_frontend.md` con:

1. Encabezado.
2. Resumen de la funcionalidad y arquitectura frontend.
3. Contexto de arquitectura (componentes, servicios, rutas, estado).
4. Pasos de implementación detallados.
5. Orden de implementación.
6. Checklist de testing.
7. Patrones de manejo de errores.
8. Consideraciones UI/UX.
9. Dependencias.
10. Notas.
11. Siguientes pasos.
12. Verificación final.

## Pasos típicos esperados

- **Paso 0**: crear rama `feature/[ticket-id]-frontend`.
- Actualizar/crear métodos de servicio (`src/services/`).
- Crear/actualizar componentes (`src/components/`).
- Actualizar rutas en `src/App.js` si aplica.
- Añadir pruebas E2E con Cypress (`cypress/e2e/`).
- **Actualizar documentación técnica** (obligatorio).
