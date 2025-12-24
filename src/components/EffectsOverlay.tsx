import { useEffect, useState } from 'preact/hooks';
import { eventTrigger } from '../state/MatchStore';
import './EffectsOverlay.css';

export function EffectsOverlay() {
    const [activeEffect, setActiveEffect] = useState<string | null>(null);

    useEffect(() => {
        const trigger = eventTrigger.value;
        if (trigger) {
            setActiveEffect(trigger.type);

            const timer = setTimeout(() => {
                setActiveEffect(null);
            }, 2000); // Effect duration

            return () => clearTimeout(timer);
        }
    }, [eventTrigger.value]);

    if (!activeEffect) return null;

    return (
        <div className="effects-overlay" data-type={activeEffect}>
            <div className="effect-content">
                {activeEffect === '4' && <div className="effect-text">FOUR!</div>}
                {activeEffect === '6' && <div className="effect-text">SIX!</div>}
                {activeEffect === 'W' && <div className="effect-text">WICKET!</div>}
            </div>
        </div>
    );
}
