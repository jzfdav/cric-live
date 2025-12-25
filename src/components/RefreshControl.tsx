import { refreshInterval } from '../state/MatchStore';
import './RefreshControl.css';

const INTERVALS = [
    { label: '1m', value: 60000 },
    { label: '2m', value: 120000 },
    { label: '5m', value: 300000 },
    { label: '10m', value: 600000 },
];

export function RefreshControl() {
    const current = refreshInterval.value;

    const handleSelect = (val: number) => {
        refreshInterval.value = val;
        localStorage.setItem('cric-live-refresh-interval', val.toString());
    };

    return (
        <div className="refresh-control glass">
            <span className="refresh-label">Refresh:</span>
            <div className="refresh-options">
                {INTERVALS.map((opt) => (
                    <button
                        key={opt.value}
                        className={`refresh-btn ${current === opt.value ? 'active' : ''}`}
                        onClick={() => handleSelect(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
