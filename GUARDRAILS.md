# Cric-Live Development Guardrails

These technical guardrails are based on 30+ identified regressions and hard-won lessons from the predecessor project (**CricFuzz**). Follow these strictly to minimize errors and maintenance cycles.

## 1. State Management (Preact Signals)
- **Signal Definition**: All global state must live in `MatchStore.ts`.
- **Initialization**: Every signal must have a sensible default (`null`, `0`, `[]`, or `false`) to avoid `undefined` crashes in the UI.
- **The .value Rule**: 90% of past crashes were caused by accessing a signal without `.value` in a service. Enforce this in your logic.
- **Explicit Resets**: Implement a `clearMatchStore()` function. When a match ends or a new one is selected, **every single signal** must be explicitly reset. Leaving old data (like `target` or `allOut`) will corrupt the next match.

## 2. API & Data Mapping
- **Graceful Failure**: Polling will fail (offline, rate limits, invalid keys). The `LiveMatchService` must catch these and update a `networkStatus` signal rather than letting the exception propagate to the UI loop.
- **Transformation Layer**: Map raw API data to a strict `CricMatch` interface before it hits the store. Never let external API property names (e.g., `s_runs`) leak into your UI components.

## 3. UI & Display
- **Typography**: Team names and player names **will truncate** on narrow mobile screens (e.g., OnePlus 13) if fixed sizes are used. Always use responsive classes: `text-[14px] sm:text-base`.
- **Color Contrast**: 
    - If two teams have similar colors (e.g., India vs Australia in yellow/blue variants), the UI becomes unreadable. 
    - Reuse `colorUtils.ts` to calculate luminance and distance. If distance < 60, force-invert the overlay colors.
- **Re-render Optimization**: Only pass specific signals as props to components to minimize the "Flash of Re-render" during rapid data polling.

## 4. Feature Parity & Regressions
- **Timeline Ticker**: Don't forget the ball-by-ball "pills". It's a key user expectation.
- **Haptic Feedback**: Use `window.navigator.vibrate` for 4s, 6s, and Wickets. It's a minor add that significantly boosts the "Live" feel.
- **Ordinal Logic**: Handle innings labels correctly (1st, 2nd, 3rd) rather than using a naive suffix.

## 5. Tool Usage (AI Specific)
- **Build Checks**: Always run `npm run build` after any refactor. Refactors in the previous project accidentally deleted core methods multiple times.
- **Clean Markdown**: When modifying files with tools, ensure no internal AI artifacts (like triple backticks inside a string) are left behind.
