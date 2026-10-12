const API = "https://pokeapi.co/api/v2/";
const cache = new Map();
const MAX_ENTRIES = 256;
const MAX_AGE = 30 * 60 * 1000;
export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Share pending requests (including StrictMode mounts), retain only successes.
// Each request has a bounded lifetime; consumers independently ignore stale results.
export function request(path) {
  const url = path.startsWith(API) ? path : `${API}${path}`;
  const entry = cache.get(url);
  if (entry && Date.now() - entry.created < MAX_AGE) return entry.promise;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const promise = (async () => {
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok)
        throw new ApiError(
          response.status === 404
            ? "Pokémon not found."
            : "The research database is temporarily unavailable.",
          response.status,
        );
      return await response.json();
    } catch (error) {
      cache.delete(url);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        controller.signal.aborted
          ? "The request took too long. Please try again."
          : "Could not reach the research database. Check your connection and try again.",
      );
    } finally {
      clearTimeout(timeout);
    }
  })();
  cache.set(url, { promise, created: Date.now() });
  if (cache.size > MAX_ENTRIES) cache.delete(cache.keys().next().value);
  return promise;
}

export function clearApiCache() {
  cache.clear();
}
