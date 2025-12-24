import { matchData } from '../state/MatchStore';
import './LiveChaseSummary.css';

export function LiveChaseSummary() {
    const match = matchData.value;
    if (!match || !match.target) return null;

    const battingTeam = match.teams.home.isBatting ? match.teams.home : match.teams.away;
    const runsNeeded = match.target - battingTeam.score;
    const remainingBalls = (20 * 6) - (Math.floor(battingTeam.overs) * 6 + Math.round((battingTeam.overs % 1) * 10));

    if (runsNeeded <= 0 || remainingBalls <= 0) return null;

    const rrr = ((runsNeeded / remainingBalls) * 6).toFixed(2);

    return (
        <div className="chase-summary-container glass-card">
            <div className="chase-main">
                <span className="runs-needed">{runsNeeded}</span>
                <span className="chase-label">Runs needed from</span>
                <span className="balls-remaining">{remainingBalls}</span>
                <span className="chase-label">balls</span>
            </div>
            <div className="chase-stats">
                <div className="stat-item">
                    <span className="stat-label">REQ. RATE</span>
                    <span className="stat-value text-accent-amber">{rrr}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">TARGET</span>
                    <span className="stat-value">{match.target}</span>
                </div>
            </div>
        </div>
    );
}
