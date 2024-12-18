# Architecture Overview

LLMForge aims to create a workflow where an LLM proposes code changes to a web application, and a human developer reviews and approves these changes before they go live.

## Components

- **LLM Interface (src/llm_interface/):** Interacts with the LLM to get code proposals.
- **Approval Workflow (src/approval_workflow/):** Staging area for proposed changes, and tools for reviewing/approving them.
- **Server (src/server/):** The running web application server that only integrates approved code.

## Data Flow

1. Developer requests a change (e.g., add a new route).
2. LLM proposes code changes, stored in a staging area.
3. Developer reviews changes, runs tests, and if approved, merges them into the live code.
