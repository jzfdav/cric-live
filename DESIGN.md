# Cric-Live Design Document

## 1. Vision
The Live Match Companion transforms static match data into a dynamic, immersive experience. It bridges the gap between a simple score site and a television broadcast by leveraging high-end UI patterns.

## 2. UI/UX Principles (Inherited from CricFuzz)
- **High Contrast & Dark Mode**: Deep `#0B0E14` backgrounds with vibrant amber/emerald accents.
- **Micro-Animations**: Ball-by-ball timeline entries slide in with ease.
- **Visual Signals**: Full-screen flashes (Blue for 4, Gold for 6, Red for Wicket) to notify the user of major events even if they aren't looking directly at the score.
- **Intent Visualization**: Instead of just numbers, the app displays the "Current Vibe" of the innings (e.g., `🛡️ Rebuilding`, `🔥 Accelerating`).

## 3. Architecture

### State Management (Signals)
Leverage `@preact/signals` for a reactive core:
- `matchData`: Holds the full API payload.
- `currentScore`: Computed signal derived from `matchData`.
- `eventTrigger`: Signal used to fire the `EffectsOverlay`.

### Data Polling Strategy
- **Service Layer**: `LiveMatchService.ts` handles the polling logic.
- **Polling Interval**: Configurable (Default: 45s) to stay within free tier API limits.
- **Offline Support**: Gracefully handle network failures with a "Last Updated" indicator.

## 4. Components

### `Scoreboard`
- Displays Team Flags, Score, Overs, and Run Rates.
- Uses the "Live Chase Summary" pattern from CricFuzz (Runs needed, RRR).

### `TimelineTicker`
- A horizontal scroll of recent balls/overs if the API provides detailed history.

### `EffectsOverlay`
- Triggers CSS animations (Flashes/Shakes) when the latest ball indicates a major event.

## 5. External API Integration (Plan)
- **Primary**: CricketData.org (Free tier: 100 requests/day).
- **Fallback**: RapidAPI (Various unofficial scrapers).
- **Mapping Layer**: A utility to transform diverse API shapes into a unified `CricLiveMatch` type.
