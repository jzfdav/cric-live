/**
 * Core API Client for Cric-Live
 * Handles raw fetch calls and error catching.
 */
export async function fetchFromAPI<T>(url: string, options?: RequestInit): Promise<T> {
    try {
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
