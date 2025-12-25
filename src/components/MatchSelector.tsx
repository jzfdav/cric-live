import { sortedMatchList, selectedMatchId, favoriteTeams } from '../state/MatchStore';
import { LiveMatchService } from '../services/LiveMatchService';
import './MatchSelector.css';

export function MatchSelector() {
    const matches = sortedMatchList.value;
    const currentId = selectedMatchId.value;
    const favs = favoriteTeams.value;

    const handleSelect = (id: string) => {
        selectedMatchId.value = id;
        LiveMatchService.startPolling(id);
    };

    const toggleFavorite = (e: MouseEvent, teamName: string) => {
        e.stopPropagation();
        const currentFavs = [...favoriteTeams.value];
        const index = currentFavs.indexOf(teamName);

        if (index > -1) {
            currentFavs.splice(index, 1);
        } else {
            currentFavs.push(teamName);
        }

        favoriteTeams.value = currentFavs;
        localStorage.setItem('cric-live-favorites', JSON.stringify(currentFavs));
    };

    if (matches.length === 0) return null;

    return (
        <div className="match-selector-container">
            <div className="match-grid">
                {matches.map((match) => {
                    // Try to parse teams from title (e.g., "India vs Pakistan")
                    const teams = match.title.split(' vs ');
                    const isAnyFav = teams.some(t => favs.includes(t.trim()));

                    return (
                        <div
                            key={match.id}
                            className={`match-tile glass-card ${currentId === match.id ? 'active' : ''} ${isAnyFav ? 'featured' : ''}`}
                            onClick={() => handleSelect(match.id)}
                        >
                            <div className="tile-header">
                                <div className="tile-status">
                                    <span className={`status-dot ${match.status.toLowerCase()}`}></span>
                                    {match.status}
                                </div>
                            </div>

                            <div className="tile-teams">
                                {teams.map((team, idx) => {
                                    const teamName = team.trim();
                                    const isFav = favs.includes(teamName);

                                    return (
                                        <div key={idx} className="tile-team-row">
                                            <div className="team-info-group">
                                                <span className="team-main-name">{teamName}</span>
                                            </div>
                                            <span
                                                className={`fav-star ${isFav ? 'active' : ''}`}
                                                onClick={(e) => toggleFavorite(e, teamName)}
                                            >
                                                {isFav ? '★' : '☆'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
