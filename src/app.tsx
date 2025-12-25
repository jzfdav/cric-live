import { useEffect } from 'preact/hooks';
import { Scoreboard } from './components/Scoreboard';
import { TimelineTicker } from './components/TimelineTicker';
import { MatchSelector } from './components/MatchSelector';
import { LiveChaseSummary } from './components/LiveChaseSummary';
import { DebugStatus } from './components/DebugStatus';
import { EffectsOverlay } from './components/EffectsOverlay';
import { LiveMatchService } from './services/LiveMatchService';
import { networkStatus } from './state/MatchStore';
import './app.css';

export function App() {
  useEffect(() => {
    // Initialize Match List
    LiveMatchService.fetchMatchList();

    // Initialize Match List
    LiveMatchService.fetchMatchList().then(() => {
      // If no match is selected, we could automatically pick the first one
      // But for now, we wait for the user to select from the MatchSelector
    });

    return () => LiveMatchService.stopPolling();
  }, []);

  return (
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
        <MatchSelector />
        <Scoreboard />
        <LiveChaseSummary />
        <TimelineTicker />
      </main>

      <EffectsOverlay />

      <footer className="app-footer">
        <p>&copy; 2025 Cric-Live Companion</p>
      </footer>
    </div>
  );
}
