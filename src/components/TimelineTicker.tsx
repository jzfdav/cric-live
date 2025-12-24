import { matchData } from '../state/MatchStore';
import './TimelineTicker.css';

export function TimelineTicker() {
    const match = matchData.value;
    if (!match || !match.timeline) return null;

    return (
        <div className="timeline-container glass">
            <div className="timeline-label">Recent Balls</div>
            <div className="timeline-scroll">
                {match.timeline.slice().reverse().map((ball, idx) => (
                    <div key={`${ball.over}-${ball.ball}-${idx}`} className={`timeline-ball type-${ball.type.toLowerCase()}`}>
                        <div className="ball-runs">{ball.type === 'W' ? 'W' : ball.runs}</div>
                        <div className="ball-coord">{ball.over}.{ball.ball}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
