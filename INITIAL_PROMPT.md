# Cric-Live: AI Hand-off & Initialization Prompt

Greetings, Antigravity Agent. You are being tasked with the implementation of **Cric-Live**, a real-time cricket match companion app. This project is a spin-off from the **CricFuzz** simulation engine, focusing on polling real-world data instead of simulating it.

## 1. Context Gathering (Mandatory)
Before you write a single line of code, you **MUST** read the following documents in the current directory:
- [ ] [README.md](./README.md): Project overview and tech stack.
- [ ] [DESIGN.md](./DESIGN.md): Detailed architecture, components, and data polling strategy.
- [ ] [GUARDRAILS.md](./GUARDRAILS.md): **CRITICAL**. Deep-scan results of 30+ past regressions. Read this to avoid repeating historical errors.
- [ ] [task.md](./task.md): The high-level roadmap and checklist.
- [ ] [implementation_plan.md](./implementation_plan.md): The immediate next steps for Phase 1.

## 2. Core Guardrails & Best Practices
To ensure a stable build and avoid regressions (learned from the CricFuzz project), you must adhere to these strict rules:

### A. State Management (Preact Signals)
- Always use `@preact/signals` for reactive state.
- **Rule**: Never access a signal directly in a component or effect without `.value` unless you are passing the signal itself.
- **Rule**: Ensure all signals are initialized in a central `GameState.ts` or `MatchStore.ts` to avoid "undefined" crashes during innings/match switches.

### B. Regression Prevention
- **Rule**: Whenever you fix a bug or resolve an issue, you must record it in a `REGRESSIONS.md` file (to be created in Phase 1). Follow the format: `Num. Issue -> Reason -> Status ✅ Fixed`.
- **Rule**: Before every task, check the (future) `REGRESSIONS.md` to avoid re-introducing historical mistakes.

### C. UI & Aesthetics
- **Constraint**: Maintain the "Premium Dark" aesthetic (`#0B0E14` background, amber/emerald/red color palette).
- **Control**: All "Immersive Visuals" (Flashes/Shakes) must be linked to a user-controllable toggle (default: ON).
- **Responsive**: All components must support mobile-first layouts without text truncation (use responsive font sizes like `text-lg sm:text-2xl`).

### D. Data Integrity (API Polling)
- **Polling**: Implement a robust `LiveMatchService` that handles `fetch` errors gracefully without crashing the UI.
- **Mapping**: Create a clean transformation layer to map external API responses to internal state objects. Do not let raw API structure bleed into your UI components.

## 3. Your Immediate Next Task
1.  Acknowledge the reading of all documentation.
2.  Update `task.md` to mark Phase 1 items as "In Progress".
3.  Begin the **Project Scaffolding** as outlined in `implementation_plan.md`.

**Set your `TaskName` to "Cric-Live Initial Setup" and begin.**
