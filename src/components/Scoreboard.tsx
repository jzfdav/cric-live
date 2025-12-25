import { matchData, apiStatus } from '../state/MatchStore';
import './Scoreboard.css';

export function Scoreboard() {
    const match = matchData.value;
    const { keyMissing } = apiStatus.value;

    if (!match) {
        return (
            <div className="scoreboard-placeholder glass-card animate-pulse">
                {keyMissing ? 'API Key Missing - Check configuration above' : 'Waiting for match data...'}
            </div>
        );
    }

    const { teams, status, venue, description } = match;
    const battingTeam = teams.home.isBatting ? teams.home : teams.away;

    return (
        <div className="scoreboard-container glass-card animate-slide-in">
            <div className="scoreboard-header">
                <span className="match-status-badge">{status}</span>
                <span className="match-venue">{venue}</span>
            </div>

            <div className="teams-grid">
                <div className={`team-row ${battingTeam === teams.home ? 'is-batting' : ''}`}>
                    <div className="team-info">
                        <div className="team-color-strip" style={{ backgroundColor: teams.home.color }}></div>
                        <span className="team-name">{teams.home.name}</span>
                        <span className="team-short-name">{teams.home.shortName}</span>
                    </div>
                    <div className="team-score">
                        {teams.home.score}/{teams.home.wickets}
                        <span className="team-overs">({teams.home.overs})</span>
                    </div>
                </div>

                <div className={`team-row ${battingTeam === teams.away ? 'is-batting' : ''}`}>
                    <div className="team-info">
                        <div className="team-color-strip" style={{ backgroundColor: teams.away.color }}></div>
                        <span className="team-name">{teams.away.name}</span>
                        <span className="team-short-name">{teams.away.shortName}</span>
                    </div>
                    <div className="team-score">
                        {teams.away.score}/{teams.away.wickets}
                        <span className="team-overs">({teams.away.overs})</span>
                    </div>
                </div>
            </div>

            <div className="match-footer">
                <div className="match-description">{description}</div>
                <div className="match-mindset">
                    <span className="mindset-icon">{match.mindset.split(' ')[0]}</span>
                    <span className="mindset-text">{match.mindset.split(' ')[1]}</span>
                </div>
            </div>
        </div>
    );
}
