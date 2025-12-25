import { matchData, networkStatus, eventTrigger, matchList, apiStatus } from '../state/MatchStore';
import type { CricMatch } from '../types';
import { fetchFromAPI } from './apiClient';
import { mapCricketDataToInternal } from './apiMapper';

let pollingInterval: number | null = null;
const DEFAULT_INTERVAL = 45000; // 45 seconds

export const LiveMatchService = {
    startPolling(matchId: string, interval = DEFAULT_INTERVAL) {
        if (pollingInterval) this.stopPolling();

        console.log(`Starting polling for match: ${matchId}`);
        this.fetchSnapshot(matchId); // Initial fetch

        pollingInterval = window.setInterval(() => {
            this.fetchSnapshot(matchId);
        }, interval);
    },

    stopPolling() {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    },

    async fetchSnapshot(matchId: string) {
        networkStatus.value = 'loading';
        const apiKey = import.meta.env.VITE_CRICKET_API_KEY;
        const isKeyMissing = !apiKey || apiKey === 'MOCK_KEY' || apiKey === 'undefined';

        apiStatus.value = {
            keyMissing: isKeyMissing,
            provider: import.meta.env.VITE_API_PROVIDER || 'cricketdata'
        };

        try {
            if (isKeyMissing) {
                matchData.value = null;
            } else {
                const rawData = await fetchFromAPI<{ data: any }>(`/match_info?id=${matchId}`);
                const mappedData = mapCricketDataToInternal(rawData.data);
                this.updateStore(mappedData);
            }
            networkStatus.value = 'online';
        } catch (error) {
            console.error("Polling failed:", error);
            networkStatus.value = 'error';
        }
    },

    async fetchMatchList() {
        const apiKey = import.meta.env.VITE_CRICKET_API_KEY;
        const isKeyMissing = !apiKey || apiKey === 'MOCK_KEY' || apiKey === 'undefined';

        if (isKeyMissing) {
            matchList.value = [];
        } else {
            try {
                // Fetch actual live matches from the API
                const response = await fetchFromAPI<{ data: any[] }>('/currentMatches');
                matchList.value = (response.data || []).map(m => ({
                    id: m.id,
                    title: m.name,
                    status: m.matchStarted ? 'Live' : 'Upcoming'
                }));
            } catch (error) {
                console.error("Failed to fetch match list:", error);
            }
        }
    },

    updateStore(newData: CricMatch) {
        // Guardrail: Detect major events to trigger visual effects
        if (newData.lastEvent && newData.lastEvent !== matchData.value?.lastEvent) {
            if (['4', '6', 'W'].includes(newData.lastEvent.type)) {
                eventTrigger.value = {
                    type: newData.lastEvent.type,
                    timestamp: Date.now()
                };
            }
        }

        matchData.value = newData;
    }
};
