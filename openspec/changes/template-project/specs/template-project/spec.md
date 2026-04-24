## ADDED Requirements

### Requirement: Starter project must remain runnable

The system SHALL provide a runnable frontend and backend skeleton so a new project can start from a working baseline.

#### Scenario: Backend health endpoint

- **WHEN** the backend starts
- **THEN** `GET /health` SHALL return a successful JSON response

#### Scenario: Frontend starter shell

- **WHEN** the frontend starts
- **THEN** the user SHALL see a starter screen explaining what to replace first
