import { QueryClientProvider } from '@tanstack/react-query';
import { Scoreboard } from './components/Scoreboard';
import { TimelineTicker } from './components/TimelineTicker';
import { MatchSelector } from './components/MatchSelector';
import { LiveChaseSummary } from './components/LiveChaseSummary';
import { DebugStatus } from './components/DebugStatus';
import { EffectsOverlay } from './components/EffectsOverlay';
import { networkStatus, queryClient } from './state/MatchStore';
import './app.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-root">
        <header className="app-header">
          <h1 className="app-title">
            CRIC<span className="text-accent-amber">LIVE</span>
          </h1>
          <div className="network-indicator">
            <span className={`status-dot ${networkStatus.value}`}></span>
            <span className="status-text">{networkStatus.value.toUpperCase()}</span>
          </div>
        </header>

        <main>
          <DebugStatus />
          {/* Active Match Components at the top */}
          <Scoreboard />
          <LiveChaseSummary />
          <TimelineTicker />

          {/* Match Selection at the bottom */}
          <MatchSelector />
        </main>

        <EffectsOverlay />

        <footer className="app-footer">
          <p>&copy; 2025 Cric-Live Companion</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
