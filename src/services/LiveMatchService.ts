import { matchData, networkStatus, eventTrigger, matchList, apiStatus } from '../state/MatchStore';
import type { CricMatch } from '../types';
import { fetchFromAPI } from './apiClient';
import { mapCricketDataToInternal } from './apiMapper';

export const LiveMatchService = {
    async fetchSnapshot(matchId: string): Promise<CricMatch | null> {
        networkStatus.value = 'loading';
        const apiKey = import.meta.env.VITE_CRICKET_API_KEY;
        const isKeyMissing = !apiKey || apiKey === 'MOCK_KEY' || apiKey === 'undefined';

        apiStatus.value = {
            keyMissing: isKeyMissing,
            provider: import.meta.env.VITE_API_PROVIDER || 'cricketdata'
        };

        if (isKeyMissing) {
            matchData.value = null;
            networkStatus.value = 'online';
            return null;
        }

        try {
            const rawData = await fetchFromAPI<{ data: any }>(`/match_info?id=${matchId}`);
            const mappedData = mapCricketDataToInternal(rawData.data);
            this.updateStore(mappedData);
            networkStatus.value = 'online';
            return mappedData;
        } catch (error) {
            console.error("Fetch snapshot failed:", error);
            networkStatus.value = 'error';
            throw error;
        }
    },

    async fetchMatchList() {
        const apiKey = import.meta.env.VITE_CRICKET_API_KEY;
        const isKeyMissing = !apiKey || apiKey === 'MOCK_KEY' || apiKey === 'undefined';

        if (isKeyMissing) {
            matchList.value = [];
            return [];
        }

        try {
            const response = await fetchFromAPI<{ data: any[] }>('/currentMatches');
            const list = (response.data || []).map(m => ({
                id: m.id,
                title: m.name,
                status: m.matchStarted ? 'Live' : 'Upcoming'
            }));
            matchList.value = list;
            return list;
        } catch (error) {
            console.error("Failed to fetch match list:", error);
            throw error;
        }
    },

    updateStore(newData: CricMatch) {
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
