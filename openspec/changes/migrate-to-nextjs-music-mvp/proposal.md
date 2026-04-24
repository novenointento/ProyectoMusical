# Migracion a Next.js + MVP de lenguaje musical

## Summary

Reemplazar la plantilla heredada (Express + Vite) por un proyecto Next.js 15
unificado orientado al dominio real: **aplicacion de estudio de lenguaje musical
para conservatorio elemental**.

## Problem

- El repositorio se inicializo a partir de una plantilla generica cuya
  documentacion describia un sistema ATS (LTI) que **no corresponde** a nuestro
  producto.
- El stack heredado (Express backend + Vite frontend, Prisma con entidades
  `Project`/`Task`) no soporta las necesidades del dominio:
  - Autenticacion de usuarios con progreso persistido.
  - Motor de ejercicios musicales reutilizable (4 tipos).
  - Renderizado de pentagramas (VexFlow) y sintesis de audio (Tone.js).
  - Contenido teorico en MDX con componentes React embebidos.
- La separacion monorepo anade friccion innecesaria para un MVP que encaja
  naturalmente en Next.js + Vercel + Neon.

## Proposed solution

- Eliminar `backend/` y `frontend/`; crear un unico proyecto Next.js 15
  (App Router, TypeScript estricto) en la raiz.
- Modelar el dominio con Prisma: usuarios (Auth.js), cursos/temas/lecciones,
  ejercicios, intentos, progreso y logros.
- Introducir un **contrato `ExerciseDefinition<TConfig, TInput, TAnswer>`**
  que permita crecer de un tipo de ejercicio (reconocer notas) a los cuatro
  objetivo (opcion multiple, escritura, dictado, escucha-repite) sin
  reescribir la base.
- Aislar la logica musical pura en `lib/music/*` (Tonal.js), el audio en
  componentes cliente (`Tone.js`) y el render de pentagrama en componentes
  cliente (`VexFlow`). Esta separacion permite tests unitarios puros.
- Servir contenido teorico como MDX en `/content`, con solo metadata en BD.
- Desplegar en **Vercel + Neon**; autenticacion con **Credentials** (fase 2
  anade OAuth sin migracion destructiva).

## Out of scope

- Web MIDI API (fase 2).
- Proveedores OAuth (fase 2).
- Internacionalizacion (solo espanol en el MVP).

## Stakeholders

- Propietario del proyecto (Daniel) - decisiones de producto y despliegue.
- Agente AI (asistente) - implementacion guiada por artefactos OpenSpec.
