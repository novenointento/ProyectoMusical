# Data Model

This template ships with a minimal generic model so the repository remains runnable.

## Project

- `id`: primary key
- `name`: human-readable project name
- `slug`: unique identifier
- `description`: optional summary
- `createdAt`
- `updatedAt`

## Task

- `id`: primary key
- `projectId`: relation to `Project`
- `title`: task name
- `description`: optional detail
- `status`: generic workflow state such as `todo`, `doing`, `done`
- `createdAt`
- `updatedAt`

## What to replace

Replace these entities as soon as your real domain is known. This file should become the single source of truth for your domain model.
