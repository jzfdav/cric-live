import { matchList, selectedMatchId } from '../state/MatchStore';
import { LiveMatchService } from '../services/LiveMatchService';
import './MatchSelector.css';

export function MatchSelector() {
    const matches = matchList.value;
    const currentId = selectedMatchId.value;

    const handleSelect = (id: string) => {
        selectedMatchId.value = id;
        LiveMatchService.startPolling(id);
    };

    if (matches.length === 0) return null;

    return (
        <div className="match-selector-container">
            <div className="selector-scroll">
                {matches.map((match) => (
                    <button
                        key={match.id}
                        className={`match-pill glass ${currentId === match.id ? 'active' : ''}`}
                        onClick={() => handleSelect(match.id)}
                    >
                        <span className={`status-pill ${match.status.toLowerCase()}`}></span>
                        <span className="match-pill-title">{match.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
