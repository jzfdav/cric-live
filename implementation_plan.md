# Implementation Plan - Cric-Live Phase 1

## Goal Description
Establish the project foundation and prove the capability of real-time polling from a free Cricket API.

## Proposed Steps

### 1. Project Scaffolding
- Run `npm create vite@latest ./ -- --template preact-ts` in a fresh directory.
- Install `@preact/signals`.

### 2. API Proof of Concept
- Create `src/services/apiClient.ts` to handle the `fetch` calls.
- Implement a mock mode to test UI patterns while API keys are being provisioned.

### 3. State Layer
- Define `src/state/MatchStore.ts` using signals.
- Ensure the state updates trigger the `EffectsOverlay` correctly.

### 4. Minimal Scoreboard
- Render raw API data in a stylized scoreboard.
- Verify that "Effects" fire correctly when a new wicket is detected in the poll.
