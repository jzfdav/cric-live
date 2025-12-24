import { useEffect } from 'preact/hooks';
import { Scoreboard } from './components/Scoreboard';
import { EffectsOverlay } from './components/EffectsOverlay';
import { LiveMatchService } from './services/LiveMatchService';
import { networkStatus } from './state/MatchStore';
import './app.css';

export function App() {
  useEffect(() => {
    // Start polling with a demo match ID
    LiveMatchService.startPolling('ind-vs-pak-2025');

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
        <Scoreboard />
        {/* Future components like TimelineTicker will go here */}
      </main>

      <EffectsOverlay />

      <footer className="app-footer">
        <p>&copy; 2025 Cric-Live Companion</p>
      </footer>
    </div>
  );
}
