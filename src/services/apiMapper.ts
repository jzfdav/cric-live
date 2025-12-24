import type { CricMatch } from '../types';

/**
 * Transforms CricketData.org API response to internal CricMatch type.
 * Note: This is a placeholder based on typical API structures.
 * Guardrail 2.2: Never let external API property names leak into UI.
 */
export function mapCricketDataToInternal(raw: any): CricMatch {
    // Extracting data safely with defaults
    const scoreData = raw.score || [];
    const innings1 = scoreData[0] || { r: 0, w: 0, o: 0 };
    const innings2 = scoreData[1] || { r: 0, w: 0, o: 0 };

    const isInnings2 = scoreData.length > 1;

    return {
        id: raw.id,
        status: raw.status || 'Live',
        venue: raw.venue || 'TBA',
        description: raw.name || '',
        teams: {
            home: {
                name: raw.teamInfo?.[0]?.name || 'Team 1',
                shortName: raw.teamInfo?.[0]?.shortname || 'T1',
                score: innings1.r,
                wickets: innings1.w,
                overs: innings1.o,
                isBatting: !isInnings2,
                color: '#004184'
            },
            away: {
                name: raw.teamInfo?.[1]?.name || 'Team 2',
                shortName: raw.teamInfo?.[1]?.shortname || 'T2',
                score: innings2.r,
                wickets: innings2.w,
                overs: innings2.o,
                isBatting: isInnings2,
                color: '#006629'
            }
        },
        target: isInnings2 ? innings1.r + 1 : undefined,
        mindset: '⚖️ Balanced', // Computed later based on RRR/CRR
        lastUpdated: Date.now(),
        timeline: [] // Populated from a separate ball-by-ball endpoint if available
    };
}
