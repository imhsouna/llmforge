# LLMForge

LLMForge is a next-generation development framework that pairs a Large Language Model (LLM) with a human-in-the-loop approval process.

## Key Concepts

- **LLM-Assisted Development**: Describe a feature in natural language; the LLM proposes code.
- **Human-in-the-Loop Approval**: Code isn’t integrated until a human approves.
- **Dynamic Integration**: Approved code is written to `generated/` routes and loaded into the server on startup.

## Current Features

- **Propose & Approve Endpoints**:  
  You can propose a route using `/propose` and approve it using `/approve/:id`.
- **Generated Routes**:  
  Approved changes create new route files in `src/server/routes/generated/`. On server restart, these routes are available.

## Example Workflow

1. **Propose a Change**:
   ```bash
   curl -X POST http://localhost:3000/propose \
     -H "Content-Type: application/json" \
     -d '{"description":"Add a products route"}'
