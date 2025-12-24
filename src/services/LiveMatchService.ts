import { matchData, networkStatus, eventTrigger, matchList } from '../state/MatchStore';
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
        try {
            // Check if we are in mock mode
            if (import.meta.env.VITE_CRICKET_API_KEY === 'MOCK_KEY') {
                const mockData = this.getMockData(matchId);
                this.updateStore(mockData);
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
        // Mock match list
        matchList.value = [
            { id: 'ind-vs-pak-2025', title: 'IND vs PAK', status: 'Live' },
            { id: 'aus-vs-eng-2025', title: 'AUS vs ENG', status: 'Live' },
            { id: 'sa-vs-nz-2025', title: 'SA vs NZ', status: 'Upcoming' }
        ];
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
    },

    getMockData(matchId: string): CricMatch {
        const isIndPak = matchId.includes('ind-vs-pak');
        const isAusEng = matchId.includes('aus-vs-eng');

        return {
            id: matchId,
            status: isIndPak || isAusEng ? 'Live' : 'Upcoming',
            venue: isIndPak ? 'Eden Gardens, Kolkata' : (isAusEng ? 'MCG, Melbourne' : 'Kingsmead, Durban'),
            description: isIndPak ? 'India vs Pakistan - T20 World Cup' : (isAusEng ? 'The Ashes - Test 1' : 'SA vs NZ - ODI Series'),
            teams: {
                home: {
                    name: isIndPak ? 'India' : (isAusEng ? 'Australia' : 'South Africa'),
                    shortName: isIndPak ? 'IND' : (isAusEng ? 'AUS' : 'SA'),
                    score: isIndPak ? 182 : (isAusEng ? 342 : 0),
                    wickets: isIndPak ? 4 : (isAusEng ? 8 : 0),
                    overs: isIndPak ? 18.2 : (isAusEng ? 90.0 : 0),
                    isBatting: true,
                    color: isIndPak ? '#004184' : (isAusEng ? '#FFD700' : '#006A4E')
                },
                away: {
                    name: isIndPak ? 'Pakistan' : (isAusEng ? 'England' : 'New Zealand'),
                    shortName: isIndPak ? 'PAK' : (isAusEng ? 'ENG' : 'NZ'),
                    score: 0,
                    wickets: 0,
                    overs: 0,
                    isBatting: false,
                    color: isIndPak ? '#006629' : (isAusEng ? '#00148E' : '#000000')
                }
            },
            target: isIndPak ? 198 : undefined,
            mindset: isIndPak ? '🔥 Accelerating' : '⚖️ Balanced',
            lastUpdated: Date.now(),
            lastEvent: {
                type: '6',
                description: 'Match Snapshot Loaded'
            },
            timeline: isIndPak ? [
                { over: 17, ball: 6, runs: 1, type: 'Other' },
                { over: 18, ball: 1, runs: 4, type: '4' },
                { over: 18, ball: 2, runs: 6, type: '6' }
            ] : []
        };
    }
};
