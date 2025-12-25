import { apiStatus } from '../state/MatchStore';
import './DebugStatus.css';

export function DebugStatus() {
    const { keyMissing, provider } = apiStatus.value;

    if (!keyMissing) return null;

    return (
        <div className="debug-status-container glass-card">
            <div className="debug-header">
                <span className="debug-icon">⚠️</span>
                <span className="debug-title">Backend Configuration Required</span>
            </div>
            <div className="debug-content">
                <p className="debug-text">
                    The application is currently running without a valid API key.
                </p>
                <div className="debug-facts">
                    <div className="fact-item">
                        <span className="fact-label">Provider:</span>
                        <span className="fact-value text-accent-amber">{provider}</span>
                    </div>
                    <div className="fact-item">
                        <span className="fact-label">API Key:</span>
                        <span className="fact-value text-accent-red">NOT_SET (Check GitHub Secrets)</span>
                    </div>
                    <div className="fact-item">
                        <span className="fact-label">Environment:</span>
                        <span className="fact-value">Production (GitHub Pages)</span>
                    </div>
                </div>
                <p className="debug-hint">
                    To fix this, add a repository secret named <code>CRICKET_API_KEY</code> on GitHub.
                    Current match data will not load until a valid key is provided.
                </p>
            </div>
        </div>
    );
}
