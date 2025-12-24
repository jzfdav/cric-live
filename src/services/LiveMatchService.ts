import { matchData, networkStatus, eventTrigger } from '../state/MatchStore';
import type { CricMatch } from '../types';

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
            // TODO: Replace with actual API call once keys are ready
            // For now, using mock data for Phase 1 POC
            const mockData = this.getMockData(matchId);

            // Apply transformation/mapping here
            this.updateStore(mockData);

            networkStatus.value = 'online';
        } catch (error) {
            console.error("Polling failed:", error);
            networkStatus.value = 'error';
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
    },

    getMockData(matchId: string): CricMatch {
        return {
            id: matchId,
            status: 'Live',
            venue: 'Eden Gardens, Kolkata',
            description: 'India vs Pakistan - T20 World Cup',
            teams: {
                home: {
                    name: 'India',
                    shortName: 'IND',
                    score: 182,
                    wickets: 4,
                    overs: 18.2,
                    isBatting: true,
                    color: '#004184'
                },
                away: {
                    name: 'Pakistan',
                    shortName: 'PAK',
                    score: 0,
                    wickets: 0,
                    overs: 0,
                    isBatting: false,
                    color: '#006629'
                }
            },
            mindset: '🔥 Accelerating',
            lastUpdated: Date.now(),
            lastEvent: {
                type: '6',
                description: 'Suryakumar Yadav hits a massive six over fine leg!'
            },
            timeline: [
                { over: 17, ball: 6, runs: 1, type: 'Other' },
                { over: 18, ball: 1, runs: 4, type: '4' },
                { over: 18, ball: 2, runs: 6, type: '6' }
            ]
        };
    }
};
