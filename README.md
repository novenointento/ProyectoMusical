# LTI (Leadership. Technology. Impact) - Sistema ATS

## 📋 Descripción general

LTI ATS (Applicant Tracking System) es una plataforma moderna full-stack para la gestión de procesos de selección. El sistema permite a las organizaciones gestionar candidaturas, seguir aplicaciones, organizar entrevistas y tomar decisiones de contratación basadas en datos.

### 🎯 Propósito

LTI ATS aborda retos clave del reclutamiento moderno mediante:

- **Gestión centralizada de candidatos**: perfiles completos con educación, experiencia y documentos.
- **Procesos de entrevista estructurados**: flujos configurables con múltiples etapas y criterios.
- **Seguimiento de aplicaciones**: visibilidad end-to-end del avance en el pipeline.
- **Decisión colaborativa**: coordinación y evaluación entre múltiples stakeholders.
- **Insights basados en datos**: analítica y reporting para optimizar el proceso de selección.

### 🏗️ Arquitectura

El sistema sigue principios de **Domain-Driven Design (DDD)** con una arquitectura limpia por capas:

```
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Presentación                     │
│  ┌─────────────────────┐    ┌─────────────────────────────┐│
│  │   Frontend React    │    │  Controladores Express.js   ││
│  │   (TypeScript)      │    │      (API REST)             ││
│  └─────────────────────┘    └─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Aplicación                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Servicios y Casos de Uso                   ││
│  │     (candidateService, positionService, etc.)           ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Capa de Dominio                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │       Modelos de Dominio y Lógica de Negocio            ││
│  │   (Candidate, Position, Application, Interview)         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Capa de Infraestructura                   │
│  ┌─────────────────────┐    ┌─────────────────────────────┐│
│  │     PostgreSQL      │    │         Prisma ORM          ││
│  │    (Base de datos)  │    │      (Acceso a datos)       ││
│  └─────────────────────┘    └─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tecnologías

### Backend
- **Node.js** con **TypeScript** - runtime de servidor y seguridad de tipos.
- **Express.js** - framework web para API REST.
- **Prisma ORM** - cliente de base de datos tipado y migraciones.
- **PostgreSQL** - base de datos principal.
- **Jest** - pruebas unitarias e integración.
- **Serverless Framework** - capacidades de despliegue cloud.

### Frontend
- **React 18** con **TypeScript** - framework UI moderno con tipado.
- **React Bootstrap** - librería de componentes UI.
- **React Router DOM** - enrutado del lado cliente.
- **React Beautiful DnD** - drag and drop para tableros Kanban.
- **React DatePicker** - componentes de selección de fecha.

### DevOps y testing
- **Docker** - contenedorización para PostgreSQL.
- **Cypress** - framework de pruebas end-to-end.
- **ESLint** y **Prettier** - linting y formato de código.

## 📁 Estructura de carpetas

```
AI4Devs-LTI/
├── 📁 backend/                      # Aplicación backend
│   ├── 📁 src/
│   │   ├── 📁 presentation/         # Controladores y rutas
│   │   │   ├── 📁 controllers/      # Controladores REST API
│   │   │   └── 📁 __tests__/        # Pruebas de controladores
│   │   ├── 📁 application/          # Servicios de aplicación
│   │   │   ├── 📁 services/         # Lógica de negocio
│   │   │   └── validator.ts         # Validación de entrada
│   │   ├── 📁 domain/               # Capa de dominio
│   │   │   ├── 📁 models/           # Entidades de dominio
│   │   │   └── 📁 repositories/     # Interfaces de repositorio
│   │   ├── 📁 infrastructure/       # Capa de infraestructura
│   │   └── 📁 routes/               # Definición de rutas API
│   ├── 📁 prisma/                   # Esquema y migraciones
│   │   ├── schema.prisma            # Definición del esquema
│   │   ├── 📁 migrations/           # Archivos de migración
│   │   └── seed.ts                  # Script de seeding
│   ├── package.json                 # Dependencias backend
│   ├── tsconfig.json                # Configuración TypeScript
│   └── jest.config.js               # Configuración de Jest
│
├── 📁 frontend/                     # Aplicación frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/           # Componentes React
│   │   ├── 📁 services/             # Capa de servicios API
│   │   ├── 📁 pages/                # Componentes de página
│   │   └── App.js                   # Componente principal
│   ├── 📁 cypress/                  # Pruebas E2E
│   │   └── 📁 e2e/                  # Specs Cypress
│   ├── package.json                 # Dependencias frontend
│   └── tsconfig.json                # Configuración TypeScript
│
├── 📁 documentation/                # Documentación del proyecto
│   ├── DataModel.md                 # Modelo de datos y entidades
│   └── api-spec.yml                # Especificación OpenAPI
│
├── 📁 memory-bank/                  # Contexto y documentación del proyecto
│   ├── projectbrief.md              # Resumen del proyecto
│   ├── productContext.md            # Contexto de negocio
│   └── systemPatterns.md            # Patrones de arquitectura
│
├── docker-compose.yml               # Contenedor PostgreSQL
├── package.json                     # Configuración raíz
└── README.md                        # Este archivo
```

## 🚀 Configuración y pruebas

Para instrucciones detalladas de setup, entorno y testing, consulta la [Guía de desarrollo](ai-specs/specs/development_guide.md).

## 📊 Esquema de base de datos

Entidades principales del sistema:

- **Candidates**: información personal, educación y experiencia.
- **Companies**: organizaciones que publican vacantes.
- **Positions**: vacantes con requisitos y descripciones.
- **Applications**: postulaciones de candidatos a vacantes.
- **Interview Flows**: etapas configurables del proceso de entrevista.
- **Interviews**: sesiones individuales de entrevista y resultados.

Para relaciones y detalle completo del modelo, consulta [`ai-specs/specs/data-model.md`](ai-specs/specs/data-model.md).

## 🔗 Documentación API

La API REST sigue OpenAPI 3.0. Endpoints clave:

- `GET /candidates` - Listar candidatos con filtros y paginación.
- `POST /candidates` - Crear candidato.
- `GET /candidates/{id}` - Obtener detalle de candidato.
- `GET /positions` - Listar vacantes.
- `POST /positions` - Crear vacante.
- `PUT /candidates/{id}` - Actualizar etapa de entrevista de candidato.

Documentación completa en [`ai-specs/specs/api-spec.yml`](ai-specs/specs/api-spec.yml).

## 🤝 Contribución

1. Sigue los patrones de arquitectura y desarrollo establecidos.
2. Escribe pruebas para nuevas funcionalidades.
3. Actualiza la documentación de especificaciones cuando haya cambios (API, modelo de datos, etc.).
4. Usa TypeScript para seguridad de tipos.
5. Respeta principios DDD.

