/**
 * Core API Client for Cric-Live
 * Handles raw fetch calls and error catching.
 */
export async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const apiKey = import.meta.env.VITE_CRICKET_API_KEY;
    const baseUrl = 'https://api.cricapi.com/v1'; // Using cricapi.com domain as cricketdata.org resets connections

    try {
        const url = `${baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${apiKey}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}
