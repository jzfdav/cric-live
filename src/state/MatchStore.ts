import { signal, computed } from '@preact/signals';
import type { CricMatch, NetworkStatus } from '../types';

// Global state for Cric-Live
export const matchData = signal<CricMatch | null>(null);
export const matchList = signal<Array<{ id: string; title: string; status: string }>>([]);
export const selectedMatchId = signal<string | null>(null);
export const networkStatus = signal<NetworkStatus>('online');
export const eventTrigger = signal<{ type: string; timestamp: number } | null>(null);

// Computed signals
export const currentScore = computed(() => {
    const data = matchData.value;
    if (!data) return null;
    return {
        home: data.teams.home,
        away: data.teams.away,
        status: data.status
    };
});

/**
 * Explicit Resets (Guardrail 1.4)
 * When a match ends or a new one is selected, every single signal must be explicitly reset.
 */
export function clearMatchStore() {
    matchData.value = null;
    networkStatus.value = 'online';
    eventTrigger.value = null;
}
