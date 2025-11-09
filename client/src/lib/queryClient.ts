import { QueryClient, QueryFunction } from "@tanstack/react-query";
import seededEvents from "./seed";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    try {
      const res = await fetch(url, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      const data = await res.json();

      // If this request is for the events list, merge backend events with seeded events
      if (typeof url === 'string' && (url === '/api/events' || url.startsWith('/api/events?'))) {
        const serverEvents = Array.isArray(data) ? data : [];
        const map = new Map<string, any>();

        // Put server events first (server authoritative)
        for (const ev of serverEvents) {
          if (ev && ev.id) map.set(ev.id, ev);
        }

        // Add seeded events only if not present
        for (const ev of seededEvents) {
          if (!map.has(ev.id)) map.set(ev.id, ev);
        }

  // return as any to avoid generic typing issues in this helper
  return Array.from(map.values()) as any;
      }

      return data;
    } catch (err) {
      // If fetching fails (backend down, network error) and the query is for events,
      // return the local seeded events so the frontend continues to work offline.
      if (typeof url === 'string' && url.startsWith('/api/events')) {
        // If it's the events list (/api/events or /api/events?...), return array
        if (url === '/api/events' || url.startsWith('/api/events?')) {
          return (seededEvents as unknown) as any;
        }

        // Otherwise, it's probably /api/events/:id - return single seeded event or null
        const parts = url.split('/').filter(Boolean); // ['api','events',':id']
        const id = parts.length >= 3 ? parts[2] : undefined;
        if (id) {
          const found = seededEvents.find((ev) => ev.id === id);
          return (found ?? null) as any;
        }

        return (seededEvents as unknown) as any;
      }

      // rethrow for other errors (so components can handle them)
      throw err;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
