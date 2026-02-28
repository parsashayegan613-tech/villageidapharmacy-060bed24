# Project Constitution

## Data Schemas

### Appointment Schema (`appointments` table in Supabase)
```json
{
  "id": "uuid (Primary Key)",
  "created_at": "timestamp",
  "client_name": "string",
  "client_email": "string",
  "client_phone": "string (optional)",
  "appointment_date": "date",
  "appointment_time": "time",
  "service_type": "string (e.g., flu shot, consultation)",
  "status": "string (e.g., pending, confirmed, cancelled)",
  "notes": "string (optional)"
}
```

### Client Schema (`clients` table in Supabase - Optional, if separate auth isn't needed immediately)
```json
{
  "id": "uuid (Primary Key, linked to auth.users if applicable)",
  "created_at": "timestamp",
  "full_name": "string",
  "email": "string",
  "phone": "string"
}
```

## Behavioral Rules
- System Pilot acts with deterministic, self-healing automation in Antigravity.
- Follow the B.L.A.S.T. (Blueprint, Link, Architect, Stylize, Trigger) protocol strictly.
- **Data-First:** Define Data Schema (JSON input/output shapes) before any tools or logic are built.
- **Self-Annealing:** If an error occurs: Read trace, Patch, Test, Update architecture/.
- **Halt Execution:** Do not write scripts in `tools/` until:
  - Discovery Questions are answered.
  - Data Schema is defined here.
  - `task_plan.md` has an approved Blueprint.

## Architectural Invariants
- **Layer 1: Architecture (`architecture/`)**
  - Technical SOPs in Markdown files.
  - Define goals, inputs, tool logic, and edge cases.
  - Golden Rule: If logic changes, update SOP before updating code.
- **Layer 2: Navigation**
  - Route data between SOPs and Tools. Do not perform complex tasks manually; call tools.
- **Layer 3: Tools (`tools/`)**
  - Deterministic Python scripts. Atomic and testable.
  - Environment variables stored in `.env`.
  - Use `.tmp/` for all intermediate file operations.

## Maintenance Log
- **2026-02-26**: Initialization of B.L.A.S.T. protocol. Created Supabase project `nbbpchwweyzpiurlluzz`. Applied initial schema for appointments, refills, transfers, and contact messages. Integrated frontend components. Verified connectivity via `tools/handshake.py`.

