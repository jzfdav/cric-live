export interface Team {
    name: string;
    shortName: string;
    score: number;
    wickets: number;
    overs: number;
    isBatting: boolean;
    color?: string;
}

export interface CricMatch {
    id: string;
    status: string; // e.g., "Live", "Results", "Upcoming"
    venue: string;
    description: string;
    teams: {
        home: Team;
        away: Team;
    };
    target?: number;
    lastEvent?: {
        type: '4' | '6' | 'W' | 'Dot' | 'Other';
        description: string;
    };
    timeline: Array<{
        over: number;
        ball: number;
        runs: number;
        type: '4' | '6' | 'W' | 'Dot' | 'Other';
    }>;
    mindset: '🛡️ Rebuilding' | '🔥 Accelerating' | '⚖️ Balanced' | '🏁 Finishing';
    lastUpdated: number;
}

export type NetworkStatus = 'online' | 'offline' | 'error' | 'loading';
